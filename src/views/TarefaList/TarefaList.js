import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';

import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const URL = 'https://minhastarefas-api.herokuapp.com/tarefas'
const HEADERS = { 'x-tenant-id': 'fulano@email.com' };

const TarefasList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);

  const salvar = (tarefa) => {
    axios.post(
      URL,
      tarefa,
      {
        headers: HEADERS
      }).then(response => {
        console.log(response.data)
        const novaTarefa = response.data
        setTarefas([...tarefas, novaTarefa])
      }).catch(erro => {
        console.log(erro)
      })
  }

  const listarTarefas = () => {
    axios.get(
      URL, {
      headers: HEADERS
    }).then(response => {
      const listTarefas = response.data
      setTarefas(listTarefas)
    }).catch(erro => {
      console.log(erro)
    })
  }

  const alterarStatus = (id) => {
    axios.patch(`${URL}/${id}`, null, {
      headers : HEADERS
    }).then(response => {
      const lista = [...tarefas]
      lista.forEach(tarefa => {
        if(tarefa.id === id){
          tarefa.done = true
        }
      })
      setTarefas(lista)
    }).catch(erro => {
      console.log(erro)
    })
  }

  const deletar = (id) =>{
    axios.delete(`${URL}/${id}`, {
      headers : HEADERS
    })
    .then(response => {
      const lista = tarefas.filter(tarefa => tarefa.id !== id)
      setTarefas(lista)
    })
    .catch(erro => {
      console.log(erro)
    })
  }

  useEffect(() => {
    listarTarefas()
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable alterarStatus={alterarStatus} 
                      deleteAction={deletar}
                      tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefasList;