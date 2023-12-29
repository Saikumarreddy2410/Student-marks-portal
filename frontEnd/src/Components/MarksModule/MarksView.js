import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MarksView = () => {
  const [marksData, setMarksData] = useState([]);

  const {
    studentid,
    studentname,
    studentclass,
    teacherid,
    teachername,
    subject,
    marks,
  } = marksData;
  const { marksid } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8002/marks/view/" + marksid)
      .then((res) => {
        setMarksData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [marksid]);
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md transition-all duration-300 ease">
      <div className="bg-white w-[20rem] absolute rounded p-8 flex flex-col gap-5 capitalize">
        <h2 className="text-xl">
          <strong>Marks Details</strong>
        </h2>
        <p>
          StudentID : <strong>{studentid} </strong>
        </p>
        <p>
          StudentName : <strong>{studentname} </strong>
        </p>
        <p>
          StudentClass : <strong>{studentclass} </strong>
        </p>
        <p>
          TeacherID : <strong>{teacherid} </strong>
        </p>
        <p>
          TeacherName : <strong>{teachername}</strong>
        </p>
        <p>
          Subject : <strong>{subject}</strong>
        </p>
        <p>
          Marks : <strong>{marks}</strong>
        </p>

        <div className="text-center border-t pt-5">
          <Link to="/marks">
            <button type="button" className="border px-6 py-1 rounded">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarksView;
