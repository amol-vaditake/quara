import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Loader from './Loader'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions'
import { setAuthToken } from './utils'

export default function WithMaterialUI() {
  let [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  function onSubmit(values) {
    setLoading(true)
    axios
      .post(process.env.REACT_APP_API_URL + '/api/admin/authenticate', values)
      .then((res) => {
        const { accesstoken: token } = res.data
        localStorage.setItem('jwtToken', token)
        setAuthToken(token)
        const decoded = jwt_decode(token)
        console.log(decoded, 'decoded')
        dispatch(setUser(decoded))
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => formik.setFieldError('email', 'Invalid credentials'))
    setLoading(false)
  }

  const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').min(6, 'Password should be of minimum 6 characters length').required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar'
    },
    validationSchema: validationSchema,
    onSubmit
  })

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '60vh' }}>
      <Grid>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            style={{ marginBottom: '0.3rem' }}
          />
          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={{ marginBottom: '0.3rem' }}
          />
          {loading ? (
            <Loader count={2} />
          ) : (
            <Button color='secondary' variant='contained' fullWidth type='submit'>
              Submit
            </Button>
          )}
        </form>
      </Grid>
    </Grid>
  )
}
