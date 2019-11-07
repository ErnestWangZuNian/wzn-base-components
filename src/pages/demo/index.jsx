import { AsyncComponent, Page } from '@/components';

const Show = AsyncComponent(() => import('../show'));

const { Button } = antd;
@Page({
  style: require('./style.scss'),
  preload: async () => {
    const result = {
      a: await Api.get('/v2/music/search'),
    };
    return result;
  },
})
class App extends React.Component {
  static defaultProps = {};

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      isFloatNumber: true,
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const { isFloatNumber } = this.state;
    console.log(this.props, '11111');
    return (
      <div className="demo-container">
        <Show />
        <Show />
        <Show />
        <Show />
        <Show />
        <Button
          type="primary"
          onClick={() => {
            this.setState({
              isFloatNumber: !isFloatNumber,
            });
          }}
        >
          demo
        </Button>
      </div>
    );
  }
}
export default App;
