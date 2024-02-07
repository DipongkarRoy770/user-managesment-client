
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])


  const handleAddUser = event => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user)
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log('post api requst is hitting', data)

        const newUser = [...users ,data]
        setUsers(newUser)
        form.reset()
      })
  }
  return (
    <>

      <h1>User Managesment System- 2024</h1>
      <h3>my user serial no: ${users.length}</h3>

      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='name' /> <br />
        <input type="email" name='email' placeholder='email' /><br />
        <input type="submit" value="Add user now" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>Roll No :{user.id}* Student name :{user.name}</p>)
        }
      </div>

    </>
  )
}

export default App
