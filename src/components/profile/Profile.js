import React, { useRef, useEffect, useState,useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const  history=useHistory();
  const auth = useContext(AuthContext);
  
 
  const [first, setfirst] = useState([]);
  const [Isverify, setIsverify] = useState(localStorage.getItem('email'));
 
 
  const nameref = useRef("");
  const photourl = useRef("");
  const idToken = localStorage.getItem("idToken");
  const token = {
    idToken: idToken,
  };
  useEffect(() => {
    async function myfun() {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBEtNWoyF5WYbPvMtZg__NxHYWU1NYVCJE",
        token
      );
      

      setfirst(response);
     
    }
    myfun();
  }, [Isverify]);

  let prename = "";
  let preurl = "";
  if (first.length !== 0) {
    prename = first.data.users[0].displayName;
    preurl = first.data.users[0].photoUrl;
  }

  const updatedetails = async (event) => {
    event.preventDefault();
    const name = nameref.current.value;
    const url = photourl.current.value;
    const idToken = localStorage.getItem("idToken");
    const details = {
      idToken: idToken,
      displayName: name,
      photoUrl: url,
      returnSecureToken: true,
    };
    console.log("mydetails", details);
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBEtNWoyF5WYbPvMtZg__NxHYWU1NYVCJE",
        details
      );
      console.log("successful", response);
      nameref.current.value = "";
      photourl.current.value = "";
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };
  console.log(Isverify);
  const verify=async(event)=>{
    event.preventDefault();
    const idToken = localStorage.getItem("idToken");
    const details = {
      requestType:"VERIFY_EMAIL",
      idToken: idToken
     }
     try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBEtNWoyF5WYbPvMtZg__NxHYWU1NYVCJE",
          details
        );
        console.log("Email Send successful", response.data.email);
        localStorage.setItem('email',response.data.email);
        setIsverify(localStorage.getItem('email'));
      
      } catch (error) {
        alert(error.response.data.error.message);
      }
     

}
const logout=()=>{
  history.replace('/login');
  auth.logout();
}
  return (
    <div>
      <button
            onClick={logout}
            class="btn btn-outline-dark float-right"
            data-mdb-ripple-color="dark"
          >Logout
            </button>
      <h3 className="text-center">Contacts Details</h3>
      <hr />
      <div className="container text-center">
        <form onSubmit={updatedetails}>
          <i class="fas fa-user-alt"></i> <label>Full Name : </label> &nbsp;
          <input type="text" ref={nameref} value={prename} />{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fas fa-grin"></i> <label>Profile Photo Url : </label> &nbsp;
          <input type="text" ref={photourl} value={preurl} />
          <br />
          <br />
          <button
            type="submit"
            class="btn btn-outline-dark"
            data-mdb-ripple-color="dark"
          >
            Update
          </button> &nbsp; {Isverify===null && <button
            onClick={verify}
            class="btn btn-outline-dark"
            data-mdb-ripple-color="dark"
          >
            Verify Email
          </button> }
        </form>
        
      </div>
    </div>
  );
}
