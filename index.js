const { response } = require('express')
const uuid = require('uuid')
const express = require('express')
const cors = require('cors')


const port = 3003;


const app = express()
app.use(express.json())
app.use(cors())

/*
    query params => meusite.cm/users?nome=rodolfo&age=28  // filtros, colocando informações no url
    Route params => /users/2                              // Buscar, deletar ou atualizar algo especifico
    Request body =>

    try          => Prevenir erros, colocar o codigo correto dentro do try
    catch (err)  => Colocar o erro dentro do catch com o RETURN e a mensagem de retorno
*/


const users = []

app.get('/users', (request, response) => {
 try {  return response.json(users)} 

 catch(error) {
    return response.json(`error: ${error}.message`)
 }
})

app.post('/users', (request, response) => {
try{
    const { name, age} = request.body
    const user = { id: uuid.v4(), name, age}

    if(age < 18) throw new Error("you're so young to be here")
    users.push(user)

    return response.status(201).json(user)}

catch(err){
        return response.status(400).json({error: err.message})
    }
})


app.put('/users/:id', (request, response) => {
    const { id } = request.params

    const { name, age} = request.body

    const updateUser = { id, name, age}

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json("User not founded")
    }

    users[index] = updateUser


    return response.json(updateUser)
})

app.delete('/users/:id', (request, response) => {

    const {id} = request.params
    
    const index = users.findIndex(user => user.id === id)

    users.splice(index, 1)

    return response.status(202).json()
})










app.listen(port, () => {
    console.log(`Server started on ${port} 😛`)
})
