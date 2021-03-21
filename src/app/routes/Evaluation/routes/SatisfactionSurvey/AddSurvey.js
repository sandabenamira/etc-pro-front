import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import IntlMessages from "../../../../../util/IntlMessages";
import WcIcon from "@material-ui/icons/Wc";
import { Radio } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";
  import DateFnsUtils from "@date-io/moment";
  import PropTypes from 'prop-types';
  import Rating from '@material-ui/lab/Rating';
  import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
  import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
  import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
  import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
  import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
  import Box from '@material-ui/core/Box';
  
  

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };
  
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

export default class AddSurvey extends Component {
  render() {
    return (
      <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
        <div class="p-2 bd-highlight col-lg-5  col-md-9 ">
          <div class="d-flex flex-column bd-highlight mb-3">
            <div
              class="p-2 bd-highlight"
              style={{ fontSize: "20px", color: "blue" }}
            >
              Questionnaire de satisfaction de Formation
            </div>
            <div class="d-flex flex-wrap flex-row bd-highlight mb-3 ">
              <div class="p-2 bd-highlight col-lg-5  col-md-4">
                <InputLabel
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    // marginTop: "-2%",
                  }}
                  required
                >
                  {<IntlMessages id="user.last.name" />}
                </InputLabel>
                <TextField
                  required
                  // error={values.nameError}
                  id="userLastName"
                  name="userLastName"
                  //   value={values.userLastName || ""}
                  //   onChange={this.props.handleChange("userLastName")}
                  style={{
                    marginTop: "3%",
                  }}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                />
              </div>
              <div class="p-2 bd-highlight col-lg-5  col-md-4">
                <InputLabel
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "18px",
                  }}
                  required
                >
                  {<IntlMessages id="user.name" />}
                </InputLabel>
                <TextField
                  required
                  // error={values.nameError}
                  id="userName"
                  name="userName"
                  // value={values.userName || ''}
                  // onChange={this.props.handleChange('userName')}
                  style={{
                    marginTop: "3%",
                  }}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                />
              </div>
            </div>
            <div class="d-flex flex-wrap flex-row bd-highlight mb-3 ">
              <div class="p-2 bd-highlight col-md-6 col-lg-3 ">Vous etes </div>
              <div class="p-2 bd-highlight">
                {" "}
                <div className="col-md-6 col-lg-3 col-sm-12 p-0 d-flex justify-content-center">
                  <Radio
                    //   checked={values.userGender === "Male"}
                    //   onChange={this.props.handleChange("userGender")}
                    value="Male"
                    color="primary"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "D" }}
                  />
                  <WcIcon color="primary" style={{ fontSize: 60 }} />
                  <Radio
                    //   checked={values.userGender === "Female"}
                    //   onChange={this.props.handleChange("userGender")}
                    value="Female"
                    color="primary"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "D" }}
                  />
                </div>
              </div>
            </div>
            <div class="p-2 bd-highlight col-lg-8  col-md-8">
              <InputLabel
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                }}
                required
              >
                Entreprise
              </InputLabel>
              <TextField
                required
                // error={values.nameError}
                id="userName"
                name="userName"
                // value={values.userName || ''}
                // onChange={this.props.handleChange('userName')}
                style={{
                  marginTop: "3%",
                }}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              />
            </div>

            <div className=" col-lg-8 col-md-8 col-sm-12 p-2 bd-highlight">
              <TextField
                id="status"
                name="status"
                select
                // value={this.state.status || ""}
                // onChange={this.handleChangeStatus("status")}
                SelectProps={{}}
                label={<IntlMessages id={`name.formation`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {/* {listStatus.map((role) => ( */}
                <MenuItem
                // key={role.id} value={role.id}
                >
                  {/* {role.label} */}
                </MenuItem>
                {/* ))} */}
              </TextField>
            </div>
            <div class="d-flex flex-row bd-highlight mb-3">
             
              <div className="col-lg-5  col-md-5 p-2 bd-highlight">
                                <div className="form-group">
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      required
                                      label="Date début Formation"                                       
                                      fullWidth
                                      id="dateVirtualClass"
                                      name="dateVirtualClass"
                                    //   value={values.dateVirtualClass}
                                    //   onChange={handleChangeDate}
                                      format="DD-MM-YYYY"
                                      autoOk
                                      minDate={new Date()}
                                    />
                                  </MuiPickersUtilsProvider>
                                
                              </div>
              </div>
              <div class="p-2 bd-highlight col-lg-5  col-md-5">
              <div className="form-group">
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      required
                                      label="Date fin Formation"                                       
                                      fullWidth
                                      id="dateVirtualClass"
                                      name="dateVirtualClass"
                                    //   value={values.dateVirtualClass}
                                    //   onChange={handleChangeDate}
                                      format="DD-MM-YYYY"
                                      autoOk
                                      minDate={new Date()}
                                    />
                                  </MuiPickersUtilsProvider>
                                
                              </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-2 bd-highlight col-lg-1  col-md-2">
          Flex item 2ss
        </div>


        <div class="p-2 bd-highlight col-lg-5  col-md-9 ">
        <div class="d-flex flex-column bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight">La relation avec le formateur</div>
  <div class="p-2 bd-highlight">
  <Box component="fieldset" mb={3} borderColor="transparent">
      
        <Rating
          name="customized-icons"
          defaultValue={2}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
          size="large"
        />
      </Box>
  </div>
</div>
<div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
</div>
<div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
</div>
<div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
</div>
<div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
</div>
<div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
  
</div>
  <div class="p-2 bd-highlight">Flex item 8</div>
  <div class="p-2 bd-highlight">Flex item 9</div>
  <div class="p-2 bd-highlight">Flex item 10</div>
  <div class="p-2 bd-highlight">Flex item 11</div>
</div>   
        </div>
        
      </div>
    );
  }
}
