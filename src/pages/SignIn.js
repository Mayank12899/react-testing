import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
// eslint-disable
import CssBaseline from "@material-ui/core/CssBaseline";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//new imports
import { useForm, Form } from "../components/useForm";
import Controls from "../components/controls/Controls";

//Firebase Imports
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../config/firebase'

// Redux
import { useNavigate } from "react-router-dom";

const initialFieldValues = {
  email: "",
  password: "",
  rememberMe: false,
};

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Quantiphi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/foodpal-ab824.appspot.com/o/Quantiphi.png?alt=media&token=a5d5b7a6-75ea-49f7-9b53-6f0745917c4c)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#247480",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { values, handleInputChange } = useForm(initialFieldValues);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false)
  const navigate = useNavigate()
  
  const auth = getAuth(app);


  const signinHelper = async () => {
    console.log(values)
    // Firebase work
    await signInWithEmailAndPassword(auth, values.email, values.password)
    .then(()=>{
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("email", values.email);
      setisUserLoggedIn(true);
      navigate("/dashboard/app");
    }).catch((err) => {
      console.log(err);
    });

  };
  useEffect(()=>{
    if(isUserLoggedIn){
      window.location.href= "/dashboard/app"
    }
  }, [isUserLoggedIn])
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <Form>
            <Controls.Input
              name='email'
              label='Email Address *'
              fullWidth
              value={values.email}
              onChange={handleInputChange}
            ></Controls.Input>
            <Controls.Input
              name='password'
              label='Password *'
              fullWidth
              type="password"
              value={values.password}
              onChange={handleInputChange}
            ></Controls.Input>
            <Controls.CheckBox
              name='rememberMe'
              label='Remember me'
              value={values.rememberMe}
              onChange={handleInputChange}
            />
            <Controls.Button
              className={classes.submit}
              text='SIGN IN'
              type='submit'
              color="secondary"
              style={{backgroundColor: "#247480"}}
              fullWidth
              size='medium'
              onClick={(e) => {
                e.preventDefault();
                signinHelper();
              }}
            />
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
          </Form>
        </div>
        <Box>
            <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
