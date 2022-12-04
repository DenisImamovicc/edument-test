const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000
const clientReqs = []

const getDataFrom3rdParty = () => clientReqs.splice(0, 1);
 
async function match3rdPartyRes(req) {
  const data = req.body.result
  const webhookId = req.params.id

  return clientReqs.forEach(clientReq => {
    if (webhookId === clientReq.clientId) {
      clientReq.Data = data
      clientReq.isCompleted = true
    }
  })

}

app.use(express.json())
app.post('/client/:id', (req, res) => {
  const clientId = req.params.id
  clientReqs.push({ "clientId": clientId, "Data": null, isCompleted: false })

//Simulate waiting for webhook notes. 
  setTimeout(() => {
    try {
      res.send(getDataFrom3rdParty()).status(200)
    } catch (error) {
      res.send(error).status(404)
    }
 
   console.log(clientReqs);
  }, "10000")
})

app.post('/webhook/:id', (req, res) => {
  console.log(`recieved webhook from client ${req.params.id}`, req.body);
  match3rdPartyRes(req)

  try {    
    res.status(200).end()
  } catch (error) {
    console.log(error);
    res.status(404).end()
  }
})

app.listen(port, () => {
  console.log(port, `Live at http://localhost:${port}`)
})