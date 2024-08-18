import React from 'react'
import {Link} from 'react-router-dom'

export default function () {
  console.log("hello attendace");
  const [details, setDetails] = React.useState({
    name: '',
    email: '',
    rollno: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:details.name,email:details.email,roll_no:details.rollno,password:details.password})
    });
    const json =await response.json();
    console.log(json);
    if(json.success){
      alert("account created");
    }
  }
  function handleChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }

  return (
    <div>

      <div className="d-flex align-items-center py-4 bg-body-tertiary">


        <main className="form-signin vh-100 w-75 m-auto">
          <form>
            <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
            <div className="form-floating mb-4">
              <input type="text" className="form-control" id="name" placeholder="Name" value={details.name} onChange={handleChange} name='name'></input>
              <label htmlFor="floatingPassword">Name</label>
            </div>
            <div className="form-floating mb-4">
              <input type="email" className="form-control" id="mail" placeholder="name@example.com" value={details.email} onChange={handleChange} name='email'></input>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-4">
              <input type="text" className="form-control" id="roll" placeholder="Enter your Roll No" value={details.roll_no} onChange={handleChange} name='rollno'></input>
              <label htmlFor="floatingPassword">Roll No</label>
            </div>
            <div className="form-floating mb-4">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={details.password} onChange={handleChange} name="password"></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            {/*}
    <div className="form-check text-start my-3">
      {<input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"></input>}
      <label className="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    {*/}


            <button className="btn btn-primary w-100 py-2 mb-4" type="submit" onClick={handleSubmit}>Sign in</button>
            <Link to="/Login" className="btn btn-primary w-100 py-2 " >Already a user</Link>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
          </form>
        </main>
        <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      </div>
    </div>
  )
}
