import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router'

export const useRegister = () => {

const navigate = useNavigate();
const [error, setError] = useState<boolean>(false);
const [errorMsg, setErrorMsg] = useState<string>('');
const [isLoading, setIsLoading] = useState<boolean>(false);
// const { dispatch } = useAuthContext();

const Register = async (email: string, password: string) => {

  // setIsLoading(true)
  // setError(null)

  if(email.length == 0 && password.length == 0)
  {
    setError(true);
    setIsLoading(false);
    setErrorMsg('no password nor an email was entered');
    console.log(errorMsg);
  } 
  else if(email.length == 0)
  {
    setError(true);
    setIsLoading(false);
    setErrorMsg(`you didn't enter an email`);
    console.log(errorMsg);
  }
  else if(password.length == 0)
  {
    setError(true);
    setIsLoading(false);
    setErrorMsg(`you didn't enter a password`);
    console.log(errorMsg);
  }
  else if(email.includes("@") != true)
  {
    setError(true);
    setIsLoading(false);
    setErrorMsg('Your email must include @');
    console.log(errorMsg);
  }
  else if(password.length < 6)
  {
    setError(true);
    setIsLoading(false);
    setErrorMsg('The password is too short');
    console.log(errorMsg);
  }
  else
  {
    axios.post('http://localhost:5000/user/register', { Email: email, Password: password })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
    navigate('/');
  }
}
  return { Register, isLoading, error, errorMsg }
}