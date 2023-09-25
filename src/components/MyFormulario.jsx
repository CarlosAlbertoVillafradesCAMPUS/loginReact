import React, { useState } from 'react';
import "../styles/MyFormulario.css";
import { Link, useNavigate } from 'react-router-dom';

export default function MyFormulario() {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const redirect = useNavigate();

  const urlApi = JSON.parse(import.meta.env.VITE_MY_SERVER);

  async function submit(e){
    e.preventDefault();
    console.log(Email, Password);
    let options = {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({Email, Password})
    }
    try {
      const response = await (await fetch(`http://${urlApi.host}:${urlApi.port}/login`, options)).json();
      if(response.status === 200){
        localStorage.setItem("token", response.token);
        redirect("/home")
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
            <input name='Email' type='text' placeholder='ca@example.com' onChange={(e)=>setEmail(e.target.value)} required />
            <label>Password</label>
            <input name='Password' placeholder='password' type="password" onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        </div>
        <div className='contentButton'>
            <button type='submit'>Login</button>
        </div>
        <div className='contSign'>
          <p className='sign'>No estoy registrado, deseo <Link to={"/signUp"}>Registrarme</Link> </p>
        </div>
    </form>
    </div>
  )
}
