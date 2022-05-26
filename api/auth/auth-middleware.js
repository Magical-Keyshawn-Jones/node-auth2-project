const { JWT_SECRET } = require("../secrets"); // use this secret!
const model = require('../users/users-model')
const jwt = require('jsonwebtoken')

/*
  If the user does not provide a token in the Authorization header:
  status 401
  {
    "message": "Token required"
  }

  If the provided token does not verify:
  status 401
  {
    "message": "Token invalid"
  }

  Put the decoded token in the req object, to make life easier for middlewares downstream!
*/
const restricted = async (req, res, next) => {
  const { authorization } = req.headers

  if (authorization === undefined) {
    return res.status(401).json({ message: 'Token required' })
  }

  jwt.verify(authorization, JWT_SECRET)
  .then(results => {
    return res.status(200).json(results)
  })
  .catch(err => {
    console.log(err)
    return res.status(500).json({ message: 'Internal Error' })
  })

  next()
}

const only = role_name => (req, res, next) => {
  /*
    If the user does not provide a token in the Authorization header with a role_name
    inside its payload matching the role_name passed to this function as its argument:
    status 403
    {
      "message": "This is not for you"
    }

    Pull the decoded token from the req object, to avoid verifying it again!
  */
}


const checkUsernameExists = (req, res, next) => {
  /*
    If the username in req.body does NOT exist in the database
    status 401
    {
      "message": "Invalid credentials"
    }
  */
}


const validateRoleName = (req, res, next) => {
  /*
    If the role_name in the body is valid, set req.role_name to be the trimmed string and proceed.

    If role_name is missing from req.body, or if after trimming it is just an empty string,
    set req.role_name to be 'student' and allow the request to proceed.

    If role_name is 'admin' after trimming the string:
    status 422
    {
      "message": "Role name can not be admin"
    }

    If role_name is over 32 characters after trimming the string:
    status 422
    {
      "message": "Role name can not be longer than 32 chars"
    }
  */
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
