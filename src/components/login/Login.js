import React, { useContext, useRef,useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import AuthContext from "../../store/auth-context";
import {useDispatch,useSelector} from 'react-redux';
import { authActions } from "../../store/redux";

function Login() {
  const [isloading, setisloading] = useState(false);
  // const auth = useContext(AuthContext);
  const dispatch=useDispatch();
  const isauth=useSelector((state)=>state.auth)
  console.log('isauth',isauth);

  const history = useHistory();

  const emailref = useRef("");
  const passref = useRef("");

  const submithandler = async (event) => {
    event.preventDefault();

    const Userdetails = {
      email: emailref.current.value,
      password: passref.current.value,
      returnSecureToken: true,

    };
    emailref.current.value = "";
    passref.current.value = "";
    try {
      const respose = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEtNWoyF5WYbPvMtZg__NxHYWU1NYVCJE",
        Userdetails
      );
      
      console.log(respose);
      console.log("User has successfully logged in", respose.data.idToken);
      console.log(respose.data.localId);
      localStorage.setItem("idToken", respose.data.idToken);
      localStorage.setItem("UID",respose.data.localId);
      dispatch(authActions.ongetToken(localStorage.getItem('idToken')));
      console.log('isauthcheck',isauth);
      // auth.login(localStorage.getItem("idToken"));
      history.replace("/expenses");
    } catch (error) {
      console.log(error.response.data.error.message);
      alert(error.response.data.error.message);
    }

    //   alert("Password Doesn't Match");
   
  };
  const forgetpass =async()=>{
   

    if(emailref.current.value === "")
    {
      alert('please fill Email');
    }
    else{
      setisloading(true);
      const details = {
      requestType:"PASSWORD_RESET",
      email: emailref.current.value
     }
     try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBEtNWoyF5WYbPvMtZg__NxHYWU1NYVCJE",
          details
        );
        if(response.data.email)
        {
          setisloading(false);
        }
      
      } catch (error) {
        alert(error.response.data.error.message);
        setisloading(false);

      }

    }
  }

  return (
    <form onSubmit={submithandler}>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Login
                </p>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    ref={emailref}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    ref={passref}
                    required
                    
                  />
                </div>
                
                {isloading ? <p>Password is resting.. Check Your Mail</p> : <span style={{cursor:"pointer",color:'red'}} className="mx-2" color="tertiary" rippleColor="dark" onClick={forgetpass}>
                  Froget Password ?
                </span>}
                <br/>
                <MDBBtn className="mb-4" size="lg" type="submit">
                  Login
                </MDBBtn>
                Don't Have An Account
                <span className="mx-2" color="tertiary" rippleColor="light">
                  <Link to="/">Sign Up Now</Link>
                </span>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
      
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}

export default Login;
