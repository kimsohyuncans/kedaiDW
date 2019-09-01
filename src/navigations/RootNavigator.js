import { createStackNavigator,createAppContainer } from 'react-navigation'

import FindMyTable from '../screens/FindMyTable'
import SelectFood from '../screens/SelectFood'

const MainNavigator = createStackNavigator({
    selectfood : {
        screen : SelectFood
    },
    
},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
})

const RootNavigator = createAppContainer(MainNavigator)

export default RootNavigator 