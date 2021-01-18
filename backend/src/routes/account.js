const express = require('express')
const router = express.Router()
const passport = require('passport')

const accountController = require('../controllers/account')

const preventLoginForLoggedInUsers = (req, res, next) => {
  next(req.user && new Error('User is already logged in'))
}

router.post('/register', accountController.register)

router.post(
  '/session',
  preventLoginForLoggedInUsers,
  passport.authenticate('local', { failWithError: true }),
  accountController.postSession,
  (err, req, res, next) => {
    if (err.status != 401) return next(err)

    next(
      new Error(
        'The username and password you provided did not match our records. Please double-check and try again.'
      )
    )
  }
)

router.delete('/session', accountController.deleteSession)

router.get('/session', accountController.getSession)

module.exports = router
