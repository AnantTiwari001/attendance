import { Text, View, StyleSheet,  TouchableOpacity, ToastAndroid } from "react-native";
import { useState } from "react";
import DefaultButton from "../Components/DefaultButton";
import Inputform from "../Components/Inputform";
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from "../firebase/auth";
import { useDispatch } from "react-redux";
import mainSlice from "../Redux/slice";

const SignInPage = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(mainSlice.actions.addUser(user.email))
        ToastAndroid.show("Login Success!", ToastAndroid.SHORT);
        navigation.navigate('home')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        ToastAndroid.show("login Failed!", ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.border}></View>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.desc}>Please sign in to continue</Text>
      </View>
      <View style={styles.form}>
        <Inputform
          title={"Email"}
          textInput={email}
          setFunction={(newText) => {
            setEmail(newText);
          }}
        />
        <Inputform
          title={"Password"}
          textInput={password}
          setFunction={(newText) => setPassword(newText)}
        />
        <Text style={styles.forgot} onPress={()=>console.log('currentUser here:',auth.currentUser)} >Forgot Password?</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <DefaultButton text={"Sign in"} dark={true} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#31bbff",
    padding: 35,
  },
  form: {
    marginBottom: 50,
  },
  forgot: {
    alignSelf: "flex-end",
    color: "#ce3bb4",
  },
  button: {
    alignSelf: "center",
    height:60
  },
  title: {
    fontSize: 32,
    color: "white",
    // fontWeight: 600,
  },
  desc: {
    opacity: 20,
    color: "#fffffff0",
  },
  textContainer: {
    position: "relative",
    paddingVertical: 5,
    marginVertical: 20,
  },
  border: {
    borderWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "25%",
    borderColor: "#ce3bb4",
  },
});

export default SignInPage;