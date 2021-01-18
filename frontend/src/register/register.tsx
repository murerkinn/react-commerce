import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { register } from './register-store'
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'

interface Values {
  name: string
  email: string
  password: string
}

const registerSchema = yup.object().shape({
  name: yup.string().min(2, 'Name should have a minimum length of 2 characters').max(250).required('Name is required'),
  email: yup.string().email('Please provide a valid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should have a minimum length of 8 characters')
    .required('Password is required'),
  confirmPassword: yup.string().required('Password confirmation is required'),
})

const Register = () => {
  const dispatch = useDispatch()

  let history = useHistory()

  const handleSubmit = async ({ name, email, password }: Values) => {
    try {
      dispatch(register({ name, email, password }, history))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={registerSchema}
            onSubmit={values => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    className={[
                      'form-control',
                      errors.name && touched.name && 'is-invalid',
                      !errors.name && touched.name && 'is-valid',
                    ].join(' ')}
                    name="name"
                  />
                  {errors.name && touched.name ? <div className="invalid-feedback">{errors.name}</div> : null}
                </div>

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

                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    className={[
                      'form-control',
                      errors.confirmPassword && touched.confirmPassword && 'is-invalid',
                      !errors.confirmPassword && touched.confirmPassword && 'is-valid',
                    ].join(' ')}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  ) : null}
                </div>

                <div className="row">
                  <div className="col-8 pt-3">
                    <Link to="/login" className="have-an-account">
                      Already have an account? Click here to login
                    </Link>
                  </div>
                  <div className="col-4">
                    <button className="btn btn-primary float-end" type="submit">
                      Register
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

export default Register
