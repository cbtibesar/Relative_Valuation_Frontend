import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
const ListHeader =({ clickAdd, title })=>{
    return(
        <Paper elevation={4} sx={{ width:'100%'}}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">
                <ListItem key="relative-tables-list-header"
                    secondaryAction={
                        <Button color="success" variant="outlined" startIcon={<AddIcon />} onClick={clickAdd}>
                            Add
                        </Button>
                    }>
                    <Typography sx={{ mt: 3, mb: 3, textAlign: 'center' }} variant="h6" component="div">
                        {title}
                    </Typography>
                </ListItem>
            </List>
        </Paper>
    )

}
export default ListHeader