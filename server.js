const express = require('express')
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const { getClientStoredReq,updateClientReq,createClientReq,isMatchingId } = require("./utils/functions");

const app = express()
const port = 3000


app.use(express.json())
app.post('/client/:id', (req, res) => {
  createClientReq(req)
  eventEmitter.on('3rdPartyRes', () => {
    try {
      res.send(getClientStoredReq()).status(200)
    } catch (error) {
      res.send(error).status(404)
    }
  });
})

app.post('/webhook/:id', async (req, res) => {
  try {
    if (isMatchingId(req)) {
      updateClientReq(req)
      eventEmitter.emit('3rdPartyRes')
      return res.sendStatus(200)
    }
    res.sendStatus(404).send(error.message)
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(port, () => {
  console.log(port, `Live at http://localhost:${port}`)
})