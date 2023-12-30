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

const TeacherTable = ({ searchText }) => {
  const [data, setData] = useState();
  const { setModal } = useContext(toggleContext);

  // toggle context is used open Modal whenever i click edit icon

  const toggleModal = () => {
    setModal(true);
  };

  const loadTeacherData = async () => {
    const response = await axios.get("http://localhost:8001/teacher/get");
    setData(response.data);
  };

  useEffect(() => {
    loadTeacherData();
  }, []);

  const deleteData = (teacherid) => {
    if (window.confirm("Are you sure that you wanted to delete that data ?")) {
      axios.delete(`http://localhost:8001/teacher/remove/${teacherid}`);
      toast.success("Teacher row Deleted Successfully!");
      // Update the LoadData after 500ms and then Clearing the timeout

      const timerId = setTimeout(() => {
        loadTeacherData();
      }, 500);
      return () => clearTimeout(timerId);
    }
  };

  return (
    <div>
      {data?.length === 0 ? (
        <p className="text-2xl text-center mt-44">Sorry, there is no data.</p>
      ) : (
        <table className="w-full ">
          <thead>
            <tr>
              <th>TeacherId</th>
              <th>TeacherName</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .filter((item) => {
                  return searchText.toLowerCase() === ""
                    ? item
                    : item.teachername?.toLowerCase()?.includes(searchText);
                })
                .map((item) => {
                  const { teacherid, teachername, subject } = item;
                  return (
                    <tr key={teacherid} className="text-center">
                      <td>{teacherid}</td>
                      <td>{teachername}</td>
                      <td>{subject} </td>
                      <td>
                        <div className="flex justify-around">
                          <Link to={`/teacher/read/${teacherid}`}>
                            <MdOutlineRemoveRedEye
                              className="hover:bg-white text-violet-500 p-1 rounded-full cursor-pointer"
                              size={28}
                            />
                          </Link>

                          <Link to={`/teacher/update/${teacherid}`}>
                            <MdOutlineModeEditOutline
                              onClick={toggleModal}
                              className="hover:bg-white text-[#4895ef] p-1 rounded-full cursor-pointer"
                              size={28}
                            />
                          </Link>

                          <MdDeleteOutline
                            onClick={() => deleteData(teacherid)}
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

export default TeacherTable;
