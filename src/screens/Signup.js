import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {

  const [credentials, setCredentials] = useState({name:"", email:"", password: "", geolocation: ""});

  const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:4009/api/createUser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation})
      })
      console.log(response)
      const json = await response.json();
      console.log("JSON : ", json)
      if(!json.success) {
        alert("Enter Valid Credentials")
      }
  }

  const onChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>  
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            autoComplete="username"
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="geolocation" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="geolocation"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onChange}
            autoComplete="street-address"
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
      </form>
    </div>
  );
}

export default Signup
