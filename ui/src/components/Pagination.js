import React from 'react';
import PaginationMaterialUI from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiPaginationItem-root': {
            width: "3vw",
            borderRadius: "5vw",
            height: '3vw'
         },
        '& .Mui-selected': {
            width: "4vw",
            borderRadius: "5vw",
            height: '4vw'
         }
    }
}))

export function Pagination ({ postsPerPage, totalPosts, paginate }){
    const classes = useStyles();
    const PageNumbers = [];
    
    for(let i=1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        PageNumbers.push(i);
    }

    return (
        <nav>
            <PaginationMaterialUI count={Math.ceil(totalPosts/postsPerPage)} color="primary" 
            onChange={(event, value) => paginate(value)} className={classes.root}/>
        </nav>
    )
}
