import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Text, Alert,Modal,ScrollView,Button,TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Spinner, Content, Footer, List, ListItem, Container,Tab, Tabs, Header,ScrollableTab,Left,Body,Right,Thumbnail} from 'native-base';
import * as getMenuActions from '../redux/actions/getlistmenu';
import * as orderActions from '../redux/actions/getlistorder';
import * as transactionActions from '../redux/actions/myTransaction'
// import Modal from 'react-native-modal';
class SelectFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: new Array(),
      modalVisible: false,
      time : 0
    };
    this.choose = this.choose.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
    this.orderStatus = this.orderStatus.bind(this)
    
    setInterval(() => this.setState({time : this.state.time + 1}),1000)
    
  }

  componentDidMount() {
    this.props.getMenu();
  }
  



  async choose(e, tf_id) {
    data = {
      menu_id: e.id,
      transaction_id: tf_id,
      name: e.name,
      price: e.price,
      qyt: 1,
      status: 0,
    };
    
    isExist = this.state.orders.find(item => item.menu_id == data.menu_id)
    

    if(isExist){
        isExist.qyt += 1
        isExist.price += data.price
        index = this.state.orders.findIndex(item => item.menu_id == data.menu_id)
        
        let tmp  = this.state.orders
        tmp[index] = isExist
        this.setState({
            orders : tmp,

            
        })
        
        
    }else{
        await this.setState({
            orders: this.state.orders.concat(data),
          });
    }
   
    total = 0
    this.state.orders.map(item => {
      total += item.price
    })

    this.props.total(total)
    
  }

  confirm() {
    if(this.state.orders.length > 0) {

    
      Alert.alert('Confirm order', 'are you sure to order this', [
        {
          text: 'yes',
          onPress: async () => {
          
            await this.props.sendOrder(this.state.orders)
            this.setState({
              orders : []
            })
            setTimeout( () => this.props.changeStatus(this.props.transaction.id),20000)
            
            this.setModalVisible()
            await alert('please wait your order come')
            
            
          },
        },
        {
          text: 'no',
          onPress: () => console.log('client was canceled his order'),
        },
      ]);
    }else{
      alert('there are no orders in your note list')
    }
  }

  cancel(i) {
    tmpOrder = this.state.orders.filter((item,ii) => {
      if(i == ii){
        default_price = item.price/item.qyt
        item.qyt = item.qyt - 1
        item.price -= default_price
        if(item.qyt > 0){
          return item  
        }
        
      }else{
        return item
      }

    })

    this.setState({
      orders : tmpOrder
    })

    total = 0
    this.state.orders.map(item => {
      total += item.price
    })

    this.props.total(total)

  }
  
  orderStatus(){
    
    if(this.props.listorder.data === null) {alert('please confirm your order first before check your orders status')}else{this.setModalVisible()}
     
  }

  setModalVisible() {
    this.setState({modalVisible: true});
  }
  
  closeModal(){
    this.setState({modalVisible : false})
  }

  render() {

    

    if (this.props.listmenu.isLoading === false) {
      return (
        <Container>
          <Content>
            <Tabs>
              {this.props.listmenu.data.map((item,i) => (
                <Tab heading={item.name} key={i} tabStyle={{backgroundColor:'#0275d8'}} activeTabStyle={{backgroundColor:'#0275d8'}} style={{flex:1}}>
                  <View style={{flex:1,backgroundColor:'#ececec'}}>
                    <ScrollView>
                      <List>
                        <FlatList
                        data={item.menus}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.props.listmenu}
                        renderItem={ ({item}) => (

                          <TouchableOpacity style={{borderWidth:2,borderColor:'#e0e0e0',height:70,width:'100%',marginBottom:10,backgroundColor:'white'}} onPress={() => this.choose(item,this.props.transaction.id)} key={item.id}>

                            <ListItem thumbnail>
                              <Left>
                                <Thumbnail square source={require('../assets/img/food.png')} style={{width:80,height:80}}/>
                              </Left>
                              <Body>
                                <Text>{item.name}</Text>
                                <Text note numberOfLines={1}>{item.price}</Text>
                              </Body>
                              <Right>
                                
                                  <Text style={{color:'#ccc'}}>tap to add this one</Text>
                                
                              </Right>
                            </ListItem>
                          </TouchableOpacity>
                            
                        
                        )}/>
                      </List>
                      


                      

                      </ScrollView>
                  </View>
                </Tab>
              ))}
            </Tabs>

            
            
            
          </Content>
          <Footer style={{height: 200, flexDirection: 'row',backgroundColor:'white'}}>
            <View style={{width: '70%',backgroundColor:'#292b2c'}}>
              <Text style={{color: 'white', marginLeft: '35%'}}>Order List table {this.props.transaction.table_number} </Text>
              <View style={{borderBottomColor: 'gray',borderBottomWidth: 1,flexDirection: 'row',justifyContent: 'space-between',marginTop: 20,}}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text style={{color: 'white', marginLeft: 10}}>Name</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{color: 'white'}}>Quantity</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={{color: 'white', marginRight: 10}}>
                    Price
                  </Text>
                </View>
              </View>
              <ScrollView
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight)=>{        
                    this.scrollView.scrollToEnd({animated: true});
                }}
                showsVerticalScrollIndicator={true}
                indicatorStyle={'white'}>
                <FlatList
                  style={{marginTop: 10}}
                  extraData={this.state}
                  data={this.state.orders}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => this.cancel(index)}
                      key={index}
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text style={{color: 'white', marginLeft: 10}}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>{item.qyt}</Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{color: 'white', marginRight: 10}}>
                       
                          {item.price.toFixed(2)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </ScrollView>
              <View style={{borderBottomColor: 'gray',borderBottomWidth: 1,flexDirection: 'row',justifyContent: 'space-between',marginTop: 5,}}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text style={{color: 'white', marginLeft: 10}}>Subtotal</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={{color: 'white', marginRight: 10}}>
                    {this.props.transaction.subtotal.toFixed(2)}
                  </Text>
                </View>
              </View>
              
            </View>



            <View style={{width: '25%',marginLeft:10}}>
              <TouchableOpacity
                style={{height: 65,borderRadius:10, backgroundColor:'#0baa56',justifyContent:'center',alignItems:'center'}}
                onPress={() => this.confirm()}>
                <Text style={{color:'white',fontSize:15}}>confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{height: 65,borderRadius:10, backgroundColor: '#d9534f',justifyContent:'center',alignItems:'center',marginTop:5}}
              onPress={() => this.setModalVisible()}>
                <Text style={{color:'white',fontSize:15}}>Pay</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{height: 65,borderRadius:10, backgroundColor: '#0275d8',justifyContent:'center',alignItems:'center',marginTop:5}}
              onPress={() => this.orderStatus()}>
                <Text style={{color:'white',fontSize:15}}>Orders Status</Text>
              </TouchableOpacity>
            </View>
          </Footer>

          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              
              }}>
              
              <View style={{marginTop: '20%',borderWidth:0.5,borderColor:'gray',width:'80%',height:'80%',alignSelf:'center',backgroundColor:'white'}}>
                
                {/* Header Modal */}
                <View style={{flexDirection:'row',height:60,borderBottomColor:'gray',borderBottomWidth:0.5}}>
                  <View style={{width:'70%',justifyContent:'center'}}>
                    <Text style={{fontSize:25,marginLeft:10}}>Billing</Text>
                  </View>

                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Button
                    title='back'
                    style={{height:50,width:50}}
                      onPress={() => {
                        this.closeModal()
                    }}>
                    </Button>

                </View>   
              </View>

              {/* modal body */}
              <View style={{height:'90%'}}>

              
                <View style={{borderBottomColor: 'gray',flexDirection: 'row',justifyContent: 'space-between',marginTop: 20,}}>
                  
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Text style={{color: 'gray', marginLeft: 10}}>Status</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'gray'}}>Name</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={{color: 'gray', marginRight: 10}}>
                      Price
                    </Text>
                  </View>
                  
                </View>
                
                <FlatList
                data={this.props.listorder.data}
                extraData={this.props.listorder}
                keyExtractor={(item, index) => index.toString()}
                renderItem = { ( {item,index}) => (
                  <View key={index} style={{borderBottomColor: 'gray',flexDirection: 'row',justifyContent: 'space-between'}}>
                  
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      {item.status == false ? (<Text style={{color: '#d9534f', marginLeft: 10}}>Waiting</Text>) : (<Text style={{color: '#0baa56', marginLeft: 10}}>Sent</Text>)}
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={{color: 'gray'}}>{item.menus_info.name} x{item.qyt}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Text style={{color: 'gray', marginRight: 10}}>
                        {item.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                )}/>


                {/* calculation total */}
                <View style={{height:100,width:'100%',backgroundColor:'#e3dfde'}}>
                  <View style={{borderBottomColor: 'gray',flexDirection: 'row',justifyContent: 'space-between'}}>
                    
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Subtotal</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Text style={{color: 'gray', marginRight: 10}}>
                        {this.props.transaction.subtotal.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <View style={{borderBottomColor: 'gray',flexDirection: 'row',justifyContent: 'space-between'}}>
                    
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Discount($)</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Text style={{color: 'gray', marginRight: 10}}>
                        {this.props.transaction.discount}
                      </Text>
                    </View>
                  </View>

                  <View style={{borderBottomColor: 'gray',flexDirection: 'row',justifyContent: 'space-between'}}>
                    
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Service Charge</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Text style={{color: 'gray', marginRight: 10}}>
                        {this.props.transaction.service_charge}
                      </Text>
                    </View>
                  </View>

                  <View style={{borderBottomColor: 'gray',flexDirection: 'row',justifyContent: 'space-between'}}>
                    
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Tax</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Text style={{color: 'gray', marginRight: 10}}>
                        {this.props.transaction.tax}
                      </Text>
                    </View>
                  </View>

                  <View style={{borderBottomColor: 'gray',flexDirection: 'row',justifyContent: 'space-between'}}>
                    
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text>Total</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Text style={{color: 'gray', marginRight: 10}}>
                        {this.props.transaction.total.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                </View>

                

              </View>
                
                  {/* pay now */}

                
              <TouchableHighlight style={{width:'80%',height:50,marginTop:4,alignSelf:'center',justifyContent:'center',alignItems: 'center',backgroundColor:'#0baa56'}}
              onPress={async () => {
                this.props.time(this.state.time)
                this.props.completeMyTf(this.props.transaction)
                await this.setState({modalVisible:false})
                this.props.navigation.navigate('Is_Paid')
              }
              }>
                <Text style={{color:'white'}}>Pay</Text>
              </TouchableHighlight>
                

            </View>
          </Modal>
        </View>
        </Container>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Spinner />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    listmenu: state.listmenu,
    listorder: state.listorder,
    transaction: state.transaction,
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    getMenu: () => dispatch(getMenuActions.getlistmenu()),
    sendOrder: data => dispatch(orderActions.sendOrder(data)),
    myOrder : data => dispatch(orderActions.myOrder(data)),
    total : data => dispatch(transactionActions.subTotal(data)),
    completeMyTf : data => dispatch(transactionActions.completeMyTf(data)),
    changeStatus: (data) => dispatch(orderActions.changeStatus(data)),
    time : data => dispatch(transactionActions.time(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(SelectFood);
