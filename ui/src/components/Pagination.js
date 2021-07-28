import React from 'react';
import PaginationMaterialUI from '@material-ui/lab/Pagination';

export function Pagination ({ postsPerPage, totalPosts, paginate }){
    const PageNumbers = [];
    
    for(let i=1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        PageNumbers.push(i);
    }

    return (
        <nav>
            <PaginationMaterialUI count={Math.ceil(totalPosts/postsPerPage)} color="primary" 
            onChange={(event, value) => paginate(value)} />
        </nav>
    )
}
