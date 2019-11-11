const messages = {
  required: '必填',
  mobile: '请输入正确的手机号码',
  maxLen: '超过最大长度限制',
};

const rules = {
  mobile: Util.regular.phone,
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
        callback(current.messages ? current.messages : messages[key]);
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
    if (!juadgeValueisEmpty(value) && value.length > current.maxLen) {
      callback(current.messages ? current.messages : messages.maxLen);
    } else {
      callback();
    }
  }),
  mobile: () => createValidatorRules('mobile'),
};

export default validatorRules;
