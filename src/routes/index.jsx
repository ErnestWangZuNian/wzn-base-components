import { HashRouter, Route, Switch } from 'react-router-dom';
import { AsyncComponent } from '../../dist/index';

const Demo = AsyncComponent(() => import('@/pages/demo'));
const Router = (
  <HashRouter>
    <Switch>
      <Route path="/" component={Demo} />
    </Switch>
  </HashRouter>
);
export default Router;
