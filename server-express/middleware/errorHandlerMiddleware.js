const ApiError = require('../ApiError/ApiError')

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message })
  }
  res.status(500).json({ message: err.message })
}
