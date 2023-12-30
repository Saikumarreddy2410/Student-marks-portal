import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import StudentTable from "./StudentTable";
import { Link } from "react-router-dom";
import { toggleContext } from "../../App";

const Student = () => {
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
      <p className="text-2xl font-semibold ">Student Module</p>
      <div className="flex justify-between relative my-5">
        <input
          type="search"
          placeholder="Search Student"
          className="border focus:outline-none w-72 p-1 pl-8 rounded"
          onChange={handleChange}
        />
        <div className="absolute flex items-center inset-y-0 left-0 pl-2">
          <FaSearch className="text-gray-400" />
        </div>
        <Link to="/create">
          <div>
            <button
              type="button"
              onClick={toggleModal}
              className="create-btn"
            >
              Add Student
            </button>
          </div>
        </Link>
      </div>
      <StudentTable searchText={searchText} />
    </div>
  );
};

export default Student;
