import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import languageData from "../../../../../components/LanguageSwitcher/data";
import MenuItem from "@material-ui/core/MenuItem";
import { getNameLanguage } from "../../../../../actions/Setting";
import { TimePicker } from "@material-ui/pickers";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    const { values } = this.props;
    return (
      <div>
        <form autoComplete="off" onSubmit={this.props.handleSubmit}>
          <div className="d-flex flex-column justify-content-center align-items-center mb-3">
            <div className="p-2 ">
              <IntlMessages id="configuration.of.generic.parameters" />
            </div>
            <div className="p-2 col-lg-4 col-md-6 col-sm-6">
              <TextField
                required
                name="appLangId"
                id="appLangId"
                select
                label={<IntlMessages id="list.of.languages" />}
                value={values.appLangId}
                onChange={this.props.handleChange("appLangId")}
                fullWidth
                SelectProps={{}}
                margin="normal"
              >
                {languageData.map((lang, index) => (
                  <MenuItem key={index} value={lang.languageId}>
                    {getNameLanguage(lang.languageId)}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="p-2 ">
              <div className="d-flex flex-row flex-wrap mb-3">
                <div className="p-2 picker" key="start_datetime">
                  <TimePicker
                    label={<IntlMessages id="start.hour.calendar" />}
                    fullWidth
                    value={values.selectedStartTime}
                    showTabs={false}
                    ampm={false}
                    onChange={this.props.handleStartTimeChange}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                  />
                </div>
                <div className="p-2 picker" key="end_datetime">
                  <TimePicker
                    label={<IntlMessages id="end.hour.calendar" />}
                    fullWidth
                    value={values.selectedEndTime}
                    showTabs={false}
                    ampm={false}
                    onChange={this.props.handleEndTimeChange}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                  />
                </div>
              </div>
            </div>
            <div className="p-2 ">
              <FormControl component="fieldset" required>
                <FormLabel
                  component="legend"
                  style={{ fontFamily: "Roboto", fontSize: "14px" }}
                >
                  <IntlMessages id="video.conferencing.tool" />
                </FormLabel>
                <RadioGroup
                  className="d-flex flex-row"
                  aria-label="conferenceTool"
                  name="conferenceTool"
                  value={values.conferenceTool}
                  onChange={this.props.handleChange("conferenceTool")}
                >
                
                  <FormControlLabel
                    value="Jitsi"
                    control={<Radio color="primary" />}
                    label="Jitsi"
                  />

                  <FormControlLabel
                    value="BBB"
                    control={<Radio color="primary" />}
                    label="Big blue button"
                  />
                  <FormControlLabel
                    value="Zoom"
                    control={<Radio color="primary" />}
                    label="Zoom"
                  />
                  <FormControlLabel
                    value="Teams"
                    control={<Radio color="primary" />}
                    label="Teams"
                  />
                </RadioGroup>
              </FormControl>
            </div>
         
            <div className="p-2 ">
              <div className="d-flex mt-4 flex-wrap justify-content-end  align-items-start col-md-12 col-lg-12 ">
                <div className="mr-2">
                  <Button
                    variant="contained"
                    onClick={this.props.handleCancel}
                    style={{
                      borderBottomLeftRadius: "13px",
                      borderBottomRightRadius: "13px",
                      borderTopLeftRadius: "13px",
                      borderTopRightRadius: "13px",
                      width: "100%",
                      height: "100%",
                      textTransform: "capitalize",
                    }}
                  >
                    {
                      <IntlMessages id="components.establishments.formadd.buttonCancel" />
                    }
                  </Button>
                </div>
                <div className="mr-2">
                  <Button
                    variant="contained"
                    style={{
                      borderBottomLeftRadius: "13px",
                      borderBottomRightRadius: "13px",
                      borderTopLeftRadius: "13px",
                      borderTopRightRadius: "13px",
                      width: "100%",
                      height: "100%",
                      textTransform: "capitalize",
                    }}
                    className=" text-white "
                    color="primary"
                    type="submit"
                  >
                    <IntlMessages id="button.save.registreAppel" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
         
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
  };
};

export default connect(mapStateToProps)(AddOption);
