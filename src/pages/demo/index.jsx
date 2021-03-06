import { Route, Switch } from 'react-router-dom';
import { Page } from '@/components';
import asyncComponent from '@/components/async-component/index.jsx';
import Validator from './validator';


const Test = asyncComponent(() => import('@/pages/test'));
const TestOne = asyncComponent(() => import('@/pages/test1'));

console.log(Validator, 'wwww');

const { Form, Input, Button } = antd;
@Page({
  style: require('./style.scss'),
  // preload: async () => {
  //   const result = {
  //     musicInfo: await Api.get('/v2/music/search'),
  //   };
  //   return result;
  // },
  form: true,
})
class App extends React.Component {
  static defaultProps = {};

  static propTypes = {
    form: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // preloadData: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.validator = new Validator();
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const { form, history } = this.props;
    return (
      <div className="demo-container">
        <Button
          onClick={() => {
            form.validateFields((err, values) => {
              if (!err) {
                console.log(values, 'www');
                history.push('/test');
              }
            });
          }}
        >
          test
        </Button>
        <Button
          onClick={() => {
            history.push('/test1');
          }}
        >
          test1
        </Button>
        <div>表单高阶组件 内置通用验证规则</div>
        <div>
          展示预加载的数据
          {/* {preloadData.musicInfo.count} */}
          {console.log('测试')}
        </div>
        <Form.Item label="手机号码">
          <Input
            placeholder="手机号码输入框"
            {...form.getFieldProps('aaaa')}
          />
        </Form.Item>
        <Switch>
          <Route path="/app/test" component={Test} />
          <Route path="/app/test1" component={TestOne} />
        </Switch>
      </div>
    );
  }
}
export default App;
