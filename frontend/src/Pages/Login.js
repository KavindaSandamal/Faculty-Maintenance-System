import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (user) => {
    const { role, _id: id } = user;

    switch (role) {
      case 'Student':
        navigate(`/studentPage/${id}`);
        break;
      case 'Admin':
        navigate(`/adminPage/${id}`);
        break;
      case 'Academic Staff':
        navigate(`/academicStaffPage/${id}`);
        break;
      case 'Maintenance Division':
        navigate(`/maintenanceDivisionPage/${id}`);
        break;
      default:
        console.error('Unknown role:', role);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        regNo,
        password,
      });

      if (response.data.success) {
        handleLogin(response.data.user);
        toast.success('Login successful!');
      } else {
        toast.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred during login');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };


  return (
    <body> {/* This should be replaced with a valid JSX element */}
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Sign in with</p>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="register"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="Enter a valid user name"
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    User Name
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account? <a href="/register" className="link-danger">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

export default Login;
