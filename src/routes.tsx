import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';

export function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
}
