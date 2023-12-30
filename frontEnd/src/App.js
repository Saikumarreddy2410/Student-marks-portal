import { Outlet, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Components/Sidebar";
import Student from "./Components/StudentModule/Student";
import Teacher from "./Components/TeacherModule/Teacher";
import Marks from "./Components/MarksModule/Marks";
import Body from "./Components/Body";
import { createContext, useState } from "react";
import CreateTeacher from "./Components/TeacherModule/CreateTeacher";
import TeacherView from "./Components/TeacherModule/TeacherView";
import MarksView from "./Components/MarksModule/MarksView";
import CreateMarks from "./Components/MarksModule/CreateMarks";
import StudentView from "./Components/StudentModule/StudentView";
import CreateStudent from "./Components/StudentModule/CreateStudent";

export const toggleContext = createContext();
function App() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <toggleContext.Provider
      value={{
        modal,
        setModal,
        toggle,
      }}
    >
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={true}
        />
        <Sidebar />
        <Outlet />
      </div>
    </toggleContext.Provider>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },

      // ------------   Student Routers  ---------------------

      {
        path: "/student",
        element: <Student />,
      },
      {
        path: "/create",
        element: <CreateStudent />,
      },
      {
        path: "/update/:studentid",
        element: <CreateStudent />,
      },
      {
        path: "/view/:studentid",
        element: <StudentView />,
      },
      // ------------   teacher Routers  ---------------------

      {
        path: "/teacher",
        element: <Teacher />,
      },
      {
        path: "/teacher/create",
        element: <CreateTeacher />,
      },
      {
        path: "/teacher/update/:teacherid",
        element: <CreateTeacher />,
      },

      {
        path: "teacher/read/:teacherid",
        element: <TeacherView />,
      },

      // ------------   Marks Routers  ---------------------
      {
        path: "/marks",
        element: <Marks />,
      },
      {
        path: "/marks/create",
        element: <CreateMarks />,
      },
      {
        path: "/marks/update/:marksid",
        element: <CreateMarks />,
      },
      {
        path: "/marks/view/:marksid",
        element: <MarksView />,
      },
    ],
  },
]);

export default App;
