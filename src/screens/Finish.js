import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfettiCannon from 'react-native-confetti-cannon'
import {  View, StyleSheet, Image, Text, FlatList } from 'react-native'
import { checksSolvedBord, sendBoard } from '../store/action.js'
import Button from 'react-native-flat-button'
import { Card } from 'react-native-shadow-cards';

export default function Finish({route, navigation}) {
  const dispatch = useDispatch()
  const { username } = route.params
  const { leaderBoard } = useSelector(state => state)

  const shortUser  = leaderBoard.sort((a, b) => a.times - b.times);
  

  function getTime(times) {
    const hours = Math.floor( times / 3600 )
    const minutes = Math.round((times % 3600 ) / 60)
    const seconds = (times % 3600) % 60

    return `${hours} hours ${minutes} minutes ${seconds} seconds`
  }


  useEffect(() => {
    dispatch(checksSolvedBord(''))
    dispatch(sendBoard([]))
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text>Username: { item.username }</Text>
        <Text>Level: { item.difficulty }</Text>
        <Text>Times: { getTime(item.times)}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems:'center' , justifyContent: 'center', marginBottom: 30, marginTop: 20}}>
        <Text style={{ fontSize:15, }}> Good Luck { username }</Text>
        <Text style={{ fontSize: 15, color: '#e9896a'}}> Your suGoku board solved </Text>
      </View>
      <Image source={{ uri: 'https://cdn.dribbble.com/users/731566/screenshots/3187347/winner.gif'}} style={{width: 250, height: 250, alignSelf: 'center'}} />
      <Button
          type="positive"
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate('Home') }
        >
          Back Home
        </Button>
        <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 20, textShadowColor: 'white'}}> LeaderBoard </Text>
      <FlatList
        data={ shortUser }
        renderItem={ renderItem }
        keyExtractor={(_, i)=> i.toString()}
      />
      <ConfettiCannon count={200} origin={{x: -20, y: 0}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 ,
    flexDirection: 'column' 
  },
  buttonContainer: {
    height: 35,
    marginVertical: 5,
    marginRight: 100,
    marginLeft: 100
  },
  card: {
    padding: 10, 
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'stretch',
    borderColor: 'black',
    borderBottomWidth: 3
  }
})

