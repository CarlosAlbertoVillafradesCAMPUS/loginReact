import React from 'react';
import "../styles/MyFormulario.css";

export default function MyFormulario() {
  return (
    <div className='principal'>
    <form>
        <div>
            <h1>Villafrades's Page</h1>
        </div>
        <div className='contentForm'>
        <div>
            <label>User</label>
            <input name='User' type='text' required />
            <label>Password</label>
            <input name='Password' type="password" required />
        </div>
        </div>
        <div className='contentButton'>
            <button>Login</button>
        </div>
    </form>
    </div>
  )
}
