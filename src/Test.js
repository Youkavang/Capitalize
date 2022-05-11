import { Button, Card, CardHeader, CardContent, Link, TextField, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'

export default function SignupForm() {

  const router = useRouter()
  const { signUp } = useAuth()
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  })
  const [error, setError] = useState("")

  function handleForm(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    if (state.password !== state.passwordConfim) {
      setError("Passwords do not match")
    }
    await signUp(state.email, state.password)
    .catch(err => console.log(JSON.stringify(err)) )
    router.push("/account")
  }

  return(
    <motion.div>
      <Card >
        <CardHeader title="Header" />
        <CardContent>
          <TextField label="email" name="email" variant="outlined" onChange={ handleForm } />
          <TextField label="password" name="password" type="password" variant="outlined" onChange={ handleForm } />
          <TextField label="Password Confirmation" name="passwordConfirm" type="password" variant="outlined" onChange={ handleForm } />
          {error && <Alert severity="error" variant="filled" >{error}</Alert>}
          <Button onClick={ handleSubmit }>
            <Typography variant="button">Sign Up</Typography>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}