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
  import Typography from '@material-ui/core/Typography';
  import Button from '@material-ui/core/Button';

  

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: 50 }}   />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon style={{ fontSize: 50 }}/>,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon style={{ fontSize: 50 }}/>,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon style={{ fontSize: 50 }}/>,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon style={{ fontSize: 50 }}/>,
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
      <div class="d-flex flex-wrap flex-row bd-highlight mb-3 justify-content-between">
        <div class="p-2 bd-highlight col-lg-5  col-md-11 ">
          <div class="d-flex flex-column bd-highlight mb-3">
            <div
              class="p-2 bd-highlight"
              style={{ fontSize: "28px", color: "#41549F" }}
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
                     value={ "KHLIFI"}
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
                   value={'Hamza'}
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
                    color="danger"
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

        <div class="p-2 bd-highlight col-lg-1  d-none d-lg-block  ">
      
        
          <hr style={{border:"none",borderLeft:"1px solid hsla(200, 10%, 50%,100)" , height:"90vh", width:"1px"}}/>
        </div>


        <div class="p-2 bd-highlight col-lg-5  col-md-11 ">
        <div class="d-flex flex-wrap flex-column bd-highlight mb-3 ">
  <div class="p-2 bd-highlight " style={{color:"#1977A7" , fontSize:"25px"}}>Etes-vous satisfaits de la qualité de :</div>
  <div class="d-flex flex-wrap flex-row bd-highlight ">
  <div class="p-2 bd-highlight col-lg-5  col-md-5"  style={{color:"#1977A7" , fontSize:"18px"}}>La relation avec le formateur</div>
  <div class="p-2 bd-highlight col-lg-6 col-md-6">
  <Box component="fieldset"  borderColor="transparent">
      
        <Rating
          name="customized-icons"
          defaultValue={2}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
         
        />
      </Box>
  </div>
</div>
<div class="d-flex flex-wrap flex-row bd-highlight ">
  <div class="p-2 bd-highlight col-lg-5  col-md-5" style={{color:"#1977A7" , fontSize:"18px"}}>Les méthodes utilisées</div>
  <div class="p-2 bd-highlight col-lg-6 col-md-6">
  <Box component="fieldset"  borderColor="transparent">
      
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
<div class="d-flex flex-wrap flex-row bd-highlight ">
  <div class="p-2 bd-highlight col-lg-5  col-md-5" style={{color:"#1977A7" , fontSize:"18px"}}>Le rythme de la formation</div>
  <div class="p-2 bd-highlight col-lg-6 col-md-6">
  <Box component="fieldset"  borderColor="transparent">
      
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
<div class="d-flex flex-wrap flex-row bd-highlight ">
  <div class="p-2 bd-highlight col-lg-5  col-md-5" style={{color:"#1977A7" , fontSize:"18px"}}>Les moyens pédagogiques</div>
  <div class="p-2 bd-highlight col-lg-6 col-md-6">
  <Box component="fieldset"  borderColor="transparent">
      
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
<div class="d-flex flex-wrap flex-row bd-highlight ">
  <div class="p-2 bd-highlight col-lg-5  col-md-5" style={{color:"#1977A7" , fontSize:"18px"}}>L'animation</div>
  <div class="p-2 bd-highlight col-lg-6 col-md-6">
  <Box component="fieldset"  borderColor="transparent">
      
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
<div class="d-flex flex-wrap flex-row bd-highlight ">
  <div class="p-2 bd-highlight col-lg-5  col-md-5" style={{color:"#1977A7" , fontSize:"18px"}}>L'organisation matérielle</div>
  <div class="p-2 bd-highlight col-lg-6 col-md-6">
  <Box component="fieldset"  borderColor="transparent">
      
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
<div class="d-flex flex-wrap flex-row bd-highlight ">
  <div class="p-2 bd-highlight col-lg-5  col-md-5" style={{color:"#1977A7" , fontSize:"18px"}}>L'aide reçue en cas de besoin</div>
  <div class="p-2 bd-highlight col-lg-6 col-md-6">
  <Box component="fieldset"  borderColor="transparent">
      
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
<div class="d-flex flex-wrap flex-row bd-highlight ">
  <div class="p-2 bd-highlight col-lg-5  col-md-5" style={{color:"#1977A7" , fontSize:"18px"}}>Les échanges dans le groupe</div>
  <div class="p-2 bd-highlight col-lg-6 col-md-6">
  <Box component="fieldset"  borderColor="transparent">
      
        <Rating
          name="customized-icons"
          defaultValue={2}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
          size="small"
        />
      </Box>
  </div>
</div>
<div className="col-md-8 col-lg-10 col-sm-12 p-2">
                  <label>
                    <Typography
                      style={{color:"#1977A7" , fontSize:"20px"}}
                    >
                      Commentaire
                    </Typography>
                  </label>
                  <textarea
                    className="container"
                    id="usefulInformation"
                    name="usefulInformation"
                    rows="3"
                    // value={values.usefulInformation || ''}
                    // onChange={this.props.handleChange('usefulInformation')}
                    style={{
                      borderRadius: '20px',
                      marginTop: '10px',
                      width: '100%',
                    }}
                  ></textarea>
                </div>
                <div className="d-flex flex-wrap justify-content-end ">
                          <Button
                            variant="contained"
                            onClick={this.props.openAddModal}
                            style={{
                              borderBottomLeftRadius: '16px',
                              borderBottomRightRadius: '16px',
                              borderTopLeftRadius: '16px',
                              borderTopRightRadius: '16px',
                              width: '120px',
                              height: '40px',
                            }}
                          >
                            {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                          </Button>
                         
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            // disabled={
                            //   this.props.values.section_id===null ||
                            //   this.props.values.level_id===null ||
                            //   this.props.values.nameClassSettings===''
                            //     ? true
                            //     : false
                            // }
                            style={{
                              borderBottomLeftRadius: '16px',
                              borderBottomRightRadius: '16px',
                              borderTopLeftRadius: '16px',
                              borderTopRightRadius: '16px',
                              width: '120px',
                              height: '40px',
                            }}
                            className=" bg-indigo text-white "
                            type="submit"
                          >
                            <IntlMessages id="service.button.send" />
                          </Button></div>
</div>   
        </div>
        
      </div>
    );
  }
}
