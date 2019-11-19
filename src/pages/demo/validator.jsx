import Util from 'wzn-utils';

//  判断值是否为空
const juadgeValueisEmpty = (value) => {
  let result = false;
  if (value === '' || value === undefined || value === null) {
    result = true;
  }
  return result;
};

const messages = {
  required: '必填',
  mobile: '请输入正确的手机号码',
  idCard: '请输入正确的身份证号码',
  bankCard: '请输入正确的银行卡号',
  username: '以字母开头，长度在5~16之间，只能包含字母、数字和下划线',
  password: '以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
  min: (value, count) => `不能小于等于${count}`,
  minEqual: (value, count) => `不能小于${count}`,
  max: (value, count) => `不能大于等于${count}`,
  maxEqual: (value, count) => `不能大于${count}`,
  maxLen: '超过最大长度限制',
  minLen: '小于最小长度限制',
};

const rulesMap = {
  mobile: Util.regular.phone,
  idCard: Util.regular.idCard,
  username: Util.regular.account,
  bankCard: Util.regular.bankCard,
  password: Util.regular.password,
};

const validatorList = {
  required: (value) => {
    const fieldIsError = juadgeValueisEmpty(value);
    return fieldIsError;
  },
  mobile: (value) => {
    const fieldIsError = !juadgeValueisEmpty(value) && !rulesMap.mobile.test(value);
    return fieldIsError;
  },
  idCard: (value) => {
    const fieldIsError = !juadgeValueisEmpty(value) && !rulesMap.idCard.test(value);
    return fieldIsError;
  },
  bankCard: (value) => {
    const fieldIsError = !juadgeValueisEmpty(value) && !rulesMap.bankCard.test(value);
    return fieldIsError;
  },
  username: (value) => {
    const fieldIsError = !juadgeValueisEmpty(value) && !rulesMap.username.test(value);
    return fieldIsError;
  },
  password: (value) => {
    const fieldIsError = !juadgeValueisEmpty(value) && !rulesMap.password.test(value);
    return fieldIsError;
  },
  maxLen: (value, count = 6) => {
    const fieldIsError = !juadgeValueisEmpty(value) && String(value).length > count;
    return fieldIsError;
  },
  minLen: (value, count = 6) => {
    const fieldIsError = !juadgeValueisEmpty(value) && String(value).length > count;
    return fieldIsError;
  },
  maxEqual: (value, count = 6) => {
    const fieldIsError = !juadgeValueisEmpty(value) && Number(value) >= Number(count);
    return fieldIsError;
  },
  minEqual: (value, count = 6) => {
    const fieldIsError = !juadgeValueisEmpty(value) && Number(value) <= Number(count);
    return fieldIsError;
  },
  max: (value, count = 6) => {
    const fieldIsError = !juadgeValueisEmpty(value) && Number(value) > Number(count);
    return fieldIsError;
  },
  min: (value, count = 6) => {
    const fieldIsError = !juadgeValueisEmpty(value) && Number(value) < Number(count);
    return fieldIsError;
  },
};

class Validator {
  constructor() {
    this.fields = {};
    this.showMessage = false;
  }

  //  隐藏错误
  hideMessages() {
    this.showMessage = false;
  }

  // 展示错误
  showMessages() {
    this.showMessage = true;
  }

  //  判断之是否能通过验证规则
  isCanValidateByRules(fieldName, fieldValue, rules) {
    let result = true;
    if (!Util.isArray(rules)) {
      console.warn('rules必须是个数组');
    } else if (rules.length) {
      rules.forEach((item) => {
        if (Util.isString(item)) {
          if (validatorList[item] && validatorList[item](fieldValue)) {
            result = false;
            this.fields[fieldName].message = messages[item];
          }
        }
        if (Util.isObject(item)) {
          Object.keys(item).forEach((key) => {
            if (key === 'validator' && Util.isFunction(item[key])) {
              if (item[key](fieldValue)) {
                result = false;
                this.fields[fieldName].message = item[key](fieldValue);
              }
            } else if (validatorList[key] && validatorList[key](fieldValue, item[key])) {
              result = false;
              this.fields[fieldName].message = item.message ? item.message : messages[key];
            }
          });
        }
      });
    }
    return result;
  }

  // 验证方法
  validate(fieldName, fieldValue, rules) {
    this.fields[fieldName] = { isError: false, message: null };
    if (!this.isCanValidateByRules(fieldName, fieldValue, rules)) {
      this.fields[fieldName].isError = true;
    }
    return this.fields[fieldName];
  }

  //  是否验证通过
  isPass() {
    const passArray = [];
    if (Object.keys(this.fields)) {
      Object.keys(this.fields).forEach((key) => {
        if (this.fields[key].isError) {
          passArray.push(this.fields[key]);
        }
      });
    }
    return passArray.length === Object.keys(this.fields);
  }
}

export default Validator;
