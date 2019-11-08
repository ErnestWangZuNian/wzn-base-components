import { AsyncComponent, Page } from '@/components';

const Show = AsyncComponent(() => import('../show'));

const { Button, Form, Input } = antd;
@Page({
  style: require('./style.scss'),
  form: true,
  preload: async () => {
    const result = {
      a: await Api.get('/v2/music/search'),
    };
    return result;
  },
})
class App extends React.Component {
  static defaultProps = {};

  static propTypes = {
    form: PropTypes.object.isRequired,
  };

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
    const { form } = this.props;
    console.log(this.props, '11111');
    return (
      <div className="demo-container">
        <Show />
        <Show />
        <Show />
        <Show />
        <Show />

        <Form.Item>
          <Input
            {...form.getFieldProps('name', {
              rules: [
                {
                  required: true,
                },
                {
                  maxlen: 6,
                },
              ],
            })}
          />
        </Form.Item>
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
