import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { Button } from '@material-ui/core';

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
  const [openDialog, setOpenDialog] = useState(false)
  const [menssagem, setMensagem] = useState('')

  const salvar = (tarefa) => {
    axios.post(
      URL,
      tarefa,
      {
        headers: HEADERS
      }).then(response => {
        const novaTarefa = response.data
        setTarefas([...tarefas, novaTarefa])
        abrirDialog('Item adicionado com sucesso')
      }).catch(erro => {
        abrirDialog('Ocorreum um erro')
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
      abrirDialog('Ocorreum um erro')
    })
  }

  const alterarStatus = (id) => {
    axios.patch(`${URL}/${id}`, null, {
      headers: HEADERS
    }).then(response => {
      const lista = [...tarefas]
      lista.forEach(tarefa => {
        if (tarefa.id === id) {
          tarefa.done = true
        }
      })
      setTarefas(lista)
      abrirDialog('Status atualizado com sucesso')
    }).catch(erro => {
      abrirDialog('Ocorreum um erro')
    })
  }

  const deletar = (id) => {
    axios.delete(`${URL}/${id}`, {
      headers: HEADERS
    })
      .then(response => {
        const lista = tarefas.filter(tarefa => tarefa.id !== id)
        setTarefas(lista)
        abrirDialog('Item deletado com sucesso')
      })
      .catch(erro => {
        abrirDialog('Ocorreum um erro')
      })
  }

  const abrirDialog = (mensagem => {
    setMensagem(mensagem)
    setOpenDialog(true)
  })

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
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {menssagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefasList;
