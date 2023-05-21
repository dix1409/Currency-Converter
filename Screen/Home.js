import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Home({navigation,route}) {
  // ePvkci2Z1yZRPMySahlFhMCStoFN9WaI
  const [currencies,setCurrencies]=useState({})
  const [val1,setval1]=useState("INR")
  const[Val2,setVal2]=useState('USD')
  const[Number1,setNumber1]=useState(0)
  const[Number2,setNumber2]=useState(0)
  const getCurrencies=async()=>{
    try{

      fetch("https://openexchangerates.org/api/currencies.json").then(res=>res.json()).then(json=>{
        setCurrencies(json)
    AsyncStorage.setItem("currency",JSON.stringify(json));
    }).catch(err=>{
      AsyncStorage.getItem("currency").then(val=>{
        if(val==null){
          Alert.alert("Please Turn on Internet")
        }else{
          setCurrencies(JSON.parse(val));
          console.log(val);
        }
       })
    })
    }catch(e){
     AsyncStorage.getItem("currency").then(val=>{
      if(val==null){
        Alert.alert("Please Turn on Internet")
      }else{
        console.log(val);
      }
     })
    }
  }
  useEffect(()=>{
    getCurrencies()
  },[])

  useEffect(()=>{
    if(route.params?.val1)
    {
      setval1(route.params?.val1)
    }else if(route.params?.val2){
      setVal2(route.params?.val2)
    }
  },[route.params])
  return (
    
    <View style={styles.container}>
    <Text style={{marginLeft:"5%",marginTop:30}}>
        From
    </Text>
<View style={{justifyContent: 'center',flexDirection:"row",alignItems:"center",marginTop:10}}>
<View style={{
  width:"70%",
  height:50,
  backgroundColor:"#fafafa",
  borderWidth:1,
  borderRightWidth:0,
  borderTopLeftRadius:5,
  borderBottomLeftRadius:5
}}>

<TextInput
    placeholder='Enter Currency '
    style={{width:"100%",height:"100%",paddingLeft:5}}
    onChangeText={(text)=>{
      setNumber1(text)
    }}
    />
</View>
    <TouchableOpacity style={styles.button}
    onPress={()=>{
      navigation.navigate("Select",{
        currencies:currencies,
        val:1
      })
    }}
    >
        <Text>{val1}</Text>
    </TouchableOpacity>
   
</View>
 <Text style={{marginLeft:"5%",marginTop:30}}>
        To
    </Text>
    <View style={{justifyContent: 'center',flexDirection:"row",alignItems:"center",marginTop:10}}>
<View style={{
  width:"70%",
  height:50,
  backgroundColor:"#fafafa",
  borderWidth:1,
  borderRightWidth:0,
  borderTopLeftRadius:5,
  borderBottomLeftRadius:5,
  justifyContent:"center"
}}>

    <Text style={{paddingLeft:5}}>
      {Number2}
    </Text>
</View>
    <TouchableOpacity style={styles.button}
     onPress={()=>{
      navigation.navigate("Select",{
        currencies:currencies,
        val:2
      })
    }}
    >
        <Text>{Val2}</Text>
    </TouchableOpacity>
   
</View>
<View
style={{alignItems: 'center',
marginTop:45,

}}
>
<TouchableOpacity style={styles.btn2} onPress={()=>{
  var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: {
    apikey:"ePvkci2Z1yZRPMySahlFhMCStoFN9WaI"
  }
};
  fetch(`https://api.apilayer.com/fixer/convert?to=${Val2}&from=${val1}&amount=${Number1}`, requestOptions).then(response => response.json())
  .then(result => setNumber2(result.result.toString()))
  .catch(error => Alert.alert("Network error"));
}} >
    <Text style={{color:"white",textAlign:"center",fontSize:16,fontWeight:"bold"}}>Covert</Text>
</TouchableOpacity>

</View>

<View
style={{alignItems: 'center',
marginTop:15,

}}
>
<TouchableOpacity style={styles.btn2} onPress={()=>{
      if(Number1!==0){
        let wish=""
        AsyncStorage.getItem("Wish").then(val=>{
          if(val==null){
            AsyncStorage.setItem("Wish",JSON.stringify([{from:val1,to:Val2,amount:Number1,amountTo:Number2}]))
          }else{
            const obj=JSON.parse(val)
console.log(obj)
if(!obj?.includes({from:val1,to:Val2,amount:Number1,amountTo:Number2})){

obj.push({from:val1,to:Val2,amount:Number1,amountTo:Number2})
AsyncStorage.setItem("Wish",JSON.stringify(obj))
}
            // AsyncStorage.removeItem("Wish")
            
          }
        })
     
      }
    }}>
    <Text style={{color:"white",textAlign:"center",fontSize:16,fontWeight:"bold"}}  >Add to Wishlist</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.btn2,{marginTop:25}]} onPress={()=>navigation.navigate("Wish")} >
    <Text style={{color:"white",textAlign:"center",fontSize:16,fontWeight:"bold"}}   >Wishlist</Text>
</TouchableOpacity>
</View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
  },
  button:{
    width:"20%",
    height:50,
    borderWidth:1,
    borderColor: 'black',
    borderRadius:5,
    // marginTop:5,
    justifyContent: 'center',
    paddingLeft:5,
    borderLeftWidth:0,
    borderTopLeftRadius:0,
    borderBottomLeftRadius:0,
    backgroundColor:"#fafafa",
    alignItems:"center",
    justifyContent: 'center',
  },
  btn2:{
    width:"90%",
    height:50,
    borderRadius:10,
    marginTop:5,
    justifyContent: 'center',
    paddingLeft:5,
    backgroundColor:"rgba(232, 105, 49, 1)"
  }
});
