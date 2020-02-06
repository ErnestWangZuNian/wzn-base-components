import { HashRouter, Route, Switch } from 'react-router-dom';
import asyncComponent from '@/components/async-component/index.jsx';

const Demo = asyncComponent(() => import('@/pages/demo'));
const Router = (
  <HashRouter>
    <Switch>
      <Route path="/app" component={Demo} />
    </Switch>
  </HashRouter>
);
export default Router;
