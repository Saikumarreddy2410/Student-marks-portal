import React, { useState } from "react";
import { TfiMenu, TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("home");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <aside className="bg-gray-600">
      <button
        className={`absolute top-5 left-4 cursor-pointer hover:bg-gray-300 p-3 bg-gray-400 rounded-full focus:outline-none ${
          isOpen ? "hidden" : "visible"
        }`}
        onClick={toggleSidebar}
      >
        <TfiMenu size={20} />
      </button>
      <div
        className={`fixed left-0 pt-5 w-52 bg-gray-500 h-[100vh]  px-4 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-52"
        }`}
      >
        <div className="flex justify-between items-center w-full py-3">
          <Link to="/">
            <p className="p-2 text-xl font-bold text-white bg-[#4895ef] rounded-lg">
              Logo
            </p>
          </Link>
          <button
            className="hover:bg-gray-100 p-3 bg-gray-400 rounded-full focus:outline-none"
            onClick={toggleSidebar}
          >
            <TfiClose size={20} />
          </button>
        </div>

        {/* -----------  Nav bar Links  ------------------ */}

        <ul className="flex flex-col text-center gap-2 mt-3 w-full font-semibold">
          <Link to={"/"} onClick={() => handleTabClick("home")}>
            <li
              className={`hover:bg-gray-400 w-full rounded py-2  ${
                selectedTab === "home" ? "bg-gray-400" : ""
              }`}
            >
              Home
            </li>
          </Link>

          <Link to={"/student"} onClick={() => handleTabClick("student")}>
            <li
              className={`hover:bg-gray-400 w-full rounded py-2  ${
                selectedTab === "student" ? "bg-gray-400" : ""
              }`}
            >
              Student
            </li>
          </Link>

          <Link to={"/teacher"} onClick={() => handleTabClick("teacher")}>
            <li
              className={`hover:bg-gray-400 w-full rounded py-2  ${
                selectedTab === "teacher" ? "bg-gray-400" : ""
              }`}
            >
              Teacher
            </li>
          </Link>

          <Link to={"/marks"} onClick={() => handleTabClick("marks")}>
            <li
              className={`hover:bg-gray-400 w-full rounded py-2  ${
                selectedTab === "marks" ? "bg-gray-400" : ""
              }`}
            >
              Marks
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
