import { AsyncComponent, Page } from '@/components';

console.log(AsyncComponent, 'wwww');

const Show = AsyncComponent(() => import('../show'));
const style = require('./style.scss');

const { Button } = antd;
@Page({
  style,
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
