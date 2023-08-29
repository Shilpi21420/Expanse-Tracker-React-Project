import React, { useRef, useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions, themeActions} from "../../store/redux";
import { saveAs } from "file-saver";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import { useContext } from "react";



export default function AddExpense() {

  const  history=useHistory();
  const auth = useContext(AuthContext);

  const dispatch = useDispatch();
  let expense = useSelector((state) => state.expense.expense);
  const darktheme=useSelector((state)=>state.theme.darktheme)
  console.log('darktheme',darktheme);
 
  // const [expense, setexpense] = useState([]);
  const [trigger, settrigger] = useState(false);
  const [edit, setedit] = useState(false);
  const [id, setid] = useState("");

  const categoryvalue = useRef();
  const pricevalue = useRef();
  const desvalue = useRef();
  const idToken = localStorage.getItem('idToken');
  const UID = localStorage.getItem('UID');
  console.log(idToken);
  //<---------------------------------------Edit Expense------------------------------------------->

  const editexpense = (price, des, cat, idvalue) => {
    setedit(true);
    setid(idvalue);

    pricevalue.current.value = price;
    desvalue.current.value = des;
    categoryvalue.current.value = cat;
  };

  //<---------------------------------------Main Submit Handler------------------------------------------->

  const submithandler = async (event) => {
    event.preventDefault();

    if (edit) {
      const details = {
        price: pricevalue.current.value,
        des: desvalue.current.value,
        cat: categoryvalue.current.value,
      };
      const response = await axios.put(
        `https://expance-tracker-react-project-default-rtdb.firebaseio.com/expenses/${UID}/${id}.json`,
        details
      );
      if (response.status === 200) {
        console.log("Expense successfuly Updated");
        setedit(false);
      }
      pricevalue.current.value = "";
      desvalue.current.value = "";
      categoryvalue.current.value = "";
    } else {
      const details = {
        price: pricevalue.current.value,
        des: desvalue.current.value,
        cat: categoryvalue.current.value,
      };
      const res = await axios.post(
        `https://expance-tracker-react-project-default-rtdb.firebaseio.com/expenses/${UID}.json`,
        details
      );
      // setpost(post+1);
      if (res.status === 200) settrigger(!trigger);
      // setexpense([...expense, details]);

      pricevalue.current.value = "";
      desvalue.current.value = "";
      categoryvalue.current.value = "";
    }
  };

  //<---------------------------------------Delete  Expense------------------------------------------->
  const deleteexpense = async (id) => {
    setid(id);
    const respose = await axios.delete(
      `https://expance-tracker-react-project-default-rtdb.firebaseio.com/expenses/${UID}/${id}.json`
    );
    if (respose.status === 200) {
      console.log("SUCCESSFULLY DELETE EXPENSE");

      settrigger(!trigger);
    }
  };

  //<---------------------------------------Use Effect ------------------------------------------->
  async function myfun() {
    const data = await axios.get(
      `https://expance-tracker-react-project-default-rtdb.firebaseio.com/expenses/${UID}.json?print=pretty`
    );
    const respose = await data.data;
    console.log("espo", respose);

    const trasformData = [];
    for (const key in respose) {
      trasformData.push({
        id: key,
        price: respose[key].price,
        des: respose[key].des,
        cat: respose[key].cat,
      });
    }
    console.log("transformdata", trasformData);
    // setexpense(trasformData);
    dispatch(expenseActions.onAddOrGetExpense(trasformData));
  }
  useEffect(() => {
    myfun();
    // console.log('trigger',trigger,expense);
  }, [trigger]);

  //-----------------------------------THEME CHANGE-----------------------------------------------

  let c = false;
  expense.map((item) => {
    c += Number(item.price);
  });
  console.log(c);

  const themechange = () => {
    dispatch(themeActions.changetheme());
    console.log("Theme change Successful");
  };
  //<----------------------------------------DOWNLOAD EXPENSE----------------------------------------->
  const onDownloadClickHandler = () => {
    const csv = Object.entries(expense).map((expense) => {
      // return ["Col1", "Col2", "Col3"]
      
      return [expense[1].price, expense[1].des, expense[1].cat];
    });

    console.log(csv);
    const makeCSV = (rows) => {
      return rows.map((r) => r.join(",")).join("\n");
    };

    const blob1 = new Blob([makeCSV(csv)]);

    
    const temp = URL.createObjectURL(blob1)
    saveAs(temp, "file1.csv")
  };

  const logout=()=>{
    history.replace('/login');
    auth.logout();
  };

  

  return (<>
  <div><button
            onClick={logout}
            class="btn btn-outline-dark float-right"
            data-mdb-ripple-color="dark"
          >Logout
            </button></div>
    <form onSubmit={submithandler}>
      <MDBContainer fluid>
        <MDBCard className={darktheme ? 'text-black card text-white bg-dark mb-3':'text-black'} style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Add Expense
                </p>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-hand-holding-usd" />
                  &nbsp;
                  <MDBInput
                    label="Price"
                    id="form2"
                    type="Number"
                    ref={pricevalue}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-info" />
                  &nbsp;&nbsp;&nbsp;
                  <MDBInput
                    label="Description"
                    id="form3"
                    type="text"
                    ref={desvalue}
                  />
                </div>
                <div>
                  <label>Category : </label>&nbsp;
                  <select id="category" ref={categoryvalue}>
                    <option value="Food">Food</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Movie">Movie</option>
                    <option value="Travel">Travel</option>
                    <option value="Travel">Shooping</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <br />

                <MDBBtn className="mb-4" size="lg" type="submit">
                  {edit ? "update" : "Add Expense"}
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <table class="table">
                  {expense.length === 0 && (
                    <h3 className="text-center my-2">
                      No Expense Found Please Add
                    </h3>
                  )}
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">Price</th>
                      <th scope="col">Descrpition</th>
                      <th scope="col">Category</th>
                      <th scope="col">edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>

                  <tbody className={darktheme ?"text-white":''}>
                    {expense.map((item) => (
                      <tr>
                        <td>{item.price}</td>
                        <td>{item.des}</td>
                        <td>{item.cat}</td>
                        <td>
                          {
                            <i
                              className="fas fa-pen"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                editexpense(
                                  item.price,
                                  item.des,
                                  item.cat,
                                  item.id
                                );
                              }}
                            />
                          }
                        </td>
                        <td>
                          {
                            <i
                              className="fas fa-trash"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                deleteexpense(item.id);
                              }}
                            />
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <br />

                  {c > 1000 && (
                    <MDBBtn
                      style={{ textAlign: "center" }}
                      onClick={themechange}
                    >
                      {" "}
                      {darktheme  ? 'Deactivate Premium':'activate Premium'}
                    </MDBBtn>
                    
                    
                  )} &nbsp; { darktheme && 
                    

                    <button style={{textAlign:"center"}} type="button" class="btn btn-light  " onClick={onDownloadClickHandler}>Download Expense</button>}
                
                
                </table>
                
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
    </>
  );
}
