import React, {Component, useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
// import { MenuProvider } from 'react-native-popup-menu';
import url from './Backend';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
//seems like issue is in top navigation tabs
export default function Articles({navigation, route}) {
  console.log(route);
  const data = new Array(100).fill(0).map((a, i) => ({value: 'item' + i}));
  const [Data, setData] = useState();
  const [isUpdate, setUpdate] = useState(false);
  useEffect(() => {
    if (!isUpdate) {
      fetch(`${url}/articles`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',

          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: route.params.email}),
      })
        .then(async res => {
          try {
            console.log(res);
            console.log('here78');
            const response = await res.json();

            if (res.status == 200) {
              console.log('responses', response);
              setData(response);
              console.log('data', Data);
              setUpdate(true);
            } else {
              console.log(response);
            }
          } catch (e) {
            console.log(
              'There has been a problem with your fetch operation: ' +
                e.message,
            );
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, []);
  return (
    <MenuProvider>
      <View style={{flex: 1, marginTop: 0}}>
        <FlatList
          data={data}
          renderItem={({item}) => (
         
            <Menu onSelect={value => Alert.alert(value)}>
              <MenuTrigger>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={15}
                  style={{backgroundColor: 'white'}}
                />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  },
                }}>
                <MenuOption value="A" text="A" />
                <MenuOption value="B" text="B" />
                <MenuOption value="C" text="C" />
              </MenuOptions>
            </Menu>

            //     </View>
            //     <View style={{flexDirection:'row',flex:0.8,justifyContent:'center'}}>
            //       <View style={{flex:0.8}}>
            //     <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.title}</Text>
            //     </View>
            //     <View style={{flex:0.2}}>
            //     <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.description}</Text>

            //     </View>

            //     </View>
            //     <View style={{flexDirection:'row',flex:0.2}}>
            //     <View style={{flex:0.6}}>
            //       <Text style={{fontSize:12}}>Published on {item.date}</Text>
            //     </View>
            //     </View>
            //     <View
            //   style={{
            //     borderBottomColor: 'black',
            //     borderBottomWidth: StyleSheet.hairlineWidth,
            //     marginBottom:4,marginTop:4,
            //   }}
            // />
            //     </View>
          )}
          style={{height: 50}}
        />
        {/* </View> */}
        {/* </MenuProvider> */}
      </View>
    </MenuProvider>
  );
}
