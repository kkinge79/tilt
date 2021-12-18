import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './signup.css'
import * as authService from '../../services/authService'


import tilt from './images/tilt.png'

const SignupForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.signup(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }





  return (

    <div className='signup-page'>
      <div className='left-container'>

        <div className='form-container'>

          <div className='title-container'>
            <h1 className="acc">Create an Account</h1>
            <h5>Social Network for Game Lovers</h5>
          </div>

          <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="register-form"
    >
        <input
          type="text"
          autoComplete="off"
          id="name"
          value={name}
          name="name"
          onChange={handleChange}
          placeholder='Username'
        />
        <input
          type="text"
          autoComplete="off"
          id="email"
          value={email}
          name="email"
          onChange={handleChange}
          placeholder='Email'
        />
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={password}
          name="password"
          onChange={handleChange}
          placeholder='Password'
        />
        <input
          type="password"
          autoComplete="off"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
          placeholder='Confirm Password'
        />
        <button 
          autoComplete="off"
        // disabled={isFormInvalid()} 
          id='submit-button'
          type='submit'
          >
          Sign Up
        </button>
    </form>
    <div className='redirect-container'>
      <p>Already have an account?</p>
      <Link className='redirect-link' to='/login'>Sign In</Link>
    </div>
      {/* form container */}
      </div>
    {/*leftcontainer end div*/}
      </div>
      <div className='right-container'>
        <h1>HI PLAYERS</h1>
      </div>
      </div>
  )
}

export default SignupForm
