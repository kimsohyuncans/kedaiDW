import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View,Text,TouchableOpacity,StyleSheet,TextInput } from 'react-native'
import * as getlistmenu from '../redux/actions/getlistmenu'
import * as transaction from '../redux/actions/myTransaction'
import Axios from 'axios';

class WelcomePage extends Component {
 

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text>Masukkan Nomor Meja</Text>
                    <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    onChangeText={(e) => this.setState({table_number:e})}/>

                    <TouchableOpacity style={styles.input}
                    // onPress={() => this.props.getId_transactions(this.state.table_number)}
                    onPress={() => {
                        this.props.getId_transactions(this.state.table_number)
                        this.props.navigation.navigate('selectfood')
                        
                    }}
                    >
                        <Text>submit</Text>
                    </TouchableOpacity>

                </View>
            </View>
                 
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
      getMenu : () => dispatch(getlistmenu.getlistmenu()),
      getId_transactions : (value) => dispatch(transaction.sendTableNumber(value))

    }
  }
const mapStateToProps = state => {
    return {
        listmenu : state.listmenu,
        myTransaction : state.transaction
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    form : {
        borderWidth:3,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        width:'60%',
        height:'80%'
    },
    input : {
        width : '50%',
        borderWidth:2,
        marginTop:'10%'
    }

})

export default connect(mapStateToProps,mapDispatchToProps)(WelcomePage)

