import { React, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import { Stack,Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Navigate, useNavigate } from 'react-router-dom';
import ListHeader from './ListHeader';
import { UserContext } from '../UserContext';

const TableList = ({ tables, onDelete, clickAdd }) => {

    const navigate = useNavigate()


    return (
        <Stack spacing={2} sx={{ width:'50%' }}>
            <ListHeader title={"Your Tables"} clickAdd={clickAdd} />
            {
                tables.length ? <Paper elevation={4} sx={{ width: '100%' }} >
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">
                        {
                            tables.map((table) => {
                                return (
                                    <ListItem
                                        key={table.title}

                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(table)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemButton onClick={() => {
                                            console.log(table.url)
                                            navigate(`table/${table.url}/`)
                                        }}>
                                            <ListItemText primary={table.title} secondary={`edited - ${table.edited.substring(5, 10) + "-" + table.edited.substring(0, 4)}`} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Paper> :<></>
            }
        </Stack>
    );

}

export default TableList