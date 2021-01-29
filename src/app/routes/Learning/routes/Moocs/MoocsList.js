import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMoocs, editMoocs } from "../../../../../actions/MoocsActions";
import MoocsItem from "./MoocsItem";
import DeleteMoocs from "./DeleteMoocs";
import EditMoocs from "./EditMoocs";
import _ from "lodash";
import { roleIdProfessor } from "../../../../../config/config";
class MoocsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      deleteIsOpen: false,
      moocsItem: {},
      moocsText: "",
      moocsFile: null,
      topicMoocs: "",
      prerequiste: "",
      educationalGoals: "",
      SessionMoocs: "",
      dateOfCreation: new Date(),
      durationMoocs: "",
      courseAssignment: [],
      roomClasses: [],
      moocsAssignment: [],
      assignmentRefresh: [],
      id: null,
      moocsUrl: "",
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editMoocsShowModal = this.editMoocsShowModal.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false, deleteIsOpen: false });
  }
  submitDeleteMoocs = (event) => {
    this.props.deleteMoocs(this.state.deleteItem);
    this.setState({
      deleteIsOpen: false,
    });
  };

  handleDelete = (item) => {
    this.setState({ deleteIsOpen: true, deleteItem: item });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
 
  handleChangeSubject = (name) => (event) => {
    let obj = JSON.parse(event.target.value);
    let courseAssignment = this.props.courseAssignment.filter(
      (element) => element.fk_id_subject_v4 === obj.subjectId
    );
    this.setState({
      itemSubject: event.target.value,
      courseAssignment: courseAssignment,
      roomClasses: [],
      moocsAssignment: [],
      assignmentRefresh: [],
    });
  };
  handleChangeClass = (name) => (event) => {
    this.setState({ moocsAssignment: event.target.value });
    let roomClasses = event.target.value.map((element) => element.id);
    let assignmentRefresh = event.target.value.map((element) => {
      let data = {
        assignementId: element.id,
        classId: element.class.id,
        className: element.class.name,
        subjectName: element.subject.name,
        subjectId: element.subject.id,
      };
      return data;
    });
    this.setState({ roomClasses, assignmentRefresh });
  };
  onDrop = (e) => {
    if (e.target.files[0] !== undefined) {
      let file = e.target.files[0];
      this.setState({ moocsFile: file, moocsText: file.name });
    } else {
      this.setState({
        messageAlerte: "Vous n'avez pas choisir un vidéo",
        alerteFiltre: true,
      });
      setTimeout(() => {
        this.setState({ messageAlerte: "", alerteFiltre: false });
      }, 4000);
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let userReresh = {
      profileId: this.props.userProfile.id,
      name: this.props.userProfile.user.name,
      surname: this.props.userProfile.user.surname,
    };
    let data = {
      topicMoocs: this.state.topicMoocs,
      idAssignement: this.state.roomClasses,
      prerequiste: this.state.prerequiste,
      educationalGoals: this.state.educationalGoals,
      SessionMoocs: this.state.SessionMoocs,
      durationMoocs: this.state.durationMoocs,
      status: true,
      moocsFile: this.state.moocsFile,
      posteur: this.props.userProfile.id,
      id: this.state.moocsItem.id,
      moocsUrl: this.state.moocsUrl,
      assignmentRefresh: this.state.assignmentRefresh,
      userReresh,
    };
    this.props.editMoocs(data);
    this.setState({
      isOpen: false,
      moocsItem: {},
      moocsText: "",
      moocsFile: null,
      topicMoocs: "",
      prerequiste: "",
      educationalGoals: "",
      SessionMoocs: "",
      durationMoocs: 30,
      courseAssignment: [],
      roomClasses: [],
      itemSubject: "",
      moocsUrl: "",
      moocsAssignment: [],
    });
  };
  editMoocsShowModal = (item) => {
     let roomClasses = item.moocsAssignCourse.map(
      (element) => element.assignementId
    );
    let moocsAssignment = [];
    let courseAssignment = [];
    let assignmentRefresh = [];
    if (this.props.userProfile.role_id === roleIdProfessor) {
      courseAssignment = this.props.assignmentClassSubjectProf.filter(
        (element) =>
          element.fk_id_subject_v4 === item.moocsAssignCourse[0].subjectId
      );
      moocsAssignment = this.props.assignmentClassSubjectProf.filter(
        (element) => roomClasses.includes(element.id)
      );
      assignmentRefresh = moocsAssignment.map((element) => {
        let data = {
          assignementId: element.id,
          classId: element.class.id,
          className: element.class.name,
          subjectName: element.subject.name,
          subjectId: element.subject.id,
        };
        return data;
      });
    } else {
      courseAssignment = this.props.courseAssignment.filter(
        (element) =>
          element.fk_id_subject_v4 === item.moocsAssignCourse[0].subjectId
      );
      moocsAssignment = this.props.courseAssignment.filter((element) =>
        roomClasses.includes(element.id)
      );
      assignmentRefresh = moocsAssignment.map((element) => {
        let data = {
          assignementId: element.id,
          classId: element.class.id,
          className: element.class.name,
          subjectName: element.subject.name,
          subjectId: element.subject.id,
        };
        return data;
      });
    }

    this.setState({
      moocsAssignment,
      isOpen: true,
      moocsItem: item,
      moocsText: item.moocsUrl.slice(59),
      moocsUrl: item.moocsUrl,
      topicMoocs: item.moocsTopic,
      prerequiste: item.prerequiste,
      educationalGoals: item.educationalGoals,
      SessionMoocs: item.moocsSession,
      dateOfCreation: new Date(),
      durationMoocs: 30,
      courseAssignment: courseAssignment,
      assignmentRefresh: assignmentRefresh,
      roomClasses: roomClasses,
      itemSubject: JSON.stringify({
        subjectId: item.moocsAssignCourse[0].subjectId,
        subjectName: item.moocsAssignCourse[0].subjectName,
      }),
    });
  };
  render() {
    return (
      <div>
        <div
          className="row col-lg-12 col-md-12 bd-highlight"
          style={{ backgroundColor: "#FFFFFF", width: "100%" }}
        >
          {!_.isEmpty(this.props.listMoocs) ? (
            this.props.listMoocs.map((moocsItem, index) => (
              <MoocsItem
                key={index}
                moocsItem={moocsItem}
                editMoocsShowModal={this.editMoocsShowModal}
                handleDelete={this.handleDelete}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>

        {this.state.isOpen === true ? (
          <EditMoocs
            values={this.state}
            handleAnnule={this.handleCancel}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleChangeSubject={this.handleChangeSubject}
            handleChangeClass={this.handleChangeClass}
            onDrop={this.onDrop}
            subjects={this.props.subjects}
          />
        ) : (
          ""
        )}

        {this.state.deleteIsOpen === true ? (
          <DeleteMoocs
            handleCancel={this.handleCancel}
            deleteIsOpen={this.state.deleteIsOpen}
            submitDeleteMoocs={this.submitDeleteMoocs}
          />
        ) : (
          ""
        )}

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,

  };
}

export default connect(mapStateToProps, { deleteMoocs, editMoocs })(MoocsList);
