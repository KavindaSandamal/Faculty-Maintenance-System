import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Classes from '../Pages/addrequest.module.css';
import 'react-toastify/dist/ReactToastify.css';

function AddRequest() {
  const { Id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department: '',
    place: '',
    issueType: '',
    priority: '',
    image: null,
    description: '',
    submittedBy: Id,
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const { department, place, issueType, priority, image, description, submittedBy } = formData;
  
    const data = new FormData();
    data.append('department', formData.department === 'Other' ? formData.otherDepartment : department);
    data.append('place', place);
    data.append('issueType', formData.issueType === 'Other' ? formData.otherIssueType : issueType);
    data.append('priority', priority);
    data.append('image', image);
    data.append('description', description);
    data.append('submittedBy', submittedBy);
  
    try {
      const response = await axios.post('https://faculty-maintenance-system-api.vercel.app/api/maintenanceRequest', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        toast.success('Request Created Successfully');
        setFormData({
          department: '',
          place: '',
          issueType: '',
          priority: '',
          image: null,
          description: '',
          submittedBy: Id,
        });
  
        navigate(`/studentPage/${Id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const renderDepartmentInput = () => {
    if (formData.department === 'Other') {
      return (
        <div className="form-outline mb-4">
          <input
            type="text"
            value={formData.otherDepartment} // Update value to formData.otherDepartment
            className="form-control"
            onChange={handleInputChange} // Handle changes in otherDepartment
            name="otherDepartment" // Update name to otherDepartment
            placeholder="Enter department or place"
          />
        </div>
      );
    }
    return null;
  };
  
  const renderIssueTypeInput = () => {
    if (formData.issueType === 'Other') {
      return (
        <div className="form-outline mb-4">
          <input
            type="text"
            value={formData.otherIssueType} // Update value to formData.otherIssueType
            className="form-control"
            onChange={handleInputChange} // Handle changes in otherIssueType
            name="otherIssueType" // Update name to otherIssueType
            placeholder="Enter issue type"
          />
        </div>
      );
    }
    return null;
  };
  
  
  

  
  return (
    
    <body>
    <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="../images/features copy.png"
                className="img-fluid"
                alt="Sample image"
              />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form >
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Add your Request</p>
                </div>
          <div className="form-outline mb-4">
          <select
                  className="form-control"
                  value={formData.department}
                  onChange={handleInputChange}
                  name="department"
                  placeholder="Enter department or place"
                >
                  <option value="">Select department or palce</option>
                  <option value="Electrical and Information Department">Electrical and Information Department</option>
                  <option value="Civil and Environmental Department">Civil and Environmental Department</option>
                  <option value="Mechanical and Manufacturing Department">Mechanical and Manufacturing Department</option>
                  <option value="Marine and Naval Architecture">Marine and Naval Architecture</option>
                  <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
                  <option value="Maintenance Division">Maintenance Division</option>
                  <option value="Admin Sector">Admin Sector</option>
                  <option value="Canteen">Canteen</option>
                  <option value="Hostel D">Hostel D</option>
                  <option value="Hostel C">Hostel C</option>
                  <option value="Library">Library</option>
                  <option value="LT1">LT1</option>
                  <option value="LT2">LT2</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {renderDepartmentInput()}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  value={formData.place}
                  className="form-control"
                  onChange={handleInputChange}
                  name="place"
                  placeholder="Enter the place"
                />
                <label>Eg: Room-303</label>
              </div>
              <div className="form-outline mb-4">
              <select
                  className="form-control"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  name="issueType"
                  placeholder="Enter issue type"
                >
              <option value="">Select Issue Type</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="HVAC (Heating, Ventilation, and Air Conditioning)">HVAC (Heating, Ventilation, and Air Conditioning)</option>
              <option value="Appliance">Appliance</option>
              <option value="Structural">Structural</option>
              <option value="Security and Safety">Security and Safety</option>
              <option value="IT and Technology">IT and Technology</option>
              <option value="Grounds Maintenance">Grounds Maintenance</option>
              <option value="Other">Other</option>

            </select>
            </div>
            {renderIssueTypeInput()}
            <div className="form-outline mb-4">
            <select
                  className="form-control"
                  value={formData.priority}
                  onChange={handleInputChange}
                  name="priority"
                  placeholder="Enter Priority"
                >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
            </select>
            </div>

            <div className="form-outline mb-4">
            <input type="file" accept="image/*" onChange={handleImageChange}  name="image" />
            </div>

            <div className="form-outline mb-4">
                <input
                  type="text"
                  value={formData.description}
                  className="form-control"
                  onChange={handleInputChange}
                  name="description"
                  placeholder="Enter description"
                />

            <button className= "btn btn-secondary btn-lg" style={{marginTop : "9px"}}    type="submit" onClick={onSubmit}>
              submit
            </button>
        </div>
        </form>
        </div> 
      </div>
      </div>
      </section>
    </body>
    
  );
}

export default AddRequest;
