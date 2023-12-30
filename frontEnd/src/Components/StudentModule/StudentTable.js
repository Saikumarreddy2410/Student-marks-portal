import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineModeEditOutline,
  MdDeleteOutline,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { toggleContext } from "../../App";
import { toast } from "react-toastify";

const StudentTable = ({ searchText }) => {
  const [data, setData] = useState([]);

  // toggle context is used open Modal whenever i click edit icon

  const { setModal } = useContext(toggleContext);

  const toggleModal = () => {
    setModal(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios.get("http://localhost:8000/student/get");
    // console.log(response);
    setData(response.data);
  };

  const deleteData = (studentid) => {
    if (window.confirm("Are you sure that you wanted to delete that data ?")) {
      axios.delete(`http://localhost:8000/student/remove/${studentid}`);
      toast.success("Row Deleted Successfully!");

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
        <p className="text-2xl text-center mt-44 ">Sorry, there is no data.</p>
      ) : (
        <table className="w-full ">
          <thead className="">
            <tr className="">
              <th>StudentId</th>
              <th>StudentName</th>
              <th>StudentClass</th>
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
                  const { studentid, studentname, studentclass } = item;
                  return (
                    <tr key={studentid} className="text-center">
                      <td>{studentid}</td>
                      <td>{studentname}</td>
                      <td>{studentclass} class</td>
                      <td>
                        <div className="flex justify-around">
                          <Link to={`/view/${studentid}`}>
                            <MdOutlineRemoveRedEye
                              className="hover:bg-white text-violet-500 p-1 rounded-full cursor-pointer"
                              size={28}
                            />
                          </Link>

                          <Link to={`/update/${studentid}`}>
                            <MdOutlineModeEditOutline
                              onClick={toggleModal}
                              className="hover:bg-white text-[#388def] p-1 rounded-full cursor-pointer"
                              size={28}
                            />
                          </Link>

                          <MdDeleteOutline
                            onClick={() => deleteData(studentid)}
                            className="hover:bg-white text-[#e34b48] p-1 rounded-full cursor-pointer"
                            size={28}
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

export default StudentTable;
