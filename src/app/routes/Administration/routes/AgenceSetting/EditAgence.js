import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import MenuItem from "@material-ui/core/MenuItem";
import { isEmail } from "../../../../../constants/validationFunctions";
import MuiPhoneNumber from "material-ui-phone-number";
import { parsePhoneNumberFromString } from "libphonenumber-js";
const fonctionList = [
  { label: "Siège social", id: 1, value: 1 },
  { label: "Entreprises", id: 2, value: 2 },
  { label: "Particuliers et Professionnels", id: 3, value: 3 },
  { label: "Mixte", id: 4, value: 4 },
];
export default class EditClassSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  isValidphoneNumber = (number) => {
    const tel = parsePhoneNumberFromString(number);
    let res = false;
    if (tel) {
      res = tel.isValid();
    }

    return res;
  };
  render() {   /* eslint eqeqeq: "off" */
    console.log("values",this.props.values);
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.isOpen}
          toggle={this.props.handleAnnule}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            Modifier les informations des agences
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-3">
                <TextField
                  required
                  id="Agence"
                  label="Agence"
                  value={this.props.values.nameAgence}
                  onChange={this.props.handleChange("nameAgence")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-3">
                <TextField
                  id="typeAgence"
                  label="Type Agence"
                  value={this.props.values.typeAgence}
                  onChange={this.props.handleChange("typeAgence")}
                  margin="normal"
                  fullWidth
                  select
                >
                  {fonctionList.map((typeAgence) => (
                    <MenuItem key={typeAgence.id} value={typeAgence.label}>
                      {typeAgence.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-3">
                <TextField
                  required
                  id="gouvernoratAgence"
                  label="Gouvernorat"
                  value={this.props.values.gouvernoratAgence}
                  onChange={this.props.handleChange("gouvernoratAgence")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-3">
                <TextField
                  required
                  id="adresseAgence"
                  label="Adresse"
                  value={this.props.values.adresseAgence}
                  onChange={this.props.handleChange("adresseAgence")}
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-sm-3">
                <TextField
                  error={
                    isEmail(this.props.values.emailAgence) === false
                      ? true
                      : false
                  }
                  required
                  id="emailAgence"
                  label="Email"
                  value={this.props.values.emailAgence}
                  onChange={this.props.handleChange("emailAgence")}
                  margin="normal"
                  fullWidth={true}
                  helperText={
                    isEmail(this.props.values.emailAgence) === false ? (
                      <IntlMessages id="error.user.message.mail" />
                    ) : (
                      ""
                    )
                  }
                />
              </div>
              <div className="col-sm-3 mt-3">
                <MuiPhoneNumber
                  // error={
                  //   this.isValidphoneNumber(this.props.values.faxAgence) ===
                  //     true || this.props.values.faxAgence.length === 0
                  //     ? false
                  //     : true
                  // }
                  id="faxAgence"
                  name="faxAgence"
                  value={this.props.values.faxAgence}
                  onChange={this.props.handleChangeFax}
                  fullWidth={true}
                  label="Fax"
                  placeholder="(+XXX) XXX XXX XXX"
                  // helperText={
                  //   this.isValidphoneNumber(this.props.values.faxAgence) ===
                  //     true || this.props.values.faxAgence.length === 0 ? (
                  //     ""
                  //   ) : (
                  //     <IntlMessages id="error.user.message.phone" />
                  //   )
                  // }
                />
              </div>
              <div className="col-sm-3 mt-3">
                <MuiPhoneNumber
                  // error={
                  //   this.isValidphoneNumber(this.props.values.telAgence) ===
                  //     true || this.props.values.telAgence.length === 0
                  //     ? false
                  //     : true
                  // }
                  id="telAgence"
                  name="telAgence"
                  value={this.props.values.telAgence}
                  onChange={this.props.handleChangePhone}
                  fullWidth={true}
                  label={<IntlMessages id="user.phone.number" />}
                  placeholder="(+XXX) XXX XXX XXX"
                  // helperText={
                  //   this.isValidphoneNumber(this.props.values.telAgence) ===
                  //     true || this.props.values.telAgence.length === 0 ? (
                  //     ""
                  //   ) : (
                  //     <IntlMessages id="error.user.message.phone" />
                  //   )
                  // }
                />
              </div>
              <div className="col-md-12 text-left d-flex flex-wrap justify-content-end">
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "100px",
                    height: "40px",
                  }}
                  className=" bg-indigo text-white "
                  type="submit"
                  onClick={this.props.handleSubmit}
                >
                  <IntlMessages id="components.establishments.formModify.buttonModify" />
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "100px",
                    height: "40px",
                  }}
                  className=" bg-grey text-white "
                  type="submit"
                  onClick={this.props.handleAnnule}
                >
                  <IntlMessages id="components.establishments.formadd.buttonCancel" />
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
