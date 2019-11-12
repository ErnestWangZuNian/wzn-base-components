import Util from 'wzn-utils';

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

const rules = {
  mobile: Util.regular.phone,
  idCard: Util.regular.idCard,
  username: Util.regular.account,
  bankCard: Util.regular.bankCard,
  password: Util.regular.password,
};

//  判断值是否为空
const juadgeValueisEmpty = (value) => {
  let result = false;
  if (value === '' || value === undefined || value === null) {
    result = true;
  }
  return result;
};

//  根据正则创建验证规则
const createValidatorRules = (key, current) => {
  const result = {
    validator: (rule, value, callback) => {
      if (!juadgeValueisEmpty(value) && !rules[key].test(value)) {
        callback(current && current.messages ? current.messages : messages[key]);
      } else {
        callback();
      }
    },
  };
  return result;
};

//  根据函数自动生成验证规则
const transformValidator = (func) => {
  let result = null;
  if (Util.isFunction(func)) {
    result = {
      validator: func,
    };
  }
  return result;
};

const validatorRules = {
  required: () => transformValidator((rule, value, callback) => {
    if (juadgeValueisEmpty(value)) {
      callback(messages.required);
    } else {
      callback();
    }
  }),
  maxLen: current => transformValidator((rule, value, callback) => {
    if (!juadgeValueisEmpty(value) && String(value).length > current.maxLen) {
      callback(current.messages ? current.messages : messages.maxLen);
    } else {
      callback();
    }
  }),
  minLen: current => transformValidator((rule, value, callback) => {
    if (!juadgeValueisEmpty(value) && String(value).length < current.minLen) {
      callback(current.messages ? current.messages : messages.minLen);
    } else {
      callback();
    }
  }),
  min: current => transformValidator((rule, value, callback) => {
    if (!juadgeValueisEmpty(value) && Number(value) <= Number(current.min)) {
      callback(current.messages ? current.messages : messages.min(value, Number(current.min)));
    } else {
      callback();
    }
  }),
  minEqual: current => transformValidator((rule, value, callback) => {
    if (!juadgeValueisEmpty(value) && Number(value) < Number(current.minEqual)) {
      callback(current.messages ? current.messages
        : messages.minEqual(value, Number(current.minEqual)));
    } else {
      callback();
    }
  }),
  max: current => transformValidator((rule, value, callback) => {
    if (!juadgeValueisEmpty(value) && Number(value) >= Number(current.max)) {
      callback(current.messages ? current.messages : messages.max(value, Number(current.max)));
    } else {
      callback();
    }
  }),
  maxEqual: current => transformValidator((rule, value, callback) => {
    if (!juadgeValueisEmpty(value) && Number(value) > Number(current.maxEqual)) {
      callback(current.messages ? current.messages
        : messages.maxEqual(value, Number(current.maxEqual)));
    } else {
      callback();
    }
  }),
  mobile: () => createValidatorRules('mobile'),
  idCard: () => createValidatorRules('idCard'),
  username: () => createValidatorRules('username'),
  bankCard: () => createValidatorRules('bankCard'),
  password: () => createValidatorRules('password'),
};

export default validatorRules;
