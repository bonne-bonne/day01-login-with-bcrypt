// =========== IMPORTS ========= //
import './App.css';
import { useState } from 'react';

function App() {
  const [emailLogin, setEmailLogin] = useState(); // What the user types into the email box
  const [passwordLogin, setPasswordLogin] = useState(); // What the user types into the password box
  const [messageToRender, setMessageToRender] = useState(); // Message to say if the login was successful or not

  // Function to save the user inputs into their corresponding states
  // We can have this external function or do them inline
  // function handleInput (e) {
  //   if (e.target.name === "email") {
  //     setEmailLogin(e.target.value);
  //   } else if (e.target.name === "password") {
  //     setPasswordLogin(e.target.value);
  //   }
  // }

  // Function to login the user
  function handleLogin (e) {
    e.preventDefault();
    console.log("Login testing")
    
    // fetch to send the login info to the backend and database
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
      headers: { "Content-Type": "application/json" }
    })
    .then((res) => {
      console.log(res)

      // Successful login
      if (res.status === 200){
        console.log("Successful login")
        setMessageToRender(<span style={{color: "aqua", textAlign: "center"}}>You logged in! 🥳</span>)
      }

      // Unsuccessful login
      if (res.status === 401) {
        console.log("Login failed")
        setMessageToRender(<span style={{color: "red", textAlign: "center"}}>Your email or password was incorrect 🥺</span>)
        throw new Error("Your email or password was incorrect"); // We can throw an error that the catch block will pick up
      }

    })
    .catch((error) => console.error(error))

  }
 

  return (
    <>
      <h1>Full Stack Login Form</h1>

      {/* ===== FORM ELEMENTS ===== */}
      <form className='form'>
        {/* Email text box */}
        <label>Email:</label>
        {/* <input type='email' className='textbox' name="email" onChange={handleInput} /> */}
        <input type='email' className='textbox' name="email" onChange={(e) => setEmailLogin(e.target.value)} />
        <br />

        {/* Password text box */}
        <label>Password:</label>
        {/* <input type="password" className='textbox' name="password" onChange={handleInput} /> */}
        <input type="password" className='textbox' name="password" onChange={(e) => setPasswordLogin(e.target.value)} />
        <br />

        {/* Submit button */}
        <button name="login" type="submit" onClick={handleLogin}>Login</button>
        <br />
        {messageToRender}

      </form>
    </>
  )
}

export default App
