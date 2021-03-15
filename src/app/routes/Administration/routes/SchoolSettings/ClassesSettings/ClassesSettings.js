import React from 'react';
import CardBox from '../../../../../../components/CardBox/index';
import { connect } from 'react-redux';
import ClassesSettingsList from './ClassesSettingsList';
import { UncontrolledAlert } from 'reactstrap';
import { addClassSetting } from '../../../../../../actions/ClassSettingsAction';
import moment from 'moment';

class ClassesSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nameClassSettings: '',
      alerteFiltre: false,
      messageAlerte: '',
      level_id: null,
      section_id: null,
      sections: [],
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.nameClassSettings,
      fk_id_school_year: parseInt(this.props.userProfile.school_year_id),
      fk_id_establishment: parseInt(this.props.userProfile.establishment_id),
      fk_id_level_v4: this.state.level_id,
      status: true,
      fk_id_section_v4: this.state.section_id,
      creation_date: moment(new Date()).format(),
    };
    this.props.dispatch(addClassSetting(data));
    this.openAddModal();
    this.setState({ nameClassSettings: '', level_id: '', section_id: '' });
  }
  handleArchive(event) {
    event.preventDefault();

    this.openAddModal();
    this.setState({
      nameClassSettings: '',
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeLevel = (name) => (event) => {
    let sections = this.props.sections;
    this.setState({ [name]: event.target.value, sections });
  };

  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div>
        <div className=" d-flex flex-wrap flex-column mb-3">
          {this.state.alerteFiltre ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.state.messageAlerte} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
        </div>
        <div className=" bd-highlight" style={{ width: '90%' }}>
          <CardBox styleName="col-lg-12">
            <ClassesSettingsList
              ClassSettings={this.props.ClassSettings}
              courseAssignment={this.props.courseAssignment}
              levels={this.props.levels}
              sections={this.props.sections}
              subjectList={this.props.subjectList}
              levelList={this.props.levelList}
            />
          </CardBox>
        </div>
        {/* <div className=" bd-highlight" style={{ width: "90%" }}>
          <CardBox styleName="col-lg-12">
            <ArchiveClassesSettings
              levels={this.props.levels}
              sections={this.props.sections}
            />
          </CardBox>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ClassSettings: state.ClassSettingsReducer.classSettings,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    levels: state.levelsReducer.levels,
    sections: state.SectionsReducer.Section,
    userProfile: state.auth.userProfile,
    courseAssignment: state.AssignementReducer.courseAssignment,
  };
};
export default connect(mapStateToProps)(ClassesSettings);
