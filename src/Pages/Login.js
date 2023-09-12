import React, { useEffect, useState } from "react";
import { auth, provider } from "../config.js";
import { signInWithPopup } from "firebase/auth";
import Home from "../../src/Pages/Home.js";
import BackgroundImg from "../../src/assets/login2.jpg";
// import logo from '../assets/bitlogo-transformed.png'
import logo from "../assets/bitlogo-transformed2.png";
import trust from '../assets/trust-wallet.jpg'
import metamask from '../assets/metamask.png'
import {useNavigate} from "react-router-dom"
import antiImg from '../assets/Login/anti.jpg'
import anoImg from '../assets/Login/ano.png'
import PrivacyImg from '../assets/Login/privacy.png'
import Footer from '../Components/Footer.jsx'


const Login = () => {
  const navigate = useNavigate();

  const [value, setvalue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      const userEmail = data.user.email;
      setvalue(userEmail);
      localStorage.setItem("email", userEmail);
      navigate("/home");
  
      // Make a POST request to your server to generate and store the key
      fetch("http://localhost:3000/generate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          console.log(data.userEmail);
          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
          // Handle the error
        });
    });
  };  
  

  useEffect(() => {
    setvalue(localStorage.getItem("email"));
  });

  return (
    <>
    
        

        <div className="flex flex-col items-center justify-center gap-20 md:gap-5 sm:gap-3 w-100vw  h-auto bg-black/90 text-white">
          <div className="flex 2xl:text-7xl xl:text-7xl lg:text-5xl md:text-5xl sm:text-2xl xs:text-xl  font-bold p-10 w-auto h-auto ">
            <p className="flex items-center justify-center m-3 md:m-1">Your</p>
            {/* <img className="w-24 h-24 rounded-full" src={logo} alt="logo" /> */}
            <p className="flex items-center justify-center m-3 md:m-1">Tusted</p>
            <p className="flex items-center justify-center m-3 md:m-1">Wallet</p>
          </div>
         
          <div>
            {value ? (
              <Home /> 
            ) : (
              <button onClick={handleClick}>
                {" "}
                <span className=" font-semibold shadow-lg shadow-black  rounded-full bg-white text-black py-4 px-10 text-3xl hover:bg-black/75 hover:text-white transition-all duration-300 ease-in-out hover:border-2 hover:border-white">
                  SignIn with 
                  <span className="text-blue-400"> G</span> 
                  <span  className="text-red-600">o</span> 
                  <span  className="text-orange-400">o</span> 
                  <span  className="text-blue-400">g</span> 
                  <span  className="text-green-600">l</span>
                  <span  className="text-red-600">e</span>
                </span>
              </button>
            )}
          </div>
          <section className="flex items-center justify-center ml-0 md:py-10">
            <div>
                <h2 className=" mx-10 md:mx-5 sm:mx-3 xs:mx-1 2xl:text-4xl md:text-2xl sm:text-xl sm:text-medium font-semibold ">Keep me ON</h2>
            </div>
             <div className=" flex md:flex-col ">
                <img className="2xl:h-20 2xl:w-40  rounded-lg m-2  " src={trust} alt="" />
                <img className="h-20 w-40 rounded-lg m-2" src={metamask} alt="" />
             </div>
          </section>
          <section className="text-4xl font-semibold items-center justify-evenly flex gap-3 w-full bg-white text-black py-10 sm:flex-col">
            
           <div className="flex items-center justify-center md:flex-col text-2xl sm:py-4 ">
             <h1>Annonymus</h1>
             <img className="h-20 w-20 flex items-center justify-center " src={anoImg} alt="" />
             
           </div  > 
           <div  className="flex items-center justify-center md:flex-col text-2xl sm:py-4 ">
              <h1>Privacy Matters</h1>
              <img  className="h-20 w-20 " src={PrivacyImg} alt="" />
           </div>
           <div  className="flex items-center justify-center md:flex-col text-2xl sm:py-4 ">
              <h1 className="mr-1">Anti theft </h1>
              <img  className="h-20 w-20 " src={antiImg} alt="" />
           </div>
            
         
          </section>
           <Footer/>

         
        
        </div>
       
      
     
     
   
    </>
  );
};

export default Login;
