import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Footer,
} from 'native-base';
import {connect} from 'react-redux';
import {FlatList, View, Text} from 'react-native';
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
    setTimeout(() => {
      this.props.changeStatus();
    }, 5000);
  }

  componentDidMount() {
    total = 0;
    this.props.listorder.data.map((item, i) => {
      total += item.price;
    });
    this.props.subTotal(total);
  }
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Billing</Title>
          </Body>
        </Header>

        <Content>
          <FlatList
            extraData={this.props.listorder}
            data={this.props.listorder.data}
            renderItem={({item}) => (
              <View>
                <Text>
                  {item.menus_info.name} x{item.qyt} = {item.price} -{' '}
                  {item.status == true
                    ? (item.status = 'sent')
                    : (item.status = 'waiting')}{' '}
                </Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={{height: 50, width: 100, backgroundColor: 'pink'}}
            onPress={() => this.props.subTotal(this.props.listorder.data)}
          />
        </Content>
        <TouchableOpacity
        onPress={() => {
          this.props.completeMyTf(this.props.transaction)
          this.props.navigation.navigate('Is_Paid')
        }}>
          <Footer>
            <Text>Call Bill</Text>
          </Footer>
        </TouchableOpacity>
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
