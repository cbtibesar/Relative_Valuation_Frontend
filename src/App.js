import './App.css';
import { React, useEffect, useState } from 'react';
import TableList from './components/TablesList';
import axiosInstance from './axios';
import DialogueBox from './components/DialogueBox';
import { Navigate } from 'react-router-dom'


const App =()=> {
  const [tables, setTables] = useState([])
  const [open, setOpen] = useState(false)
  const [tableName, setTableName] = useState();
  const [authenticated, setAuth] = useState()

  const onDelete =(table)=> {
    axiosInstance.delete(`stock_api/relative_table/${table.url}/`)
    .then((res) => {
      console.log(res)
      setTables(tables.filter((t) => t.url !== table.url))
    })
  }

  const handleChange = (e) => {
    e.preventDefault()
    setTableName(e.target.value.trim())
  }

  const handleClose = (e) => {
    e.preventDefault()
    setOpen(false)
    setTableName('')
  }

  const onAdd = (e) => {
    e.preventDefault()
    if (tableName !== ''){
      axiosInstance.post("stock_api/relative_table/", { title: tableName })
        .then((res) => {
          console.log(res)
          setTables([res.data, ...tables])
          setOpen(false)
          setTableName('')
        }).catch(function (error) {
          if (error.response) {
            console.log(error.response)
          }
        })
    }
  }

  useEffect(() => {
    axiosInstance.get("stock_api/relative_table/")
     .then((res) => {
      setTables(res.data)
    }).catch(error => console.error(`Error:${error}`))
  },[])



  return(
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <TableList tables={tables} onDelete={onDelete} clickAdd={() => { setOpen(true) }} />
      <DialogueBox onAdd={onAdd} label={"Relative Table"} open={open} handleClose={handleClose} handleChange={handleChange} />
    </div>

  )

}

export default App