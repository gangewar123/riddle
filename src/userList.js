import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import Axios from 'axios';

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }
  async componentDidMount() {
    const userData = await Axios.get('https://panorbit.in/api/users.json');
    console.log('date json', userData.data.users);
    this.setState({userData: userData.data.users});
  }

  onHandle = user => {
    console.log('user data ', user);
    this.props.userClicked(user);
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.userData}
          renderItem={({item}) => {
            console.log('data in user..', item);
            return (
              <View style={{width: '100%', display: 'flex'}}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('clicking or not');
                    this.onHandle(item);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      height: 100,
                      borderBottomColor: 'black',
                      borderBottomWidth: 0.5,
                      padding: 12,
                      //   backgroundColor: 'yellow',
                      alignContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{
                        uri: item.profilepicture,
                      }}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 50,
                        marginRight: 5,
                      }}
                    />
                    <Text style={{paddingLeft:10,fontWeight:"bold",fontSize:15}}>{item.username}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }
}
