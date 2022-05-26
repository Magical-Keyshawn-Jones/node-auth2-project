const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const model = require('../users/users-model')

/**
  [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

  response:
  status 201
  {
    "user"_id: 3,
    "username": "anna",
    "role_name": "angel"
  }
 */
// router.post("/register", validateRoleName, (req, res, next) => {
router.post("/register", (req, res) => {
  let user = req.body

  // Bcrypting(encoding) password before saving and Determining how many rounds 
  const hash = bcrypt.hashSync(user.password, 9)
  
  // Setting password = to encrypted version
  user.password = hash
  
  console.log(user)

  model.add(user)
  .then(results => {
    res.status(201).json({ message: `Great to have you, ${results.username}` })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Internal Error' })
  })
});


router.post("/login", checkUsernameExists, (req, res, next) => {
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */
});

module.exports = router;
