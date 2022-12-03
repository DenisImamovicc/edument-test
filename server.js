const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000
const ClientsDb = []

app.use(express.json())
app.post('/client/:id', (req, res) => {
  const clientId = req.params.id
  ClientsDb.push({"clientId":clientId,"Data":null,isCompleted:false})



  console.log(ClientsDb );
  //res.send({}).status(200)
  })

app.post('/webhook/:id', (req, res) => {
  console.log(`recieved webhook from client ${req.params.id}`,req.body);
  
  res.status(200).end()
  })  

app.listen(port, () => {
  console.log(port, `Live at http://localhost:${port}`)
})