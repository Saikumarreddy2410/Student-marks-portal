import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TeacherView = () => {
  const [teacherData, setTeacherData] = useState([]);

  const { teacherid } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8001/teacher/read/" + teacherid)
      .then((res) => {
        setTeacherData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [teacherid]);
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md transition-all duration-300 ease">
      <div className="bg-white w-[20rem] absolute rounded p-8 flex flex-col gap-5 capitalize">
        <h2 className="text-xl">
          <strong>Teacher Details</strong>
        </h2>
        <p>
          TeacherID : <strong>{teacherData?.teacherid} </strong>
        </p>
        <p>
          Name : <strong>{teacherData?.teachername}</strong>
        </p>
        <p>
          Subject : <strong>{teacherData?.subject}</strong>
        </p>

        <div className="text-center border-t pt-5">
          <Link to="/teacher">
            <button type="button" className="border px-6 py-1 rounded">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
