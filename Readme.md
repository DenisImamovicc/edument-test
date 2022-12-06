# Edument test api

## Api built for communicating between 3rd party service and client.
### Built with:Node.js,Express

**How to interact with api in following order:**

Start api from localhost:3000 by opening a new terminal and typing:

```
npm start
```
Type this command to simulate client request.
```
curl -X POST http://localhost:3000/client/1
```
Type this on a software like Postman to simulate 3rd party res with data on req body.
```
curl -X POST -H 'Content-Type: application/json' -d '{ "result": "ok" }' 
http://localhost:3000/webhook/1 
```
To simulate error handling from 3rd party res send non matching id from postman.Ex if client sent req with id of 1 and postman sends res with id 3.
