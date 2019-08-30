import { createStackNavigator,createAppContainer } from 'react-navigation'
import WelcomePage from './../screens/welcome'
import GoodbyePage from './../screens/goodbye'

const MainNavigator = createStackNavigator({
    welcome : {
        screen : WelcomePage
    },
    goodbye : {
        screen : GoodbyePage
    }
})

const RootNavigator = createAppContainer(MainNavigator)

export default RootNavigator 