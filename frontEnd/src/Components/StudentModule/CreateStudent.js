import { Formik, Form } from "formik";
import { TfiClose } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import FormControl from "../Form.js/FormControl";
import { useContext, useEffect, useState } from "react";
import { toggleContext } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

const CreateS = () => {
  const { toggle, modal } = useContext(toggleContext);
  const { studentid } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    studentname: "",
    studentclass: "",
  });
  const [storedValues, setStoredvalues] = useState(initialValues);

  const openToggle = () => {
    toggle(true);
  };

  const closeToggle = () => {
    openToggle();
    navigate("/student");
  };

  // To get Data from backend

  useEffect(() => {
    if (studentid) {
      axios
        .get(`http://localhost:8000/student/get/${studentid}`)
        .then((res) => {
          const { studentid, ...abstractData } = res.data[0];
          setInitialValues({
            studentname: abstractData.studentname,
            studentclass: abstractData.studentclass,
          });
          setStoredvalues({
            studentname: abstractData.studentname,
            studentclass: abstractData.studentclass,
          });
        });
    }
  }, [studentid]);

  // This is used to render storedValues whenever update the form

  useEffect(() => {
    setInitialValues(storedValues);
  }, [storedValues]);

  const validationSchema = Yup.object({
    studentname: Yup.string()
      .trim()
      .min(5, "studentName must be greater than 5")
      .required("studentName cannot be blank"),
    studentclass: Yup.number()
      .typeError("Must be a number")
      .min(1, "Number must be at least 1")
      .max(12, "Number must be at most 12")
      .required("StudentClass cannot be blank"),
  });

  const onSubmit = (values, { resetForm }) => {
    if (!studentid) {
      axios
        .post("http://localhost:8000/student/create", values)
        .then((response) => console.log(response))
        .catch((error) => {
          toast.error("Error:", error);
          console.error("Error:", error);
        });
      toast.success("Yay! Student added Successfully!");
    } else {
      axios
        .put(`http://localhost:8000/student/update/${studentid}`, values)
        .then((response) => console.log("update", response))
        .catch((error) => {
          toast.error("Error:", error);
          console.error("Error:", error);
        });
      toast.success("Student update Successfully!");
    }

    resetForm();

    // Reset form and Navigate to Teacher route

    let timeId = setTimeout(() => {
      navigate("/student");
    }, 500);

    return () => {
      clearTimeout(timeId);
    };
  };

  return (
    modal && (
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md transition-all duration-300 ease">
              <Form className="bg-white w-[30rem] absolute rounded p-8 flex flex-col gap-5">
                <div className="flex items-center justify-between border-b pb-5">
                  <h1 className="text-lg font-semibold">
                    {studentid ? "Update student Portal" : "Student Portal"}
                  </h1>
                  <TfiClose
                    className="cursor-pointer"
                    size={15}
                    onClick={closeToggle}
                  />
                </div>

                <FormControl
                  control="input"
                  type="text"
                  label="StudentName"
                  name="studentname"
                />

                <FormControl
                  control="input"
                  type="text"
                  label="StudentClass"
                  name="studentclass"
                />

                <div className="flex justify-end gap-5 border-t pt-5">
                  <button type="submit" className="border px-6 py-1 rounded">
                    {studentid ? "Update" : "Create"}
                  </button>
                  <button
                    onClick={closeToggle}
                    className="border px-6 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    )
  );
};

export default CreateS;
