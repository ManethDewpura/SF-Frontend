// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner.jsx";
import SubmitButton from "../../components/button2/SubmitButton.jsx";
import HrNavbar from "../../components/navbar/staffheader/HrNavbar.jsx";
import StaffFooter from "../../components/footer/stafffooter/StaffFooter.jsx";
import CancelButton from "../../components/button2/CancelButton.jsx";
import { enqueueSnackbar } from "notistack";

const EditRequestResignation = () => {
  const [empID, setEmpID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/resign/${id}`)
      .then((res) => {
        const data = res.data;
        setEmpID(data._id);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setType(data.type);
        setReason(data.reason);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar("Error fetching data", { variant: "error" });
      });
  }, []);

  const handleResignation = () => {
    const data = {
      empID,
      firstName,
      lastName,
      reason,
      type,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/resign/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Request updated successfully", { variant: "success" });
        navigate("/resign/TerminationPendingList");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar("Error updating data", { variant: "error" });
      });
  };

  return (
    <div className='w-full h-full bg-fixed bg-no-repeat bg-bgform' style={{ backgroundPosition: 'top right', backgroundSize: 'cover' }}>
      <HrNavbar req={true} />

      <div className="p-4">
        {loading ? <Spinner /> : ""}

        <div className="bg-bgc border-2 border-bgc rounded-xl w-[900px] p-8 mx-auto font-BreeSerif m-4">
          <center>
            <h1 className="text-6xl my-8 font-Philosopher text-ternary font-semibold">
              Edit Request to terminate Employee Contract
            </h1>
          </center>
          <label className="mb-2 font-BreeSerif cursor-pointer text-black">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            readOnly
            className="h-11 p-2 mb-8 border-gray-200 rounded-md border-2 w-full shadow-sm"
            value={empID}
          />
          <div className="flex flex-row justify-between mt-2">
            <div className="w-[400px]">
              <label className="mb-2 font-BreeSerif cursor-pointer text-black">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                readOnly
                className="h-11 p-2 mb-8 border-gray-200 rounded-md border-2 w-full shadow-sm"
                value={firstName}
              />
            </div>
            <div className="w-[400px]">
              <label className="mb-2 font-BreeSerif cursor-pointer text-black">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                readOnly
                className="h-11 p-2 mb-8 border-gray-200 rounded-md border-2 w-full shadow-sm"
                value={lastName}
              />
            </div>
          </div>
          <p>Current Type: {type}</p>
          <div className="flex flex-row mt-2">
            <label>Options : </label>

            <div className="ml-4 mb-8">
              <input
                className="cursor-pointer accent-secondary"
                type="radio"
                name="type"
                value={type}
                id="resignation"
                onChange={() => setType("Resign")}
              />
              <label
                htmlFor="Resignation"
                className=" ml-2 font-BreeSerif cursor-pointer text-ternary"
              >
                Resignation
              </label>
            </div>
            <div className="ml-4">
              <input
                className="cursor-pointer accent-secondary"
                type="radio"
                name="type"
                value={type}
                id="termination"
                onChange={() => setType("Terminate")}
              />
              <label
                htmlFor="Termination"
                className=" ml-2 font-BreeSerif cursor-pointer text-ternary"
              >
                Termination
              </label>
            </div>
          </div>
          <div className="mt-2">
            <label className="mb-2 font-BreeSerif cursor-pointer text-black">
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              value={reason}
              className="h-11 p-2 mb-8 border-gray-200 rounded-md border-2 w-full shadow-sm"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="flex flex-row mt-4 items-center justify-center">
            <div className="mr-10">
              <SubmitButton onClick={handleResignation} />
            </div>
            <div className="mr-10">
              <Link to="/resign/TerminationPendingList">
                <CancelButton />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <StaffFooter />
    </div>
  );
};

export default EditRequestResignation
