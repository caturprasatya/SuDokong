import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { StyleSheet, FlatList, SafeAreaView, Text, Alert, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSudoku, solveSudoku, validateSudoku, checksSolvedBord, solveBoard, inputUser } from '../store/action.js'
import Input from '../components/Input.js'
import Button from 'react-native-flat-button'

const { width } = Dimensions.get('window')

export default function Board({ route, navigation }) {
  const { username, difficulty } = route.params;
  const { data, dataCheck, checkSolved, leaderBoard } = useSelector(state => state)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  
  useEffect(() => {
    let interval = setInterval(() => {
      setCount(lastTimerCount => {
          return lastTimerCount + 1
      })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    dispatch(fetchSudoku(difficulty))
  }, [dispatch])

  useEffect(() => {
    if (checkSolved === 'solved') {
      dispatch(solveBoard(false))
      dispatch(checksSolvedBord(''))
      dispatch(inputUser({ username, difficulty, times: count }))
      navigation.replace('Finish', { username })
    } else if (checkSolved === 'unsolved' || checkSolved === 'broken') {
      alert(`
      Please check your sudoku again!!
      status ${checkSolved}
      `)
    }
  }, [checkSolved])
  
  function solvedBoard () {
    dispatch(solveSudoku(dataCheck))
  }

  function validateBoard () {
    dispatch(validateSudoku())
  }

  const renderItem  = ({ item, index })  => {
    return (
      <View 
      style={ styles.containerInput }>
      {
        item.map((num, i) =>
          <Input
          key={ i }
          data={ { num, i } }
          indexRow={ index }
          />
        )
      }
      </View>
      )

  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.tagline}> Welcome to suGoku </Text>
          <View>
            <Text style={styles.user}> { username } </Text>
            <Text> Level:  { difficulty } </Text>
            <View>
            </View>
          </View>
        </View>
      {
        <FlatList
          data={ data }
          style={ styles.containerBoard }
          renderItem={ renderItem }
          keyExtractor={(_ , index)=> index.toString()}
        />
      }

      <View style={styles.footer}>
      <Button
          type="positive"
          containerStyle={styles.buttonContainer}
          onPress={ validateBoard }
        >
          Validate
        </Button>
        <Button
            type="warn"
            containerStyle={styles.buttonContainer}
            onPress={ solvedBoard }
          >
            Solve
          </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flex: 1,
    backgroundColor: '#f7f3e9',
    justifyContent: 'space-between'
  },
  containerBoard: {
    flex: 1,
    margin: 1
  },
  containerInput: {
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#4D243D',
    margin: 1,
    padding: 2,
    width: Math.floor(width / 9) - 3.9,
    height: 40,
    alignContent: 'center',
    borderRadius: 5,
    fontSize: 25,
    color: 'white'
  },
  buttonContainer: {
    width: width / 2.5,
    height: 35,
    marginVertical: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    backgroundColor: '#5eaaa8', 
    height: 70, 
    padding:10, 
    borderTopStartRadius: 20, 
    borderTopEndRadius: 20, 
    shadowOpacity: 0.75,
    shadowRadius: 7,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 3 }
  },
  header: {
    marginTop: 0,
    marginBottom: 12,
    height: 70,
    backgroundColor: '#5eaaa8',
    borderBottomStartRadius: 20, 
    borderBottomEndRadius: 20,   
  },
  tagline: { 
    alignSelf: 'center', 
    margin: 0, 
    fontSize: 23, 
    padding: 0 
  },
  user: {
    width: 120,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 15
  }
});
