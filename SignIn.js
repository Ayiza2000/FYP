import {onPress} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes.js';
import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles/styles.js';
import {MMKVLoader} from 'react-native-mmkv-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from './Auth.js';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setError] = useState(false);
  //     constructor(props) {
  //     super(props);
  //     this.state = {
  //       email:'',
  //       password:'',
  //       API_URL: 'https://backendd.loca.lt'
  //     };
  // }

  const {signIn} = React.useContext(AuthContext);
  console.log('signin', signIn);
  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <View style={{flex: 0.1}}></View>
        {/* <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreen')}} >
  <Text style={{paddingLeft:"80%", color:"#4266f5", fontWeight:'bold', fontSize:16 }}> Skip</Text>
  </TouchableOpacity> */}
      </View>
      <View style={{flex: 0.25, alignItems: 'center'}}>
        <Image
          style={styles.Image}
          source={require('./public/default.png')}></Image>
        <View>
          {showError ? (
            <View
              style={{
                marginTop: 15,
                marginBottom: 15,
                backgroundColor: '#C5C6D0',
                width: 300,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'red'}}>
                Email OR Password is incorrect!!!
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginTop: 15,
                marginBottom: 15,
                backgroundColor: '#ffcbd1',
                width: 300,
                alignItems: 'center',
              }}></View>
          )}
        </View>
        <View style={{marginBottom: 20}}>
          <View style={styles.container2}>
            <View style={styles.labelContainer}>
              <Text> Email </Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={useremail => {
                setEmail(useremail);
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={styles.container3}>
            <View style={styles.labelContainer}>
              <Text> Password </Text>
            </View>

            <TextInput
              style={styles.input}
              onChangeText={credential => {
                setPassword(credential);
              }}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={{paddingLeft: '40%', flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              navigation.navigate('ForgetPassword');
            }}>
            <Text style={{fontSize: 12, color: 'black'}}>Forgot Password</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              style={{backgroundColor: 'white'}}
            />
          </TouchableOpacity>
          {/* <View style={{flex:0.1}}>
        <IconButton icon={'arrow-right'}/>
        </View> */}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            signIn({email, password, setError});
          }}>
          <Text style={styles.buttonText}> LOGIN</Text>
        </TouchableOpacity>
        {/* <Text style={{color:'#4266f5', fontWeight:'bold'}}> Register Now</Text> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginTop: 10}}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{color: '#4266f5', fontWeight: 'bold', marginTop: 10}}>
              {' '}
              SignUp{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
