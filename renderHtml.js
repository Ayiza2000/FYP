import React, { useEffect, useState,useRef } from 'react';
import {CheckBox, useWindowDimensions,View,Text ,ActivityIndicator,FlatList} from 'react-native';
import RenderHtml from 'react-native-render-html';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from 'react-native-paper';
import Dialog from "react-native-dialog";
import { useIsFocused } from '@react-navigation/native'
import url from "./Backend";
import storage, { firebase } from '@react-native-firebase/storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ScrollView,Share,alert
  } from "react-native";
import { TouchableOpacity } from 'react-native';
 
 const secondaryStorageBucket=firebase.app().storage('gs://contently-359109.appspot.com');

 const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    color: 'gray',
    
  },
  p:{
    fontSize:'16px',
  fontFamily:'Serif'
  },
div:{
  whiteSpace: 'normal',
  color: 'black',
  fontSize:'16px',
  fontFamily:'Times New Roman'
}
  ,
  a: {
    color: 'green'
  },
  img:{
    height:'200px',
    width:'390px',
    
  }
}

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true
    }
  };

  const WebDisplay = React.memo(function WebDisplay({html}) {
    const {width: contentWidth} = useWindowDimensions();

    console.log('html of article',{html})
    return (
      <RenderHtml
        contentWidth={contentWidth}
        source={{html}}
        renderersProps={renderersProps}
        tagsStyles={tagsStyles}
      />
    );
  });

export default  function Html({navigation,route}) {
  const isFocused = useIsFocused();


  const incViewCount= route.params.incViewCount==false?false:true
  const [isLike,setIsLike]=useState(false)
  const [haveLiked, sethaveLiked]=useState(true)
  const [loader,setLoader]=useState(false)
  const [count,setCount]=useState(0)
  const [selectedIndex,setSelectedIndex]=useState(0)
  const [visible, setVisible] = useState(false);
  const [listName,setListName]=useState('')
  const [isRefresh,setIsRefresh]=useState(false)
  const [Data,setData]=useState()
  const [selectedList,setSelectedList]=useState('')


  useEffect(
    ()=>{
      if(incViewCount==true){
      fetch(`${url}/addView`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:route.params.email, articleid:route.params.articleid} )
    }).then( async res=>{
    try{
      console.log(res)
    console.log('here78')
    const response=await res.json()
    
    if(res.status==200){
        console.log('like added',response)
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
    ).catch((e)=>{console.log(e)})}
    
    
    },[isFocused]
  )
  const handleDelete = () => {
    setVisible(false);
  };

  const handleSave = () => {

    fetch(`${url}/ReadingLists`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
  
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:route.params.email,listName} )
  }).then( async res=>{
  try{
    console.log(res)
  console.log('here78')
  const response=await res.json()
  
  if(res.status==200){
      console.log('responses',response)
      setVisible(false);
      setIsRefresh(true)
    

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




  const refRBSheet = useRef();

    console.log('route',route.params.hideLike)
    const [hideLike,showLike]=useState(route.params.hideLike==undefined ?true:false)
    console.log('LIKE ',hideLike)
    console.log('Articleid',route.params.articleid)
    const source = route.params.text
//  if (route.params.hideLike!=="undefined"){
//   showLike(false)
//  }
  

      const onPress = (index) => {
        setSelectedIndex(index)
      };
      useEffect(()=>{
        fetch(`${url}/getReadingList`,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
      
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:route.params.email} )
      }).then( async res=>{
      try{
        console.log(res)
      console.log('here78')
      const response=await res.json()
      
      if(res.status==200){
          console.log('responses',response)
           setData(response)
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
      
      
        navigation.setOptions({


          headerTitle: ()=>(
            <View >
          <Text style={{fontWeight:'bold',maxWidth:250,color:'black',fontSize:16,maxHeight:70,paddingTop:10}}>{route.params.title}</Text>
          </View>), 


          headerRight: () => (
            <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons name='bookmark-multiple' style={{paddingRight:10}} color={'#312921'} size={20}  onPress={()=>{

               
           
              
               refRBSheet.current.open()


            }}/>

            <MaterialCommunityIcons name='share-variant' style={{paddingRight:10}} color={'#312921'} size={20} onPress={async()=>{
              setLoader(true)
              let options = {
                html: route.params.text,
                fileName: route.params.articleid,
                // directory:   await secondaryStorageBucket.ref(route.params.articleid).putFile(this.state.link)
                directory:'Documents',
          
              };
              console.log('Creating pdf',route.params.articleid)
              
                    let file = await RNHTMLtoPDF.convert(options)
                    await secondaryStorageBucket.ref(route.params.articleid).putFile(file.filePath)
                    let downloadUrl=await secondaryStorageBucket.ref(route.params.articleid).getDownloadURL()
                    setLoader(false)
               console.log('pdf url',downloadUrl)
              try {
                const result = await Share.share({
                  message:
                    'click here to download the article '+downloadUrl,
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                    // console.log('here')
                    // let file = await RNHTMLtoPDF.convert(options)
                    // await secondaryStorageBucket.ref(route.params.articleid).putFile(file.filePath)
                    // let downloadUrl=await secondaryStorageBucket.ref(route.params.articleid).getDownloadURL()

                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                alert(error.message);
              }
    
            }}/>
            </View>
            ),
        });
        









      },[isRefresh])

useEffect(()=>{


console.log('here in use effect')

  fetch(`${url}/isLiked`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({articleid:route.params.articleid, email:route.params.email} )
}).then( async res=>{
try{
  console.log(res)
console.log('here78')
const response=await res.json()

if(res.status==202){
  setIsLike(true)
sethaveLiked(false)




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




fetch(`${url}/countLikes`,{
  method: 'POST',
  headers: {
    Accept: 'application/json',

      'Content-Type': 'application/json'
  },
  body: JSON.stringify({articleid:route.params.articleid} )
}).then( async res=>{
try{
console.log(res)
console.log('here78')
const response=await res.json()

if(res.status==200){
  console.log('responses',response.count)
  setCount (response.count)
//   Data.push(response)

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









})






  const { width } = useWindowDimensions();

  return (
    <ScrollView style={{backgroundColor:'white',flex:0.9}}>
      {loader ? <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', marginTop:'50%'}}>
    <ActivityIndicator  color={'#0000ff'}  size="large" />
    <Text> Preparing to share...</Text>
  </View>: 
  <View style={{backgroundColor:'white',marginVertical:'2%',marginHorizontal:'2%'}} >
  <WebDisplay html={source} />

{/* <RenderHtml
  contentWidth={width}
  source={source}
  renderersProps={ renderersProps}
/> */}
<View style={{flexDirection:'row',marginLeft:10}}>
  { hideLike?
<MaterialCommunityIcons name='hand-clap'  color={isLike?'blue':'#312921'} size={24} onPress={()=>{
  
  console.log('email',route.params.email)
  console.log('articleid',route.params.articleid)
  // if(isLike==false){
    console.log('isLike',isLike)
    console.log('HaveLike',haveLiked)

//   if(isLike==true){
// sethaveLiked(true)
//   }

      console.log('isLike2',isLike)
      console.log('HaveLike2',haveLiked)


  fetch(`${url}/likeArticle`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({articleid:route.params.articleid, email:route.params.email, haveLiked} )
}).then( async res=>{
try{
  console.log(res)
console.log('here78')
const response=await res.json()

if(res.status==200){
  setIsLike(true)
  sethaveLiked(false)

  fetch(`${url}/countLikes`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({articleid:route.params.articleid} )
}).then( async res=>{
try{
  console.log(res)
console.log('here78')
const response=await res.json()

if(res.status==200){
    console.log('responses',response.count)
    setCount (response.count)
//   Data.push(response)
 
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
else if(res.status==202){
setIsLike(false)
sethaveLiked(true)
fetch(`${url}/countLikes`,{
method: 'POST',
headers: {
  Accept: 'application/json',

    'Content-Type': 'application/json'
},
body: JSON.stringify({articleid:route.params.articleid} )
}).then( async res=>{
try{
console.log(res)
console.log('here78')
const response=await res.json()

if(res.status==200){
console.log('responses',response.count)
setCount (response.count)
//   Data.push(response)

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
else{
  console.log(response)
}
}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})



// }




}}/>: 
<MaterialCommunityIcons name='hand-clap'  color={'#D3D3D3'} size={24} />}
<Text style={{paddingRight:10}}>{count}</Text>
<MaterialCommunityIcons name='comment-multiple-outline' style={{paddingRight:10}} color={'#312921'} size={24}
onPress={()=>{
navigation.navigate('Reviews',{articleid:route.params.articleid})

}}
/>

</View>
</View> }
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
        <Dialog.Container visible={visible}>
            <Dialog.Title>Create List</Dialog.Title>
            <Dialog.Description>
              List Name
            </Dialog.Description>
            <Dialog.Input onChangeText={(text)=>{setListName(text)}}/>
            <Dialog.Button label="Save" onPress={handleSave} />          
              <Dialog.Button label="Cancel" onPress={handleDelete} />


          </Dialog.Container>
        </View>
        <View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity  onPress={()=>{
              setVisible(true)
            }}>
          <Text style={{fontSize:16,fontWeight:'bold',color:'#4266f5'}}>Create New List</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:'10%',fontSize:16,fontWeight:'bold',color:'black'}}>Select List</Text>
          <TouchableOpacity style={{marginLeft:'30%'}} onPress={()=>{
            // console.log('LIST',selectedList)
            fetch(`${url}/addToReadingList`,{
              method: 'POST',
              headers: {
                Accept: 'application/json',
          
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({articleid:route.params.articleid,listName:selectedList} )
          }).then( async res=>{
          try{
            console.log(res)
          console.log('here78')
          const response=await res.json()
          
          if(res.status==200){
              console.log('responses',response)
             setVisible(false)
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
          <Text style={{fontSize:16,fontWeight:'bold',color:'#4266f5'}}>Save</Text>
          </TouchableOpacity>
          </View>
          <FlatList data={Data}
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

        <Text style={{  marginLeft: 6,marginRight:6,marginTop:6}}>{item.listName}</Text>
      </View>
)

}
/>
        </View>
      </RBSheet>
    </ScrollView>
  );
}