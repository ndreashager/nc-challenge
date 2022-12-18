import * as functions from 'firebase-functions'
import * as express from 'express'
import { getUser, updateUser } from './userController'
import * as cors from 'cors'

const regionalFunctions = functions.region('europe-west1')

const app = express()

const isEmulated = process.env.FUNCTIONS_EMULATOR === 'true'
let origins = []
if (isEmulated) {
  origins = ['http://localhost:4200']
} else {
  origins = [
    'https://639eb8c5d8175d40fb2d5f0b--strong-mermaid-3f2f54.netlify.app',
  ]
}

var corsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  methods: 'GET,POST',
  origin: origins,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => res.status(200).send('OK'))
app.post('/users', updateUser)
app.get('/users', getUser)

exports.app = regionalFunctions.https.onRequest(app)
