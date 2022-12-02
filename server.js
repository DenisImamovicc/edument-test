const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000

app.use( express.json())
app.post('/client/:id', (req, res) => {
  const {id} = req.params
  console.log( 'revcieved client req',id );
  res.send({}).status(200)
  })

app.post('/webhook/:id', (req, res) => {
  const {id} = req.params
  console.log( 'revcieved client req',id );
  res.send({ "result": "ok" })
      
    })  

app.listen(port, () => {
  console.log(port, `Live at http://localhost:${port}`)
})