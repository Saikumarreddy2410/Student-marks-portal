import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StudentView = () => {
  const [studentData, setStudentData] = useState([]);
  // console.log(studentData);
  const { studentid } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8000/student/view/" + studentid)
      .then((res) => {
        setStudentData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [studentid]);
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md transition-all duration-300 ease">
      <div className="bg-white w-[20rem] absolute rounded p-8 flex flex-col gap-5 capitalize">
        <h2 className="text-xl">Student Details</h2>
        <p>
          StudentId : <strong>{studentData?.studentid}</strong>
        </p>
        <p>
          Name : <strong>{studentData?.studentname}</strong>
        </p>
        <p>
          Class : <strong>{studentData?.studentclass} </strong>
        </p>
        <div className="text-center border-t pt-5">
          <Link to="/student">
            <button type="button" className="border px-6 py-1 rounded">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
