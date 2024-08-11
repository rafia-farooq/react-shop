import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Category from '../category/Category';
import Brand from '../category/Brand';
import AddProduct from './AddProduct';



export default function AddCompleteProduct(){

return(
   <Container>

       <Grid container>

           <Grid item lg={8}>
               <AddProduct></AddProduct>
           </Grid>

           <Grid item lg={4}>
               <Category></Category>
               <Brand></Brand>
           </Grid> 

       </Grid>              
       
   </Container>

)

}