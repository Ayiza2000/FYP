//back button error is bcz class functional component
//do we need to generate html on change text
import React, {useRef, useState, useEffect, useCallback} from 'react';
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
  ActivityIndicator,
  Image,
} from 'react-native';
import storage, {firebase} from '@react-native-firebase/storage';

import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImgToBase64 from 'react-native-image-base64';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import callGoogleVisionAsync from './helperFunctions.js';
import url from './Backend.js';
export default function Notepad({navigation, route}) {
  const richText = useRef();
  const [response, setResponse] = React.useState(null);
  const [descHTML, setDescHTML] = useState(
    route.params.text != undefined ? route.params.text : '',
  );
  const [showDescError, setShowDescError] = useState(false);
  const [count, setCount] = useState(0);

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState(
    route.params.title != undefined ? route.params.title : '',
  );
  const [loader, setLoader] = useState(false);
  const [errormsg, setErrorMessage] = useState('');
  const [image, setimage] = useState(
    route.params.image != undefined
      ? route.params.image
      : 'https://media.istockphoto.com/photos/dotted-grid-paper-background-texture-seamless-repeat-pattern-picture-id1320330053?b=1&k=20&m=1320330053&s=170667a&w=0&h=XisfN35UnuxAVP_sjq3ujbFDyWPurSfSTYd-Ll09Ncc=',
  );
  const secondaryStorageBucket = firebase
    .app()
    .storage('gs://contently-359109.appspot.com');

  useEffect(() => {
    // const url = `${url}/category`;
    navigation.setOptions({
      headerLeft: () => (
        <MaterialCommunityIcons
          name="arrow-left"
          style={{paddingRight: 10}}
          color={'#312921'}
          size={20}
          onPress={() => {
            Alert.alert('Save Article', 'Would you like to save it to draft?', [
              {
                text: 'No',
                onPress: () => navigation.navigate('UserProfile'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  console.log('in menu', descHTML);
                  // const descHtml=' '+descHTML
                  const replaceHTML = await descHTML
                    .replace(/<(.|\n)*?>/g, '')
                    .trim();
                  const replaceWhiteSpace = await replaceHTML
                    .replace(/&nbsp;/g, '')
                    .trim();
                  // const nodes = element.getElementsByTagName("img");

                  // console.log('nodes',nodes)
                  // console.log('strimage',strImage)
                  // console.log('whitespace', replaceWhiteSpace)
                  if (replaceWhiteSpace.length <= 0) {
                    setShowDescError(true);
                  } else {
                    fetch(`${url}/article`, {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',

                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        email: route.params.email,
                        title: title,
                        description: descHTML,
                        categoryid: value,
                        isPublish: false,
                        image: image,
                      }),
                    })
                      .then(async res => {
                        try {
                          console.log(res);

                          const response = await res.json();

                          if (res.status == 200) {
                            console.log('here1');
                            navigation.navigate('UserProfile', {
                              isupdate2: true,
                            });
                          } else {
                            setErrorMessage(response.message);
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
                },
              },
            ]);
          }}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          // style={styles.button}
          onPress={() => {
            console.log('Desc Html', descHTML);
            const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
            const replaceWhiteSpace = descHTML.replace(/&nbsp;/g, '').trim();
            console.log('replace space', replaceHTML);
            if (replaceWhiteSpace.length <= 0) {
              setShowDescError(true);
            } else {
              fetch(`${url}/article`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',

                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: route.params.email,
                  title: title,
                  description: replaceWhiteSpace,
                  categoryid: value,
                  isPublish: true,
                  image: image,
                  articleid: route.params.articleid,
                }),
              })
                .then(async res => {
                  try {
                    console.log(res);

                    const response = await res.json();

                    if (res.status == 200) {
                      console.log('Article saved at backend');
                      navigation.navigate('UserProfile', {
                        isupdate: true,
                        isupdate2: true,
                      });
                    } else if (res.status == 400) {
                      console.log(response);
                      setErrorMessage(response.message);
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
          }}>
          <Text style={{color: '#4266f5', fontWeight: 'bold'}}> SUBMIT</Text>
        </TouchableOpacity>
      ),
    });
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/category`);
        const json = await response.json();
        console.log(json.category);
        setItems(json.category);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [navigation, descHTML, value]);

  useEffect(() => {
    console.log('', descHTML);
  }, [descHTML]);

  const onPressAddImageToEditor = () => {
    console.log('button pressed2');
    launchImageLibrary(
      {
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
      }.then(image => {
        this.richText.insertImage(image);
      }),
    );
  };

  const submitContentHandle = () => {
    useCallback(() => {
      console.log('Desc Html', descHTML);
      const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
      const replaceWhiteSpace = descHTML.replace(/&nbsp;/g, '').trim();
      console.log('replace space', replaceHTML);
      if (replaceWhiteSpace.length <= 0) {
        setShowDescError(true);
      } else {
        fetch(`${url}/article`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',

            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: route.params.email,
            title: title,
            description: replaceWhiteSpace,
            categoryid: value,
            isPublish: true,
            image: image,
          }),
        })
          .then(async res => {
            try {
              console.log(res);

              const response = await res.json();

              if (res.status == 200) {
                console.log('Article saved at backend');
                navigation.navigate('UserProfile', {isupdate: true});
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
    }, [descHTML]);
  };
  DropDownPicker.setListMode('SCROLLVIEW');

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{flex: 1}}>
      {loader ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <ActivityIndicator color={'#0000ff'} size="large" />
          <Text> Preparing to share...</Text>
        </View>
      ) : (
        <ScrollView>
          <View>
            <View style={styles.container}>
              <Pressable onPress={() => richText.current?.dismissKeyboard()}>
                <Text style={{color: 'red'}}>{errormsg}</Text>
                <Text style={styles.headerStyle}>Title</Text>
                <TextInput
                  selectionColor={'black'}
                  style={styles.TitleBoxStyle}
                  defaultValue={
                    route.params.title != undefined ? route.params.title : ''
                  }
                  onChangeText={text => {
                    if (errormsg != '') {
                      setErrorMessage('');
                    }
                    setTitle(text);
                  }}
                />
                {/* <View style={styles.TitleBoxStyle}>
            <Text>{descHTML}</Text>
          
          </View> */}
                <Text style={styles.headerStyle}>Category</Text>

                <DropDownPicker
                  style={styles.DropdownBoxStyle}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  dropDownContainerStyle={styles.DropdownContainerStyle}
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
                <Text style={styles.headerStyle}>Content</Text>
              </Pressable>
              <View style={styles.richTextContainer}>
                <RichEditor
                  ref={richText}
                  initialContentHTML={
                    route.params.text != undefined ? route.params.text : ''
                  }
                  onChange={description => {
                    if (errormsg != '') {
                      setErrorMessage('');
                    }

                    setDescHTML(description);
                    console.log('deschtml ', descHTML);
                    setShowDescError(false);
                    setCount(description.split(' ').length);
                  }}
                  placeholder="Write your content here "
                  androidHardwareAccelerationDisabled={true}
                  style={styles.richTextEditorStyle}
                  useContainer={false}
                  containerStyle={{minHeight: 440}}
                />
                <RichToolbar
                  editor={richText}
                  selectedIconTint="white"
                  selectedButtonStyle={{backgroundColor: '#4266f5'}}
                  iconTint="#312921"
                  actions={[
                    actions.insertImage,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertLink,
                    actions.setStrikethrough,
                    actions.setUnderline,
                    actions.ImageToText,
                  ]}
                  iconMap={{
                    [actions.ImageToText]: () => (
                      <MaterialCommunityIcons
                        name="camera"
                        color={'#312921'}
                        size={20}
                        onPress={async () => {
                          console.log('Camera Opened');
                          try {
                            const granted = await PermissionsAndroid.request(
                              PermissionsAndroid.PERMISSIONS.CAMERA,
                              {
                                title: 'App Camera Permission',
                                message: 'App needs access to your camera ',
                                buttonNeutral: 'Ask Me Later',
                                buttonNegative: 'Cancel',
                                buttonPositive: 'OK',
                              },
                            );
                            if (
                              granted === PermissionsAndroid.RESULTS.GRANTED
                            ) {
                              console.log('Camera permission given');
                              await launchCamera({
                                saveToPhotos: true,
                                mediaType: 'photo',
                                includeBase64: true,
                              }).then(async image => {
                                if (!image.didCancel) {
                                  // console.log(image)
                                  const processingResult =
                                    await callGoogleVisionAsync(
                                      image.assets[0].base64,
                                    );
                                  // console.log(processingResult.text);

                                  {
                                    richText.current?.insertText(
                                      processingResult.text,
                                    );
                                  }
                                }
                              });
                            } else {
                              console.log('Camera permission denied');
                            }
                          } catch (err) {
                            console.warn(err);
                          }
                        }}
                      />
                    ),
                  }}
                  onPressAddImage={() => {
                    console.log('button pressed');
                    launchImageLibrary({
                      includeBase64: true,
                      maxHeight: 500,
                      cropping: true,
                    })
                      .then(async image => {
                        await secondaryStorageBucket
                          .ref(image.assets[0].uri)
                          .putFile(image.assets[0].uri);
                        const str = await secondaryStorageBucket
                          .ref(image.assets[0].uri)
                          .getDownloadURL();
                        setimage(str);
                        {
                          richText.current?.insertImage(str);
                        }
                      })
                      .catch(error => {
                        console.log(
                          'There has been a problem with your fetch operation: ' +
                            error,
                        );
                      });
                  }}
                  style={styles.richTextToolbarStyle}
                />
              </View>
            </View>
            <View style={{backgroundColor: '#dddddd'}}>
              <View
                style={{
                  backgroundColor: '#dddddd',
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginHorizontal: 20,
                }}>
                <Text>{count} Words </Text>
              </View>
              {showDescError && (
                <Text style={styles.errorTextStyle}>
                  Your content shouldn't be empty
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#dddddd',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },

  headerStyle: {
    fontSize: 16,
    color: '#312921',
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  TitleBoxStyle: {
    height: 40,
    width: 340,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#58CCED',
  },
  DropdownBoxStyle: {
    height: 40,
    width: 340,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#58CCED',
  },
  DropdownContainerStyle: {
    width: 340,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#58CCED',
  },
  richTextContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
    marginBottom: 0,
    zIndex: -5,
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#58CCED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: '#58CCED',
    borderColor: '#58CCED',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },

  errorTextStyle: {
    color: '#FF0000',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4266f5',
    textAlign: 'center',
    borderRadius: 30,
    // borderWidth:2,
    paddingTop: 5,
    height: 40,
    width: 200,
    marginLeft: 70,
    marginRight: 50,
    marginTop: 10,
    //  borderColor:'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  saveButtonStyle: {
    backgroundColor: '#c6c3b3',
    borderWidth: 1,
    borderColor: '#c6c3b3',
    borderRadius: 10,
    padding: 10,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#312921',
  },
});
