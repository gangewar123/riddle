import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import Axios from 'axios';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: [],
      navId: '',
      textInput: '',
    };
  }

  async componentDidMount() {
    this.setState({navId: this.props.navigation.getParam('id')});
    const commentData = await Axios.get(
      'https://panorbit.in/api/comments.json',
    );
    console.log('date json', commentData.data.comments);

    // console.log('the passes id is ', this.props.navigation.getParam('id'));
    const comment = commentData.data.comments.map(e => {
      if (e.userId == this.state.navId) {
        console.log('the body is ', e.body, e.userId, this.state.navId);
        this.setState({commentData: this.state.commentData.concat(e)});
      }
    });
  }

  joinData = () => {
    var RandomNumber = Math.floor(Math.random() * 100) + 1;
    const comments = [
      {
        postId: RandomNumber,
        id: RandomNumber,
        userId: this.state.navId,
        time: '2 hours ago',
        profilePicture: this.props.navigation.getParam('image'),
        body: this.state.textInput,
      },
    ];
    if (this.state.textInput != '')
      this.setState({
        commentData: this.state.commentData.concat(comments),
        textInput: '',
      });
  };
  render() {
    console.log(
      'this is data of next',
      this.props.navigation.getParam('image'),
    );
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 3}}>
          <FlatList
            data={this.state.commentData}
            renderItem={({item}) => {
              console.log('data in user..', item);
              return (
                //   <View style={{width: '100%', flex: 1,}}>
                <View
                  style={{
                    flexDirection: 'row',

                    // height: 100,
                    // borderBottomColor: 'black',
                    // borderBottomWidth: 0.5,
                    padding: 12,
                    //   backgroundColor: 'yellow',
                    alignContent: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{
                      uri: item.profilePicture,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      marginRight: 5,
                    }}
                  />
                  <View
                    style={{padding: 10, alignContent: 'center', width: '90%'}}>
                    <Text>{item.body}</Text>
                  </View>
                </View>
                //   </View>
              );
            }}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', height: 70,borderTopColor:"black",borderTopWidth:0.5}}>
          <Image
            source={{
              uri: this.props.navigation.getParam('image'),
            }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              marginRight: 5,
            }}
          />
          <TextInput
        
            placeholder="Add a Comment..."
            onChangeText={data => this.setState({textInput: data})}
            value={this.state.textInput}
            style={{
              textAlign: 'auto',
              height: 40,
              width: 300,
            }}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            key={1}
            onPress={() => {
              this.joinData();
              console.log('clicked');
            }}>
            <Text>POST</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
