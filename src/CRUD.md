## Controller
# dependences (services): validator, responseFormat()
# action: [req, res]
- post : 
  - validate req
  - save in db
  - res
- put :
  - verify id
  - validate req
  - save
  - res
- delete :
  - validate id
  - delete
  - res
- get : (one)
  - validate id
  - res
- get : (all)
  - res

## Model
# dependences (services): db(firebase), responseFormat(error server)
# action: [req, res]
- getAll
- getById 
- create
- update
- delete