import React,{ Component,useState, useEffect,useContext }from "react";
import { View,Text ,StyleSheet,Image,FlatList,TouchableOpacity,Alert} from "react-native";
import { FAB, Portal, Provider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Articles from './Article';
import ReadingList from './ReadingList';
import url from "./Backend";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton, MD3Colors } from 'react-native-paper';
import { MMKVLoader } from "react-native-mmkv-storage";
import { useIsFocused } from '@react-navigation/native';
import Refresh from './isRefresh';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
//count on second profile doesnot update
const MMKV = new MMKVLoader().initialize();

const TopTab = createMaterialTopTabNavigator();
// const { setRefresh } = useContext(Refresh);
global.MyVar = false;

export  default class UserProfile extends React.Component{
// static contextType = Refresh
static contextType = Refresh;

constructor(props){
super(props)
this.state={
 state:{ open:false},
 open :this.state,
 email:props.route.params.email,
 firstName:'',
 lastName:'',
 Bio:'',
 image:'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
 username:'',
 message:'',
 articleTab:true,
 readingList:false,
 color:'black',
 Data:'',
 Data2:'',
 isupdate: false,
 ViewsCount:0,
 noFollower:0,
 noFollowing:0,
//  isFocused:this.props,
 refreshScreen:props.route.params.refreshScreen
}
this.onStateChange = this.onStateChange.bind(this);
}

onStateChange({open}){
  this.setState({open})
}

// DeleteArticle = (_id) =>{
// Alert.alert(
  
//   "Are you sure you want to delete this Article?",
//   [
//     { text: "Yes", onPress: () => {
     
//   fetch(`${url}/articles/deleteArticle`,{
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',

//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ Articleid:_id, email:this.state.email})
// }).then( async res=>{
// try{
//   console.log(res)

// const response=await res.json()

// if(res.status==200){
//   console.log("successfully deleted")
// }
// else if(res.status==400){

// }
// }
// catch(e){

//   console.log('There has been a problem with your fetch operation: ' + e.message);

// }
// }
// ).catch((e)=>{console.log(e)})




//     } },
//     {
//       text: "No",
//       onPress: () => console.log("Cancel Pressed"),
//       style: "cancel"
//     },
   
//   ]
// )};
render ()  {
  console.log(this.state.image)

  return (
  
<View style={{flex:1, backgroundColor:'white'}}>

 <View style={{flex:0.05,  paddingTop:'2%',paddingLeft:'85%'}}>
 
 
<IconButton
    icon="cog"
    size={24}
    onPress={() => {
      this.props.navigation.navigate('Settings')
    }}/>
     

</View>

<View style={{flex:0.15, flexDirection:'row',marginBottom:2}}>

<View style={{flex:0.3, alignItems:'center'}}>
<Image 
  source={{
    uri: this.state.image,
  }} 
  style={{width: 80, height: 80, borderRadius: 80/ 2}} 
/>

</View>
<View style={{flex:0.7 }}>
<Text style={{fontWeight:'bold', fontSize:18}}> {this.state.username} </Text>   
<TouchableOpacity
        style={styles.button}
        onPress={()=>{       this.props.navigation.navigate('EditProfile',{imageuri:this.state.image,username:this.state.username,email:this.state.email,fname:this.state.firstName,lname:this.state.lastName,bio:this.state.Bio})}}
      >
        <Text style={{marginTop:10,color:'white'}}>EDIT YOUR PROFILE</Text>
      </TouchableOpacity>
</View>
</View>
<View style={{flex:0.075, marginBottom:2}}>
<Text style={{marginLeft:10, color:'black',fontWeight:'bold' ,fontSize:16}}> {this.state.firstName} {this.state.lastName}</Text>
<Text style={{marginLeft:10, color:'black'}}> {this.state.Bio}</Text>
</View>
<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>
<View style={{flex:0.075, flexDirection:'row', paddingTop:20,marginBottom:2}}>
 <View style={{flex:0.33,alignItems:'center'}}>
 <TouchableOpacity>
<Text style={{color:'black',fontWeight:'bold',textAlign:'center'}}>{this.state.Data.length}</Text>
<Text >posts</Text></TouchableOpacity>

 </View>
<View style={{flex:0.33,alignItems:'center'}}>
<TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Followers')}}>
<Text style={{color:'black',fontWeight:'bold', textAlign:'center'}}>{this.state.noFollower}</Text>
<Text >followers</Text></TouchableOpacity>
</View>
<View style={{flex:0.33,alignItems:'center'}}>
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Following')}}>
<Text style={{color:'black',fontWeight:'bold', textAlign:'center'}}>{this.state.noFollowing}</Text>
<Text >followings</Text></TouchableOpacity>
</View>
</View>
<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    
  }}
/>
  <View style={{flexDirection:'row', flex:0.035,paddingTop:20,marginBottom:2}}>
  <View style={{flex:0.50,alignItems:'center'}}>
 <TouchableOpacity onPress={()=>{this.setState({articleTab:true,
readingList:false,
})}}>

 {this.state.articleTab ? <Text style={{color:'black'}}> ARTICLES</Text>
        : <Text style={{color:'grey'}}> ARTICLES</Text>
      }
</TouchableOpacity>

 </View>
<View style={{flex:0.50,alignItems:'center'}}>
<TouchableOpacity onPress={()=>{this.setState({articleTab:false,
readingList:true,
})}}>
{this.state.readingList ? <Text style={{color:'black'}}> DRAFT</Text>
        : <Text style={{color:'grey'}}> DRAFT</Text>
      }

</TouchableOpacity>
</View>

  </View>
  <View style={{flex:0.01}}>
  {this.state.articleTab ?   <View
  style={{
    borderBottomColor: 'blue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width:"50%",
 
}}
/>
        : <View
        style={{
          borderBottomColor: 'blue',
          borderBottomWidth: StyleSheet.hairlineWidth,
          width:"50%",
          marginLeft:"50%",
      }}
      />
      }
      </View> 
<View style={{flex:0.50, backgroundColor:'white'}}>



<View style={{flex:1}}>
<FlatList data={this.state.articleTab?this.state.Data:this.state.Data2}
//  keyExtractor={({item}) => item._id}

style={{height:250}}
renderItem={({item})=>(
  // console.log(item),
  // <View style={{paddingTop:3,paddingLeft:8}}>
    
 
  //   <View style={{flex:0.2,alignItems:'flex-end',paddingRight:15,marginBottom:2}}>

    <View> 
        {this.state.articleTab ?
// { item.block==?
<View>
  {item.block==false ?
  <TouchableOpacity onPress={()=>this.props.navigation.navigate('HTML',{text:item.description,hideLike:true,articleid:item._id,title:item.title,incViewCount:false})}>
  <View style={{marginTop:2,flex:0.2,marginTop:5}} >
    <View style={{alignItems:'flex-end'}}>
      
      <Menu>
<MenuTrigger>
<MaterialCommunityIcons name='dots-vertical' size={20} />
 </MenuTrigger>
 <MenuOptions style={{ backgroundColor:'white'}} optionsContainerStyle={{ width:100,paddingRight:10}}>
  <MenuOption style={{backgroundColor:'white'}}  text='Edit' onSelect={()=> this.props.navigation.navigate('Notepad',{email:this.state.email,articleid:item._id,text:item.description,title:item.title,image:item.image})}/>
  <MenuOption style={{backgroundColor:'white'}}  text='View Stats' onSelect={()=> {
   
  fetch(`${url}/returnViews`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({articleid:item._id} )
}).then( async res=>{
try{
const response=await res.json()

if(res.status==200){
 this.setState({ViewsCount:response.views})
 Alert.alert(" Number of view for your post is "+this.state.ViewsCount)

}
else{
  console.log(response)
}
}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})

  }}/>
 
 
  <MenuOption  text='Delete' onSelect={
    
    ()=>{
 Alert.alert(
  "Delete Article",
  "Are you sure you want to delete the article ?",
  [
    {
      text: "No",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Yes", onPress: () => {

      console.log('fetch call'+ item._id+'email'+this.state.email),
  fetch(`${url}/articles/deleteArticle`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Articleid:item._id, email:this.state.email})
}).then( async res=>{
try{
  console.log(res)

const response=await res.json()
console.log(response)

if(res.status==200){
  console.log("successfully deleted")
    // this.setState({articleTab ? isupdate:true: isupdate2:true})
this.state.articleTab?this.setState({isupdate:true}):this.setState({isupdate2:true})
}
else if(res.status==400){

}
}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})






    }}
  ]
)

    }
    // console.log('selected')



  } />
</MenuOptions>
</Menu>
</View>
<View style={{flexDirection:'row',flex:0.8,justifyContent:'center',marginLeft:10,marginTop:5,backgroundColor:'white'}}>
       <View style={{flex:0.8}}>

     <Text style={{color:"black",fontWeight:'bold',fontSize:14}}>{item.title}</Text>
     </View>
     <View style={{flex:0.2,marginRight:20}}>
     {/* <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.description}</Text> */}
     <Image 
  source={{
    uri: item.image,
  }} 
  style={{width: 80, height: 90}} 
/>
     </View>
</View>
<Text style={{fontSize:12,marginLeft:10}}>Published on {item.date}</Text>
<View
        style={{
     
          borderBottomWidth: StyleSheet.hairlineWidth,
         marginTop:4,
      }}
      />


 


</View>
 
</TouchableOpacity>
:
<TouchableOpacity>
<View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
  <MaterialCommunityIcons name='block-helper' size={14} color={'red'}/>
  <Text style={{color:'red'}}> Blocked</Text>
</View>
<View style={{flexDirection:'row',flex:1,justifyContent:'center',marginLeft:10,marginTop:5,backgroundColor:'white'}}>
       <View style={{flex:0.8}}>
     <Text style={{color:"black",fontWeight:'bold',fontSize:14}}>{item.title}</Text>
     </View>
     <View style={{flex:0.2,marginRight:20}}>
     {/* <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.description}</Text> */}
     <Image 
  source={{
    uri: item.image,
  }} 
  style={{width: 80, height: 90}} 
/>
     </View>
     </View>
     <Text style={{fontSize:12,marginLeft:10}}>Published on {item.date}</Text>
<View
        style={{
     
          borderBottomWidth: StyleSheet.hairlineWidth,
         marginTop:4,
      }}
      />


</TouchableOpacity>


    }
    </View>
: <TouchableOpacity onPress={()=> this.props.navigation.navigate('Notepad',{email:this.state.email,articleid:item._id,text:item.description,title:item.title,image:item.image})}>
 <View style={{marginTop:2,flex:0.2,marginTop:5}} >
    <View style={{alignItems:'flex-end'}}>
      
      <Menu>
<MenuTrigger>
<MaterialCommunityIcons name='dots-vertical' size={20} />
 </MenuTrigger>
 <MenuOptions style={{ backgroundColor:'white'}} optionsContainerStyle={{ width:80,paddingRight:10}}>
  <MenuOption  text='Delete' onSelect={
    
    ()=>{
 Alert.alert(
  "Delete Article",
  "Are you sure you want to delete the article ?",
  [
    {
      text: "No",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Yes", onPress: () => {

      console.log('fetch call'+ item._id+'email'+this.state.email),
  fetch(`${url}/articles/deleteArticle`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Articleid:item._id, email:this.state.email})
}).then( async res=>{
try{
  console.log(res)

const response=await res.json()
console.log(response)

if(res.status==200){
  console.log("successfully deleted")
    // this.setState({articleTab ? isupdate:true: isupdate2:true})
this.state.articleTab?this.setState({isupdate:true}):this.setState({isupdate2:true})
}
else if(res.status==400){

}
}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})






    }}
  ]
)

    }
    // console.log('selected')



  } />
</MenuOptions>
</Menu>
</View>
<View style={{flexDirection:'row',flex:0.8,justifyContent:'center',marginLeft:10,marginTop:5,backgroundColor:'white'}}>
       <View style={{flex:0.8}}>

     <Text style={{color:"black",fontWeight:'bold',fontSize:14}}>{item.title}</Text>
     </View>
     <View style={{flex:0.2,marginRight:20}}>
     {/* <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.description}</Text> */}
     <Image 
  source={{
    uri: item.image,
  }} 
  style={{width: 80, height: 90}} 
/>
     </View>
</View>
<Text style={{fontSize:12,marginLeft:10}}>Published on {item.date}</Text>
<View
        style={{
     
          borderBottomWidth: StyleSheet.hairlineWidth,
         marginTop:4,
      }}
      />


 


</View>
 
</TouchableOpacity>

}
</View>



 
)}

/>
</View>

</View>

<View style={{flex:0.1}}>
      <Provider >
        <Portal >
          <FAB.Group
            fabStyle={styles.fab}
            open={this.state.open}
            style={{backgroundColor:'white'}}
            icon={this.state.open ? 'minus' : 'pencil'}
            actions={[
              
              {
                icon: 'pen',
                label: 'Notepad',
                onPress: () => {
                  // this.setState({count:0})
                  this.props.navigation.navigate('Notepad',{email:this.state.email})},
              },
            ]}
            onStateChange={this.onStateChange}
            onPress={() => {
              if (this.state.open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
      </View>
      </View>
    );
  };
  
componentDidMount(){
  const { language, setLanguage } = this.context;

  console.log('PROPS',language)


  fetch(`${url}/getFollowers`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:this.state.email })
}).then( async res=>{
try{
  console.log(res)

const response=await res.json()

if(res.status==200){
  this.setState({noFollower:response.followercount,noFollowing:response.followingcount})
}

}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})


  fetch(`${url}/UserProfile`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:this.state.email })
    }).then( async res=>{
    try{
      console.log(res)
    
    const response=await res.json()
    
    if(res.status==200){
      console.log('imageurl',this.state.image)
      console.log('response',response)
      this.setState({message:''})
      this.setState({username:response.name})
      this.setState({firstName:response.fname})
      this.setState({lastName:response.lname})
      this.setState({Bio:response.bio})
      await MMKV.setStringAsync("image", response.image);

      this.setState({image:response.image})
      console.log('imageurl',this.state.image)
    }
    else if(res.status==401){
      this.setState({message:res.message})

    }
    }
    catch(e){
    
      console.log('There has been a problem with your fetch operation: ' + e.message);
    
    }
    }
    ).catch((e)=>{console.log(e)})


    fetch(`${url}/articles`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
  
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:this.state.email} )
  }).then( async res=>{
  try{
    console.log(res)
  console.log('here78')
  const response=await res.json()
  
  if(res.status==200){
      console.log('responses',response)
  //   Data.push(response)
  this.setState({Data:response})
  // setData(response)
  //   console.log('data',Data)
  //   setUpdate(true)

  }
  else{
    console.log(response)
  }
  }
  catch(e){
  
    console.log('There has been a problem with your fetch operation: ' + e.message);
  
  }
  }
  ).catch((e)=>{console.log(e)})

  
  fetch(`${url}/draft`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:this.state.email} )
}).then( async res=>{
try{
  console.log(res)
console.log('here78')
const response=await res.json()

if(res.status==200){
    console.log('responses',response)
//   Data.push(response)
this.setState({Data2:response})
// setData(response)
//   console.log('data',Data)
//   setUpdate(true)

}
else{
  console.log(response)
}
}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})

}
  componentDidUpdate(prevProps){
    // console.log('props',this.props.route.params.isupdate)
    // this.props.route.params.isupdate=false
if(global.MyVar==true){


  fetch(`${url}/getFollowers`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:this.state.email })
}).then( async res=>{
try{

const response=await res.json()

if(res.status==200){
  global.MyVar=false
    this.setState({noFollower:response.followercount,noFollowing:response.followingcount})
}

}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})

}

if((this.props.route.params.isupdate2==true) ){


  fetch(`${url}/draft`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:this.state.email} )
}).then( async res=>{
try{
  console.log(res)
console.log('here78')
const response=await res.json()

if(res.status==200){
 
    console.log('responses',response)
//   Data.push(response)
this.setState({Data2:response})
// this.setState({isupdate2:false})
// setData(response)
//   console.log('data',Data)
//   setUpdate(true)
if(this.props.route.params.isupdate2==true){
  this.props.route.params.isupdate2=false
}else{
this.setState({postnew:false})}
}
else{
  console.log(response)
}
}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})

}
    else if(this.state.isupdate==true || (this.props.route.params.isupdate==true)   ){

      console.log('isupdate',this.state.isupdate)


      fetch(`${url}/articles`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:this.state.email} )
    }).then( async res=>{
    try{
      console.log(res)
    console.log('here78')
    const response=await res.json()
    
    if(res.status==200){
     
        console.log('responses',response)
    //   Data.push(response)
    this.setState({Data:response})
    this.setState({isupdate:false})
    // setData(response)
    //   console.log('data',Data)
    //   setUpdate(true)
    if(this.props.route.params.isupdate==true){
      this.props.route.params.isupdate=false
    }else{
    this.setState({postnew:false})}
    }
    else{
      console.log(response)
    }
    }
    catch(e){
    
      console.log('There has been a problem with your fetch operation: ' + e.message);
    
    }
    }
    ).catch((e)=>{console.log(e)})


  
    }
    console.log('here22',this.props.route.params.image)
    if(this.props.route.params.image || this.props.route.params.username || this.props.route.params.bio ||this.props.route.params.firstName||this.props.route.params.lastName ){
      if(this.props.route.params.image!=this.state.image && this.props.route.params.image){
    console.log('here33')
this.setState({image:this.props.route.params.image})
  }
   if(this.props.route.params.username!=this.state.username&& this.props.route.params.username){
    console.log('here55')

    this.setState({username:this.props.route.params.username})
  }
  if(this.props.route.params.firstName!=this.state.firstName && this.props.route.params.firstName){
    console.log('here33')
this.setState({firstName:this.props.route.params.firstName})
  }
  if(this.props.route.params.lastName!=this.state.lastName && this.props.route.params.lastName){
    console.log('here33')
this.setState({lastName:this.props.route.params.lastName})
  }
  if(this.props.route.params.bio!=this.state.Bio && this.props.route.params.bio){
    console.log('here33')
this.setState({Bio:this.props.route.params.bio})
  }
  }

  }

 }



//  export default function(props) {
//   const isFocused = useIsFocused();

//   return <UserProfile {...props} isFocused={isFocused} />;
// }

 const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#4266f5',

        color:'white'
    },
    image: {
        marginVertical: 24,
        alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#4266f5',
      borderRadius:30,
      // borderWidth:2,
      height:40,
       width:200,
       marginRight:50,
       marginTop:10,
      //  borderColor:'blue',
       
  
    },
})