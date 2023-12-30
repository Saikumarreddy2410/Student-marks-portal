import React, { useContext, useState } from "react";
import { toggleContext } from "../../App";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import TeacherTable from "./TeacherTable";

const Teacher = () => {
  const { setModal } = useContext(toggleContext);

  const [searchText, setSearchText] = useState("");

  const toggleModal = () => {
    setModal(true);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="ml-52 relative py-8 px-12">
      <p className=" text-2xl font-semibold">Teacher Module</p>
      <div className="flex justify-between relative my-5">
        <input
          type="search"
          placeholder="Search Teacher"
          className="border focus:outline-none w-72 p-1 pl-8 rounded"
          onChange={handleChange}
        />
        <div className="absolute flex items-center inset-y-0 left-0 pl-2">
          <FaSearch className="text-gray-400" />
        </div>
        <Link to="/teacher/create">
          <div>
            <button
              type="primary"
              onClick={toggleModal}
              className="create-btn"
            >
              Add Teacher
            </button>
          </div>
        </Link>
      </div>
      <TeacherTable searchText={searchText} />
    </div>
  );
};

export default Teacher;
