import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";



export default function Contact() {
  const [formState, setFormState] = useState({
    yourName: "",
    company: "",
    email: "",
    message: "",
  });

  const [userMessage, setUserMessage] = useState("");

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserMessage("Your message has been sent!");
    setFormState({
      yourName: "",
      company: "",
      email: "",
      message: "",
    });
    setTimeout(() => {
      setUserMessage("");
    }, 3000);
  };


  return (
    <Box >
      <>
    <div style ={{

     display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
       
        paddingTop: "50px",
        paddingBottom: 10, 
    
        height: '100vh',
        width: '100%'
      }}
    >
    

        <Box
          sx={{
            backgroundColor: "white",
            padding: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            boxShadow: 10,
            width: {xs: "100%", sm: "80%", md: "70%", lg: "60%"},
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            I&apos;d love to hear from you!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}  md={6}>
                <TextField
                  autoComplete="given-name"
                  name="yourName"
                  value={formState.yourName}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="yourName"
                  label="Your Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  id="company"
                  label="Company (optional)"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  autoComplete="company"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  label="Your Message"
                  type="text"
                  multiline
                  minRows={4}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#010041",
                "&:hover": { backgroundColor: "green" },
              }}
            >
              Submit
            </Button>
          </Box>
          {userMessage && <Typography>{userMessage}</Typography>}
        </Box>
  
    </div>
    </>
    </Box>
  );
}
