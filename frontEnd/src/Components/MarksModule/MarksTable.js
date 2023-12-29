import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  MdDeleteOutline,
  MdOutlineModeEditOutline,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toggleContext } from "../../App";

const MarksTable = ({ searchText }) => {
  const { modal, setModal } = useContext(toggleContext);
  const [data, setData] = useState([]);

  // toggle context is used open Modal whenever i click edit icon

  const toggleModal = () => {
    setModal(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios.get("http://localhost:8002/marks/get");
    setData(response.data);
  };

  const deleteData = (marksid) => {
    if (window.confirm("Are you sure that you wanted to delete that data ?")) {
      axios.delete(`http://localhost:8002/marks/remove/${marksid}`);
      toast.success("Marks row deleted successfully!");

      // Update the LoadData after 500ms and then Clearing the timeout

      const timerId = setTimeout(() => {
        loadData();
      }, 500);
      return () => clearTimeout(timerId);
    }
  };

  return (
    <div>
      {data?.length === 0 ? (
        <p className="text-2xl text-center mt-44">Sorry, there is no data.</p>
      ) : (
        <table className="w-full mt-5 border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th>StudentId</th>
              <th>StudentName</th>
              <th>StudentClass</th>
              <th>TeacherId</th>
              <th>TeacherName</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .filter((item) => {
                  return searchText.toLowerCase() === ""
                    ? item
                    : item.studentname?.toLowerCase()?.includes(searchText);
                })
                .map((item) => {
                  const {
                    marksid,
                    teacherid,
                    studentid,
                    studentname,
                    studentclass,
                    teachername,
                    subject,
                    marks,
                  } = item;
                  return (
                    <tr key={marksid} className="text-center ">
                      <td>{studentid}</td>
                      <td>{studentname}</td>
                      <td>{studentclass} class</td>
                      <td>{teacherid}</td>
                      <td>{teachername}</td>
                      <td>{subject}</td>
                      <td>{marks} </td>
                      <td>
                        <div className="flex justify-around">
                          <Link to={`/marks/view/${marksid}`}>
                            <MdOutlineRemoveRedEye
                              className="hover:bg-white text-violet-500 p-1 rounded-full cursor-pointer"
                              size={25}
                            />
                          </Link>

                          <Link to={`/marks/update/${marksid}`}>
                            <MdOutlineModeEditOutline
                              onClick={toggleModal}
                              className="hover:bg-white text-[#4895ef] p-1 rounded-full cursor-pointer"
                              size={25}
                            />
                          </Link>

                          <MdDeleteOutline
                            onClick={() => deleteData(marksid)}
                            className="hover:bg-white text-[#bf0603] p-1 rounded-full cursor-pointer"
                            size={25}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarksTable;
