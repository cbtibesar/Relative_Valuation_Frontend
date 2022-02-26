import { React, useEffect, useState } from 'react';
import axiosInstance from '../services/authHeader';
import TableList from '../components/TablesList';
import DialogueBox from '../components/DialogueBox';


const HomePage =()=> {
  const [tables, setTables] = useState([])
  const [open, setOpen] = useState(false)
  const [tableName, setTableName] = useState('');

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
    }).catch(error => console.error(`${error}`))
  },[])



  return(
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <TableList tables={tables} onDelete={onDelete} clickAdd={() => { setOpen(true) }} />
      <DialogueBox onAdd={onAdd} label={"Relative Table"} open={open} handleClose={handleClose} handleChange={handleChange} />
    </div>

  )

}

export default HomePage