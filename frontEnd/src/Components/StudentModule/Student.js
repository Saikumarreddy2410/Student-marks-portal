import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
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
    <div className="mx-60 relative">
      <p className="text-2xl font-semibold py-4">Student Module</p>
      <div className="flex justify-between relative">
        <input
          type="search"
          placeholder="Search Student"
          className="border focus:outline-none w-96 p-1 pl-8 rounded"
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
              className="border w-36 flex items-center py-1 font-medium justify-around rounded-2xl "
            >
              <HiPlus size={25} />
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
