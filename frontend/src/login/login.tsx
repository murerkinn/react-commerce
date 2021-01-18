import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { login } from './login-store'
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'

interface Values {
  email: string
  password: string
}

const loginSchema = yup.object().shape({
  email: yup.string().email('Please provide a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
})

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Login = () => {
  const dispatch = useDispatch()

  let query = useQuery()

  const handleSubmit = async ({ email, password }: Values) => {
    try {
      dispatch(login({ email, password }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
          {query.get('registerSucces') === '1' && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <h4 className="alert-heading">You are now registered!</h4>
              <p>Use your credentials to log in below.</p>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
          {query.get('logoutSuccess') === '1' && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <h4 className="alert-heading">You are successfully logged out!</h4>
              <p>Use your credentials to log in below.</p>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={values => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    className={[
                      'form-control',
                      errors.email && touched.email && 'is-invalid',
                      !errors.email && touched.email && 'is-valid',
                    ].join(' ')}
                    name="email"
                  />
                  {errors.email && touched.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    className={[
                      'form-control',
                      errors.password && touched.password && 'is-invalid',
                      !errors.password && touched.password && 'is-valid',
                    ].join(' ')}
                    name="password"
                  />
                  {errors.password && touched.password ? (
                    <div className="invalid-feedback">{errors.password}</div>
                  ) : null}
                </div>
                <div className="row pt-3">
                  <div className="col-8 pt-3">
                    <Link to="/register" className="have-an-account">
                      Don't have an account? Click here to register
                    </Link>
                  </div>
                  <div className="col-4">
                    <button className="btn btn-primary float-end" type="submit">
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login
