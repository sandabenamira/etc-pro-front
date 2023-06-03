import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import { addPARTNER, editAgence2 } from "../../../../../store/actions/Partner";
import MenuItem from "@mui/material/MenuItem";
import { Formik, useFormik, Form } from "formik";
import { gouvernoratList } from "../../../../../constants/variables and listes";

export const typeList = [
  {
    id: 1,
    value: "Tunisie",
    label: "Tunisie",
  },
  {
    id: 2,
    value: "France",
    label: "France",
  },
];
function AddPartenaire(props) {
  let dispatch = useDispatch();
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);

    dispatch(
      addPARTNER({
        nom: values.name,
        pays: values.type,
        gouvernerat: values.governorate,
        adresse: values.address,
        email: values.email,
        Ntel: values.telephoneNumber,
        isArchived:false,
        add:true,
      })
    );

    props.openaddAgence();
  };
  const initialValues = {
    name: "",
    type: "",
    governorate: "",
    telephoneNumber: "",
    address: "",
    email: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <Modal isOpen={props.openaddAgence}>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form
            className="row "
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="d-flex flex-column col-lg-12 col-md-12 ">
              <div
                className="d-flex justify-content-end mt-2 "
                style={{
                  color: "#4C25B7",
                  fontSize: "25px",
                }}
              >
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={props.openaddAgence}
                  style={{
                    marginTop: "-2%",
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="d-flex flex-row justify-content-center mb-5">
                <div
                  className="d-flex justify-content-center  col-lg-11 col-md-11 col-sm-11 "
                  style={{ color: "#3f51b5", fontSize: "25px" }}
                >
                  Ajouter un formateur 
                </div>

                <br />
                <br />
              </div>
              <div className="p-2 d-flex flex-row  ">
                <div
                  className="p-2 d-flex flex-column col-md-6 form-group   "
                  style={{ height: "80px" }}
                >
                  <div style={{ fontSize: "18px" }}>Nom *</div>
                  <div>
                    <TextField
                      name="name"
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      {...formik.getFieldProps("name")}
                      required
                    ></TextField>
                    {formik.touched.name && formik.errors.name ? ( //si visit and message existe show the msg
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.name}</small>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="p-2 d-flex flex-column col-md-6  ">
                  <div style={{ fontSize: "18px" }}>Pays *</div>
                  <TextField
                    className="textfield"
                    select
                    name="type"
                    margin="normal"
                    fullWidth
                    size="small"
                    {...formik.getFieldProps("type")}
                    required
                  >
                    {typeList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.type && formik.errors.type ? (
                    <div className="error" style={{ color: "red" }}>
                      <small>{formik.errors.type}</small>
                    </div>
                  ) : null}

                  <div></div>
                </div>
              </div>

              <div className="p-2 d-flex flex-row  ">
                <div className="p-2 d-flex flex-column col-md-6  ">
                  <div style={{ fontSize: "18px" }}>Gouvernorat *</div>
                  <div>
                    <TextField
                      className="textfield"
                      select
                      name="governorate"
                      margin="normal"
                      fullWidth
                      size="small"
                      required
                      {...formik.getFieldProps("governorate")}
                    >
                      {gouvernoratList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {formik.touched.governorate && formik.errors.governorate ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.governorate}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 d-flex flex-column col-md-6  ">
                  <div style={{ fontSize: "18px" }}>Adresse *</div>

                  <div>
                    <TextField
                      name="address"
                      className="textfield"
                      margin="normal"
                      fullWidth
                      size="small"
                      {...formik.getFieldProps("address")}
                      required
                    ></TextField>
                    {formik.touched.address && formik.errors.address ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.address}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="p-2 d-flex flex-row  ">
                <div className="p-2 d-flex flex-column col-md-6  ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="gestion.agence.mail" />
                    {" *"}
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      name="email"
                      margin="normal"
                      fullWidth
                      size="small"
                      required
                      {...formik.getFieldProps("email")}
                    ></TextField>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.email}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 d-flex flex-column col-md-6 ">
                  <div style={{ fontSize: "18px" }}>
                    <IntlMessages id="gestion.agence.tel" />
                    {" *"}
                  </div>
                  <div>
                    <TextField
                      className="textfield"
                      name="telephoneNumber"
                      margin="normal"
                      fullWidth
                      required
                      {...formik.getFieldProps("telephoneNumber")}
                      size="small"
                    ></TextField>
                    {formik.touched.telephoneNumber &&
                    formik.errors.telephoneNumber ? (
                      <div className="error" style={{ color: "red" }}>
                        <small>{formik.errors.telephoneNumber}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="p-2 d-flex flex-row justify-content-center mt-2">
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
                    onClick={props.openaddAgence}
                  >
                    <IntlMessages id="cancel" />
                  </Button>
                </div>
                <div className="p-2 ">
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
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    <IntlMessages id="confirm" />
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </ModalBody>
    </Modal>
  );
}

export default AddPartenaire;
