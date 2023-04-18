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
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles/styles.js';
import AuthContext from './Auth.js';

export default function SignUp() {
  const navigation = useNavigation();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [Errormessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       firstName:'',
  //       lastName:'',
  //       email:'',
  //       phoneNumber:'',
  //       password:'',
  //       userName:'',
  //       API_URL:'https://backend.loca.lt'
  //     };
  // }

  // isLoggedIn=async(token)=>{
  //   fetch(`${this.state.API_URL}/Home`, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token,
  //     },
  // })
  // .then(async res => {
  //     try {
  //         const jsonRes = await res.json();
  //         console.log(jsonRes)
  //         if (res.status === 200) {
  //             this.props.navigation.navigate('HomeScreen')
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     };
  // })
  // .catch(err => {
  //     console.log(err);
  // });

  // }

  // submitForm=async()=> {
  //   //emulator 10.0.2.2
  //  fetch(`${this.state.API_URL}/register`,{
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',

  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({firstName:this.state.firstName, lastName:this.state.lastName,email:this.state.email,
  //       password:this.state.password } )
  // }).then( async res=>{
  // try{
  //   console.log(res)
  // const response=await res.json()
  // console.log(response)

  // if(res.status==200){
  //  this.isLoggedIn(response.token)
  // }
  // else{
  //   console.log(response)
  // }
  // }
  // catch(e){

  //   console.log('There has been a problem with your fetch operation: ' + e.message);

  // }
  // }
  // ).catch((e)=>{console.log(e)})
  //   // ()=>{this.props.navigation.navigate('LoginScreen')
  // }
  const {signUp} = React.useContext(AuthContext);

  return (
    <View style={styles.container4}>
      <View style={{justifyContent: 'center', flex: 1}}>
        <View
          style={{
            flex: 0.1,
            marginBottom: 15,
            marginTop: 30,
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              paddingLeft: 0,
              fontSize: 25,
              fontWeight: '400',
              marginLeft: 30,
            }}>
            Register Now
          </Text>
          {error ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                marginLeft: 30,
                backgroundColor: '#C5C6D0',
                marginRight: 30,
                color: 'red',
                marginBottom: 5,
              }}>
              {Errormessage}
            </Text>
          ) : (
            <Text
              style={{
                paddingLeft: 0,
                fontSize: 14,
                fontWeight: '400',
                marginLeft: 30,
              }}></Text>
          )}
        </View>
        <View style={{flex: 0.7, marginBottom: 40, alignItems: 'center'}}>
          <View style={{flex: 0.1, flexDirection: 'row', marginBottom: 20}}>
            <View style={styles.container3}>
              <View style={styles.labelContainer}>
                <Text> First Name </Text>
              </View>
              <TextInput
                style={styles.input2}
                onChangeText={name => {
                  setfirstName(name);
                }}
              />
            </View>
            <View style={styles.container3}>
              <View style={styles.labelContainer}>
                <Text> Last Name </Text>
              </View>
              <TextInput
                style={styles.input2}
                onChangeText={lname => {
                  setlastName(lname);
                }}
              />
            </View>
          </View>
          <View style={{flex: 0.6}}>
            <View style={styles.container5}>
              <View style={styles.labelContainer}>
                <Text style={{fontSize: 14}}> Email </Text>
              </View>
              <TextInput
                style={styles.input3}
                onChangeText={useremail => {
                  setEmail(useremail);
                }}
              />
            </View>
            {/* <View  style={styles.container5}>
      <View style={styles.labelContainer}>
      <Text> Phone Number </Text>
      </View>
        <TextInput
          style={styles.input3}
          onChangeText={(mobileNumber)=>{setPhoneNumber(mobileNumber)}}
        />
        </View> */}
            <View style={styles.container5}>
              <View style={styles.labelContainer}>
                <Text> Password </Text>
              </View>
              <TextInput
                style={styles.input3}
                secureTextEntry={true}
                onChangeText={credential => {
                  setPassword(credential);
                }}
              />
            </View>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  backgroundColor: '#4266f5',
                  textAlign: 'center',
                  borderRadius: 30,
                  justifyContent: 'center',
                  height: 40,
                  width: 200,
                  marginLeft: 70,
                  marginRight: 50,
                  marginTop: 5,
                }}
                onPress={() => {
                  signUp({
                    firstName,
                    email,
                    password,
                    phoneNumber,
                    lastName,
                    setErrorMessage,
                    setError,
                  });
                }}>
                <Text style={styles.buttonText}> REGISTER NOW</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginTop: 10, marginLeft: '10%'}}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#4266f5',
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('SignIn');
                    }}>
                    {' '}
                    Login{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
