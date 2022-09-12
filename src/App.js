import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './css/bootstrap/bootstrap.v.4.6.2.min.css';
import './css/App.css';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
  </Layout>
);
