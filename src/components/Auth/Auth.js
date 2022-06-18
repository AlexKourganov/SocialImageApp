import React, { useState,useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  
  Grow
} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import { useDispatch,useSelector } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./icon";

import useStyles from "./styles";

import {signin,signup} from '../../actions/auth';
import {addError,clearError} from '../../actions/errors';

const initialState={
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:''
}

const Auth = () => {
  const errorData = useSelector((state) => state.errors);
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [errors,setErrors] = useState([]);

  useEffect(() => {
    setErrors(errorData);
    if(errors.length > 0){

      console.log((errors))
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  } ,[errorData])
  

  const handleSubmit = (e) => {
    e.preventDefault();


    if(isSignup){
      // pass history so we can navigate once something happens
      if(formData.password === formData.confirmPassword){
        dispatch(signup(formData,history))

      }else{
        dispatch(addError({errorCode:1,errorMessage:'Passwords did not match!'}));

        setTimeout(() => {
          dispatch(
            clearError()
              )
        }, 5000)
      }


    }else{
      dispatch(signin(formData,history))
    }
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleSuccess = async (res) => {
    //  console.log(res)
    //  Optional, wont get error if it doesnt exist
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: AUTH,
        data: { result, token },
      });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was a Failuere");
  };

  return (
    <Container component="main" maxWidth="xs">
      
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              error={(errors.length  && errors[0].errorCode === 0 ) ? true : false}
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              error={(errors.length  && (errors[0].errorCode === 0 || errors[0].errorCode === 1 ))? true : false}
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
       
            {isSignup && (
              <Input
                error={(errors.length  &&  errors[0].errorCode === 1 )? true : false}
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          {errors.length ? (
            <Grow in>
            <Typography align="center" className={classes.errorMessage}>
              {errors[0].errorCode === 1 ? `PASSWORDS DONT MATCH!` : errors[0].errorCode === 2 ? `USER ALREADY EXISTS` : `THERE WAS AN ERROR! PLEASE CHECK YOUR CREDENTIALS!` }
              

            
          </Typography>
          </Grow>
          ):null}
          

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="416290359734-mcb5jt34f3n0uoel3hercut5nrs5lte7.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already Have an account? Sign In"
                  : "Dont have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
