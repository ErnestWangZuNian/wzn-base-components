import { connect } from 'react-redux';
import preload from './preload';
import style from './style';

const Component = (params) => {
  const options = { withRouter: true, ...params };
  const resultComponent = (Component) => {
    let newComponent = Component;
    if (options && options.style) {
      newComponent = style(options.style)(newComponent);
    }
    if (options && options.preload) {
      newComponent = preload(options.preload)(newComponent);
    }
    if (options && options.connect) {
      const { mapStateToProps, mapDispatchToProps } = options.connect;
      newComponent = connect(
        mapStateToProps,
        mapDispatchToProps,
      )(newComponent);
    }
    return newComponent;
  };

  return resultComponent;
};
export default Component;
