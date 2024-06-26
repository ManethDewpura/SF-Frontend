import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router";
import DeleteButton from "../../components/button2/DeleteButton";
import { Link } from "react-router-dom";
import RejectButton from "../../components/button2/RejectButton";
import HrNavbar from "../../components/navbar/staffheader/HrNavbar";
import StaffFooter from "../../components/footer/stafffooter/StaffFooter";

const ViewSalary = () => {
  const [viewSalary, setViewSalary] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/salary/${id}`)
      .then((response) => {
        setViewSalary(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full bg-scroll bg-repeat bg-bgform">
      <div>
        <HrNavbar sal={true} />
        <div className="p-4 h-screen overflow-y-auto">
          <div className="flex justify-center items-center">
            <h1 className="text-6xl my-8 font-Philosopher text-ternary font-semibold">
              View Salary Details
            </h1>
          </div>
          <br />

          <br />
          <br />
          {loading ? (
            <Spinner />
          ) : (
            <div className="bg-bgc border-2 border-bgc rounded-xl w-[600px] p-8 mx-auto font-BreeSerif">
              <div className="p-4 mx-auto max-w-lg ">
                <div className="mb-4">
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Full Name
                  </label>
                  <span className="border border-black border-1 p-2 block mb-2">
                    {viewSalary.firstName} {viewSalary.lastName}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Employee ID
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.employeeID}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Employee Contact Number
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.contactNo}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Employee Email
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.email}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Basic Salary
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.basicSalary}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Attendance
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.attendance}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Over Time Hours
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.overtime}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Bonus
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.bonus}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Total Amount
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    RS. {viewSalary.totalAmount}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Notice
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.notice}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Cheque
                  </label>
                  <img
                    src={viewSalary.cheque1}
                    alt="cheque"
                    className="border border-black border-1 p-1 block mb-2"
                  />

                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Date
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.date}
                  </span>
                  <br />
                  <label className="block text-ternary text-sm font-bold mb-3">
                    Notice
                  </label>
                  <span className="border border-black border-1 p-1 block mb-2">
                    {viewSalary.notice}
                  </span>
                </div>
                <br />
                <br />
                <div className="flex justify-between">
                  <Link to={`/SalaryHistory`}>
                    <RejectButton>Back</RejectButton>
                  </Link>
                  <Link to={`/DeleteSalary/${viewSalary._id}`}>
                    <DeleteButton>Delete</DeleteButton>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <StaffFooter />
      </div>
    </div>
  );
};

export default ViewSalary;
