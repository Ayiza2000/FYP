import * as React from 'react';
import {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Refresh from './isRefresh';
import ViewList from './viewList';
import Followers from './Follower';
import Login from './SignIn';
import Notepad from './Notepad';
import Home from './HomeScreen';
import {MMKVLoader} from 'react-native-mmkv-storage';
import AuthContext from './Auth';
import OtherAuthors from './OtherAuthors';
import url from './Backend';
import UserProfile from './UserProfile';
import EditYourProfile from './EditYourProfile';
import SettingsScreen from './Settings';
import Search from './Search';
import SignUp from './SignUp';
import {MenuProvider} from 'react-native-popup-menu';
import Html from './renderHtml';
import Comment from './Comment';
import Username from './Username';
import Notifications from './Notification';
import Followings from './Following';
import ForgetPassword from './ForgetPassword';
// import PushController from './PushController';
import Policies from './Policies';
import UploadProfilePicture from './UploadProfilePicture';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ReadingList from './ReadingList';
function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// const API_URL= 'http://192.168.18.6:3000' ;
const MMKV = new MMKVLoader().initialize();
function StackScreen(parameter) {
  console.log('parameter', parameter);
  console.log('email', parameter.route.params.email);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{email: parameter.route.params.email}}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        initialParams={{email: parameter.route.params.email}}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ReadingList"
        component={ReadingList}
        initialParams={{email: parameter.route.params.email}}
        options={{
          tabBarLabel: 'ReadingList',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="view-list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        initialParams={{
          email: parameter.route.params.email,
          refreshScreen: true,
        }}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App({navigation}) {
  const [email, setEmail] = useState('');

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            isSignUp: true,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'HOME':
          return {
            ...prevState,
            isSignUp: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isSignUp: false,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let useremail;
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await MMKV.getStringAsync('secure_token');
        useremail = await MMKV.getStringAsync('email');

        setEmail(useremail);
        console.log('USERRR', userToken);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        console.log(url);

        fetch(`${url}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',

            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: data.email, password: data.password}),
        })
          .then(async res => {
            try {
              console.log(res);

              const response = await res.json();

              if (res.status == 200) {
                console.log('TOKENNN', response.token);
                await MMKV.setStringAsync('secure_token', response.token);

                fetch(`${url}/Home`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': response.token,
                  },
                })
                  .then(async res => {
                    try {
                      const jsonRes = await res.json();
                      if (res.status === 200) {
                        console.log(response.token);
                        console.log('DATA', data);
                        await MMKV.setStringAsync('email', data.email);
                        console.log(
                          'EMAIL',
                          await MMKV.getStringAsync('email'),
                        );
                        setEmail(data.email);
                        dispatch({type: 'SIGN_IN', token: response.token});
                      }

                      console.log('json', jsonRes);
                    } catch (err) {
                      console.log('error', err);
                    }
                  })
                  .catch(err => {
                    console.log('error', err);
                  });
              } else {
                if (res.status === 400) {
                  data.setError(true);
                  console.log('data show error', data.showError);
                }
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
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      moveToHome: data => {
        fetch(`${url}/ProfilePicture`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',

            'Content-Type': 'application/json',
          },
          body: JSON.stringify({imageuri: data.uri, email: data.email}),
        })
          .then(async res => {
            try {
              console.log(res);

              const response = await res.json();

              if (res.status == 200) {
                dispatch({type: 'HOME'});
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
      },

      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        console.log(data);

        // fetch(`${API_URL}/register`,{
        fetch(`${url}/register`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',

            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
          }),
        })
          .then(async res => {
            try {
              console.log(res);

              const response = await res.json();
              console.log(response);

              if (res.status == 200) {
                await MMKV.setStringAsync('secure_token', response.token);
                fetch(`${url}/Home`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': response.token,
                  },
                })
                  .then(async res => {
                    try {
                      const jsonRes = await res.json();
                      if (res.status === 200) {
                        console.log(response.token);
                        setEmail(data.email);
                        await MMKV.setStringAsync('email', data.email);

                        dispatch({type: 'SIGN_UP', token: response.token});
                      }
                      console.log(jsonRes);
                    } catch (err) {
                      console.log(err);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                data.setError(true);
                data.setErrorMessage(response.message);
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
      },
    }),
    [],
  );

  return (
    <MenuProvider>
      <AuthContext.Provider value={authContext}>
        <Refresh.Provider value={false}>
          <NavigationContainer>
            <Stack.Navigator>
              {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Splash" component={SplashScreen} />
              ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <>
                  {/* <Stack.Screen name="Profile Picture" component={UploadProfilePicture} /> */}

                  <Stack.Screen
                    name="SignIn"
                    component={Login}
                    options={{
                      title: 'Sign in',
                      headerShown: false,
                      // When logging out, a pop animation feels intuitive
                      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                  />
                  <Stack.Screen
                    name="ForgetPassword"
                    component={ForgetPassword}
                    options={{
                      title: 'Forget Password',
                    }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    options={{headerShown: false}}
                    component={SignUp}
                  />
                </>
              ) : // User is signed in
              state.isSignUp == false ? (
                <>
                  <Stack.Screen
                    name="HomeScreen"
                    options={{headerShown: false}}
                    component={StackScreen}
                    initialParams={{email: email}}
                  />
                  <Stack.Screen name="Notepad" component={Notepad} />
                  <Stack.Screen
                    name="EditProfile"
                    component={EditYourProfile}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen name="Settings" component={SettingsScreen} />
                  <Stack.Screen
                    name="Reviews"
                    component={Comment}
                    initialParams={{email: email}}
                  />
                  <Stack.Screen
                    name="Authors"
                    component={OtherAuthors}
                    initialParams={{useremail: email}}
                  />
                  <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    initialParams={{email: email}}
                  />
                  <Stack.Screen
                    name="HTML"
                    component={Html}
                    initialParams={{email: email}}
                  />
                  <Stack.Screen
                    name="ViewList"
                    component={ViewList}
                    initialParams={{email: email}}
                  />
                  <Stack.Screen
                    name="Followers"
                    component={Followers}
                    initialParams={{email: email}}
                  />
                  <Stack.Screen
                    name="Following"
                    component={Followings}
                    initialParams={{email: email}}
                  />
                  <Stack.Screen name="PoliciesScreen" component={Policies} />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Username"
                    component={Username}
                    initialParams={{email: email}}
                  />
                  <Stack.Screen
                    name="Profile Picture"
                    component={UploadProfilePicture}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </Refresh.Provider>
      </AuthContext.Provider>
    </MenuProvider>
  );
}
