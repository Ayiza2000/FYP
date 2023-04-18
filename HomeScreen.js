import React,{ Component,} from "react";
import { View,Text,FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PushNotification from "react-native-push-notification";
import url from "./Backend.js";
import TrendingArticle from "./TrendingArticles";
const TopTab = createMaterialTopTabNavigator();
export default class Home extends Component{
    constructor(props){
        console.log('props',props.route.params.email)
        super(props)
        this.state={
            email:props.route.params.email,
            token:'',
        }
        this.pushNotification = this.pushNotification.bind(this);

    }
    pushNotification=()=>{



        console.log('parameter', this.state.email)
      PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: (token) =>{
             
              this.setState({token:token.token})
              console.log('statetoken',this.state.token)
              fetch(`${url}/NotificationToken`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
              
                      'Content-Type': 'application/json'
                  },
                body: JSON.stringify( {notificationtoken:this.state.token,email:this.state.email })
            
            })
            .then(async res => { 
                try {
                    const jsonRes = await res.json();
                    console.log(jsonRes)
                    if (res.status === 200) {
                            console.log('token saved to databases')
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
            },
          
            // (required) Called when a remote or local notification is opened or received
            onNotification: (notification) =>{
              console.log("NOTIFICATION:", notification);


              // process the notification here
          
              // required on iOS only 
            //   notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // Android only
            senderID: "634760302876",
            // iOS only
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
          });

        
    }



    componentDidMount(){
        this.pushNotification()
     
                  
    }


render(){
    return(
    <View style={{flex:1,backgroundColor:'white'}}>
       <View style={{flex:0.05,flexDirection:'row',marginTop:30}}>
        <View style={{flex:0.8}}>
            <Text style={{fontWeight:'bold',paddingLeft:"4%",fontSize:20}}>Home</Text>
        </View>
        <View style={{flex:0.2,alignItems:"flex-end",paddingRight:"4%"}}>
        <MaterialCommunityIcons name='bell' size={25} onPress={()=>{
         this.props.navigation.navigate('Notifications')
        }}/>

        </View>
       </View>
       <View style={{flex:0.95}}>

       <TopTab.Navigator >
  <TopTab.Screen name="Trending" component={TrendingArticle}/>
</TopTab.Navigator>
       </View>
    </View>)
}

}