import { createStackNavigator,createAppContainer } from 'react-navigation'

import FindMyTable from '../screens/FindMyTable'
import SelectFood from '../screens/SelectFood'
import ViewBill from '../screens/ViewBill'
import Is_Paid from '../screens/Is_Paid'

const MainNavigator = createStackNavigator({
    FindMyTable,
    SelectFood,
    ViewBill,
    Is_Paid
    
},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
})

const RootNavigator = createAppContainer(MainNavigator)

export default RootNavigator 