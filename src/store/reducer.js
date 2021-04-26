const initialState = {
  data:[],
  loading:false,
  dataCheck: [],
  solved: false,
  checkSolved: '',
  leaderBoard: [{username: "prasatya", difficulty: "hard", times: 600}, {username: "Wibowo", difficulty: "hard", times: 6000} ]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'data/sudoku':
    return { ...state, data: payload }

  case 'data/user':
    return { ...state, leaderBoard: [ ...state.leaderBoard, payload] }

  case 'data/sudokuCheck':
    return { ...state, dataCheck: payload }

  case 'loading/success':
    return { ...state, loading: true }

  case 'data/solvedBoard':
    return { ...state, solved: payload }
  
  case 'data/checkSolvedBoard':
    return { ...state, checkSolved: payload }
  
  default:
    return state
  }
}
