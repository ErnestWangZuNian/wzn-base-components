import loadable from '@loadable/component';
import { Spin } from 'antd';

const asyncComponent = (importComponent, loading) => {
  const LoadComponent = loadable(importComponent, {
    fallback: loading || <Spin />,
  });
  return LoadComponent;
};
export default asyncComponent;
