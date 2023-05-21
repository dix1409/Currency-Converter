import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TextInput, FlatList, TouchableOpacity, ScrollView ,Dimensions} from 'react-native';
const {height, width} =Dimensions.get("screen")
export default function SelectCurrencies({route,navigation}) {
  const [data,setData]=useState(route.params.currencies)
  

return (
 <View style={styles.container}>
 <View style={{height:50,width:"90%",marginLeft:"auto",marginRight:"auto",marginTop:15,justifyContent:"center",backgroundColor:"#ccc",borderRadius:5}}> 

 <TextInput
placeholder='Enter Currency'
 style={{
  height:"100%",width:"100%",
  paddingLeft:5
 }}

 onChangeText={(text)=>{
  setData(Object.keys(route.params.currencies).filter(key=>route.params.currencies[key].includes(text)).reduce((res,key)=>(res[key]=route.params.currencies[key],res),{}))
  // console.log(obj)


 }}

 />

 </View>
 
 <ScrollView style={{
flex:1,
width:"90%",marginLeft:"auto",marginRight:"auto"
}}
showsVerticalScrollIndicator={false}
//  contentContainerStyle={{flex: 1}}
 >
  
  {Object.keys(data).map((item) =>{
    {/* console.log(item) */}
    return(
      <TouchableOpacity key={item} style={{marginTop:10,height:40,backgroundColor:"#ccc",paddingLeft:5,borderRadius:5,justifyContent:"center",}}
      onPress={()=>{
        if(route.params.val===1){
          navigation.navigate("Home",{
            val1:item
          })}
          else{
            navigation.navigate("Home",{
              val2:item
            })
          }
        
      }}
      >
      <Text>{item} - {data[item]}</Text>

      </TouchableOpacity>
    )
  })}
 </ScrollView>

 </View>
  );
}
const styles= StyleSheet.create({
container: {
  flex:1,
  backgroundColor:"white"
}
});