import { Page } from '@/components';

const { Form, Input } = antd;
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
    preloadData: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const { form, preloadData } = this.props;
    return (
      <div className="demo-container">
        <div>表单高阶组件 内置通用验证规则</div>
        <div>
          展示预加载的数据
          {preloadData.a}
        </div>
        <Form.Item>
          <Input
            placeholder="手机号码输入框"
            {...form.getFieldProps('aaaa', {
              rules: [
                {
                  required: true,
                },
                { mobile: true },
              ],
            })}
          />
        </Form.Item>
      </div>
    );
  }
}
export default App;
