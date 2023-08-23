// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {


  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password : "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {email, password} = values;

    const {data} = await axios.post(loginAPI, {
        email,
        password
      });

    if(data.success === true){
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
    }
    else{
      toast.error(data.message, toastOptions);
    }
  };
    


  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Container className="mt-5" style={{position: 'relative', zIndex: "2 !important"}}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center mt-5">
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "black"}}  className="text-center" />
          </h1>
            <h2 className="text-black text-center ">Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  name="email" onChange={handleChange} value={values.email}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={values.password}/>
              </Form.Group>
              <div style={{width: "100%", display: "flex" , alignItems:"center", justifyContent:"center", flexDirection: "column"}} className="mt-4">
              <Link to="/forgotPassword" className="text-white lnk" >Forgot Password?</Link>

              <Button  type="submit" className=" text-center mt-3 btnStyle" onClick={handleSubmit}>
                Login
              </Button>

              <p className="mt-3" color={{color: "red"}}>Don't Have an Account? <Link to="/register" className="text-black lnk" >Register</Link></p>
            </div>
            </Form>
          </Col>
        </Row>
      <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
