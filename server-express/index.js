require('dotenv').config()
require('./models/models')
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const sequelize = require('./db')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:37119', credentials: true }))
app.use(cookieParser())
app.use(fileupload())
app.use('/api', require('./routers/index'))
app.use(require('./middleware/errorHandlerMiddleware'))

const start = async () => {
  await sequelize.authenticate()
  await sequelize.sync()
  // await sequelize.sync({ force: true })
  app.listen(PORT, () => console.log('Server started on port ' + PORT))
}
start()
