import React from 'react';
import { Provider } from 'react-redux'

import store from './store'
import { init } from './db';


init()
  .then(() => console.log('Database initialized'))
  .catch(err => {
    console.log('Database failed')
    console.log(err.message)
  })

// navigation
import MainNavigator from './navigation'

export default function App() {
  return (<Provider store={store}><MainNavigator /></Provider>);
}
