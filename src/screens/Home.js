import React, { useState } from 'react'
import {  View, StyleSheet, TextInput, Alert, Image, Text } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import Button from 'react-native-flat-button'
import Toast from 'react-native-toast-message'



export default function Home({ navigation }) {
  const [username, setUsername] = useState('')
  const [difficulty, setdDificult] = useState('easy')
  const options = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' }
  ];

  return (
    <View style={styles.container}>
      <View>
        <View style={{alignSelf: 'center'}}>
          <Image 
            source={require('../../assets/Sugoku.png')}
            style={{ width: 120, height: 120 }} />
              <Text style={{ fontSize: 30, color: '#e9896a' }}> suGoku </Text>
        </View>
            <TextInput
              onChangeText={(value) => setUsername(value)} 
              focus={true}
              style={styles.textInput}
              placeholder="User Name" />
            <View style={{ alignSelf: 'center', paddingTop: 20 }}>
              <Text>Difficulty : </Text>
              <SwitchSelector style={{ width: 300, alignSelf: 'stretch', paddingTop: 2 }} options={options} initial={0} onPress={value => setdDificult(value)} />
            </View>
      </View>
      <View style={{ paddingTop: 8}}>
        <Button
            type="primary"
            onPress={() => {
                if(!username.length){
                  alert('please input username')
                } else {
                  navigation.navigate('Game', {  
                    username,
                    difficulty
                  })
                }
              }
            }
            containerStyle={styles.buttonContainer}
          >Play Game</Button>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  textInput: {
    borderBottomStartRadius: 20, 
    borderBottomEndRadius: 20,
    borderBottomColor: 'black',
    marginTop: 80, 
    height:50, 
    alignSelf: 'stretch', 
    fontSize: 20 
  },
 
  container: {
    padding: 35,
    justifyContent: 'space-between'
    },
  buttonContainer: {
    width: 200,
    height: 45,
    marginVertical: 50,
    alignSelf: 'center'
  }
    
});