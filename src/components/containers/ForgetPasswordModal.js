import IntlMessages from "../../util/IntlMessages";
import Auxiliary from "../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UncontrolledAlert } from "reactstrap";
import { isEmail } from "../../constants/validationFunctions";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { verifMail } from "../../store/actions/Auth";
export default function ForgetPasswordModal(props) {
  let dispatch = useDispatch();
  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(verifMail(values));
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .trim("Champ obligatoire !")
        .email("Entrer une adresse e-mail valide  ")
        .required("Champ obligatoire !")
        .max(40, "Trop long ! maximum 40")
        .min(3, "Trop court! minimum 3"),
    }),
  });
  return (
    <Auxiliary>
      <Modal isOpen={props.isopen}>
        <ModalHeader
          toggle={props.handleCancel}
          className="modal-box-header bg-primary text-white"
        >
          {<IntlMessages id="recover.password" />}
        </ModalHeader>
        <br />
        {props.succedAlert === true ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {<IntlMessages id="recover.password.succed.alert" />}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        {props.errorAlert === true ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {<IntlMessages id="recover.password.failed.alert" />}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema
            validateOnChange={false}
            validateOnBlur={false}
          >
            <Form onSubmit={formik.handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <TextField
                      variant="outlined"
                      required
                      name="forgotPassword"
                      id="forgotPassword"
                      label={<IntlMessages id="appModule.email" />}
                      margin="normal"
                      fullWidth
                      {...formik.getFieldProps("email")}
                      error={
                        formik.touched.email &&
                        formik.errors.email &&
                        isEmail(formik.values.email) === false
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-left ">
                <br />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                >
                  {<IntlMessages id="button.send.message" />}
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={props.handleCancel}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </Auxiliary>
  );
}
