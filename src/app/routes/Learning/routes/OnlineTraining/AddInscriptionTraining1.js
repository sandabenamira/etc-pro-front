import React,{useState} from "react";
import {useDispatch} from "react-redux"
import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import AttachmentIcon from "@material-ui/icons/Attachment";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import { styled } from "@mui/material/styles";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";
export default function AddInscriptionTraining1(props) {
    const Input = styled("input")({
    display: "none",
  });  
  let dispatch = useDispatch(props);

  const [papier, setPapier] = useState("");
  const reinitialiser = () => {
    props.openInscriptionModal();
  };
  const onPapierChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setPapier(URL.createObjectURL(file));
    }
  };

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
  
  };
  const initialValues = {
    firstName: "",
    lastName: "",
   
  };   const validationSchema = Yup.object({
 
      modeFinncement: Yup.string()
      .required("Champ obligatoire !")
      .matches(
        /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        "Veuillez entrer un prénom valide"
      )
      .max(40, "Trop long ! maximum 40 caractères")
      .min(2, "Trop court! minimum 2 caractères"),
    
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
 
  return (
    <Modal isOpen={props.openInscriptionModal}>
    <ModalBody>
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form
          className="row "
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          noValidate
        >
        <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-12 col-sm-6 ">
        <div
              className="d-flex justify-content-end  "
              style={{
                color: "#4C25B7",
                fontSize: "25px",
              }}
            >
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={reinitialiser}
                style={{
                  marginTop: "-2%",
                 }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <div
            className="d-flex justify-content-center"
            style={{ color: "#3f51b5", fontSize: "25px" }}            >
            <IntlMessages id="reporting.formation.Inscription" />
          </div>
          <br />
          <br />

          <div className="p-2 d-flex flex-row ">
            <div className="p-2  d-flex flex-column col-md-10 col-sm-6 ">
              <div style={{ fontSize: "18px",color: "#3f51b5" }}>
                <IntlMessages id="reporting.formation.question" />
              </div>
              <div>
                <TextField
                  className="textfield"
                  margin="normal"
                  fullWidth
                  size="small"

                 ></TextField>
              </div>
            </div>
          </div>
          <div className="p-2 d-flex flex-row">
            <div className="p-2 flex-column col-lg-10 col-md-12  col-sm-12">
              <div className="p-2" style={{ fontSize: "18px",color: "#3f51b5" }}>
                <IntlMessages id="reporting.formation.paper" />
              </div>
              <div className="p-2" style={{ fontSize: "18px" }}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="papier"
                    onChange={onPapierChange}
                  />
                  <Button
                    color="default"
                    style={{
                      borderRadius: "5px",
                      textTransform: "none",
                      paddingRight: "60px",
                    }}
                    startIcon={<AttachmentIcon />}
                    variant="contained"
                    component="span"
                  >
                    <IntlMessages
                      id="message.attach.file"
                      style={{ color: "default" }}
                    />
                  </Button>{" "}
                </label>
              </div>
            </div>
          </div>

          {/*  bouttons */}
          <div className="p-2 d-flex flex-row justify-content-center">
          <div className="p-2">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    borderRadius: "80px",
                     fontSize: "18px",
                    fontFamily: " sans-serif",
                    textTransform: "none",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                  onClick={reinitialiser}
                >
                  <IntlMessages id="cancel" />
                </Button>
              </div>
              <div className="p-2 ml-3">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "80px",
                    fontSize: "18px",
                    fontFamily: " sans-serif",
                    textTransform: "none",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                  type="submit"
                  
                  // disabled={!(formik.isValid && formik.isSubmitting && verif===true)}
                >
                  <IntlMessages id="confirm" />
                </Button>
              </div>
          </div>
        </div>
        </Form>
      </Formik>
    </ModalBody>
  </Modal>  )
}
