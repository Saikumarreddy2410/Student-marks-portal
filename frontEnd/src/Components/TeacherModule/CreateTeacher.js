import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toggleContext } from "../../App";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../Form.js/FormControl";
import { TfiClose } from "react-icons/tfi";
import axios from "axios";
import { toast } from "react-toastify";

const CreateTeacher = () => {
  const { toggle, modal } = useContext(toggleContext);
  const navigate = useNavigate();
  const { teacherid } = useParams();
  const [initialValues, setInitialValues] = useState({
    teachername: "",
    subject: "",
  });
  const [storedValues, setStoredvalues] = useState(initialValues);

  const openToggle = () => {
    toggle(!modal);
  };

  const closeToggle = () => {
    openToggle();
    navigate("/teacher");
  };

  // To get Data from backend

  useEffect(() => {
    if (teacherid) {
      axios
        .get(`http://localhost:8001/teacher/get/${teacherid}`)
        .then((res) => {
          const { teacherid, ...abstractData } = res.data[0];
          setInitialValues({
            teachername: abstractData.teachername,
            subject: abstractData.subject,
          });
          setStoredvalues({
            teachername: abstractData.teachername,
            subject: abstractData.subject,
          });
        });
    }
  }, [teacherid]);

  // This is used to render storedValues whenever update the form

  useEffect(() => {
    setInitialValues(storedValues);
  }, [storedValues]);

  const onSubmit = (values, { resetForm }) => {
    // console.log(values);
    if (!teacherid) {
      axios
        .post("http://localhost:8001/teacher/create", values)
        .then((response) => console.log(response.data))
        .catch((error) => {
          toast.error("Error:", error);
          console.error("Error:", error);
        });
      toast.success("Teacher Created Successfully!");
    } else {
      axios
        .put(`http://localhost:8001/teacher/update/${teacherid}`, values)
        .then((response) => console.log("update", response))
        .catch((error) => {
          toast.error("Error:", error);
          console.error("Error:", error);
        });
    }

    // Reset form and Navigate to Teacher route

    resetForm();
    let timeId = setTimeout(() => {
      navigate("/teacher");
      toast.success("Teacher update Successfully!");
    }, 100);

    return () => {
      clearTimeout(timeId);
    };
  };

  const validationSchema = Yup.object({
    teachername: Yup.string()
      .trim()
      .min(5, "TeacherName must be greater than 5")
      .required("TeacherName cannot be blank"),
    subject: Yup.string()
      .trim()
      .min(5, "subject must be greater than 5")
      .required("subject cannot be blank"),
  });
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
                    {teacherid ? "Update Teacher" : "Teacher Portal"}
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
                  label="TeacherName"
                  name="teachername"
                />

                <FormControl
                  control="input"
                  type="text"
                  label="Subject"
                  name="subject"
                />

                <div className="flex justify-end gap-5 border-t pt-5">
                  <button type="submit" className="border px-6 py-1 rounded">
                    {teacherid ? "Update" : "Create"}
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

export default CreateTeacher;
