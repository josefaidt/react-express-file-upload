const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

const app = express()
const upload = multer({ dest: 'uploads/' })

app.use(cors())

app.post('/api', upload.single('file'), (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const response = {
    text: 'Hello World',
    file: JSON.stringify(req.file),
    submitted: JSON.stringify(req.body),
  }
  res.send(response)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3001)
