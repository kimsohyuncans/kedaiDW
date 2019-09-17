import React,{Component} from 'react'
import {View,Text,Image} from 'react-native'
import {connect} from 'react-redux'

import {
  Spinner, Footer
} from 'native-base';

class IsPaid extends Component{
  render(){
    if(this.props.transaction.is_paid == true){
      return(
        <View style={{flex:1,backgroundColor: '#0660CF',justifyContent: 'center',alignContent: 'center',alignItems: 'center',}}>
          <Image source={require('../assets/img/bill.png')} style={{width:100,height:100,backgroundColor:'white',marginBottom:20}}/>
          <Text style={{color:'white',fontSize:25,textAlign:'center'}}>Please bring the device to the cashier to complete your transation</Text>
          <Text style={{color:'white',fontSize:25,marginTop:20,}}>table #{this.props.transaction.table_number}</Text>
          <Text style={{color:'white',fontSize:25,marginTop:20}}>time spent : {this.props.transaction.finished_time}</Text>
          
          <Text style={{color:'white',fontSize:25,marginTop:20}}>thank you</Text>
          
        </View>
        
      )
    }else{
      return(

     
        <View style={{flex:1,backgroundColor: '#0660CF',justifyContent: 'center',alignContent: 'center',alignItems: 'center',}}>
          <Text>there is something error</Text>
        </View>
      )
    }
    
  }
}
const mapStateToProps = state => {
  return {
    transaction : state.transaction
  }
}
export default connect(mapStateToProps,null)(IsPaid)
