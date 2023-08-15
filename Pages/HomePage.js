import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DefaultButton from '../Components/DefaultButton';

const HomePage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.btnGroup} >
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('SignIn')} >
                    <DefaultButton text={'Login'} dark={false} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('SignUp')} >
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
    btnGroup:{
        position:'absolute',
        bottom:10,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    btn:{
        height:50
    }
})

export default HomePage;