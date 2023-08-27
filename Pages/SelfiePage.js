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
import { useDispatch, useSelector } from "react-redux";
import mainSlice from "../Redux/slice";


export default function SelfiePage() {

  const username= useSelector((state)=>state.username);
  const location= useSelector((state)=>state.latestData);

  const dispatch= useDispatch();

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
    dispatch(mainSlice.actions.addData(`${location.coords.latitude} ${location.coords.longitude}`))
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
        <Text style={{color:'white', fontSize:13}} >Logged in as: {username}</Text>
      </View>
      <Camera style={styles.cameraStyle} ref={cameraItem} type={type}  ></Camera>
      <View style={styles.bottomBtns} >
        <TouchableOpacity style={{ height: 40 }} onPress={changeCamera} >
          <DefaultButton text={'change'} dark={true} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.clickBtn} onPress={clickPhoto} >

        </TouchableOpacity>
        <TouchableOpacity style={[{ opacity: 1, width:110, height:90, justifyContent:'center', alignItems:'center'}]} >
          <Text style={{color:'white'}} >Recent Location: {location}</Text>
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
