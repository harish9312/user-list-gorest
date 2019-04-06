import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { store } from './app/store/index';
import { UserList } from 'app/components/UserList';
import { UserForm } from 'app/components/UserForm';


const Home = () => <Redirect to="/users" />

ReactDOM.render(
  <Provider store={store}>
    <HashRouter >
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={UserList} />
        <Route exact path="/add_user" component={UserForm} />  
      </React.Fragment>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
