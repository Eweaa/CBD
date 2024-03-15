import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router'

export const useLogin = () => {

const navigate = useNavigate();
const [error, setError] = useState<boolean>(false)
const [errorMsg, setErrorMsg] = useState<string>('')
const [isLoading, setIsLoading] = useState<boolean>(false)
const { dispatch } = useAuthContext();

const Login = async (Email: string, Password: string) => {

  // console.log(Email, Password)
  setIsLoading(true);

  axios.post('http://localhost:5000/user/login', {Email, Password})
  .then(res => {
    // console.log(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
    localStorage.setItem('token', res.data.token);
    dispatch({type: 'LOGIN', payload: res.data});
    navigate('/');
  })
  .catch(err => {
    setError(true);
    console.log(err);
    setErrorMsg(err.response.data);
  })
  
}
  return { Login, isLoading, error, errorMsg }
}