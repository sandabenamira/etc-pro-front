import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import CardBox from "../../../../../components/CardBox/index";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import ImageGridList from "./ImageGridList";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateRangeComponent from "./DateRangeComponent";
import Button from "@material-ui/core/Button";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import FormHelperText from "@material-ui/core/FormHelperText";
import { UncontrolledAlert } from "reactstrap";



class AddService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  
  }

  render() {   /* eslint eqeqeq: "off" */
   const {values} = this.props
    return (
      <div>
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="add-service"
              yes={() => (
                <div>
                  <form autoComplete="off" onSubmit={this.props.handleSubmit}>
                    <div className="d-flex justify-content-start align-items-center">
                      <h1>
                        <b>
                          <IntlMessages id="new.service" />
                        </b>
                      </h1>
                      &nbsp;&nbsp;&nbsp;
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.props.openAddModal}
                      >
                        {this.props.values.open ? <RemoveSharpIcon /> : <AddIcon />}
                      </Fab>
                    </div>
                    <br />
                    {values.open ? (
                      <>
                        {" "}
                        <CardBox styleName=" text-black  ">
                          <div className="d-flex flex-column  ">
                            <label
                              htmlFor="comment"
                              style={{ fontSize: "20px", color: "#0B4786" }}
                            >
                              <IntlMessages id="service.information" />
                            </label>
                            <div className="d-flex flex-wrap  align-items-center ">
                              <div className="p-2 col-md-4   ">
                                <TextField
                                  required
                                  id="nameFrService"
                                  error={values.nameError}
                                  label={
                                    <IntlMessages id="stuppUser.formadd.name" />
                                  }
                                  value={values.nameFrService}
                                  onChange={this.props.handleChange("nameFrService")}
                                  margin="normal"
                                  fullWidth
                                />
                                <FormHelperText error={values.nameError}>
                                  {values.nameError
                                    ? "Nom prestation déja existe"
                                    : ""}
                                </FormHelperText>
                              </div>
                              <div className="p-2 col-md-3 px-md-2  ">
                                <TextField
                                  required
                                  select
                                  id="typeService"
                                  name="typeService"
                                  label={<IntlMessages id="service.type" />}
                                  value={values.typeService}
                                  onChange={this.props.handleChange("typeService")}
                                  margin="normal"
                                  fullWidth
                                  SelectProps={{
                                    native: true,
                                  }}
                                >
                                  <option disabled></option>
                                  {this.props.typeList.map((type, index) => (
                                    <option key={index} value={type.value}>
                                      {type.value}
                                    </option>
                                  ))}
                                </TextField>
                              </div>
                              <div className="ml-5 p-2 col-md-4 flex-wrap align-items-center ">
                                <label
                                  style={{ color: "#DCDCDC", margin: "20px" }}
                                >
                                  <IntlMessages id="service.icon" />
                                </label>

                                <ImageGridList handleIcon={this.props.handleIcon} />
                              </div>
                            </div>

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

                            <label
                              htmlFor="comment"
                              style={{
                                fontSize: "20px",
                                color: "#0B4786",
                                marginTop: "10px",
                              }}
                            >
                              <IntlMessages id="service.currency" />
                            </label>
                            <div className="d-flex flex-wrap justify-content-start align-items-center  ">
                              <div className="p-2 col-md-3 ">
                                <TextField
                                  required
                                  select
                                  id="idCurrency"
                                  name="idCurrency"
                                  label={<IntlMessages id="service.currency" />}
                                  value={values.idCurrency}
                                  onChange={this.props.handleChange("idCurrency")}
                                  margin="normal"
                                  fullWidth
                                  SelectProps={{
                                    native: true,
                                  }}
                                >
                                  <option></option>
                                  {values.currency.map((option, index) => (
                                    <option key={index} value={option.id}>
                                      {option.sign_currency}
                                    </option>
                                  ))}
                                </TextField>
                              </div>

                              <div className="p-2 col-md-3">
                                <TextField
                                  required
                                  id="vatService"
                                  type="number"
                                  label={
                                    <IntlMessages id="etablishments.info.tva" />
                                  }
                                  value={values.vatService}
                                  onChange={this.props.handleChange("vatService")}
                                  error={values.vatService < 0}
                                  inputProps={{
                                    min: 0,
                                  }}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>

                              <div className="p-2 col-md-3">
                                <TextField
                                  id="otherVatService"
                                  type="number"
                                  label={
                                    <IntlMessages id="service.other.tax" />
                                  }
                                  value={values.otherVatService}
                                  onChange={this.props.handleChange(
                                    "otherVatService"
                                  )}
                                  error={values.otherVatService < 0}
                                  inputProps={{
                                    min: 0,
                                  }}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>

                              <div className="p-2 col-md-3"></div>
                            </div>

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

                            <div className="d-flex flex-column ">
                              <label
                                htmlFor="comment"
                                style={{ fontSize: "20px", color: "#0B4786" }}
                              >
                                <IntlMessages id="sidebar.components.service" />
                              </label>
                              <div className="d-flex flex-column ">
                                <RadioGroup
                                  aria-label="anchorOriginVertical"
                                  name="anchorOriginVertical"
                                  value={values.name_fr_frequency}
                                  onChange={this.props.handleChangeRadio()}
                                >
                                  {values.frequency.map(
                                    (element, index) => (
                                      <div key={index}>
                                        <div
                                          className="d-flex flex-wrap  "
                                          key={index}
                                        >
                                          <FormControlLabel
                                            value={element.name_fr_frequency}
                                            control={<Radio required />}
                                            label={element.name_fr_frequency}
                                          />

                                          {values.frequencyVal ===
                                          element.name_fr_frequency ? (
                                            <>
                                              <div className="p-2 bd-highlight">
                                                <DateRangeComponent
                                                  setDate={this.props.setDate}
                                                  minimumNights={
                                                    values.minimumNights
                                                  }
                                                />
                                              </div>
                                              <div className="p-2 bd-highlight">
                                                <TextField
                                                  required
                                                  name="priceService"
                                                  id="priceService"
                                                  type="number"
                                                  value={
                                                    values.priceService
                                                  }
                                                  onChange={this.props.handleChange(
                                                    "priceService"
                                                  )}
                                                  error={
                                                    values.priceService < 0
                                                  }
                                                  inputProps={{
                                                    min: 0,
                                                  }}
                                                  label={
                                                    <IntlMessages id="service.price" />
                                                  }
                                                  variant="outlined"
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </RadioGroup>
                              </div>
                            </div>

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

                            <div className="d-flex  flex-column justify-content-center">
                              <label
                                htmlFor="comment"
                                style={{ fontSize: "20px", color: "#0B4786" }}
                              >
                                <IntlMessages id="toDo.comments" />
                              </label>
                              <textarea
                                rows="3"
                                value={values.comment}
                                onChange={this.props.handleChange("comment")}
                                style={{
                                  borderRadius: "20px",
                                  marginTop: "10px",
                                }}
                              ></textarea>
                            </div>
                          </div>
                        </CardBox>
                        {values.alerte ? (
                          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                            <span className="icon-addon alert-addon">
                              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                            </span>
                            <span className="d-inline-block">
                              {<IntlMessages id="service.select.photo" />}
                            </span>
                          </UncontrolledAlert>
                        ) : (
                          ""
                        )}
                        <div className="d-flex flex-wrap justify-content-end ">
                          <Button
                            variant="contained"
                            onClick={this.props.openAddModal}
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "20%",
                            }}
                          >
                            {
                              <IntlMessages id="components.establishments.formadd.buttonCancel" />
                            }
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            className="bg-grey text-white "
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "6%",
                            }}
                            onClick={this.props.handleArchive}
                          >
                            {<IntlMessages id="service.button.archive" />}
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            disabled={values.nameError}
                            variant="contained"
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "6%",
                            }}
                            className=" bg-indigo text-white "
                            type="submit"
                          >
                            <IntlMessages id="service.button.publish" />
                          </Button>
                        </div>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              )}
            />
          )}
        </RoleContext.Consumer>
      </div>
    );
  }
}



export default AddService;
