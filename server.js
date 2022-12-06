const express = require('express')
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const { getClientStoredReq, updateClientReq, createClientReq, isMatchingId } = require("./utils/functions");
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.post('/client/:id', (req, res) => {
  createClientReq(req)
  eventEmitter.once('3rdPartyRes', () => {
    try {
      return res.send(getClientStoredReq()).status(200)
    } catch (error) {
      return res.send(error).status(404)
    }
  });
})

app.post('/webhook/:id', async (req, res) => {
  if (isMatchingId(req)) {
    updateClientReq(req)
    eventEmitter.emit('3rdPartyRes')
    return res.sendStatus(200)
  }
  return res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(PORT, `Live at http://localhost:${PORT}`)
})