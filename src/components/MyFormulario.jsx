import React, { useState } from 'react';
import "../styles/MyFormulario.css";
import { useNavigate } from 'react-router-dom';

export default function MyFormulario() {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const redirect = useNavigate();

  async function submit(e){
    e.preventDefault();
    console.log(Email, Password);
    let options = {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({Email, Password})
    }
    try {
      const response = await (await fetch("http://127.15.0.99:5019/login", options)).json();
      console.log(response);
      if(response.status === 200){
        localStorage.setItem("token", response.token);
        redirect("/home", {
          state:{
            user:{
              nickName: response.nickName,
              email: response.email
            }
          }
        })
      } else{
        alert(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='principal'>
    <form onSubmit={submit}>
        <div>
            <h1>Villafrades's Page</h1>
        </div>
        <div className='contentForm'>
        <div>
            <label>Email</label>
            <input name='Email' type='text' onChange={(e)=>setEmail(e.target.value)} required />
            <label>Password</label>
            <input name='Password' type="password" onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        </div>
        <div className='contentButton'>
            <button type='submit'>Login</button>
        </div>
    </form>
    </div>
  )
}
