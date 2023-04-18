import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  PermissionsAndroid,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import url from './Backend';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import RenderHtml from 'react-native-render-html';

export default class TrendingArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
    //   this.renderHtml = this.renderHtml.bind(this);
  }

  // renderHtml(descriptionText){
  // }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          data={this.state.data}
          style={{height: 250}}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('HTML', {
                  text: item.description,
                  articleid: item._id,
                  title: item.title,
                })
              }>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 0.8,
                    justifyContent: 'center',
                    marginLeft: 10,
                    marginTop: 5,
                  }}>
                  <View style={{flex: 0.8}}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{flex: 0.2, marginRight: 20}}>
                    {/* <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.description}</Text> */}
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={{width: 80, height: 90}}
                    />
                  </View>
                </View>
                <Text style={{fontSize: 12, marginLeft: 10}}>
                  Published by {item.firstName} {item.lastName}
                </Text>
                <View
                  style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginTop: 4,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  componentDidMount() {
    fetch(`${url}/trendingpost`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',

        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then(async res => {
        try {
          console.log(res);

          const response = await res.json();

          if (res.status == 200) {
            this.setState({data: response});
          } else if (res.status == 401) {
          }
        } catch (e) {
          console.log(
            'There has been a problem with your fetch operation: ' + e.message,
          );
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
}
