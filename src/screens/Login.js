import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [credentials, setCredentials] = useState({email:"", password: ""});
  let navigate = useNavigate()

  const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:4009/api/loginuser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      })
      console.log(response)
      const json = await response.json();
      console.log("JSON : ", json)
      if(!json.success) {
        alert("Enter Valid Credentials")
      }

      if(json.success) {

        localStorage.setItem("userEmail", credentials.email)
        localStorage.setItem("authToken", json.authToken)
        console.log(localStorage.getItem("authToken"))
        navigate("/")
      }
  }

  const onChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }


  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>  
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            autoComplete="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger">I'm a new User</Link>
      </form>
    </div>
  )
}

export default Login
