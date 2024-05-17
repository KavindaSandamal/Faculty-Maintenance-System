import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminPage from './Pages/AdminPage';
import AcademicStaffPage from './Pages/AcademicStaffPage';
import StudentPage from './Pages/StudentPage';
import MaintenanceDivisionPage from './Pages/MaintenanceDivisionPage';
import AddRequest from './Pages/AddRequest';
import MaintenanceRequestDetail from './Pages/MaintenanceRequestDetail';
import Home from './Pages/Home_Page/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/adminPage/:Id" element={<AdminPage />} />
      <Route path="/academicStaffPage/:Id" element={<AcademicStaffPage />} />
      <Route path="/studentPage/:Id" element={<StudentPage />} />
      <Route path="/maintenanceDivisionPage/:Id" element={<MaintenanceDivisionPage />} />
      <Route path="/maintenanceRequest/:id" element={<MaintenanceRequestDetail/>} />

      <Route path="/add-request/:Id" element={<AddRequest />} />
    </Routes>
  );
}