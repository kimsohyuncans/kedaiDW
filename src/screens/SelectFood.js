import React, { Component } from 'react';
import {connect} from 'react-redux'
import {View,FlatList,Text,Alert} from 'react-native'
import {Spinner, Content,Footer,List, ListItem, Container} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as getMenuActions from '../redux/actions/getlistmenu'
import * as orderActions from '../redux/actions/getlistorder'
class SelectFood extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders : new Array(),
            ready :false

        }
        this.choose = this.choose.bind(this)
        this.confirm = this.confirm.bind(this)
        this.cancel = this.cancel.bind(this)
        this.ready = this.ready.bind(this)
    }
    

    componentDidMount(){
        this.props.getMenu()
    }

    choose(e,tf_id){
        data = {
            menu_id: e.id,
            transaction_id : tf_id,
            name : e.name,
            price : e.price,
            qyt : 1,
            status : 'waiting',
            
        }
        this.setState({
            orders : this.state.orders.concat(data)
        })
        console.log(this.state.orders)
    }

    confirm(){
        Alert.alert(
            "Confirm order",
            "are you sure to order this",
            [
                {
                    text : 'yes',
                    onPress : () => console.log(this.state.orders)
                },
                {
                    text : 'no',
                    onPress : () => console.log('client was canceled his order')
                }
            ]
           
        )
    }

    cancel(i){
        this.setState({
            orders : this.state.orders.filter((item,j)=> i !== j)

        })
    }
    ready(){
        data = false
        this.state.orders.length < 0 ? data = false : data = true
        return data
    }
    
    
    
  render() {
      if(this.props.listmenu.isLoading === false){
        return (
            <Container>
                <Content>

                    <List>
                        
                            <FlatList
                            data = {this.props.listmenu.data}
                            renderItem = { ({item}) => (
                                <View>
                                    <ListItem itemDivider>
                                        <Text>{item.name}</Text>
                                    </ListItem>
                                    <FlatList
                                    data={item.menus}
                                    renderItem = { ({item}) => (
                                        <TouchableOpacity onPress={() => this.choose(item,1)}>
                                            <ListItem>
                                                <Text>{item.name}</Text>
                                            </ListItem>
                                        </TouchableOpacity>
                                    )}/>
                                </View>
                                

                            )}/>
                        
                    </List>
                    
                </Content>
                <Footer style={{height:200,flexDirection:'row'}}>

                    <View style={{width:'80%',backgroundColor:'pink'}}>
                        <FlatList
                        data = {this.state.orders}
                        renderItem = { ({item,index}) => (
                            <TouchableOpacity onPress={() => this.cancel(index)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}/>

                    </View>
                    <View style={{width:'20%',backgroundColor:'blue'}}>
                        
                        <TouchableOpacity style={{height:60,backgroundColor:'yellow'}} onPress={() => this.confirm()}><Text>confirm</Text></TouchableOpacity>
                        <TouchableOpacity style={{height:60,backgroundColor:'red'}}><Text>call</Text></TouchableOpacity>
                        <TouchableOpacity style={{height:60,backgroundColor:'green'}}><Text>view bill</Text></TouchableOpacity>
                        

                    </View>
                
                </Footer>
           
            </Container>
            
        );
      }else{
          return(
        <View style={{flex:1}}>
            <Spinner/>
        </View>
        );
      }
    
  }
}

const mapStateToProps = state => {
    return {
        listmenu : state.listmenu,
        listorder : state.listorder,
        transaction : state.transaction
    }
}
const mapDispatchtoProps = dispatch =>{
    return{
        getMenu : () => dispatch(getMenuActions.getlistmenu()),
        saveorder : (data) => dispatch(orderActions.sendorder(data))
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(SelectFood)
