import React, { useContext, useState } from "react";
import { toggleContext } from "../../App";
import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import TeacherTable from "./TeacherTable";

const Teacher = () => {
  const { modal, setModal } = useContext(toggleContext);

  const [searchText, setSearchText] = useState("");

  const toggleModal = () => {
    setModal(true);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="mx-60 relative">
      <p className=" text-2xl font-semibold py-5">Teacher Module</p>
      <div className="flex justify-between relative">
        <input
          type="search"
          placeholder="Search Teacher"
          className="border focus:outline-none w-96 p-1 pl-8 rounded"
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
              className="border w-36 flex items-center py-1 font-medium justify-around rounded-2xl  "
            >
              <HiPlus size={25} />
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
