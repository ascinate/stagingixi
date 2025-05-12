"use client"
import Form from "next/form";
import { useState } from "react";

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  

     const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("Logging in...");
    
        try {
          const response = await fetch("https://iconsguru.ascinatetech.com/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setMessage("Login successful!");
          } else {
            setMessage(data.message || "Login failed.");
          }
        } catch (error) {
          console.error("Error logging in:", error);
          setMessage("Something went wrong.");
        }
      };
    
            return(
                <>
                <Form onSubmit={handleLogin}>

                    
                   <div className="country-dp">
                       <label className="form-label">Email ID</label>
                       <input
                        type="email"
                        className="form-control"
                        placeholder="Username or Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                   </div>

                   <div className="country-dp">
                       <label className="form-label">Password</label>
                       <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                   </div>
                    <div className="form-group">
                        <button type="submit" className="btn w-100 continue-bn"> Login </button>
                    </div>

                </Form>
                {message && <p>{message}</p>}
                </>
            )
}
export default  LoginForm;
