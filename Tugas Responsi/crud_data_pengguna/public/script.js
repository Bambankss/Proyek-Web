let editId = null

// fungsi Read
async function loadUsers(){

const res = await fetch("/users")

const users = await res.json()

const table = document.getElementById("userTable")

table.innerHTML=""

users.forEach(user=>{

table.innerHTML += `
<tr>
    <td class="border p-2">${user.id}</td>
    <td class="border p-2">${user.nama}</td>
    <td class="border p-2">${user.email}</td>
    <td class="border p-2 flex gap-2">

    <button onclick="editUser(${user.id},'${user.nama}','${user.email}')" class="bg-yellow-400 px-2 py-1 rounded">
    Edit
    </button>

    <button onclick="deleteUser(${user.id})" class="bg-red-500 text-white px-2 py-1 rounded">
    Delete
    </button>

    </td>
</tr>
`
})

}

// Fungsi Create & Update
async function saveUser(event){

event.preventDefault()

const nama = document.getElementById("nama").value
const email = document.getElementById("email").value

if(editId){

await fetch(`/users/${editId}`,{
 method:"PUT",
 headers:{
 "Content-Type":"application/json"
 },
 body:JSON.stringify({nama,email})
})

editId = null

}else{

await fetch("/users",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({nama,email})
})

}

document.getElementById("nama").value=""
document.getElementById("email").value=""

loadUsers()

}

// Fungsi Edit
function editUser(id,nama,email){

document.getElementById("nama").value = nama
document.getElementById("email").value = email

editId = id

}

// Fungsi Delete
async function deleteUser(id){

await fetch(`/users/${id}`,{
method:"DELETE"
})

loadUsers()

}

loadUsers()