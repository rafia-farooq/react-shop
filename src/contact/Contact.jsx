import { Container , Box , TextField , Button , Typography , Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import emailjs from 'emailjs-com';

export default function Contact(){

    const[snackbar, setSnackbar] = React.useState(false)

    const showSnackbar = () => {
        setSnackbar(true)
    }

    const hideSnackbar = () => {
        setSnackbar(false)
    }

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_lwe0n87', 'template_o81t9z8', e.target, 'user_CVNqF63qTjAOjByIGKzLs')
          .then((result) => {
              console.log(result.text);
              showSnackbar();
          }, (error) => {
              console.log(error.text);
          });
      }
      
    return(
        <Container>
            <Box>
                <Typography variant={"h3"} align={"center"} className={"my-4"}>Contact Us</Typography>

                <form onSubmit={sendEmail}>
                <TextField label={"Name"}
                               name="from_name"  
                               fullWidth 
                               required
                               className={"mb-3"}/>

                <TextField label={"Email"} 
                               name="reply_to"
                               fullWidth 
                               required
                               className={"mb-3"}/>
                
                <TextField label={"Message"} 
                               name="message"
                               fullWidth 
                               required
                               className={"mb-3"}/>
                
                <Button type={"submit"} variant={"contained"} fullWidth className={"mt-3 text-white p-2"} style={{backgroundColor: "#2F575D", color: "DEE1DD"}} >Send</Button>
            
                </form>
            </Box>


             {/* Snackbar from material to show saved message */}
            
             <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={snackbar}
                autoHideDuration={5000}
                onClose={hideSnackbar}                
            >   
                 <Alert severity="success">
                        Message Sent! We will reply as soon as we can.
                </Alert>
            </Snackbar>       
            
        </Container>
    )
}