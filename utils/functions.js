const {clientReqsStorage, removeElByAmount} = require("./variabels")

const getClientStoredReq = (req) => clientReqsStorage.splice(findClientReqById(req),removeElByAmount);

const updateClientReq = (req) => clientReqsStorage[findClientReqById(req)].Data = req.body.result

const createClientReq = (req) => clientReqsStorage.push({ "clientId": req.params.id, "Data": null })

const findClientReqById = (req) => clientReqsStorage.findIndex(clientReq => clientReq.clientId === req.params.id)
   
const isMatchingId = (req) => clientReqsStorage.some(clientReq => clientReq.clientId === req.params.id)

module.exports = {
    getClientStoredReq,
    updateClientReq,
    createClientReq,
    isMatchingId
}