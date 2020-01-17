import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
import UserList from './userList';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      userDetails: {},
    };
  }

  async componentDidMount() {
    const postData = await Axios.get('https://panorbit.in/api/posts.json');
    console.log('date json', postData.data.posts);
    this.setState({postData: postData.data.posts});
  }

  userClicked = user => {
    console.log('callback... ', user);
    this.RBSheet.close();
    this.setState({userDetails: user});
  };
  render() {
    const {navigate} = this.props.navigation;
    console.log('this is good ');
    return (
      <ScrollView>
        <View style={styles.topBarContainer}>
          <View style={styles.topBar}>
            <Image source={require('../assets/hamburger.png')} />
            <View />
            <Image source={require('../assets/logo.jpg')} />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}>
              {this.state.userDetails.profilepicture != null ? (
                <Image
                  source={{
                    uri: this.state.userDetails.profilepicture,
                  }}
                  style={{width: 50, height: 50, borderRadius: 50}}
                />
              ) : (
                <Text>Select a User</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
          duration={250}
          style={{flex: 1}}
          customStyles={{
            container: {
              flex: 1,
            },
          }}>
          <UserList userClicked={this.userClicked} />
        </RBSheet>

        <ScrollView>
          {this.state.postData.map(post => {
            return post.userId == this.state.userDetails.id ? (
              <View style={styles.postContainer} key={post.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 12,
                    //   backgroundColor: 'yellow',
                    alignContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: this.state.userDetails.profilepicture,
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 50,
                      marginRight: 5,
                    }}
                  />
                  <Text>by {this.state.userDetails.username}</Text>
                </View>

                <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    {post.title}
                  </Text>
                </View>
                <Text style={{padding: 10}}>{post.time}</Text>
                <View style={{padding: 5}}>
                  <Image
                    source={{
                      uri: post.image,
                    }}
                    style={{width: '100%', height: 200, borderRadius: 20}}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // paddingVertical: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 10,
                    }}>
                    <Image
                      source={require('../assets/like.png')}
                      style={{width: 25, height: 25}}
                    />
                    <View style={{width: '5%'}} />
                    <Image
                      source={require('../assets/comment.png')}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={{paddingLeft: 3, color: 'grey'}}>
                      19 comments
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate('Comment', {
                          id: post.userId,
                          image: this.state.userDetails.profilepicture,
                        })
                      }>
                      <Text style={{color: 'grey'}}>Add a comment</Text>
                    </TouchableOpacity>
                    <View style={{width: '5%'}} />
                    <Image
                      source={{
                        uri: this.state.userDetails.profilepicture,
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : null;
          })}
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  topBarContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
  },
  postContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    // margin: 2,
  },
});
