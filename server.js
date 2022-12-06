const express = require('express')
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const app = express()
const port = 3000

const clientReqsStorage = []

const getClientStoredData = () => clientReqsStorage.splice(0, 1);

function updateClientReq(req) {
  const webhookData = req.body.result
  clientReqsStorage[0].Data = webhookData
  clientReqsStorage[0].isCompleted = true
}

function createClientReq(req) {
  const clientId = req.params.id
  return clientReqsStorage.push({ "clientId": clientId, "Data": null, isCompleted: false })
}

function checkMatchingId(req) {
  const webhookId = req.params.id
  return clientReqsStorage.some(clientReq => webhookId === clientReq.clientId)
}

app.use(express.json())
app.post('/client/:id', (req, res) => {
  createClientReq(req)
  eventEmitter.on('3rdPartyRes', () => {
    try {
      res.send(getClientStoredData()).status(200)
    } catch (error) {
      res.send(error).status(404)
    }
    console.log("end event");
  });
  console.log(clientReqsStorage);
})

app.post('/webhook/:id', async(req, res) => {
  console.log(`recieved webhook from client ${req.params.id}`, req.body, clientReqsStorage);

  //Implement asyncronic error handling and response
  try {
    if (checkMatchingId(req)) {
      updateClientReq(req)
      eventEmitter.emit('3rdPartyRes')
      return res.sendStatus(200)
    }
    res.sendStatus(400).send(error.message)
  } catch (error) {
    console.log(error)
  }

})
app.listen(port, () => {
  console.log(port, `Live at http://localhost:${port}`)
})