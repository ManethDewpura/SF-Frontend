import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/footer/Footer.jsx";
import CustomerNavbar from "../components/navbar/CustomerNavbar.jsx";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({
    FirstName: '',
    LastName: '',
    emailAddress: '',
    phoneNumber: '',
    employeeType: '',
    password: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`http://localhost:5555/ProfileEmp/${token}`);
        setProfileInfo(response.data);
      } catch (error) {
        console.error("Error fetching profile information:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e, field) => {
    setProfileInfo((prevProfileInfo) => ({
      ...prevProfileInfo,
      [field]: e.target.value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!profileInfo.FirstName || !profileInfo.LastName || !profileInfo.emailAddress || !profileInfo.phoneNumber || !profileInfo.password || !profileInfo.employeeType) {
        alert("Please fill in all the fields.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(profileInfo.emailAddress)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    if (!/^\d{10}$/.test(profileInfo.phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (profileInfo.password.length < 8 || !/\d/.test(profileInfo.password) || !/[!@#$%^&*]/.test(profileInfo.password)) {
        alert("Password must be at least 8 characters long and contain at least one digit and one special character.");
        return;
    }

    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.put(`http://localhost:5555/EditProfileEmp/${token}`, profileInfo);
        console.log("Profile information saved:", response.data);
    } catch (error) {
        console.error("Error saving profile:", error);
    }
};

  const handleDeleteProfile = async () => {
    
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(`http://localhost:5555/EditProfileEmp/${token}`);
      console.log("Profile deleted:", response.data);
  
      // Navigate to RegisEmp page after successful deletion
      navigate("/RegisEmp");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <CustomerNavbar />
      <div className="p-2 mb-2 rounded-lg w-1/30 pr-2">
                <input type="image" src="emp.png" alt="image" />
            </div>
      <div className="bg-white p-8 rounded-lg shadow-md mb-4">
        <h1 className="text-4xl font-bold mb-4 text-center">EDIT PROFILE DETAILS</h1>
        <div className="flex flex-wrap">
          <div className="bg-primary p-2 mb-2  w-1/2 pr-2">
            <p>First Name</p>
          </div>
          <div className="bg-bgc p-2 mb-2  w-1/2 pr-2">
            <input type="text" value={profileInfo.FirstName} onChange={(e) => handleInputChange(e, 'FirstName')} />
          </div>
          <div className="bg-primary p-2 mb-2  w-1/2 pr-2">
            <p>Last Name</p>
          </div>
          <div className="bg-bgc p-2 mb-2  w-1/2 pr-2">
            <input type="text" value={profileInfo.LastName} onChange={(e) => handleInputChange(e, 'LastName')} />
          </div>
          <div className="bg-primary p-2 mb-2  w-1/2 pr-2">
            <p>Email Address</p>
          </div>
          <div className="bg-bgc p-2 mb-2  w-1/2 pr-2">
            <input type="text" value={profileInfo.emailAddress} onChange={(e) => handleInputChange(e, 'emailAddress')} />
          </div>
          <div className="bg-primary p-2 mb-2  w-1/2 pr-2">
            <p>Phone Number</p>
          </div>
          <div className="bg-bgc p-2 mb-2  w-1/2 pr-2">
            <input type="text" value={profileInfo.phoneNumber} onChange={(e) => handleInputChange(e, 'phoneNumber')} />
          </div>
          <div className="bg-primary p-2 mb-2  w-1/2 pr-2">
            <p>Employee Type</p>
          </div>
          <div className="bg-bgc p-2 mb-2 w-1/2 pr-2">
          <select value={profileInfo.employeeType} onChange={(e) =>  handleInputChange(e, 'employeeType')} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="HR_Manager">HR Manager</option>
          <option value="Stock_Manager">Stock Manager</option>
          <option value="Repair_Manager">Repair Manager</option>
          <option value="Process_Manager">Process Manager</option>
          <option value="Quality_Control_Manager">Quality Control Manager</option>
          <option value="Store_Manager">Store Manager</option></select>
          </div>
          <div className="bg-primary p-2 mb-2 w-1/2 pr-2">
            <p>Password</p>
          </div>
          <div className="bg-bgc p-2 mb-2  w-1/2 pr-2">
            <input type="password" value={profileInfo.password} onChange={(e) => handleInputChange(e, 'password')} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
              <button className="bg-black text-white font-bold py-2 px-8 rounded mt-4"
              onClick={handleSaveProfile}
              >SAVE</button>
              <button className="bg-red text-white font-bold py-2 px-8 rounded mt-4"
              onClick={handleDeleteProfile}
              >DELETE</button>
            </div>
            <Footer />
    </div>
  );
}

export default EditProfile;