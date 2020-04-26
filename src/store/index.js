import { combineReducers } from 'redux'

import { tarefaReducer } from './tarefaReducer'

const mainReducer = combineReducers({
    tarefas: tarefaReducer
})

export default mainReducer;