import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './Pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import SelfiePage from './Pages/SelfiePage';
import SamplePage from './Pages/SamplePage';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import mainSlice from './Redux/slice';



const store = configureStore({
  reducer: mainSlice.reducer,
})


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Provider store={store} >
        <MainPage />
      </Provider>
      {/* <SamplePage /> */}
    </NavigationContainer>
  );
};

const MainStack = createStackNavigator();

const MainPage = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }} >
      <MainStack.Screen name='Welcome' component={HomePage} />
      <MainStack.Screen name='SignIn' component={SignInPage} />
      <MainStack.Screen name='SignUp' component={SignUpPage} />
      <MainStack.Screen name='home' component={SelfiePage} />
    </MainStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
