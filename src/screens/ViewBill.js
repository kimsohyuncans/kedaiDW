import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
} from 'native-base';
import {connect} from 'react-redux';
import {FlatList, View, Text} from 'react-native';
import {ListItem,Left,Right,Body,List} from 'native-base'
import * as orderActions from '../redux/actions/getlistorder';
import * as transactionActions from '../redux/actions/myTransaction';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

class ViewBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1,
      subtotal: 0,
    };
    // setTimeout(() => {
    //   this.props.changeStatus(this.props.transaction.id);
    //   console.log(this.props.listorder.data)
    // }, 5000);
  }

  componentDidMount() {
    total = 0;
    this.props.listorder.data.map((item, i) => {
      total += item.price;

    });
    this.props.subTotal(total);
  }
  render() {

    // this.props.listorder.data.map((item) => {
    //   item.state == false ? item.status = 'Waiting' : item.status = 'Sent'
    // })
    return (
      <Container>

        <Content>
          <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:'#dcdcde',width:'80%',alignSelf:'center',marginTop:100,padding:0,borderRadius:10}}>
            <FlatList
              style={{marginTop:100,width:'80%'}}
              extraData={this.props.listorder}
              data={this.props.listorder.data}
              renderItem={({item}) => (
                <List>
                <ListItem>
                              <Left>
                              <Text>{item.menus_info.name}</Text>
                              </Left>
                              
                              <Right>
                                  <Text>{item.price}</Text>

                              </Right>
                            </ListItem>
                            </List>
              )}
            />
            <View style={{marginTop:100,height:1,backgroundColor:'#cdcdd4',width:'100%'}}/>
            <View style={{backgroundColor:'#cdcdd4'}}>
              <Text>SubTotal                                                                                   {this.props.transaction.subtotal.toFixed(2)}</Text>
              <Text>Service Charge                                                                                 {this.props.transaction.service_charge}</Text>
              <Text>Discount %                                                                                        {this.props.transaction.discount}</Text>
              <Text>Total                                                                                            {this.props.transaction.total.toFixed(2)}</Text>
            </View>
          </View>


        </Content>
        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
          <TouchableOpacity
          onPress={() => {
            this.props.completeMyTf(this.props.transaction)
            this.props.navigation.navigate('Is_Paid')
          
          }}>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#0baa56',width:400,height:50,marginBottom:10}}>
              <Text style={{fontSize:20,color:'white'}}>Call Bill</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    );
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
    changeStatus: () => dispatch(orderActions.changeStatus()),
    subTotal: data => dispatch(transactionActions.subTotal(data)),
    completeMyTf : data => dispatch(transactionActions.completeMyTf(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(ViewBill);
