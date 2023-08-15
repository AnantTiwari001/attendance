import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const DefaultButton = ({ text,dark }) => {
    return (
        <View style={[styles.container, dark ? (styles.darkContainer) : (null)]} >
            <Text style={[styles.text, dark ? (styles.darkText) : (null)]} >{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: 'white',
        backgroundColor: '#b5c5ccf0',
        height:'100%',
        justifyContent:'center'
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        color: 'white',
        fontWeight: 500,
    },
    darkContainer: {
        backgroundColor: 'white',

    },
    darkText: {
        color: 'black'
    }
})

export default DefaultButton;