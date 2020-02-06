import { HashRouter, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
// import asyncComponent from '@/components/async-component/index.jsx';

const Demo = loadable(() => import('@/pages/demo'));
console.log(Demo, 'www');
const Router = (
  <HashRouter>
    <Switch>
      <Route path="/app" component={Demo} />
    </Switch>
  </HashRouter>
);
export default Router;
