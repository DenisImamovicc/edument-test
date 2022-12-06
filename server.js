const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

//Utils
const { getClientStoredReq, updateClientReq, createClientReq, isMatchingId } = require("./utils/functions");

app.use(express.json())
app.post('/client/:id', (req, res) => {
  createClientReq(req)
  eventEmitter.once("3rdPartyRes" + req.params.id, () => {
    try {
      return res.send(getClientStoredReq(req)).status(200)
    } catch (error) {
      return res.send(error).status(404)
    }
  });
})

app.post('/webhook/:id', async (req, res) => {
  if (isMatchingId(req)) {
    updateClientReq(req)
    eventEmitter.emit("3rdPartyRes" + req.params.id)
    return res.sendStatus(200)
  }
  return res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(PORT, `Live at http://localhost:${PORT}`)
})