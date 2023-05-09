
/* 

- Querry Params => meusite.com/user?nome=Marlos&age=29 // FILTROS 
- Route Params => /user/2  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO 
- Request Body => {"name":"Marlos","age":29}


Metodos HTTP 
- GET => Buscar unformacoes no back-end 
-POST => Criar informacoes no back-end 
-PUT/PATCH => alterar/atualizar informacoes no back- end  
-DELETE => deletar informacoes no back-end 

-MIDDLEWARE =>  INTERCEPTADOR = tem o poder de parar o alterar dados da minha requiscao 


*/






const CheckUserId =  (request,response,next)=>{
    const{id}= request.params 
    const index = users.findIndex(user => user.id === id )   
    
    if(index <0){
        return response.status(404).json({message:"USER NOT FOUND"})
    } 

    request.userIndex = index 
    request.UserId = id 

    next()

}


const { request } = require("express")
const express = require('express')
const uuid = require('uuid')

const port = 3002
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

app.put('/user/:id',CheckUserId, (request,response)=>{ 
   
    const {name,age} = request.body
    const index = request.userIndex
    const id = request.UserId 
   
                                                                            /*FIND = econtra a informcao solicitada no array e retronar a informcao */ 
                                                                            /* FINDINDEX = Ele retorna a posicao da informcao que foi solicitado. Caso nao foi encontrado a informacao 
                                                                            ele retona -1 */ 
    const updateUsers = {id,name,age} 
    
    users[index] = updateUsers 

    return response.json( updateUsers ) 
}) 

app.delete('/user/:id', CheckUserId,(request,response)=>{ 
    
    const index = request.userIndex
    
     users.splice(index,1)
    
        return response.status(204).json()
    })
    
   





















app.listen(port, ()=>{

    console.log(`🚀 server started on port  ${port}`)
})