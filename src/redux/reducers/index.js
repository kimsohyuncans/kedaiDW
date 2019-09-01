import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigation from '../../navigations/RootNavigator';
import listmenu from './listmenu';
import transaction from './myTransaction'
import listorder from './order'

const router = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
  router,
  listmenu,
  transaction,
  listorder
  
  })

export default appReducer

