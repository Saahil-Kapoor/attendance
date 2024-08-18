import React from 'react'

import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
  const [details,setDetails] = React.useState({
    email:'',
    password:'',
  });


  const [checked ,setCheck] = React.useState(false);

  const navigate = useNavigate();

  function handleChange(event){
    setDetails({...details,[event.target.name]:event.target.value});
  }

  function handleCheck(){
    setCheck(!checked);
  }


  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:details.email,password:details.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      if(checked){
        localStorage.setItem('token',json.token);
        localStorage.setItem('roll_no',json.roll_no);
        localStorage.setItem('name',json.name);
        console.log(localStorage.getItem('token'));
        console.log(checked);
        navigate('/'); 
      }else{
        localStorage.setItem('roll_no',json.roll_no);
        localStorage.setItem('name',json.name);
        console.log("unchecked")
        navigate('/'); 
      }
    }
    else if(!json.success){
      alert("Enter valid credentials");
    }
  }

  return (
    <div>
      <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <main className="form-signin vh-100 w-75 m-auto">
          <form>
            <h1 className="h3 mb-3 fw-normal">Login</h1>
            <div className="form-floating mb-4">
              <input type="email" className="form-control" id="mail" placeholder="name@example.com" value={details.email} onChange={handleChange} name='email'></input>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-4">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={details.password} onChange={handleChange} name="password"></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
              <input className="form-check-input" type="checkbox" value={checked} id="flexCheckDefault" onChange={handleCheck}></input>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>

            <button className="btn btn-primary w-100 py-2 mb-4" type="submit" onClick={handleSubmit}>Sign in</button>
            <Link to="/signUp" className="btn btn-primary w-100 py-2 " >New User</Link>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
          </form>
        </main>
        <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      </div>
    </div>
  )
}