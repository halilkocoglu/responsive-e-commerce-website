import React from 'react'
import  "./signup.css"
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import validationSchema from './validations'
import { fetchRegister } from '../../API'
import { useAuthContext } from '../../contexts/authContext/AuthContext'



function Signup({history}) {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit : async (values, bag) => {
    // Post method Adding a new user will not add it into the server.
    // It will simulate a POST request and will return the new created user with a new id
      try {
        // you can see the response on console
        const registerResponse = await fetchRegister({email: values.email, password: values.password})
        console.log(registerResponse);
        login(registerResponse)
        navigate('/')
      } 
      // Normally this block will catch any errors if the user has already been registered
      // But in this case, no error will come up cause of we just simulate to 'add a new  user'
      catch (error) {
        bag.setErrors( {general: error.response.data.message})
      }
    } 
  })

  return (
    <div className='signup-container'>
      <Navbar/>
      <div className='signup-content'>
        <div className="signup-error">
          { 
            formik.errors.general && (
              <div className="error">
                {
                  formik.errors.general
                }
              </div>
            )
          }
        </div>
        <form 
        className='signup-form'
        onSubmit={formik.handleSubmit}
        >
            <div>
                <div>E-mail</div>
                <input 
                className= {`${formik.touched.email && formik.errors.email 
                  ? "border-red" :""}`}
                name='email'
                type="text" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                />
            </div>
            <div>
                <div>Password</div>
                <input 
                className= {`${formik.touched.password && formik.errors.password 
                  ? "border-red" :""}`}
                name='password'
                type="password" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                />
            </div>
            <div>
                <div>Password Confirm</div>
                <input 
                className= {`${formik.touched.passwordConfirm && formik.errors.passwordConfirm 
                  ? "border-red" :""}`}
                name='passwordConfirm'
                type="password" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                />
            </div>
            <div className='signup-button'>
              <button type='submit'>Sign Up</button>
            </div>
        </form>
            <Link to={"/login"}>You already have an account? Sign in.</Link>
      </div>

    </div>
  )
}

export default Signup