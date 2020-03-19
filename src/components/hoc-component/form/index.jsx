import createDOMForm from 'rc-form/lib/createDOMForm';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import validatorRules from './builtInRules';

const handleOption = (builtInRules = {}, externalRules) => {
  let newExternalRules = [].concat(externalRules);
  if (newExternalRules && Util.isArray(newExternalRules) && newExternalRules.length) {
    newExternalRules = newExternalRules.map((item) => {
      let newItem = { ...item };
      if (Util.isString(item) && Util.isFunction(builtInRules[item])) {
        newItem = { ...builtInRules[item]({ [item]: true }) };
      }
      if (Util.isObject(item)) {
        const itemKeys = Object.keys(item);
        const itemKey = itemKeys.length ? itemKeys[0] : null;
        if (
          itemKey
          && item[itemKey]
          && builtInRules[itemKey]
          && Util.isFunction(builtInRules[itemKey])
        ) {
          newItem = { ...builtInRules[itemKey](item) };
        }
      }
      return newItem;
    });
  }
  return newExternalRules;
};

const formCreate = (options, Component) => {
  const result = createDOMForm({
    fieldNameProp: 'id',
    ...options,
    fieldMetaProp: FIELD_META_PROP,
    fieldDataProp: FIELD_DATA_PROP,
  })((props) => {
    const { form, ...moreProps } = props;
    const { getFieldProps, getFieldDecorator } = form;
    const $getFieldProps = (id, opts) => {
      let rules = [];
      if (opts && opts.rules) {
        if (Util.isArray(opts.rules) && opts.rules.length) {
          rules = [].concat(opts.rules);
        }
      }
      const finalResult = getFieldProps(id, {
        ...opts,
        rules: handleOption(validatorRules, rules),
      });
      return finalResult;
    };
    const $getFieldDecorator = (id, opts) => {
      let rules = [];
      if (opts && opts.rules) {
        if (Util.isArray(opts.rules) && opts.rules.length) {
          rules = [].concat(opts.rules);
        }
      }
      const finalResult = getFieldDecorator(id, {
        ...opts,
        rules: handleOption(validatorRules, rules),
      });
      return finalResult;
    };
    const componentResult = (
      <Component
        {...moreProps}
        form={{
          ...form,
          getFieldProps: $getFieldProps,
          getFieldDecorator: $getFieldDecorator,
        }}
      />
    );
    return componentResult;
  });
  return result;
};

export default formCreate;
