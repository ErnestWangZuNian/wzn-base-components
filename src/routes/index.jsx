import { HashRouter, Route, Switch } from 'react-router-dom';

import Demo from '../pages/demo';

const Router = (
  <HashRouter>
    <Switch>
      <Route path="/" exact component={Demo} />
    </Switch>
  </HashRouter>
);
export default Router;
