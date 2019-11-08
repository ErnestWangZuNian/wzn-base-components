import createDOMForm from 'rc-form/lib/createDOMForm';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';

const formCreate = (options, Component) => {
  const result = createDOMForm({
    fieldNameProp: 'id',
    ...options,
    fieldMetaProp: FIELD_META_PROP,
    fieldDataProp: FIELD_DATA_PROP,
  })((props) => {
    const { form } = props;
    const { getFieldDecorator } = form;
    const $getFieldDecorator = (id, opts) => {
      const finalResult = getFieldDecorator(id, {
        rules: [
          {
            maxlen: 6,
            message: '最大6个数字',
          },
        ],
        ...opts,
      });
      return finalResult;
    };
    form.getFieldDecorator = $getFieldDecorator;
    const a = <Component {...props} />;
    return a;
  });
  return result;
};

export default formCreate;
