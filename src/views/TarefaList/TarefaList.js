import React, { useState } from 'react';
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

const TarefasList = () => {
  const classes = useStyles();

  const [tarefas] = useState([]);

  const salvar = (tarefa) => {
    const URL = 'https://minhastarefas-api.herokuapp.com/tarefas'
    axios.post(
      URL,
      tarefa,
      {headers : {'x-tenant-id' : 'fulano@email.com'}
    }).then(response => {
      console.log(response.data)
    }).catch(erro => {
      console.log(erro)
    })
  }

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar}/>
      <div className={classes.content}>
        <TarefasTable tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefasList;
