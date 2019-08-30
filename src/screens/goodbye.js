import React, { Component } from 'react'
import { View,Text,TouchableOpacity } from 'react-native'

class GoodbyePage extends Component {
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('welcome')}
                style={{height:100,width:100,backgroundColor:'pink'}}>
                    <Text style={{color:'white',fontSize:15}}>go to welcome page</Text>

                </TouchableOpacity>
            </View>            
        )
    }
}

export default GoodbyePage
