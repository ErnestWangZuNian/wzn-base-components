import { Page } from '@/components';

@Page({
  style: require('./style.scss'),
})
class Test extends React.Component {
  static defaultProps = {};

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="demo-container">
        test
      </div>
    );
  }
}
export default Test;
