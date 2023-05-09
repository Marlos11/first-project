
/* 

- Querry Params => meusite.com/user?nome=Marlos&age=29 // FILTROS 
- Route Params => /user/2  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO 
- Request Body => {"name":"Marlos","age":29}


Metodos HTTP 
- GET => Buscar unformacoes no back-end 
-POST => Criar informacoes no back-end 
-PUT/PATCH => alterar/atualizar informacoes no back- end  
-DELETE => deletar informacoes no back-end*/







const { request } = require("express")
const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())




const users = []



app.get('/user', (request,response)=>{
    
    return response.json( users)
}) 

app.post('/user', (request,response)=>{
    const {name,age} = request.body 
    const user = {id:uuid.v4(),name,age } 

    users.push(user)

    return response.status(201).json(user)
    
    
}) 

app.put('/user/:id', (request,response)=>{ 
    const{id}= request.params
    const {name,age} = request.body
                                                                            /*FIND = econtra a informcao solicitada no array e retronar a informcao */ 
                                                                            /* FINDINDEX = Ele retorna a posicao da informcao que foi solicitado. Caso nao foi encontrado a informacao 
                                                                            ele retona -1 */ 
    
    
    const updateUsers = {id,name,age}   
    const index = users.findIndex(user => user.id === id )   
    
    if(index <0){
        return response.status(404).json({message:"USER NOT FOUND"})
    }
    
    users[index] = updateUsers 

    return response.json( updateUsers ) 
}) 

app.delete('/user/:id', (request,response)=>{ 
    
    const {id} = request.params
    
    const index = users.findIndex(user => user.id === id )   

    if(index <0){
        return response.status(204).json()
    }
    
    users.splice(index,1)
    
}) 




















app.listen(port, ()=>{

    console.log(`🚀 server started on port  ${port}`)
})