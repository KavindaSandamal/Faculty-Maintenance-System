import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Classes from '../Pages/register.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    regNo: '',
    role: '',
    department: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'role') {
      setFormData({ ...formData, role: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (formData.regNo.startsWith('EG')) {
      setFormData({ ...formData, role: 'Student' });
    } else if (formData.regNo.startsWith('AC')) {
      setFormData({ ...formData, role: 'Academic Staff' });
    } else if (formData.regNo.startsWith('AD')) {
      setFormData({ ...formData, role: 'Admin' });
    } else if (formData.regNo.startsWith('MD')) {
      setFormData({ ...formData, role: 'Maintenance Division' });
    } else {
      setFormData({ ...formData, role: '' });
    }
  }, [formData.regNo]);

  const onSubmit = (e) => {
    e.preventDefault();
  
    const { fullName, email, regNo, role, department, contactNumber, password, confirmPassword } = formData;
  
    const data = {
      fullName,
      email,
      regNo,
      role,
      department,
      contactNumber,
      password,
      confirmPassword,
    };
  
    axios.post('http://faculty-maintenance-system-api.vercel.app/api/register/user', data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert('User Created Successfully');
          setFormData({
            fullName: '',
            email: '',
            regNo: '',
            role: '',
            department: '',
            contactNumber: '',
            password: '',
            confirmPassword: '',
          });
  
          navigate('/');
          toast.success('Request Created Successfully');
        }
      })
      .catch((error) => {
        console.error('Error:', error.response.data.error);
      });
  };
  

  return (
    <body>
    <section className="vh-100">
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-6">
            <form onSubmit={onSubmit}>
              <div className="text-center mb-4">
                <h2>Sign Up</h2>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  value={formData.fullName}
                  className="form-control"
                  onChange={handleInputChange}
                  name="fullName"
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  value={formData.email}
                  className="form-control"
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  value={formData.regNo}
                  className="form-control"
                  onChange={handleInputChange}
                  name="regNo"
                  placeholder="Enter registration number"
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  value={formData.role}
                  className="form-control"
                  onChange={handleInputChange}
                  name="role"
                  placeholder="Enter role"
                  disabled
                />
              </div>
              <div className="form-outline mb-4">
                <select
                  className="form-control"
                  value={formData.department}
                  onChange={handleInputChange}
                  name="department"
                >
                  <option value="">Select department</option>
                  <option value="Electrical and Information Department">Electrical and Information Department</option>
                  <option value="Civil and Environmental Department">Civil and Environmental Department</option>
                  <option value="Mechanical and Manufacturing Department">Mechanical and Manufacturing Department</option>
                  <option value="Marine and Naval Architecture">Marine and Naval Architecture</option>
                  <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
                  <option value="Maintenance Division">Maintenance Division</option>
                  <option value="Admin Sector">Admin Sector</option>
                </select>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  value={formData.contactNumber}
                  className="form-control"
                  onChange={handleInputChange}
                  name="contactNumber"
                  placeholder="Enter contact number"
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  value={formData.password}
                  className="form-control"
                  onChange={handleInputChange}
                  name="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  value={formData.confirmPassword}
                  className="form-control"
                  onChange={handleInputChange}
                  name="confirmPassword"
                  placeholder="Confirm password"
                />
              </div>
              <div className="text-center">
              <button type="submit" className="btn btn-secondary btn-lg">Sign Up</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </body>
  );
}

export default Register;
