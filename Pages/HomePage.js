import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DefaultButton from '../Components/DefaultButton';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from '../Redux/slice';

const HomePage = ({ navigation }) => {
    const username = useSelector((state) => state.username);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            {/* <View style={{ alignItems: 'center', marginTop: 50 }} >
                <Text style={{ fontSize: 23, }} >User: {username} </Text>
                <View style={{flexDirection:'row', width:280, justifyContent:'space-between', marginTop:10}} >
                    <Button title='add User' onPress={()=>dispatch(mainSlice.actions.addUser('sentProp'))} />
                    <Button title='add data' onPress={()=>)} />
                </View>
            </View> */}
            <View style={styles.btnGroup} >
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignIn')} >
                    <DefaultButton text={'Login'} dark={false} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignUp')} >
                    <DefaultButton text={'Sign Up'} dark={true} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#405be3',
        flex: 1
    },
    btnGroup: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btn: {
        height: 50
    }
})

export default HomePage;