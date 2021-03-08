const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  if (request.methos === 'OPTIONS') return next()

  try {
    const token = request.headers.authorization.split(' ')[1] // 'Bearer TOKEN'
    if (!token) return response.status(401).json({ message: 'This user does not exist' })

    request.user = jwt.verify(token, 'mern')
    next()
  } catch (error) {
    return response.status(401).json({ message: 'This user does not exist' })
  }
}
