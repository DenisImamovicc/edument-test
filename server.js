const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000
const clientReqs = []

app.use(express.json())
app.post('/client/:id', (req, res) => {
  const clientId = req.params.id
  clientReqs.push({ "clientId": clientId, "Data": null, isCompleted: false })



  console.log(clientReqs);
  //res.send({}).status(200)
})


app.post('/webhook/:id', (req, res) => {
  console.log(`recieved webhook from client ${req.params.id}`, req.body);
  const data = req.body.result
  const webhookId = req.params.id

  clientReqs.forEach(clientReq => {
    if (webhookId === clientReq.clientId) {
      clientReq.Data = data
      clientReq.isCompleted = true
    }
  })

  console.log(clientReqs);
  res.status(200).end()
})

app.listen(port, () => {
  console.log(port, `Live at http://localhost:${port}`)
})