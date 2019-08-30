import React, { Component } from 'react'
import { View,Text,TouchableOpacity } from 'react-native'

class WelcomePage extends Component {
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('goodbye')}
                style={{height:100,width:100,backgroundColor:'pink'}}>
                    <Text style={{color:'white',fontSize:15}}>go to goodbye page</Text>

                </TouchableOpacity>
            </View>            
        )
    }
}

export default WelcomePage
