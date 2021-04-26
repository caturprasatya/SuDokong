import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, FlatList, SafeAreaView, Text, TextInput, Button, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import { sendBoardToCheck, sendBoard } from '../store/action.js'


const { width } = Dimensions.get('window')

export default function Input(props) {
  const { data: arr, indexRow } = props
  const [number, setNumber] = useState('')
  const { data, solved } = useSelector(state => state)
  const dispatch = useDispatch()

  function handleChangeNumber(value, indexColum, indexRow){
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const copyBoard = JSON.parse(JSON.stringify(data))
    
    nums.forEach(num => {
      if (+num === +value || value === '' ) {
        setNumber(value)
        copyBoard[indexRow][indexColum] = +value
        if (solved) {
          dispatch(sendBoard(copyBoard))
        } else {
          dispatch(sendBoardToCheck(copyBoard))
        }
      }
    })
  }

  return (
    <SafeAreaView>
    { 
      solved ? 
      <TextInput
          style={ styles.input }
          value={ data[indexRow][arr.i].toString() }
          onChangeText={(value) => handleChangeNumber(value, arr.i, indexRow) }
          keyboardType="numeric"
          textAlign='center'
          editable={ true }
        />
        :
        <TextInput
          style={ styles.input }
          value={ arr.num !== 0 ? arr.num.toString() : number.toString() }
          onChangeText={(value) => handleChangeNumber(value, arr.i, indexRow) }
          keyboardType="numeric"
          textAlign='center'
          editable={ data[indexRow][arr.i] !== 0 ? false : true}
        />
    }
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    margin: 8,
    flex: 1,
    backgroundColor: '#fff'
  },
  containerBoard: {
    flex: 1,
    height: 300,
    margin: 1,
    marginTop: 30
  },
  containerInput: {
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#4D243D',
    flex: 1,
    margin: 1,
    padding: 2,
    width: Math.floor(width / 9) - 3.9,
    height: 40,
    alignContent: 'center',
    borderRadius: 5,
    fontSize: 25,
    color: 'white'
  },
  button: {
    marginTop: 2,
    flex: 1,
    backgroundColor: '#fff'
  }
});
