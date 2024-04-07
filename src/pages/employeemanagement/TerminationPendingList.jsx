// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import HrNavbar from "../../components/navbar/staffheader/HrNavbar.jsx";
import StaffFooter from "../../components/footer/stafffooter/StaffFooter.jsx";
import ViewButton from "../../components/button2/ViewButton.jsx";
import EditButton from "../../components/button2/EditButton.jsx";
import DeleteButton from "../../components/button2/DeleteButton.jsx";
import TableView from "../../components/table/TableView";
import ViewTerminationRequest from "./ViewTerminationRequest.jsx";

const TerminationPendingList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const headers = [
    "Index",
    "Employee ID",
    "First Name",
    "Last Name",
    "Type",
    "Reason",
    "Status",
    "Operations",
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/resign")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <HrNavbar req={true} />

      <div className="p-4">
        <h1 className="text-4xl mx-[1.75%] my-8 p-4 font-Philosopher text-ternary font-semibold">
          Termination Pending List
        </h1>

        <div className="flex justify-center mb-10">
          {loading ? (
            <Spinner />
          ) : (
            <table className="w-[95%]">
              <TableView headers={headers} />
              <tbody>
                {requests.map((request, index) => (
                  <tr key={request._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">
                      {index + 1}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {request.empID}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {request.firstName}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {request.lastName}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {request.type}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {request.reason}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {request.status}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      <div className="flex justify-center gap-x-4">
                        <ViewButton
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowRequest(true);
                          }}
                        />
                        <Link to={""}>
                          <EditButton />
                        </Link>
                        <DeleteButton
                          onClick={() => {
                            // setSelectedEmployee(employee);
                            // setShowDelete(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showRequest && (
        <ViewTerminationRequest
          request={selectedRequest}
          onClose={() => setShowRequest(false)}
        />
      )}

      <StaffFooter />
    </div>
  );
};

export default TerminationPendingList;