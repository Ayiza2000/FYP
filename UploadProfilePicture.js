import * as React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles/styles.js';
import {launchImageLibrary} from 'react-native-image-picker';
import storage, {firebase} from '@react-native-firebase/storage';
import AuthContext from './Auth.js';

export default function UploadProfilePicture({navigation, route}) {
  const {moveToHome} = React.useContext(AuthContext);
  console.log(route);
  const [image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [email, setEmail] = useState(route.params.Email);
  const [loader, setLoader] = useState(false);
  const secondaryStorageBucket = firebase
    .app()
    .storage('gs://contently-359109.appspot.com');
  return (
    <View style={{flex: 1}}>
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#0000ff'} size="large" />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{marginBottom: 40}}>
            <Image
              style={{
                width: 190,
                height: 190,
                borderRadius: 190 / 2,
                alignItems: 'center',
              }}
              source={{
                uri: image,
              }}
            />
          </View>
          <View>
            <View style={{marginBottom: 5}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  launchImageLibrary({
                    selectionLimit: 1,
                    mediaType: 'photo',
                    includeBase64: false,
                  })
                    .then(image => {
                      setImage(image.assets[0].uri);
                    })
                    .catch(e => {
                      console.log(e);
                    });
                }}>
                <Text style={styles.buttonText}> Upload Profile Picture</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                setLoader(true);
                console.log(email);
                await secondaryStorageBucket.ref(email).putFile(image);
                const uri = await secondaryStorageBucket
                  .ref(email)
                  .getDownloadURL();
                console.log('uri', uri);

                moveToHome({uri, email});
              }}>
              <Text style={styles.buttonText}> Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
