import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../styles/MyFormulario.css";

export default function SingFormulario() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Nickname, setNickname] = useState("")
    const redirect = useNavigate();

    async function submit(e){
      e.preventDefault();
      console.log(Email, Password);
      let options = {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({Nickname, Email, Password})
      }
      try {
        const response = await (await fetch("http://127.15.0.99:5019/users", options)).json();
        console.log(response);
        if(response.status === 200){
            alert(response.data)
          redirect("/")
        } else{
          alert(response.message)
        }
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <div className='principal'>
    <form onSubmit={submit} >
        <div>
            <h1>Rigister Villafrade's</h1>
        </div>
        <div className='contentForm'>
        <div>
            <label>Nickname</label>
            <input name='Nickname' type='text' placeholder='nickname' onChange={(e)=>setNickname(e.target.value)} required />
            <label>Email</label>
            <input name='Email' type='text' placeholder='ca@example.com' onChange={(e)=>setEmail(e.target.value)} required />
            <label>Password</label>
            <input name='Password' placeholder='password' type="password" onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        </div>
        <div className='contentButton'>
            <button type='submit'>Register</button>
        </div>
        <div className='contSign'>
          <p className='sign'>Ya estoy registrado, <Link to={"/"}>Log in</Link> </p>
        </div>
    </form>
    </div>
  )
}
