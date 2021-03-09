import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../util/Auxiliary";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
class EditSchoolLicence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.isOpen}
          toggle={this.props.handleToggle}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.module.school.licence" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-4">
                <TextField
                  id="fk_id_establishment"
                  select
                  label={<IntlMessages id="establishement.choice" />}
                  value={this.props.values.fk_id_establishment}
                  onChange={this.props.handleChange("fk_id_establishment")}
                  SelectProps={{}}
                  margin="normal"
                  defaultValue=""
                  fullWidth
                  disabled={true}
                >
                  {this.props.establishmentsList.map((Item) => (
                    <MenuItem key={Item.id} value={Item.id}>
                      {Item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-4">
                <TextField
                  id="fk_id_school_year"
                  name="fk_id_school_year"
                  select
                  required
                  label={<IntlMessages id="schoolYear.choice" />}
                  value={this.props.values.fk_id_school_year}
                  onChange={this.props.handleChange("fk_id_school_year")}
                  SelectProps={{}}
                  margin="normal"
                  defaultValue=""
                  fullWidth
                >
                  {this.props.schoolYearList.map((Item) => (
                    <MenuItem key={Item.id} value={Item.id}>
                      {Item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-4">
                <TextField
                  id="licenceType"
                  name="licenceType"
                  select
                  value={this.props.values.licenceType}
                  onChange={this.props.handleChange("licenceType")}
                  SelectProps={{}}
                  label={<IntlMessages id="licence.status" />}
                  margin="normal"
                  fullWidth
                >
                  {this.props.values.licenceGroup.map((licence) => (
                    <MenuItem key={licence.value} value={licence.value}>
                      {licence.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-4">
                <TextField
                  required
                  id="studentsNumber"
                  onChange={this.props.handleChange("studentsNumber")}
                  value={this.props.values.studentsNumber}
                  label={
                    <IntlMessages id="components.establishments.formadd.number_students" />
                  }
                  type="number"
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-4">
                <TextField
                  required
                  id="smsNumber"
                  onChange={this.props.handleChange("smsNumber")}
                  value={this.props.values.smsNumber}
                  label={
                    <IntlMessages id="components.establishments.formadd.number_sms" />
                  }
                  type="number"
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-4">
                <TextField
                  required
                  id="paymentMode"
                  onChange={this.props.handleChange("paymentMode")}
                  value={this.props.values.paymentMode}
                  select
                  label={
                    <IntlMessages id="components.establishments.formadd.mode_payment" />
                  }
                  SelectProps={{}}
                  margin="normal"
                  fullWidth
                >
                  {this.props.values.paymentModeList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-6">
                <FormControl className="w-100">
                  <InputLabel htmlFor="name-multiple">
                    {<IntlMessages id="sidebar.modules" />}
                  </InputLabel>
                  <Select
                    multiple
                    name="modules"
                    value={this.props.values.modules}
                    onChange={this.props.handleChangeModule}
                    input={<Input id="name-multiple" />}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                          width: 200,
                        },
                      },
                    }}
                  >
                    {this.props.moduleList.map((moduleEstablishment, index) => (
                      <MenuItem
                        key={moduleEstablishment.id}
                        value={moduleEstablishment.id}
                      >
                        {moduleEstablishment.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-12 text-right ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  type="submit"
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "100px",
                    height: "40px",
                  }}
                >
                  {
                    <IntlMessages id="components.establishments.formModify.buttonModify" />
                  }
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "100px",
                    height: "40px",
                  }}
                  onClick={this.props.handleAnnule}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    establishmentsList: state.establishment.remoteEstablishments,
    schoolYearList: state.schoolYearEtab.remoteSchoolYearEtab,
    moduleList: state.module.remoteModules,
  };
};

export default connect(mapStateToProps, {})(EditSchoolLicence);
