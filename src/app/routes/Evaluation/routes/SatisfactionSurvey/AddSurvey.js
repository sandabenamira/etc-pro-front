import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import CardBox from '../../../../../components/CardBox/index';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateFnsUtils from '@date-io/moment';
// import { Radio } from '@material-ui/core';
// import { green } from '@material-ui/core/colors';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import { withStyles } from '@material-ui/core/styles';

// import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
// import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
// import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
// import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
// import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// const GreenRadio = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Radio color="default" {...props} />);
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const customIcons = {
  1: {
    icon: (
      <fieldset>
        <div className="face m-5 b">
          <div>
            <div className="love">
              <style dangerouslySetInnerHTML={{ __html: '\nbody {\n  font-size: 20px;\n}\n' }} />
              <span style={{ fontSize: 60 }} role="img" aria-label="😡">😡</span>
              {/* <h5>Pas du tout satisfait </h5> */}
            </div>
          </div>
        </div>
      </fieldset>
    ),
    label: 'Very Dissatisfied',
  },
  2: {
    icon: (
      <fieldset>
        <div className="face m-5 b">
          <div>
            <div className="angry">
              <style dangerouslySetInnerHTML={{ __html: '\nbody {\n  font-size: 20px;\n}\n' }} />
              <span style={{ fontSize: 60 }} role="img" aria-label="🙁">🙁</span>
            </div>
          </div>
        </div>
      </fieldset>
    ),
    label: 'Dissatisfied',
  },
  3: {
    icon: (
      <fieldset>
        <div className="face m-5 b">
          <div>
            <div className="smile">
              <style dangerouslySetInnerHTML={{ __html: '\nbody {\n  font-size: 20px;\n}\n' }} />
              <span style={{ fontSize: 60 }}role="img" aria-label="😏">😏</span>
            </div>
          </div>
        </div>
      </fieldset>
    ),
    label: 'Neutral',
  },
  4: {
    icon: (
      <fieldset>
        <div className="face m-5">
          <div>
            <div className="smile">
              <style dangerouslySetInnerHTML={{ __html: '\nbody {\n  font-size: 20px;\n}\n' }} />
              <span style={{ fontSize: 60 }}role="img" aria-label="😄">😄</span>
            </div>
          </div>
        </div>
      </fieldset>
    ),
    label: 'Satisfied',
  },
  5: {
    icon: (
      <fieldset>
        <div className="face m-5 b">
          <div>
            <div className="love">
              <style dangerouslySetInnerHTML={{ __html: '\nbody {\n  font-size: 20px;\n}\n' }} />
              <span style={{ fontSize: 50 }}role="img" aria-label="😍">😍</span>
            </div>
          </div>
        </div>
      </fieldset>
    ),
    label: 'Very Satisfied',
  },
};
class AddSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      // satate for filtre
      roleIdFilter: 0,
      filterClassProfId: 0,
      filterSubjectProfId: 0,
      filterLevelStudentId: 0,
      filterClassStudentId: 0,
      usersList: {
        users: [],
        students: [],
        parents: [],
        professors: [],
        admins: [],
        directors: [],
        supervisors: [],
      },
      classStudentFilter: [],
      listGroupFilter: [],
      filterGroupStudentId: 0,
      // satate for edit
      userPapiersFiles: [],
      userPhoto: '',
      roleItemEdit: {},
      schoolyearEdit: {},
      establishmentEdit: {},
      userNameEdit: '',
      userLastNameEdit: '',
      userGenderEdit: '',
      birthdayDateEdit: '',
      birthdayPlaceEdit: '',
      userNationnalityEdit: '',
      userMailEdit: '',
      userPhoneNumberEdit: '',
      userCinEdit: '',
      userIdentifierEdit: '',
      userAdressEdit: '',
      userZipCodeEdit: '',
      userCountryEdit: {},
      photoText: '',
      usefulInformationEdit: '',
      nameFiles: [],
      /// student state
      listParentEdit: [],
      studentClassEdit: {},
      listGroupClass: [],
      studentGroupEdit: {},
      /// prof state
      listOfSubjectsEdit: [
        {
          id: 0,
          classId: 0,
          subjectId: 0,
          subjects: [],
          isAdded: false,
        },
      ],
      subjectIdSelected: [],
      oldProfAssignments: [],
      // state parent
      listStudentEdit: [],
      /// vie scolaire states
      fonctionEdit: '',
      // counter user
      userCount: '',
      selectedValue: 'a',
    };
    this.handlechange = this.handlechange.bind(this);
  }
  handlechange = (e) => {
    this.setState({
      selectedValue: e.target.value,
    });
  };

  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div className="table-responsive-material">
        <div className="d-flex justify-content-center">
          <h1 style={{ fontsize: 45 }}>
            <b>
              <IntlMessages id="survey.satisfaction.list" />
            </b>{' '}
          </h1>
        </div>
        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start ali p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>1 ) Merci de renseigner la formation suivie </h4>
                </div>

                <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                  <TextField
                    required
                    className="form-control"
                    variant="outlined"
                    id="formationTitle"
                     name="formationTitle"
                    placeholder="Nom de la formation suivie
                      "
                    // value={this.props.values.formationTitle}
                  />
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>2 ) Merci de renseigner la date de fin de la formation</h4>
                </div>
                <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                  {/* <TextField
                    required
                    className="form-control"
                    variant="outlined"
                    id="profileName"
                    variant="outlined"
                    name="profileName"
                    placeholder="Nom de la formation suivie
                      "
                    // value={}
                  /> */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      clearable
                      fullWidth
                      inputVariant="outlined"
                      size="small"
                      id="birthdayDate"
                      name="birthdayDate"
                      // value={this.state.birthDayDateProfile || ""}
                      //onChange={this.handleChangeBirthdayDate}
                      format="DD-MM-YYYY"
                      autoOk
                      maxDate={moment().year() - 6 + '-01-01'}
                    />
                  </MuiPickersUtilsProvider>
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>3 ) A l'issue de votre formation, êtes-vous satisfait de la qualité des relations avec le formateur</h4>
                </div>

                <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                  <Rating name="size-large" defaultValue={2} size="large" />
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>4 ) Êtes-vous satisfait des méthodes utilisées </h4>
                </div>
                <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                  <Rating name="size-large" defaultValue={2} size="large" />
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>5 ) Êtes-vous satisfait du rythme de la formation </h4>
                </div>
                <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                  <Rating name="size-large" defaultValue={2} size="large" />
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>6 ) Êtes-vous satisfait des moyens pédagogiques utilisés (documentation, supports)</h4>
                </div>
                <CardBox styleName="col-lg-12 col-sm-6 col-md-12">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                      name="customized-icons"
                      defaultValue={2}
                      getLabelText={(value) => console.log('rating', value)}
                      IconContainerComponent={IconContainer}
                      size="small"
                    />
                  </Box>
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>7 ) Êtes-vous satisfait de l'animation</h4>
                </div>
                <CardBox styleName="col-lg-12 col-sm-6 col-md-12">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                      name="customized-icons"
                      defaultValue={2}
                      getLabelText={(value) => console.log('rating', value)}
                      IconContainerComponent={IconContainer}
                      size="small"
                    />
                  </Box>
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>8 ) Êtes-vous satisfait de l'organisation matérielle </h4>
                </div>
                <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                  <Rating name="size-large" defaultValue={2} size="large" />
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>9 ) Êtes-vous satisfait des échanges dans le groupe</h4>
                </div>
                <CardBox styleName="col-lg-12 col-sm-6 col-md-12">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                      name="customized-icons"
                      defaultValue={2}
                      getLabelText={(value) => console.log('rating', value)}
                      IconContainerComponent={IconContainer}
                      size="small"
                    />
                  </Box>
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>10 ) Êtes-vous satisfait de l'aide reçue lorsque vous avez eu des difficultés</h4>
                </div>
                <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                  <Rating name="size-large" defaultValue={2} size="large" />
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex justify-content-start ">
                  <h4>11 ) Laissez vos commentaires</h4>
                </div>

                <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                  <TextField
                    required
                    className="form-control"
                    variant="outlined"
                    id="comment"
                     name="comment"
                    placeholder="commentaires
                      "
                    // value={this.props.values.comment}
                  />
                </CardBox>
              </div>
            </CardBox>
          </div>
        </div>
        <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
          {/* ------------     affichage liste des établissements pour super admin -------------------------------------------*/}

          <div className="p-2 bd-highlight col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
            <CardBox styleName="col-lg-8 col-sm-8 col-md-12  d-flex justify-content-center flex-column ">
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center justify-content-start p-2">
                <div class="col-lg-12 col-sm-12 col-md-12 d-flex flex-wrap flex-row justify-content-center pt-5">
                  <div class="p-1">
                    <Button
                      variant="contained"
                      className="bg-grey text-white pr-2 "
                      style={{
                        borderBottomLeftRadius: '16px',
                        borderBottomRightRadius: '16px',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                        width: '300px',
                        height: '70px',
                      }}
                      onClick={this.props.openAddModal}
                    >
                      {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                    </Button>
                  </div>
                  <div className="p-1">
                    <Button
                      // disabled={values.roleId ==="" || values.schoolyearId===""}
                      variant="contained"
                      style={{
                        borderBottomLeftRadius: '16px',
                        borderBottomRightRadius: '16px',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                        width: '300px',
                        height: '70px',
                      }}
                      className=" bg-indigo text-white pr-2 "
                      type="submit"
                    >
                      <IntlMessages id="profile.button.valide" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subjects: state.subject.subjects,
    levels: state.levelsReducer.levels,
    courseAssignment: state.AssignementReducer.courseAssignment,
    userProfile: state.auth.userProfile,
    establishments: state.establishment.remoteEstablishments,
  };
};

export default connect(mapStateToProps)(AddSurvey);
