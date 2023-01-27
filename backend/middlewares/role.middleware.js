
const roleMiddleware = (request, response, next) => {
  if (request.user.role === 'admin') {
    next()
  } else {
    response.status(401).json({ message: 'Permission Denied' })
  }
}


module.exports = roleMiddleware

