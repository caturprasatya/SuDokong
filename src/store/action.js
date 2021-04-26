import axios from 'axios'

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');


export const sendBoard = (payload) => ({
  type: 'data/sudoku',
  payload
})

export const sendBoardToCheck = (payload) => ({
  type: 'data/sudokuCheck',
  payload
})

export const solveBoard = (payload) => ({
  type: 'data/solvedBoard',
  payload
})

export const inputUser = (payload) => ({
  type: 'data/user',
  payload
})

export const checksSolvedBord = (payload) => ({
  type: 'data/checkSolvedBoard',
  payload
})

export const loading = () => ({
  type: 'loading/success'
})

export const fetchSudoku = (difficulty) => {
  return async (dispatch) => {
    try {
      const sudoku = await axios(`https://sugoku2.herokuapp.com/board?difficulty=${difficulty}`)
      const { data } = sudoku
      dispatch(sendBoard(data.board))
    } catch (error) {
      console.log(error);
    }
  }
}

export const solveSudoku = (payload) => {

  return async (dispatch, getState) => {
    const { data: board } = getState()
    try {
      const sudoku = await fetch(`https://sugoku2.herokuapp.com/solve`,{
        method: 'post',
        body: encodeParams({ board }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const data = await sudoku.json()
      dispatch(sendBoard(data.solution))
      dispatch(solveBoard(true))
    } catch (error) {
      console.log(error);
    }
  }
}

export const validateSudoku = () => {
  return async (dispatch, getState) => {
    const { data, dataCheck, solved } = getState()
    let payload 
    if (!dataCheck.length) {
      payload = await data
    } else {
      if (solved) {
        payload = await data
      } else {
        payload = await dataCheck
      }
    }

    try {
      const sudoku = await axios({
        method: 'post',
        url:`https://sugoku2.herokuapp.com/validate`,
        data: encodeParams({board: payload}),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const { data } = sudoku
      dispatch(checksSolvedBord(data.status))
    } catch (error) {
      console.log(error);
    }
  }
}
