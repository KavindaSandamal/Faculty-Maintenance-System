import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function Login() {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (user) => {
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
      const response = await axios.post('https://faculty-maintenance-system-api.vercel.app/api/login', {
        regNo,
        password,
      });

      if (response.data.success) {
        const { user } = response.data;
        if ('status' in user) {
          if (user.status === 'active') {
            handleLogin(user);
            toast.success('Login successful!');
          } else {
            toast.error('Your account is inactive. Please contact an administrator.');
          }
        } else {
          handleLogin(user);
          toast.success('Login successful!');
        }
      } else {
        toast.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred during login');
    }
  };

  return (
    <div>
      <ToastContainer />
      <section id="hero" className="hero d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div className="col-md-8 col-lg-10 col-xl-8 offset-xl-1">
                <form onSubmit={handleSubmit} style={{marginTop:'-70px'}}>
                  <div className="divider d-flex align-items-center my-5">
                    <p className="text-center fw-bold mx-3 mb-0">Sign in with</p>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="regNo"
                      className="form-control form-control-lg"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                    <label className="form-label" htmlFor="regNo">
                      User Name
                    </label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
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
            <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Login Illustration"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;