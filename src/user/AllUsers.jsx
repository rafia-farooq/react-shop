import { Container, Card, CardHeader, CardContent, CardActions, 
    CardMedia, Typography, Avatar, Button, Grid, IconButton, Backdrop, 
    CircularProgress, Dialog, DialogTitle, Divider } from "@material-ui/core";
import axios from "axios";
import React from "react";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "../product/css/showProduct.module.css";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Search from "./SearchUser";



const AllUsers = () => {

    const[loading, setLoading] = React.useState(false)


    const startLoading = () => {
        setLoading(!loading)
    }

    const stopLoading = () => {
        setLoading(false)
    }

    const[user, setUser] = React.useState(null)

    const getUsers = async() => {
        startLoading()
         const response = await axios.get('http://localhost:4000/user')
         console.log(response.data) 
         setUser(response.data)
        stopLoading()
         
     }

     React.useEffect(() =>{
        getUsers()
    }, [])


    // const filterUsers = (user, query) => {
    //     if (!query) {
    //         return user;
    //     }

    //     return user.filter((value) => {
    //         const userRole = value.role.toLowerCase();
    //         return userRole.includes(query);
    //     });
    // };

    // const { search } = window.location;
    // const query = new URLSearchParams(search).get('search-bar');
    // const [searchQuery, setSearchQuery] = React.useState(query || '');
    // const filteredUsers = filterUsers(user, searchQuery);
    
    

     let userData
     if (user)
        userData = user.map((value) => (

        <Grid item lg={4} md={2}>
            <p>{value.name}</p>
             <Card className={style.outer}>
                 <CardHeader 
                 avatar={<Avatar className={style.avatar}>{value.name.charAt(0)}</Avatar>}
                 subheader={<span>{value.category} <br/> Added {moment(value.date).fromNow()}</span>}
                 title={value.name}
                 action={<MoreVertIcon/>}>
                 </CardHeader>

                 <CardMedia>
                    <img src={value.image} alt={value.name} width={"100%"}/>
                 </CardMedia>
                 
                 <CardContent>
                    <Typography variant={"h6"} className={style.greenText}>{value.email}</Typography>
                    <Typography variant={"h6"} className={style.greenText}>{value.role}</Typography>
                 </CardContent>

                 <CardActions>
                    <IconButton className={"ml-auto"} 
                                size={"small"}
                                onClick={(event) =>{
                                    event.preventDefault()
                                    window.location = "http://localhost:3000/singleProduct/" + value._id
                                }}>
                        <VisibilityIcon className={style.icons}/>
                    </IconButton>

                    <IconButton size={"small"} 
                                onClick={(event) =>{
                                    event.preventDefault()
                                    axios.get("http://localhost:4000/shop/product/" + value._id)
                                         .then(response => alert(JSON.stringify(response.data.name)))
                                }}>
                        <ErrorOutlineIcon className={style.icons}/>
                    </IconButton>
                   
                    <IconButton size={"small"}
                               onClick={(event) =>{
                                event.preventDefault()
                                window.location = "http://localhost:3000/" + value._id + "/edit"
                            }}>
                        <EditIcon className={style.icons}/>
                    </IconButton>
                    
                    <IconButton  size={"small"}
                                 onClick={(event) =>{
                                    event.preventDefault()
                                    axios.delete("http://localhost:4000/shop/" + value._id)
                                         .then(response => alert(JSON.stringify(response.data)))
                                }}>
                        <DeleteForeverIcon className={style.icons}/>
                    </IconButton>
                 </CardActions>
             </Card>
             
        </Grid>
            
        ))
            
     else
        userData = ''


    return(
        <Container className={"mt-5"}>

            <Backdrop open={loading}>
                {/* <Dialog>
                    <DialogTitle className={style.loadingIcon}>Loading</DialogTitle>
                </Dialog>
                <Divider/> */}
                <CircularProgress className={style.loadingIcon} />
            </Backdrop>   
                   
        </Container>
     
    )
}

export default AllUsers