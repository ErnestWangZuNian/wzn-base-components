import loadable from '@loadable/component';
import { Spin } from 'antd';

const asyncComponent = importComponent => class AsyncComponent extends React.Component {
  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const LoadComponent = loadable(importComponent, {
      fallback: <Spin />,
    });
    return <LoadComponent {...this.props} />;
  }
};
export default asyncComponent;
