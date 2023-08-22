import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Slider from "@react-native-community/slider";
// import { PieChart} from 'react-native-svg-charts'
// import Pie from 'react-native-pie';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';

const SamplePage = () => {
    const data = [
        {
            key: 1,
            value: 50,
            svg: { fill: 'orange' },
        },
        {
            key: 2,
            value: 50,
            svg: { fill: 'blue' }
        },
    ]
    const [value, setValue] = useState(80);
    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);
    return (
        <LinearGradient
            colors={['#b668f3', '#d2e8f5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.header} >
                <Text style={{ fontSize: 17, color: 'white' }} >Dashboard</Text>
                <Image style={{ width: 50, aspectRatio: 1, borderRadius: 30 }} source={{ uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000' }} />
            </View>
            <View style={{ marginBottom: 20 }} >
                <Text style={[styles.welcometxt]} >Hello</Text>
                <Text style={[styles.welcometxt]} >{'User Name'}</Text>
            </View>
            <View style={{ paddingHorizontal: 17 }} >
                <LinearGradient
                    colors={['#e1cdfb', '#c797f7']}
                    style={styles.card}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.taskInfo, { width: '70%' }]} >
                            <Text style={[{ color: 'purple', marginBottom: 10 }]} >Today Task</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 12 }} >
                                <Text style={{ marginRight: 10, backgroundColor: '#674fa3', color: 'white', paddingHorizontal: 5, paddingVertical: 1, borderRadius: 7 }} >{'4/4'}</Text>
                                <Text style={{ color: 'purple', opacity: 0.6 }} >task done</Text>
                            </View>
                            <Text style={{ marginBottom: 13, color: '#674fa3', opacity: 0.8 }} >{'You have done your 3 today task 1 left'}</Text>
                            <TouchableOpacity style={{ backgroundColor: '#674fa3', paddingHorizontal: 13, paddingVertical: 5, alignSelf: 'flex-start', borderRadius: 25 }} >
                                <Text style={{ color: 'white' }} >All Task</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.taskStatus, { position: 'relative' }]} >
                            {/* <View style={{ width: 30, height:20, backgroundColor: 'rgba(0,0,0,1)', position: 'absolute', top:-7,left:-10 }} ></View> */}
                            <Text>{'100%'}</Text>
                        </View>
                    </View>
                </LinearGradient>
                {/* </View> */}
                <View style={[styles.week, { marginVertical: 15, position:'relative'}]} >
                    <Text style={{ fontSize: 18, color: 'white', marginBottom: 20 }} >This week collection</Text>
                    <Slider
                        minimumTrackTintColor="#674fa3"
                        maximumTrackTintColor="white"
                        thumbTintColor="#674fa3"
                        minimumValue={0}
                        maximumValue={100}
                        value={value}
                        // onValueChange={(e) => setValue(80)}
                        style={{ transform: [{ scale: 1.1 }] }}
                    />
                    <Text style={{color:'white', backgroundColor:'#674fa3', position:'absolute', paddingHorizontal:7, paddingVertical:3, borderRadius:7, top:18, right:30 }} >$13000.75</Text>
                </View>
                <View style={{ marginVertical: 25 }} >
                    <DropDownPicker
                        items={[
                            { label: "Car", value: "car" },
                            { label: "Bus", value: "bus" },
                            { label: "bike", value: "bike" },
                        ]}
                        defaultValue={selectedValue}
                        value={selectedValue}
                        setValue={(e) => setSelectedValue(e())}
                        placeholder='Select vechicle'
                        open={open}
                        setOpen={() => setOpen(!open)}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: "#fafafa" }}
                        itemStyle={{
                            justifyContent: "flex-start",
                        }}
                        dropDownStyle={{ backgroundColor: "#fafafa" }}
                        onChangeItem={(item) => setSelectedValue(item.value)}
                    />
                </View>
                <View>
                    <Text style={{ color: 'white', fontSize: 15, marginVertical: 6 }} >Last transaction with</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={{ width: 50, aspectRatio: 1, textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#674fa3', borderRadius: 30, color: 'white', fontSize: 20, fontWeight: '500', marginRight: 12 }} >K</Text>
                        <Text style={{ width: 50, aspectRatio: 1, textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#674fa3', borderRadius: 30, color: 'white', fontSize: 20, fontWeight: '500', marginRight: 12 }} >A</Text>
                        <Text style={{ width: 50, aspectRatio: 1, textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#674fa3', borderRadius: 30, color: 'white', fontSize: 20, fontWeight: '500', marginRight: 12 }} >R</Text>
                        <Text style={{ width: 50, aspectRatio: 1, textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#674fa3', borderRadius: 30, color: 'white', fontSize: 20, fontWeight: '500', marginRight: 12 }} >W</Text>
                        <Text style={{ width: 50, aspectRatio: 1, textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#674fa3', borderRadius: 30, color: 'white', fontSize: 20, fontWeight: '500', marginRight: 12 }} >V</Text>
                    </View>
                </View>
                {/* <Pie  /> */}
            </View>
            {/* </View> */}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b668f3',
        // backgroundColor: '#d2e8f5',
        flex: 1,
        padding: 17
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    welcometxt: {
        color: 'white',
        fontSize: 25,
    },
    card: {
        padding: 17,
        // marginHorizontal: 17,
        borderRadius: 20,
        marginBottom: 20
    },
    taskInfo: {

    },
    taskStatus: {
        width: 70,
        aspectRatio: 1,
        borderWidth: 7,
        borderRadius: 40,
        borderColor: '#674fa3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    week: {

    },
    color: {
        color: 'white'
    }
})

export default SamplePage;