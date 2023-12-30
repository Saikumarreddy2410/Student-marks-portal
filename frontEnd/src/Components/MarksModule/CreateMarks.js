import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toggleContext } from "../../App";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { TfiClose } from "react-icons/tfi";
import FormControl from "../Form.js/FormControl";
import { toast } from "react-toastify";

const CreateMarks = () => {
  const { toggle, modal } = useContext(toggleContext);
  const navigate = useNavigate();
  const { marksid } = useParams();
  const [initialValues, setInitialValues] = useState({
    studentid: "",
    studentname: "",
    studentclass: "",
    teacherid: "",
    teachername: "",
    subject: "",
    marks: "",
  });

  const [storedValues, setStoredvalues] = useState(initialValues);

  const openToggle = () => {
    toggle(!modal);
  };

  const closeToggle = () => {
    openToggle();
    navigate("/marks");
  };

  useEffect(() => {
    if (marksid) {
      axios.get(`http://localhost:8002/marks/get/${marksid}`).then((res) => {
        console.log(res.data[0]);
        const { marksid, ...abstractData } = res.data[0];
        setInitialValues({
          studentid: abstractData.studentid,
          studentname: abstractData.studentname,
          studentclass: abstractData.studentclass,
          teacherid: abstractData.teacherid,
          teachername: abstractData.teachername,
          subject: abstractData.subject,
          marks: abstractData.marks,
        });
        setStoredvalues({
          studentid: abstractData.studentid,
          studentname: abstractData.studentname,
          studentclass: abstractData.studentclass,
          teacherid: abstractData.teacherid,
          teachername: abstractData.teachername,
          subject: abstractData.subject,
          marks: abstractData.marks,
        });
      });
    }
  }, [marksid]);

  // This is used to render storedValues whenever update the form

  useEffect(() => {
    setInitialValues(storedValues);
  }, [storedValues]);

  const onSubmit = (values, { resetForm }) => {
    // console.log(values);
    if (!marksid) {
      axios
        .post("http://localhost:8002/marks/create", values)
        .then((response) => console.log(response.data))
        .catch((error) => console.error("Error:", error));
      toast.success("Marks created successfully!");
    } else {
      axios
        .put(`http://localhost:8002/marks/update/${marksid}`, values)
        .then((response) => console.log("update", response))
        .catch((error) => {
          toast.error("Error:", error);
          console.error("Error:", error);
        });
    }

    // Reset form and Navigate to Teacher route

    resetForm();
    let timeId = setTimeout(() => {
      navigate("/marks");
      toast.success("marks update Successfully!");
    }, 100);

    return () => {
      clearTimeout(timeId);
    };
  };

  const validationSchema = Yup.object({
    studentid: Yup.number()
      .typeError("Must be a number")
      .required("StudentId cannot be blank"),
    studentname: Yup.string()
      .trim()
      .min(5, "studentName must be greater than 5")
      .required("studentName cannot be blank"),
    studentclass: Yup.number()
      .typeError("Must be a number")
      .min(1, "Number must be at least 1")
      .max(12, "Number must be at most 12")
      .required("StudentClass cannot be blank"),
    teacherid: Yup.number()
      .typeError("Must be a number")
      .required("TeacherId cannot be blank"),
    teachername: Yup.string()
      .trim()
      .min(5, "TeacherName must be greater than 5")
      .required("TeacherName cannot be blank"),
    subject: Yup.string()
      .trim()
      .min(5, "subject must be greater than 5")
      .required("subject cannot be blank"),
    marks: Yup.number()
      .typeError("Must be a number")
      .min(1, "Number must be at least 1")
      .max(100, "Number must be at most 100")
      .required("Marks cannot be blank"),
  });
  return (
    modal && (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <div className="flex items-center justify-center overflow-y-scroll  fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md transition-all duration-300 ease">
              <Form className="bg-white w-[30rem] mt-72 rounded p-8 flex flex-col gap-5">
                <div className="flex items-center justify-between border-b pb-5 relative">
                  <h1 className="text-lg font-semibold ">
                    {marksid ? "Update Marks" : "Marks Portal"}
                  </h1>
                  <TfiClose
                    className="cursor-pointer"
                    size={15}
                    onClick={closeToggle}
                  />
                  {marksid && (
                    <p className="absolute top-8 text-xs text-red-600 font-semibold">
                      Note: Want to update other than Marks have to change the S
                      and T tables
                    </p>
                  )}
                </div>

                <FormControl
                  control="input"
                  type="text"
                  label="StudentId"
                  name="studentid"
                />

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

                <FormControl
                  control="input"
                  type="text"
                  label="TeacherId"
                  name="teacherid"
                />

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

                <FormControl
                  control="input"
                  type="text"
                  label="Marks"
                  name="marks"
                />

                <div className="flex justify-end gap-5 border-t pt-5">
                  <button type="submit" className="border px-6 py-1 rounded">
                    {marksid ? "Update" : "Create"}
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

export default CreateMarks;
