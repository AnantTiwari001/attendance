import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image
} from "react-native";
import { Camera, CameraType} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import DefaultButton from "../Components/DefaultButton";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import db from '../firebase/database';
import storage from "../firebase/storage";
import auth from "../firebase/auth";


export default function SelfiePage() {
  useEffect(() => {
    getPermissions();
  }, [])
  let getPermissions = async () => {
    let status = (await requestForegroundPermissionsAsync()).status;
    console.log(status)
    if (status === 'granted') {
    } else {
      ToastAndroid.show("You need to enable location to continue", ToastAndroid.SHORT);
    }
    requestPermission();
    console.log(await getCurrentPositionAsync())
  }

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraItem = useRef();
  
  const date = new Date().toString();
  const imageRef = storageRef(storage, `attendance/${auth.currentUser.uid}/${date}`)
  const changeCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const clickPhoto = async () => {
    let takenPhoto = await cameraItem.current.takePictureAsync();
    console.log('file', takenPhoto);
    const uri = takenPhoto.uri;
    const asset= await MediaLibrary.createAssetAsync(uri);
    const imageBlob= new Blob([asset.uri],{
      type:'image/jpeg'
    })
    const location= await getCurrentPositionAsync()
    await uploadBytes(imageRef, imageBlob);
    const photoUrl = await getDownloadURL(imageRef);
    let finalObj = { imageUrl: photoUrl, dateTime: date, coord: { lat: location.coords.latitude, long: location.coords.longitude } }
    console.log('final Data:', finalObj);
    await setDoc(doc(db, "attendance", auth.currentUser.uid), finalObj)
  }
  return (
    <View style={styles.container}>
      <View style={styles.info} >
        <Text style={{ color: 'white', fontSize: 17 }} >Click Photo to continue</Text>
      </View>
      <Camera style={styles.cameraStyle} ref={cameraItem} type={type}  ></Camera>
      <View style={styles.bottomBtns} >
        <TouchableOpacity style={{ height: 40 }} onPress={changeCamera} >
          <DefaultButton text={'change'} dark={true} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.clickBtn} onPress={clickPhoto} >

        </TouchableOpacity>
        <TouchableOpacity style={[, { opacity: 1 }]} >
          <Image style={{ width: 100, height: 100 }} source={{ uri: 'https://st.depositphotos.com/2274151/3518/i/450/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg' }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  cameraStyle: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderWidth: 1,
  },
  button: {
    position: "absolute",
    bottom: 4,
  },
  clickBtn: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 40
  },
  info: {
    height: '10%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBtns: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
});
