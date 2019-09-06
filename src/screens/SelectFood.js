import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Text, Alert,Modal,ScrollView,Button} from 'react-native';
import {Spinner, Content, Footer, List, ListItem, Container,Tab, Tabs, ScrollableTab,Left,Body,Right,Thumbnail} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as getMenuActions from '../redux/actions/getlistmenu';
import * as orderActions from '../redux/actions/getlistorder';
// import Modal from 'react-native-modal';
class SelectFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: new Array(),
      modalVisible: false,
    };
    this.choose = this.choose.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
    this.ready = this.ready.bind(this);
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
   
    console.log(this.state.orders)
    
  }

  confirm() {
    Alert.alert('Confirm order', 'are you sure to order this', [
      {
        text: 'yes',
        onPress: async () => {
         
          await this.props.sendOrder(this.state.orders)
          this.setState({
            orders : []
          })
          alert('your order confirmed, please check bill to see your details order')
        },
      },
      {
        text: 'no',
        onPress: () => console.log('client was canceled his order'),
      },
    ]);
  }

  cancel(i) {
    tmpOrder = this.state.orders.filter((item,ii) => {
      if(i == ii){
        item.qyt = item.qyt - 1
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
    console.log(tmpOrder)
  }
  ready() {
    data = false;
    this.state.orders.length < 0 ? (data = false) : (data = true);
    return data;
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
                  <View style={{flex:1,backgroundColor:'white'}}>
                    <ScrollView>
                      <List>
                        <FlatList
                        data={item.menus}
                        extraData={this.props.listmenu}
                        renderItem={ ({item}) => (

                          <TouchableOpacity style={{borderWidth:2,borderColor:'#e0e0e0',height:70,width:'100%',marginBottom:10}} onPress={() => this.choose(item,this.props.transaction.id)}>

                            <ListItem thumbnail>
                              <Left>
                                <Thumbnail square source={require('../assets/img/food.png')} style={{width:80,height:80}}/>
                              </Left>
                              <Body>
                                <Text>{item.name}</Text>
                                <Text note numberOfLines={1}>{item.price}</Text>
                              </Body>
                              <Right>
                                
                                  <Text>View</Text>
                                
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
                <Text style={{color:'white',marginLeft:'35%'}}>Order List table {/*this.props.transaction.table_number8*/}</Text>
              
              <FlatList
                style={{marginTop:10}}
                extraData={this.state}
                data={this.state.orders}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={() => this.cancel(index)} style={{borderBottomColor:'gray',borderBottomWidth:1}}>
                    <Text style={{color:'white',marginLeft:15}}>{item.name} x{item.qyt} = {item.price.toFixed(2)}</Text>
                  </TouchableOpacity>
                )}
              />
              
            </View>



            <View style={{width: '25%',marginLeft:10}}>
              <TouchableOpacity
                style={{height: 65,borderRadius:10, backgroundColor:'#0baa56',justifyContent:'center',alignItems:'center'}}
                onPress={() => this.confirm()}>
                <Text style={{color:'white',fontSize:15}}>confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{height: 65,borderRadius:10, backgroundColor: '#d9534f',justifyContent:'center',alignItems:'center',marginTop:5}}>
                <Text style={{color:'white',fontSize:15}}>call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{height: 65,borderRadius:10, backgroundColor: '#0275d8',justifyContent:'center',alignItems:'center',marginTop:5}}
              onPress={() => this.setModalVisible()}>
                <Text style={{color:'white',fontSize:15}}>view bill</Text>
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
                
                <View style={{marginTop: '20%',borderWidth:0.5,borderColor:'gray',width:'80%',height:'60%',alignSelf:'center',backgroundColor:'white'}}>
                 
                 {/* Header Modal */}
                  <View style={{flexDirection:'row',height:50,borderBottomColor:'gray',borderBottomWidth:1}}>
                    <View style={{width:'70%',justifyContent:'center'}}>
                      <Text style={{fontSize:25,marginLeft:10}}>Billing</Text>
                    </View>

                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Button
                      title='anjau'
                      style={{height:50,width:50}}
                        onPress={() => {
                          this.closeModal()
                      }}>
                      </Button>

                  </View>
                  
                  {/* Bodey Modal */}
                  <List style={{backgroundColor:'pink'}}>
                  <ListItem selected>
                    <Left>
                      <Text>Simon Mignolet</Text>
                    </Left>
                    <Right>
                      <Text>234</Text>
                    </Right>
                  </ListItem>
                  <ListItem>
                  <Left>
                      <Text>Nathaniel Clyne</Text>
                    </Left>
                    <Right>
                      <Text>34</Text>
                    </Right>
                  </ListItem>
                  </List>
                      

                   
                  </View>


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
    myOrder : data => dispatch(orderActions.myOrder(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(SelectFood);
