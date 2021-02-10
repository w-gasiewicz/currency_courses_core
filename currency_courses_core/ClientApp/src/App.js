import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Info } from './components/Info';
import { Charts } from './components/Charts';
import { Login } from './components/Login';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <div className= "test">
                <Route exact path='/' component={Home} />
                <Route path='/info' component={Info} />
                <Route path='/charts' component={Charts} />
                <Route path='/login' component={Login} />
            </div>
      </Layout>
    );
  }
}
