const clientReqsStorage = []

const getClientStoredReq = () => clientReqsStorage.splice(0, 1);

const updateClientReq = (req) => {
    const webhookData = req.body.result
    return clientReqsStorage[0].Data = webhookData
}

const createClientReq = (req) => {
    const clientId = req.params.id
    return clientReqsStorage.push({ "clientId": clientId, "Data": null })
}

const isMatchingId = (req) => {
    const webhookId = req.params.id
    if (webhookId === clientReqsStorage[0].clientId) {
        return true
    }
    return false
}

module.exports = {
    getClientStoredReq,
    updateClientReq,
    createClientReq,
    isMatchingId
}