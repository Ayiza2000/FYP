
import url from "./Backend";
import React, { useState, useEffect,useContext,useRef } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    TextInput,TouchableOpacity,
    Image,
  } from 'react-native';
  import RBSheet from "react-native-raw-bottom-sheet";
  import { RadioButton } from 'react-native-paper';

  import { useIsFocused } from '@react-navigation/native'
  import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

  import Refresh from './isRefresh';
  

import { styles } from "./styles/styles";
export default function OtherAuthors({navigation,route}){

  const refRBSheet = useRef();
  const DATA = [
    {
      id:0,
      data: 'I just donot like the article '
    },
    {
      id: 1,
      data: 'Hate speech or symbol',
    },
    {
      id: 2,
      data: 'Find content inappropriate',
    },
    {
      id: 3,
      data: 'False information',
    },
  ];

  const isFocused = useIsFocused();
  const [selectedList,setSelectedList]=useState('')
const [fname,setFname]=useState(route.params.fname)
const [lname,setLname]=useState(route.params.lname)
const [username,setUsername]=useState(route.params.username)
const [image,setImage]=useState(route.params.img)
const [data,setData]=useState('')
const [follow,setFollow]=useState(false)
const [showText,setText]=useState(false)
const [selectedIndex,setSelectedIndex]=useState(0)
const [articleid,setArticleId]=useState()
const[reason,setReason]=useState()
const [followers,setFollowers]=useState(route.params.noFollowers)
const[followings,setFollowings]=useState(route.params.noFollowing)
const onPress = (index) => {
  setSelectedIndex(index)
};
console.log('username',username)
useEffect(()=>{
  fetch(`${url}/isFollowed`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({otherAuthorEmail:route.params.searchAuthorMail,email:route.params.useremail} )
}).then( async res=>{
try{
  console.log(res)
console.log('here78')
const response=await res.json()
console.log('RESPONSE',response)
if(res.status==200){
  console.log('here')
  setFollow(true)

}
else if(res.status==202){
setFollow(false)
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
},[isFocused])

useEffect(()=>{
  navigation.setOptions({

    headerTitle: ()=>(
      <View >
    <Text style={{fontWeight:'bold',maxWidth:250,color:'black',fontSize:20,maxHeight:70}}>{route.params.username}</Text>
    </View>)
  })})
useEffect(() => {
    fetch(`${url}/articles`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:route.params.searchAuthorMail} )
    }).then( async res=>{
    try{
      console.log(res)
    console.log('here78')
    const response=await res.json()
    
    if(res.status==200){
        console.log('responses',response)
    setData(response)
  
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
  
  }, []);

return(

<View style={{flex:1,backgroundColor:'white'}}>

<View style={{flex:0.15, flexDirection:'row',marginBottom:2}}>

<View style={{flex:0.3, alignItems:'center'}}>
<Image 
  source={{
    uri: image,
  }} 
  style={{width: 80, height: 80, borderRadius: 80/ 2}} 
/>

</View>
<View style={{flex:0.7 ,alignItems:'center'}}>
<Text style={{fontWeight:'bold', fontSize:18}}>{username} </Text>   
{ follow?
<TouchableOpacity
        style={{   
       
        alignItems: 'center',backgroundColor: 'white', textAlign:'center',
        borderRadius:30,
        justifyContent:'center',
        borderWidth:2,
        borderColor:"#4266f5",
        marginTop:5,
        height:40,
         width:150,
         alignItems:'center'
         }}
        onPress={()=>{  

            fetch(`${url}/followAuthor`,{
              method: 'POST',
              headers: {
                Accept: 'application/json',
          
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({otherAuthorEmail:route.params.searchAuthorMail,email:route.params.useremail,
              hasFollowed:true
              } )
          }).then( async res=>{
          try{
            console.log(res)
          console.log('here78')
          const response=await res.json()
          
          if(res.status==200){
          global.MyVar=true
          setFollowers(followers-1)

                        setFollow(false) 
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
         
        
        }}
      >
        <Text style={{color:"#4266f5"}}>FOLLOWING</Text>
       
      </TouchableOpacity>
      :
      <TouchableOpacity
        style={{  
           alignItems: 'center',backgroundColor: '#4266f5', textAlign:'center',
        borderRadius:30,
        justifyContent:'center',
        borderWidth:2,
        borderColor:"#4266f5",
        marginTop:5,
        height:40,
         width:150,
         alignItems:'center'
         }}
        onPress={()=>{   
           fetch(`${url}/followAuthor`,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
      
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({otherAuthorEmail:route.params.searchAuthorMail,email:route.params.useremail,
          hasFollowed:false
          } )
      }).then( async res=>{
      try{
        console.log(res)
      console.log('here78')
      const response=await res.json()
      
      if(res.status==200){
        global.MyVar=true
        setFollowers(followers+1)
        setFollow(true) 
      }
      else{
        console.log(response)
      }
      }
      catch(e){
      
        console.log('There has been a problem with your fetch operation: ' + e.message);
      
      }
      }
      ).catch((e)=>{console.log(e)})   }}
      >
        <Text style={{color:"white"}}>FOLLOW</Text>
       
      </TouchableOpacity>
      }
</View>
</View>
<View style={{flex:0.075, marginBottom:2}}>
<Text style={{marginLeft:10, color:'black',fontWeight:'bold' ,fontSize:16}}> {fname} {lname}</Text>
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
<Text style={{color:'black',fontWeight:'bold',textAlign:'center'}}>{data.length}</Text>
<Text >posts</Text></TouchableOpacity>

 </View>
<View style={{flex:0.33,alignItems:'center'}}>
<TouchableOpacity>
<Text style={{color:'black',fontWeight:'bold', textAlign:'center'}}>{followers}</Text>
<Text >followers</Text></TouchableOpacity>
</View>
<View style={{flex:0.33,alignItems:'center'}}>
<TouchableOpacity>
<Text style={{color:'black',fontWeight:'bold', textAlign:'center'}}>{followings}</Text>
<Text >followings</Text></TouchableOpacity>
</View>
</View>
<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    
  }}
/>

<View>
</View>


<View style={{flex:0.75}}>
<View style={{flex:1}}>
  {data.length==0 ?
  <View style={{justifyContent:'center', alignItems:'center'}}> 
  <Text style={{color:'grey',paddingTop:20,justifyContent:'center'}}> Nothing posted yet...</Text>
  </View>
  :
<FlatList data={data}

style={{height:250}}
renderItem={({item})=>(
<View> 
 { item.block==false &&

  <TouchableOpacity onPress={()=>
  {navigation.navigate('HTML',{text:item.description, articleid:item._id,title:item.title})
  }
  }>
  <View style={{marginTop:2,flex:0.2,marginTop:5}} >
    <View style={{alignItems:'flex-end'}}>
      
   <Menu>
<MenuTrigger>
<MaterialCommunityIcons name='dots-vertical' size={20} />
 </MenuTrigger>
 <MenuOptions style={{ backgroundColor:'white'}} optionsContainerStyle={{ width:80,paddingRight:10}}>
  <MenuOption style={{backgroundColor:'white'}}  text='Report'  onSelect={()=>{
               refRBSheet.current.open()
               setArticleId(item._id)
               setReason(item.title)

  }} /> 

</MenuOptions>
</Menu> 
</View>
<View style={{flexDirection:'row',flex:0.8,justifyContent:'center',marginLeft:10,marginTop:5}}>
       <View style={{flex:0.8}}>
     <Text style={{color:"black",fontWeight:'bold',fontSize:14}}>{item.title}</Text>
     </View>
     <View style={{flex:0.2,marginRight:20}}>
     {/* <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.description}</Text> */}
     <Image 
  source={{
    uri: item.image,
  }} 
  style={{width: 80, height: 70}} 
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

}
</View>
</View>
<RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
  
        <View>
          <View style={{flexDirection:'row'}}>
           
          <Text style={{marginLeft:'25%',fontSize:16,fontWeight:'bold',color:'black'}}>Select Reason</Text>
          <TouchableOpacity style={{marginLeft:'30%'}} onPress={()=>{
            // console.log('LIST',selectedList)
            fetch(`${url}/adminInbox`,{
              method: 'POST',
              headers: {
                Accept: 'application/json',
          
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({email:route.params.useremail
              ,articleid:articleid,reason:DATA[selectedIndex].data
              } )
          }).then( async res=>{
          try{
            console.log(res)
          console.log('here78')
          const response=await res.json()
          
          if(res.status==200){
              console.log('responses',response)
             refRBSheet.current.close()

          // this.setState({Data:response})
        
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

            
          }}>
          <Text style={{fontSize:16,fontWeight:'bold',color:'#4266f5'}}>Report</Text>
          </TouchableOpacity>
          </View>
          <FlatList data={DATA}
style={{height:250}}
renderItem={({item, index})=>(
  <View style={{flexDirection: "row",marginBottom: 20}}>
        <RadioButton
      value={item.listName}
      status={selectedIndex==index?'checked':'unchecked'}
          style={{    alignSelf: "center",
        }}
        onPress={() => {onPress(index)
                      setSelectedList(item.listName)
                      console.log(selectedList)
        }}

        />

        <Text style={{  marginLeft: 6,marginRight:6,marginTop:6}}>{item.data}</Text>
      </View>
)

}
/>
        </View>
      </RBSheet>


</View>







)



}