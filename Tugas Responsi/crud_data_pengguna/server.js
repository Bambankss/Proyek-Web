// Modul yang digunakan
const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 3000

const DATA_FILE = path.join(__dirname,"data","users.json")

app.use(express.json())
app.use(express.static("public"))


// membaca data
function getUsers(){
    const data = fs.readFileSync(DATA_FILE)
    return JSON.parse(data)
}

// menyimpan data
function saveUsers(users){
    fs.writeFileSync(DATA_FILE,JSON.stringify(users,null,2))
}

// READ
app.get("/users",(req,res)=>{
    const users = getUsers()
    res.json(users)
})

// CREATE
app.post("/users",(req,res)=>{

    const users = getUsers()

    const newUser = {
        id: Date.now(),
        nama:req.body.nama,
        email:req.body.email
    }

    users.push(newUser)

    saveUsers(users)

    res.json(newUser)

})

// UPDATE
app.put("/users/:id",(req,res)=>{

    const users = getUsers()

    const id = parseInt(req.params.id)

    const user = users.find(u=>u.id === id)

    if(user){
        user.nama = req.body.nama
        user.email = req.body.email
    }

    saveUsers(users)

    res.json(user)

})

// DELETE
app.delete("/users/:id",(req,res)=>{

    let users = getUsers()

    const id = parseInt(req.params.id)

    users = users.filter(u=>u.id !== id)

    saveUsers(users)

    res.json({message:"deleted"})

})

app.listen(PORT,()=>{
    console.log(`Server berjalan di http://localhost:${PORT}`)
})