import React, { Component } from 'react'
import RootNavigator from './src/navigations/RootNavigator'
import { Provider, connect } from 'react-redux';
import {store} from './src/redux/store'
class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    )
  }
}

export default App