import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    status: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role') {
      const status = value === 'Maintenance Division' ? 'inactive' : 'active';
      setFormData({ ...formData, role: value, status });
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

    const status = formData.status || (role === 'Maintenance Division' ? 'inactive' : 'active');

    const data = {
      fullName,
      email,
      regNo,
      role,
      department,
      contactNumber,
      password,
      confirmPassword,
      status
    };

    axios.post('https://faculty-maintenance-system-api.vercel.app/api/register/user', data)
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
            status: ''
          });

          navigate('/');
          toast.success('User Created Successfully');
        }
      })
      .catch((error) => {
        console.error('Error:', error.response.data.error);
      });
  };

  return (
    <section id="hero" className="hero d-flex align-items-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <form onSubmit={onSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0" style={{ marginTop: '-70px' }}>Sign in with</p>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    value={formData.fullName}
                    className="form-control"
                    onChange={handleInputChange}
                    name="fullName"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <input
                    type="email"
                    value={formData.email}
                    className="form-control"
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  value={formData.regNo}
                  className="form-control"
                  onChange={handleInputChange}
                  name="regNo"
                  placeholder="Enter registration number"
                  required
                />
                <small className="d-block text-muted">Format: EG/AC/AD/MD followed by numbers</small>
                <small className="d-block text-muted">
                  EG: Student<br />
                  AC: Academic Staff<br />
                  MD: Maintenance Division
                </small>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4">
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
                <div className="col-md-6 mb-4">
                  <select
                    className="form-control"
                    value={formData.department}
                    onChange={handleInputChange}
                    name="department"
                    required
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
              </div>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    value={formData.contactNumber}
                    className="form-control"
                    onChange={handleInputChange}
                    name="contactNumber"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <input
                    type="password"
                    value={formData.password}
                    className="form-control"
                    onChange={handleInputChange}
                    name="password"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    className="form-control"
                    onChange={handleInputChange}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4 d-flex align-items-end">
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6 hero-img d-flex align-items-center justify-content-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;