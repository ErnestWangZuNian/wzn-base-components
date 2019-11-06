import asyncComponent from '../../components/async-component';

const Show = asyncComponent(() => import('../show'));
const style = require('./style.scss');

style.use();

const { Button } = antd;

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
