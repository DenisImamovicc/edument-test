const clientReqsStorage = []

const getClientStoredReq = () => clientReqsStorage.splice(0, 1);

const updateClientReq = (req) => {
    const webhookData = req.body.result
    clientReqsStorage[0].Data = webhookData
    clientReqsStorage[0].isCompleted = true
}

const createClientReq = (req) => {
    const clientId = req.params.id
    return clientReqsStorage.push({ "clientId": clientId, "Data": null, isCompleted: false })
}

const isMatchingId = (req) => {
    const webhookId = req.params.id
    return clientReqsStorage.some(clientReq => webhookId === clientReq.clientId)
}

module.exports = {
    getClientStoredReq,
    updateClientReq,
    createClientReq,
    isMatchingId
}