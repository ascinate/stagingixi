
"use client";
import { useState } from "react";
import NavicationHome from "../components/NavicationHome";
import Link from "next/link";
import Form from "next/form";
import Image from "next/image";
import Footer from "../components/Footer";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isVisible, setIsVisible] = useState(true);
  const [hiddend, setHiddend] = useState(false);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible); 
    setHiddend(!hiddend); 
  };
  
  const hideVisibl = () => {
    setIsVisible(prevState => !prevState);
    setHiddend(prevState => !prevState); 
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      const response = await fetch("https://iconsguru.ascinatetech.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,password  }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <>
    <NavicationHome/>
    <main className="float-start w-100 register-pages-crm">
        <div className="container">
            {hiddend && (
              <div className="col-lg-5 mx-auto mb-3">
                <button onClick={hideVisibl} className="back-tbn01 btn"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg> Back </button>
              </div>
            )}
            <h2 className="text-center comon-heading-sub"> Continue with Email </h2>
            <p className="text-center sub-para"> Already have an account? <Link href='/login'> <strong> Log in </strong> </Link> </p>
            {isVisible && (
            <div className="col-lg-8 mx-auto email-div01">
                <button className="btn btn-comon-socail mx-auto d-flex align-items-center justify-content-center"> 
                  <span> 
                    <Image loading="lazy" src="/logo_googleg_48dp.svg"
                                          alt="iconsguru"
                                          width={24}
                                          height={24} /> 
                  </span>  Continue with Google 
                </button>
                <button className="btn btn-comon-socail mx-auto d-flex align-items-center justify-content-center"> 
                  <span> 
                    <Image loading="lazy" src="/faceic.svg"
                                          alt="iconsguru"
                                          width={24}
                                          height={24} /> 
                  </span>  Continue with Facebook 
                </button>
                <button className="btn btn-comon-socail mx-auto d-flex align-items-center justify-content-center"> 
                  <span> 
                    <Image loading="lazy" src="/apple.svg"
                                          alt="iconsguru"
                                          width={24}
                                          height={24} /> 
                  </span>  Continue with Apple
                </button>

                <button onClick={toggleVisibility} className="continue-btn mx-auto d-table btn" > Continue with Email </button>
                
                <div className="text-center liast-listp mt-4">
                    <p> By clicking this button, I agree to Iconsguru <br/> <span> <Link href='/register'> Privacy Policy </Link> & <Link href='/register'> Terms of Use. </Link> </span>  </p>
                </div>
            </div>
             )}
            {hiddend && (
              <div className="col-lg-5 mx-auto email-div01">
                <div className="comon-rgesigner-sections d-inline-block w-100">
                    <Form onSubmit={handleRegister}>
                      <div className="form-group">
                        <label className="form-label"> Email </label>
                        <input
                        className="form-control"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                      </div>
                      <div className="form-group mt-3">
                          <label className="form-label"> Password </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                      </div>
                    
                      <button className="continue-btn w-100 mt-4 mx-auto d-table btn" type="submit">Register</button>
                      <div className="text-center liast-listp mt-4">
                          <p> By clicking this button, I agree to Iconsguru <br/> <span> <Link href='/register'> Privacy Policy </Link> & <Link href='/register'> Terms of Use. </Link> </span>  </p>
                      </div>
                    </Form>
                    {message && <p>{message}</p>}


                </div>
              </div>
            )}
           
        </div>
    </main>
    <div className="container d-none">
      <h1>Register</h1>

      <button
        onClick={toggleVisibility} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {isVisible ? 'Hide' : 'Show'} Div
      </button>


      {isVisible && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: 'lightblue',
            borderRadius: '8px',
          }}
        >
          This is a toggled div!
        </div>
        )}


        {hiddend && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: 'lightblue',
            borderRadius: '8px',
          }}
        >
          This is a toggled div show!
        </div>
        )}
      
    </div>
    <Footer/>
    </>

  );
}
