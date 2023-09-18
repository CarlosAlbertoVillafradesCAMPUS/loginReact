import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css"

export default function Home() {
  const [nombre, setNombre] = useState("");
  const redirect = useNavigate()

  const peticionFetch = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": token,
      }),
    };
    try {
      const response = await (await fetch(
        "http://127.15.0.99:5019/users",
        options
      )).json();
      console.log(response);
      if (response.status === 200) {
        setNombre(response.data.nombreUser);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Ejecuta la función fetch solo una vez, cuando se renderiza el componente
  useEffect(() => {
    peticionFetch();
  }, []);

  const Logout = () =>{
    localStorage.removeItem("token");
    redirect("/")
  }

  return (
    <div className='principalHome'>
    <div className='infoHome'>
      <div className='textHome'>
        <p className='nickname'>{nombre}</p>
        <p className='text'>Bienvenido al Home</p>
      </div>
      <br />
      <br />
      <div className='containerButtonHome'>
      <button onClick={Logout} >Log out</button>
      </div>
    </div>
    </div>
  )
}
