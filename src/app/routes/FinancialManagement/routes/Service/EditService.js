import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Auxiliary from "../../../../../util/Auxiliary";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateRangeComponent from "./DateRangeComponent";
import Button from "@material-ui/core/Button";
import { FormGroup, Row, Col } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Select from "react-select";
import InputLabel from "@material-ui/core/InputLabel";
import _ from "lodash";
import moment from "moment";
import { editServiceV2 } from "../../../../../actions/ServiceAction";
import { connect } from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";

const typeList = [
  {
    value: "obligatoire",
    label: <IntlMessages id="service.mandatory" />,
  },
  {
    value: "optionnel",
    label: <IntlMessages id="service.optional" />,
  },
];

export class EditService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      frequency: "",
      frequencies: [],
      currencies: [],
      comment: "",
      frequencyVal: "",
      minimumNights: 1,
      nameError: false,
    };
    this.setDate = this.setDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  cancel(event) {
    event.preventDefault();
    this.setState({
      comment: this.props.data.comment,
      id: this.props.data.id,
      name_fr_service: this.props.data.name_fr_service,
      name_an_service: this.props.data.name_an_service,
      name_ar_service: this.props.data.name_ar_service,
      frequencyVal: this.props.data.frequencyV2.name_fr_frequency,
      path_img_service: this.props.data.path_img_service,
      price_service: parseInt(this.props.data.price_service),
      vat_service: parseInt(this.props.data.vat_service),
      other_vat_service: parseInt(this.props.data.other_vat_service),
      start_date_service: moment(this.props.data.start_date_service),
      end_date_service: moment(this.props.data.end_date_service),

      type_service: this.props.data.type_service,
      status_service: this.props.data.status_service,
      fk_id_establishment: this.props.data.fk_id_establishment,
      fk_id_school_year: this.props.data.fk_id_school_year,
      fk_id_frequency: this.props.data.fk_id_frequency,
      fk_id_currency: this.props.data.fk_id_currency,
      currencyV2: this.props.data.currencyV2,
      frequencyV2: this.props.data.frequencyV2,
      frequencies: this.props.frequency,
      currencies: this.props.currency,
      nameError: false,
    });

    this.props.cancel();
  }
  handlePublish(event) {
    event.preventDefault();
    let dataPrestation = {
      name_fr_service: this.state.name_fr_service,
      name_an_service: this.state.name_an_service,
      name_ar_service: this.state.name_ar_service,
      comment: this.state.comment,
      path_img_service: this.state.path_img_service,
      price_service: this.state.price_service,
      vat_service: this.state.vat_service,
      other_vat_service: this.state.other_vat_service,
      start_date_service: this.state.start_date_service,
      end_date_service: this.state.end_date_service,
      type_service: this.state.type_service,
      status_service: true,
      fk_id_establishment: this.state.fk_id_establishment,
      fk_id_school_year: this.state.fk_id_school_year,
      fk_id_frequency: this.state.fk_id_frequency,
      fk_id_currency: this.state.fk_id_currency,
      id: this.state.id,
    };
    this.props.dispatch(editServiceV2(dataPrestation));

    this.props.cancel();
  }

  handleSubmit(event) {
    event.preventDefault();
    let dataPrestation = {
      name_fr_service: this.state.name_fr_service,
      name_an_service: this.state.name_an_service,
      name_ar_service: this.state.name_ar_service,
      comment: this.state.comment,
      path_img_service: this.state.path_img_service,
      price_service: this.state.price_service,
      vat_service: this.state.vat_service,
      other_vat_service: this.state.other_vat_service,
      start_date_service: this.state.start_date_service,
      end_date_service: this.state.end_date_service,
      type_service: this.state.type_service,
      status_service: this.state.status_service,
      fk_id_establishment: this.state.fk_id_establishment,
      fk_id_school_year: this.state.fk_id_school_year,
      fk_id_frequency: this.state.fk_id_frequency,
      fk_id_currency: this.state.fk_id_currency,
      id: this.state.id,
    };
    this.props.dispatch(editServiceV2(dataPrestation));

    this.props.cancel();
  }
  handleChange = (name) => (event) => {
    if (name==="name_fr_service") {
      let nameError = false;

      if (this.props.data.name_fr_service === event.target.value.trim()) {
        nameError = false;
      } else {
        nameError =
          this.props.services.filter(
            (element) => element.name_fr_service === event.target.value.trim()
          ).length > 0;
      }

      this.setState({ [name]: event.target.value, nameError: nameError });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleChangeType = (selectedOption) => {
    this.setState({ type_service: selectedOption.value });
  };
  handleChangeCurrency = (selectedOption) => {
    this.setState({ fk_id_currency: selectedOption.value });
  };

  componentWillMount() {
    this.setState({
      comment: this.props.data.comment,
      id: this.props.data.id,
      name_fr_service: this.props.data.name_fr_service,
      name_an_service: this.props.data.name_an_service,
      name_ar_service: this.props.data.name_ar_service,
      frequencyVal: this.props.data.frequencyV2.name_fr_frequency,
      path_img_service: this.props.data.path_img_service,
      price_service: parseInt(this.props.data.price_service),
      vat_service: parseInt(this.props.data.vat_service),
      other_vat_service: parseInt(this.props.data.other_vat_service),
      start_date_service: moment(this.props.data.start_date_service),
      end_date_service: moment(this.props.data.end_date_service),

      type_service: this.props.data.type_service,
      status_service: this.props.data.status_service,
      fk_id_establishment: this.props.data.fk_id_establishment,
      fk_id_school_year: this.props.data.fk_id_school_year,
      fk_id_frequency: this.props.data.fk_id_frequency,
      fk_id_currency: this.props.data.fk_id_currency,
      currencyV2: this.props.data.currencyV2,
      frequencyV2: this.props.data.frequencyV2,
      frequencies: this.props.frequency,
      currencies: this.props.currency,
    });
  }
  setDate(startDate, endDate) {
    this.setState({
      start_date_service: moment(startDate),
      end_date_service: moment(endDate),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.frequency !== this.props.frequency &&
      this.props.frequency.length > 0
    ) {
      this.setState({
        frequencies: this.props.frequency,
      });
    }
    if (
      prevProps.currency !== this.props.currency &&
      this.props.currency.length > 0
    ) {
      this.setState({
        currencies: this.props.currency,
      });
    }
  }

  handleChangeRadio = (name) => (event) => {
    let item = this.state.frequencies.filter(
      (element) => element.name_fr_frequency === event.target.value
    );
    let id_frequency = item[0].id;

    this.setState({
      fk_id_frequency: id_frequency,
      frequencyVal: event.target.value,
      price_service: "",
      start_date_service: "",
      end_date_service: "",
    });

    if (id_frequency === 1) {
      this.setState({
        minimumNights: 1,
      });
    } else if (id_frequency === 2) {
      this.setState({
        minimumNights: 6,
      });
    } else if (id_frequency === 3) {
      this.setState({
        minimumNights: 60,
      });
    } else if (id_frequency === 4) {
      this.setState({
        minimumNights: 29,
      });
    } else if (id_frequency === 5) {
      this.setState({
        minimumNights: 90,
      });
    } else if (id_frequency === 6) {
      this.setState({
        minimumNights: 180,
      });
    } else if (id_frequency === 7) {
      this.setState({
        minimumNights: 360,
      });
    }
  };

  render() {   /* eslint eqeqeq: "off" */
    let element = this.state;

    let currencies = [];
    if (this.state.currencies.length > 0) {
      this.state.currencies.map((element, index) =>
        currencies.push({
          value: element.id,
          label: element.code_currency,
        })
      );
    }
    let indexCurrency = _.findIndex(currencies, {
      value: element.fk_id_currency,
    });
    let indexType = _.findIndex(typeList, {
      value: element.type_service,
    });

    let iconCode = "icon-btn " + element.path_img_service + " zmdi-hc-2x";
    return (
      <Auxiliary>
        <Modal isOpen={this.props.openEdit}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            Modifier
            <IconButton className="text-white" onClick={this.cancel}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div>
                <Row>
                  <h3 style={{ color: "blue" }}>Descriptif</h3>
                </Row>
                <Row>
                  <Col
                    md="4"
                    style={{
                      paddingTop: "6px",
                    }}
                  >
                    <TextField
                      required
                      id="standard-basic"
                      label="Nom"
                      multiline={true}
                      value={element.name_fr_service}
                      onChange={this.handleChange("name_fr_service")}
                      error={this.state.nameError}
                    />
                    <FormHelperText error={this.state.nameError}>
                      {this.state.nameError ? (
                        <IntlMessages id="room.nameError" />
                      ) : (
                        ""
                      )}
                    </FormHelperText>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <InputLabel
                        htmlFor="nomSelect"
                        //style={{ 'padding-left': '10px' }}
                      >
                        Type
                      </InputLabel>
                      <Select
                        required
                        value={typeList[indexType]}
                        label="Nom"
                        id="nomSelect"
                        onChange={this.handleChangeType}
                        styles={{
                          control: (base) => ({
                            ...base,
                            "&:hover": { borderColor: "gray" }, // border style on hover
                            border: "1px solid lightgray", // default border color
                            boxShadow: "none", // no box-shadow
                            "border-top-style": "none",
                            "border-right-style": "none",
                            "border-left-style": "none",
                            "border-radius": " none",
                            //width: 'fullwidth',
                            marginRight: "30px",
                          }),
                        }}
                        options={typeList}
                      ></Select>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <Row>
                      <label> Photo associée</label>
                    </Row>
                    <Row style={{ marginLeft: "auto", marginRight: "auto" }}>
                      <i className={iconCode}></i>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "5%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: "blue" }}>Monnaie</h3>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <InputLabel htmlFor="nomSelect">Monnaie</InputLabel>
                      <Select
                        value={currencies[indexCurrency]}
                        onChange={this.handleChangeCurrency}
                        label="Nom"
                        id="nomSelect"
                        styles={{
                          control: (base) => ({
                            ...base,
                            "&:hover": { borderColor: "gray" }, // border style on hover
                            border: "1px solid lightgray", // default border color
                            boxShadow: "none", // no box-shadow
                            "border-top-style": "none",
                            "border-right-style": "none",
                            "border-left-style": "none",
                            "border-radius": " none",
                            marginRight: "10px",
                          }),
                        }}
                        options={currencies}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md="4"
                    style={{
                      paddingTop: "6px",
                    }}
                  >
                    <FormGroup>
                      <TextField
                        required
                        id="standard-basic"
                        label="TVA"
                        value={element.vat_service}
                        onChange={this.handleChange("vat_service")}
                        type="number"
                        error={element.vat_service < 0}
                        inputProps={{ min: 0, step: 0.01 }}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md="4"
                    style={{
                      paddingTop: "6px",
                    }}
                  >
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Autre Taxe"
                        value={element.other_vat_service}
                        onChange={this.handleChange("other_vat_service")}
                        type="number"
                        error={element.other_vat_service < 0}
                        inputProps={{ min: 0, step: 0.01 }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "5%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: "blue" }}>Fréquence</h3>
                </Row>
                <Row style={{ marginLeft: "2%" }}>
                  <RadioGroup
                    aria-label="anchorOriginVertical"
                    name="anchorOriginVertical"
                    value={element.frequencyVal}
                    onChange={this.handleChangeRadio()}
                  >
                    {this.state.frequencies.length > 0
                      ? this.state.frequencies.map((frequnece, index) => (
                          <>
                            <Row>
                              <Col
                                md="3"
                                style={{
                                  marginTop: "auto",
                                  marginBottom: "auto",
                                }}
                              >
                                <FormControlLabel
                                  value={frequnece.name_fr_frequency}
                                  control={<Radio required />}
                                  label={frequnece.name_fr_frequency}
                                />
                              </Col>
                              {element.fk_id_frequency === frequnece.id ? (
                                <>
                                  <Col
                                    md="7"
                                    style={{
                                      marginTop: "auto",
                                      marginBottom: "auto",
                                    }}
                                  >
                                    <DateRangeComponent
                                      setDate={this.setDate}
                                      startDate={element.start_date_service}
                                      endDate={element.end_date_service}
                                      minimumNights={this.state.minimumNights}
                                    />
                                  </Col>
                                  <Col
                                    md="2"
                                    style={{
                                      marginTop: "auto",
                                      marginBottom: "auto",
                                    }}
                                  >
                                    <TextField
                                      required
                                      id="standard-basic"
                                      value={element.price_service}
                                      variant="outlined"
                                      //InputProps={{ disableUnderline: true }}
                                      type="number"
                                      error={element.price_service < 0}
                                      inputProps={{ min: 0, step: 0.01 }}
                                      onChange={this.handleChange(
                                        "price_service"
                                      )}
                                    />
                                  </Col>
                                </>
                              ) : (
                                ""
                              )}
                            </Row>
                          </>
                        ))
                      : ""}
                  </RadioGroup>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "5%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: "blue" }}>Commentaire</h3>
                </Row>
                <Row>
                  <textarea
                    rows="3"
                    value={this.state.comment}
                    onChange={this.handleChange("comment")}
                    style={{
                      borderRadius: "15px",
                      marginBottom: "25px",
                      width: "100%",
                    }}
                  ></textarea>
                </Row>
                <Row style={{ float: "right" }}>
                  <Col>
                    <Button
                      variant="contained"
                      onClick={this.cancel}
                      style={{ borderRadius: "16px" }}
                    >
                      <IntlMessages id="components.establishments.formadd.buttonCancel" />
                    </Button>
                  </Col>
                  {element.status_service===false ? (
                    <Col>
                      <Button
                        variant="contained"
                        className="bg-grey text-white "
                        style={{ borderRadius: "16px" }}
                        onClick={this.handlePublish}
                      >
                        <IntlMessages id="service.button.publish" />
                      </Button>
                    </Col>
                  ) : (
                    ""
                  )}

                  <Col>
                    <Button
                      disabled={this.state.nameError}
                      variant="contained"
                      className="bg-indigo text-white "
                      style={{ borderRadius: "16px" }}
                      type="submit"
                    >
                      <IntlMessages id="button.modify" />
                    </Button>
                  </Col>
                </Row>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(EditService);
