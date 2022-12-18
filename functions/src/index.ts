import * as functions from 'firebase-functions'
import * as express from 'express'
import { getUser, updateUser } from './userController'

const regionalFunctions = functions.region('europe-west1')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // So anyone can access this api
  res.header(
    'Access-Control-Allow-Headers',
    'x-uid, Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  res.header('Access-Control-Allow-Methods', 'GET,PUT')
  next()
})

app.get('/', (req, res) => res.status(200).send('OK'))
app.get('/users', getUser)
app.put('/users', updateUser)
exports.app = regionalFunctions.https.onRequest(app)
