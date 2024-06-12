/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Route, Router } from '@solidjs/router';
import { Home } from './assets/Pages/Home';
import { LogIn } from './assets/Pages/LogIn';
import { SignIn } from './assets/Pages/SignIn';
import { Account } from './assets/Pages/Account';
import { MoviesDetails } from './assets/Pages/MoviesDetails';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => 
  <Router root={App}>
    <Route path="/" component={Home}/>
    <Route path="/LogIn" component={LogIn} />
    <Route path="/SignIn" component={SignIn} />
    <Route path="/Account" component={Account} />
    <Route path="/movie/:id" component={MoviesDetails} />
  </Router>, root
);
