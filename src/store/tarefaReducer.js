import axios from 'axios'

const http = axios.create({
    baseURL: 'https://minhastarefas-api.herokuapp.com'
})
const HEADERS = { 'x-tenant-id': localStorage.getItem('email_usuario_logado') };

const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVER: 'TAREFAS_REMOVER',
    UDATE_STATUS: 'STATUS_ATUALIZAR'
}

const ESTADO_INICIAL = {
    tarefas: []
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.LISTAR:
            return { ...state, tarefas: action.tarefas }
        case ACTIONS.ADD:
            return { ...state, tarefas: [...state.tarefas, action.tarefa] }
        case ACTIONS.REMOVER:
            const id = action.id
            const tarefas = state.tarefas.filter(tarefa => tarefa.id !== id)
            return { ...state, tarefas: tarefas }
        case ACTIONS.UDATE_STATUS:
            const lista = [...state.tarefas]
            lista.forEach(tarefa => {
                if (tarefa.id === action.id) {
                    tarefa.done = true
                }
            })
            return { ...state, tarefas: lista }
        default:
            return state;
    }

}

export function listar() {
    return dispatch => {
        http.get('/tarefas', {
            headers: HEADERS
        }).then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                tarefas: response.data
            })
        }).catch(erro => {
            console.log(erro)
        })
    }
}

export function salvar(tarefa) {
    return dispatch => {
        http.post('/tarefas', tarefa, {
            headers: HEADERS
        }).then(response => {
            dispatch({
                type: ACTIONS.ADD,
                tarefa: response.data
            })
        }).catch(erro => {
            console.log(erro)
        })
    }
}

export function deletar(id) {
    return dispatch => {
        http.delete(`/tarefas/${id}`, {
            headers: HEADERS
        }).then(response => {
            dispatch({
                type: ACTIONS.REMOVER,
                id: id
            })
        }).catch(erro => {
            console.log(erro)
        })
    }
}

export function alterarStatus(id) {
    return dispatch => {
        http.patch(`/tarefas/${id}`, null, {
            headers: HEADERS
        }).then(response => {
            dispatch({
                type: ACTIONS.UDATE_STATUS,
                id: id
            })
        }).catch(erro => {
            console.log(erro)
        })
    }
}