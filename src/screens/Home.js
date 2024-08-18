import React from 'react'

import { Link,useNavigate } from 'react-router-dom';

export default function Home() {
  var text = "Stranger";
  if(localStorage.getItem('token') != null){
    text = localStorage.getItem('name');
  }
  const navigate = useNavigate();
  const handleSignOut = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('roll_no');
    navigate('/');
  }
  return (
    <div>
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span className="fs-4">Hello {text}</span>
          </a>

          <ul className="nav nav-pills">
            <li className="nav-item"><Link to="#" className="nav-link active" aria-current="page">Home</Link></li>
            {!(localStorage.getItem('token'))?<li className="nav-item"><Link className='nav-link active ms-2' to="/signUp">SignUp</Link></li>:" "}
            {!(localStorage.getItem('token'))?<li className="nav-item"><Link to="/Login" className="nav-link active ms-2">Login</Link></li>:<button className='nav-link active ms-2' onClick={handleSignOut}>Sign Out</button>}
          </ul>
        </header>
      </div>
    </div>
  )
}
