import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AuthContext from './Auth.js';

export default function SettingsScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 0.05,
          marginTop: 5,
          alignItems: 'flex-start',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PoliciesScreen');
          }}>
          <Text style={{fontSize: 16, color: 'red', paddingLeft: 10}}>
            {' '}
            Policies
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            signOut({});
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'red',
              paddingLeft: 10,
              paddingTop: 10,
            }}>
            {' '}
            LogOut
          </Text>
        </TouchableOpacity>
      </View>
      {/* 
<View style={{backgroundColor:'#E0E0E0'}}>
<View style={{marginTop:5, flex:0.5}}>
<Text>Signout</Text>
</View>
</View> */}
    </View>
  );
}
