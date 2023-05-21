import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, ScrollView } from 'react-native';

export default function WishList(props) {
    const [wish,setWish]=useState([])
    useEffect(()=>{
        AsyncStorage.getItem("Wish").then(val=>{
            if(val){
                setWish(JSON.parse(val));
            }
        })
    },[])
return (
    <ScrollView style={styles.container}>
    <View style={{marginHorizontal:15,marginTop:10}}>

    {
        wish.reverse().map((item)=>{
            return(
                <View key={item} style={{marginBottom:10,height:50,backgroundColor:"#ccc",paddingLeft:10}}>
                    <Text>{item["from"]}-{'>'}{item["to"]}</Text>
                    <Text style={{marginTop:10}}>{item["amount"]}-{'>'}{item["amountTo"]}</Text>
                </View>
            )
        })
    }
    </View>
    </ScrollView>
  );
}
const styles= StyleSheet.create({
container: {
    flex:1,
    backgroundColor:"#fff"
}
});