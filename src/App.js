// @flow
import React from 'react'
import { Router } from '@reach/router'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import Login from './pages/Login'
import configureStore from './store'

const { store } = configureStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Home path="/admin" />
      <Login path="/admin/login" />
    </Router>
  </Provider>
)

export default App
