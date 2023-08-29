import React, { useRef } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
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

function Signup() {
  const nameref = useRef("");
  const emailref = useRef("");
  const passref = useRef("");
  const cnfpassref = useRef("");
  const submithandler = async (event) => {
    event.preventDefault();
    if (passref.current.value === cnfpassref.current.value) {
      const Userdetails = {
        email: emailref.current.value,
        password: passref.current.value,
        returnSecureToken: true,
      };
      nameref.current.value = "";
      nameref.current.value = "";
      passref.current.value = "";
      cnfpassref.current.value = "";
      try {
        await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEtNWoyF5WYbPvMtZg__NxHYWU1NYVCJE",
          Userdetails
        );
  
        console.log("User has successfully signed up");
        alert("Successfully signed up");
        
      } catch (error) {
        alert(error.response.data.error.message);
      }
      
    } else {
      alert("Password Doesn't Match");
    }
  };

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
                  Sign up
                </p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    ref={nameref}
                    required
                  />
                </div>
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
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Repeat your password"
                    id="form4"
                    type="password"
                    ref={cnfpassref}
                    required
                  />
                </div>
                <MDBBtn className="mb-4" size="lg" type="submit">
                  Register
                </MDBBtn>
                Already Have An Account
                <span className="mx-2" color="tertiary" rippleColor="light" >
                <Link to='/login'>
                  Login Now
                </Link> 
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

export default Signup;
