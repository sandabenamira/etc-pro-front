import React, { Component } from "react";
import VirtualClassListItems from "./VirtualClassListItems";
import EditVitualClass from "./EditVitualClass";
import { editClassVirtual } from "../../../../../actions/VirtualClassAction";
import { deleteClassVirtual } from "../../../../../actions/VirtualClassAction";
import { connect } from "react-redux";
import axios from "axios";
import baseUrl from "../../../../../config/config";
 import { roleIdProfessor } from "../../../../../config/config";
import _ from "lodash";
import DeleteVirtualClass from "./DeleteVirtualClass";
import JitsiComponent from "./JitsiComponent";
import moment from "moment";

class VirtualClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateVirtualClass: new Date(),
      virtualClassName: "",
      classUrl: "",
      password: "",
      description: "",
      virtualClassNameOld: "",
      classUrlOld: "",
      passwordOld: "",
      startTimeClass: new Date(),
      endTimeClass: new Date(),
      virtualClassStatus: "",
      accessibility: true,
      classId: null,
      subjectId: null,
      courseId: null,
      professorId: null,
      id: null,
      classes: [],
      professors: [],
      subjects: [],
      assignmentClassSubject: [],
      profName: "",
      profSurname: "",
      subjectName: "",
      classeName: "",
      subjectColor: "",
      itemClass: "",
      itemProfessor: "",
      itemSubject: "",
      publish: false,
      isOpenDetails: false,

      professorIdFilter: "",
      studentClassIdFilter: "",
      addIsopen: false,
      editIsopen: false,
      deleteIsopen: false,
      showIsopen: true,
      class_object: "",
      level_id: "",
      section_id: "",
      professor_id: "",
      class_id: "",
      subject_id: "",
      class_url: "",
      class_password: "",
      class_date: "",
      selectedStartTime: new Date(),
      selectedEndTime: new Date(),
      startTime: "",
      endTime: "",
      studentsectionByLevels: [],
      Disable_studentsection: true,
      levelsbyestablishment: [],
      studentClassesByLevelSectionID: [],
      subjectList: [],
      establishmentProfessor: [],
      professorClassesAdd: [],
      profSubjects: [],
      classItem: {},
      deleteItem: {},
      virtualClasses: [],
      ListPrivateVirtuelClasses: [],
      ListPublicVirtuelClasses: [],
      alerteDate: false,
      startTimeClassError: true,
      endTimeClassError: true,
    };
    this.addClassShowModal = this.addClassShowModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.editVirtualClass = this.editVirtualClass.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeProfessor = this.handleChangeProfessor.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteVirtualClass = this.handleDeleteVirtualClass.bind(this);
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleStartTimeChange = (time) => {
    let startTimeClassError;

    if (
      moment(this.state.dateVirtualClass).format("LL") ==
      moment(new Date()).format("LL")
    ) {
      startTimeClassError =
        moment(time._d).isBefore(this.state.endTimeClass) &&
        moment(time._d).isAfter(this.state.dateVirtualClass);
    } else {
      startTimeClassError = moment(time._d).isBefore(this.state.endTimeClass);
    }

    let endTimeClassError = moment(this.state.endTimeClass).isAfter(time._d);
    this.setState({
      startTimeClass: time._d,
      startTimeClassError: startTimeClassError,
      endTimeClassError: endTimeClassError,
    });
  };

  handleEndTimeChange = (time) => {
    let endTimeClassError = moment(time._d).isAfter(this.state.startTimeClass);
    let startTimeClassError;

    if (
      moment(this.state.dateVirtualClass).format("LL") ==
      moment(new Date()).format("LL")
    ) {
      startTimeClassError =
        moment(this.state.startTimeClass).isBefore(time._d) &&
        moment(this.state.startTimeClass).isAfter(this.state.dateVirtualClass);
    } else {
      startTimeClassError = moment(this.state.startTimeClass).isBefore(time._d);
    }

    this.setState({
      endTimeClass: time._d,
      endTimeClassError: endTimeClassError,
      startTimeClassError: startTimeClassError,
    });
  };

  handleChangeDate = (date) => {
    let startTimeClassError;

    if (moment(date._d).format("LL") == moment(new Date()).format("LL")) {
      startTimeClassError =
        moment(this.state.startTimeClass).isBefore(this.state.endTimeClass) &&
        moment(this.state.startTimeClass).isAfter(date._d);
    } else {
      startTimeClassError = moment(this.state.startTimeClass).isBefore(
        this.state.endTimeClass
      );
    }
    this.setState({
      dateVirtualClass: date._d,
      startTimeClassError: startTimeClassError,
    });
  };

  handleChangeClass = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    let obj = JSON.parse(event.target.value);
    this.setState({
      classId: obj.classId,
      classeName: obj.classeName,
    });
    if (this.props.userProfile.role_id === roleIdProfessor) {
      let subjects = this.state.assignmentClassSubject.filter(
        (element) => element.class.id === obj.classId
      );
      this.setState({ subjects });
    } else {
      let apiEndpoint = `${baseUrl.baseUrl}/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_class_v4]=${obj.classId}&filter[include][course][professor][profile][user]`;
      axios.get(apiEndpoint).then((res) => {
        let courses = [];
        res.data.forEach((element) => {
          courses.push(element.course);
        });
        let newCoursesList = _.flatten(courses);
        this.setState({
          professors: newCoursesList,
          subjects: [],
          professorId: null,
        });
      });
    }
  };

  handleChangeProfessor = (name) => (event) => {
    let obj = JSON.parse(event.target.value);
    this.setState({
      professorId: obj.profId,
      profName: obj.profName,
      profSurname: obj.profSurname,
      itemProfessor: event.target.value,
    });
    let apiEndpoint = `${baseUrl.baseUrl}/course_v4?access_token=${localStorage.token}&filter[where][fk_id_professor]=${obj.profId}&filter[include][assignmentClassSubject][subject]`;
    axios.get(apiEndpoint).then((res) => {
      let subjects = [];
      res.data.forEach((element) => {
        if (
          element.assignmentClassSubject.fk_id_class_v4 === this.state.classId
        ) {
          let newObj = {
            ...element.assignmentClassSubject,
            courseId: element.id,
          };

          subjects.push(newObj);
        }
      });
      this.setState({ subjects });
    });
  };

  handleChangeSubject = (name) => (event) => {
    let obj = JSON.parse(event.target.value);
    this.setState({
      itemSubject: event.target.value,
      subjectId: obj.subjectId,
      subjectName: obj.subjectName,
      subjectColor: obj.subjectColor,
      courseId: obj.courseId,
    });
  };

  editVirtualClass = (e) => {
    e.preventDefault();
    if (this.state.endTimeClassError && this.state.startTimeClassError) {
      let dateClass = moment(this.state.dateVirtualClass).format("LL");
      let endHourClass = moment(this.state.endTimeClass).format("HH:mm");
      let startHourClass = moment(this.state.startTimeClass).format("HH:mm");
      let timedebutAdd = Date.parse(dateClass + " " + startHourClass) / 60000;
      let timefinAdd = Date.parse(dateClass + " " + endHourClass) / 60000;

      const result = this.props.virtualClasses.filter((item) => {
        let dateClassItem = moment(item.date_virtual_class).format("LL");
        let endHourClassItem = moment(item.end_time_class).format("HH:mm");
        let startHourClassItem = moment(item.start_time_class).format("HH:mm");

        let timedebutItem =
          Date.parse(dateClassItem + " " + startHourClassItem) / 60000;
        let timefinItem =
          Date.parse(dateClassItem + " " + endHourClassItem) / 60000;

        return (
          item.id != this.state.id &&
          item.classeId == this.state.classId &&
          dateClassItem == dateClass &&
          ((timedebutAdd <= timedebutItem && timefinItem <= timefinAdd) ||
            (timedebutItem <= timedebutAdd && timedebutAdd <= timefinItem) ||
            (timedebutItem <= timefinAdd && timefinAdd <= timefinItem))
        );
      });

      if (result.length > 0) {
        this.setState({ alerteDate: true });
        setTimeout(() => {
          this.setState({ alerteDate: false });
        }, 3000);
      } else {
        if (
          this.state.classUrl !== this.state.classUrlOld ||
          this.state.password !== this.state.passwordOld ||
          this.state.virtualClassName != this.state.virtualClassNameOld
        ) {
          this.setState({ call: true });
        }
        let data = {
          virtualClassName: this.state.virtualClassName,
          accessibility: this.state.accessibility,
          classId: this.state.classId,
          subjectId: this.state.subjectId,
          courseId: this.state.courseId,
          professorId: this.state.professorId,
          dateVirtualClass: this.state.dateVirtualClass,
          startTimeClass: this.state.startTimeClass,
          endTimeClass: this.state.endTimeClass,
          classUrl: this.state.classUrl,
          password: this.state.password,
          profName: this.state.profName,
          profSurname: this.state.profSurname,
          subjectName: this.state.subjectName,
          classeName: this.state.classeName,
          subjectColor: this.state.subjectColor,
          publish: this.state.publish,
          id: this.state.id,
          description: this.state.description,
        };

        this.props.editClassVirtual(data);

        this.setState({
          call: false,
          editIsopen: false,
          virtualClassName: "",
          accessibility: "",
          courseId: null,
          classId: null,
          subjectId: null,
          professorId: null,
          dateVirtualClass: new Date(),
          startTimeClass: new Date(),
          endTimeClass: new Date(),
          classUrl: "",
          password: "",
          profName: "",
          profSurname: "",
          subjectName: "",
          classeName: "",
          itemClass: "",
          itemProfessor: "",
          itemSubject: "",
          publish: false,
          description: "",
        });
      }
    }
  };

  addClassShowModal = () => {
    this.setState({ addIsopen: true });
  };

  editClassShowModal = (ClassObjectEdit) => {
    if (ClassObjectEdit.virtual_class_status === "programée") {
      if (this.props.userProfile.role_id === roleIdProfessor) {
        this.setState({ classId: null });
        let apiEndpoint = `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
        axios.get(apiEndpoint).then((res) => {
          let data = _.map(res.data, "course");
          let classes = [];
          let assignmentClassSubject = [];
          data[0].forEach((element) => {
            if (
              element.assignmentClassSubject.class.fk_id_school_year ==
              this.props.userProfile.school_year_id
            ) {
              let newObj = {
                ...element.assignmentClassSubject,
                courseId: element.id,
              };
              classes.push(element.assignmentClassSubject.class);
              assignmentClassSubject.push(newObj);
            }
          });
          this.setState({ classes, subjects: assignmentClassSubject });
        });
      } else {
        this.setState({ classes: this.props.ClassSettings });
        let apiEndpoint1 = `${baseUrl.baseUrl}/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_class_v4]=${ClassObjectEdit.classeId}&filter[include][course][professor][profile][user]`;
        axios.get(apiEndpoint1).then((res) => {
          let courses = [];
          res.data.forEach((element) => {
            courses.push(element.course);
          });
          let newCoursesList = _.flatten(courses);
          this.setState({ professors: newCoursesList });
        });
        let apiEndpoint = `${baseUrl.baseUrl}/course_v4?access_token=${localStorage.token}&filter[where][fk_id_professor]=${ClassObjectEdit.profId}&filter[include][assignmentClassSubject][subject]`;
        axios.get(apiEndpoint).then((res) => {
          let subjects = [];
          res.data.forEach((element) => {
            if (
              element.assignmentClassSubject.fk_id_class_v4 ===
              this.state.classId
            ) {
              let newObj = {
                ...element.assignmentClassSubject,
                courseId: element.id,
              };

              subjects.push(newObj);
            }
          });
          this.setState({ subjects });
        });
      }

      this.setState({
        editIsopen: true,
        dateVirtualClass: ClassObjectEdit.date_virtual_class,
        virtualClassName: ClassObjectEdit.virtual_class_name,
        classUrl: ClassObjectEdit.class_url,
        password: ClassObjectEdit.password,
        description: ClassObjectEdit.description,
        classUrlOld: ClassObjectEdit.class_url,
        passwordOld: ClassObjectEdit.password,
        virtualClassNameOld: ClassObjectEdit.virtual_class_name,
        startTimeClass: ClassObjectEdit.start_time_class,
        endTimeClass: ClassObjectEdit.end_time_class,
        virtualClassStatus: ClassObjectEdit.virtual_class_status,
        accessibility: ClassObjectEdit.accessibility,
        id: ClassObjectEdit.id,
        classId: ClassObjectEdit.classeId,
        subjectId: ClassObjectEdit.subjectId,
        courseId: ClassObjectEdit.fk_id_course_v4,
        professorId: ClassObjectEdit.profId,
        profName: ClassObjectEdit.profName,
        profSurname: ClassObjectEdit.profSurname,
        subjectName: ClassObjectEdit.subjectName,
        classeName: ClassObjectEdit.classeName,
        subjectColor: ClassObjectEdit.subjectColor,
        publish: ClassObjectEdit.publish,
        itemClass: JSON.stringify({
          classId: ClassObjectEdit.classeId,
          classeName: ClassObjectEdit.classeName,
        }),
        itemProfessor: JSON.stringify({
          profId: ClassObjectEdit.profId,
          profName: ClassObjectEdit.profName,
          profSurname: ClassObjectEdit.profSurname,
        }),
        itemSubject: JSON.stringify({
          subjectId: ClassObjectEdit.subjectId,
          subjectName: ClassObjectEdit.subjectName,
          subjectColor: ClassObjectEdit.subjectColor,
          // courseId: ClassObjectEdit.fk_id_course_v4,
        }),
      });
    }
  };
  handleCancel = () => {
    this.setState({
      addIsopen: false,
      editIsopen: false,
      deleteIsopen: false,
      showIsopen: false,
      isOpenDetails: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.virtualClasses !== this.props.virtualClasses) {
      let newList= filterVirtualClass(this.props.virtualClasses)
      this.setState({ virtualClasses: newList });
  
    }

    if (prevProps.filterStatus !== this.props.filterStatus) {
      let VirtualClassListFinal = this.props.virtualClasses.filter(
        (elementItem) => {
          const sys = Date.parse(new Date()) / 60000;
          const start =
            Date.parse(
              elementItem.date_virtual_class.slice(0, 10) +
                " " +
                moment(elementItem.start_time_class).format("HH:mm")
            ) / 60000;
          const end =
            Date.parse(
              elementItem.date_virtual_class.slice(0, 10) +
                " " +
                moment(elementItem.end_time_class).format("HH:mm")
            ) / 60000;
          if (
            this.props.filterStatus == "upcoming" &&
            start > sys &&
            end > sys
          ) {
            return elementItem;
          } else if (
            this.props.filterStatus == "progress" &&
            start < sys &&
            end > sys
          ) {
            return elementItem;
          } else if (
            this.props.filterStatus == "past" &&
            start < sys &&
            end < sys
          ) {
            return elementItem;
          } else if (this.props.filterStatus == "all") {
            return elementItem;
          }
        }
      );

      this.setState({ virtualClasses: VirtualClassListFinal });
    }
  }
  handleDelete = (item) => {
    this.setState({ deleteIsopen: true, deleteItem: item });
  };
  handleDeleteVirtualClass = (event) => {
    this.props.deleteClassVirtual(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };
  UNSAFE_componentWillMount() {
    
    let newList= filterVirtualClass(this.props.virtualClasses)
    this.setState({ virtualClasses: newList });
    if (this.props.userProfile.role_id === roleIdProfessor) {
      let apiEndpoint = `${baseUrl.baseUrl}/professors?access_token=${localStorage.token}&filter[where][profile_id]=${this.props.userProfile.id}&filter[include][course][assignmentClassSubject]=class&filter[include][course][assignmentClassSubject]=subject`;
      axios.get(apiEndpoint).then((res) => {
        let data = _.map(res.data, "course");
        let classes = [];
        let assignmentClassSubject = [];
        data[0].forEach((element) => {
          classes.push(element.assignmentClassSubject.class);
          assignmentClassSubject.push(element.assignmentClassSubject);
        });
        this.setState({
          classes,
          professorId: res.data[0].id,
          assignmentClassSubject,
        });
      });
    } else {
      this.setState({ classes: this.props.ClassSettings });
    }
  }
  render() {
    return (
      <div className="col-md-12 col-lg-12 col-sm-6 ">
        <div className="   price-tables row pt-default d-flex justify-content-start ">
          {!_.isEmpty(this.state.virtualClasses) ? (
            this.state.virtualClasses.map((element, index) => (
              <div className="col-md-6 col-lg-3 col-sm-6 " key={index}>
                <VirtualClassListItems
                  key={index}
                  index={index}
                  Item={element}
                  subjectList={this.props.subjectList}
                  editClassShowModal={this.editClassShowModal}
                  handleShowClassDetails={this.handleShowClassDetails}
                  handleDelete={this.handleDelete}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>

        {this.state.editIsopen === true ? (
          <EditVitualClass
            editIsopen={this.state.editIsopen}
            handleCancel={this.handleCancel}
            editVirtualClass={this.editVirtualClass}
            values={this.state}
            handleChangeDate={this.handleChangeDate}
            handleChange={this.handleChange}
            handleStartTimeChange={this.handleStartTimeChange}
            handleEndTimeChange={this.handleEndTimeChange}
            addVirtualClass={this.addVirtualClass}
            handleChangeClass={this.handleChangeClass}
            handleChangeProfessor={this.handleChangeProfessor}
            handleChangeSubject={this.handleChangeSubject}
          />
        ) : (
          ""
        )}

        {this.state.deleteIsopen === true ? (
          <DeleteVirtualClass
            handleDeleteVirtualClass={this.handleDeleteVirtualClass}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
          />
        ) : (
          ""
        )}
        {this.state.call == true ? (
          <JitsiComponent values={this.state} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    ClassSettings: state.ClassSettingsReducer.classSettings,
  };
}

function filterVirtualClass(virtualClassList) {
 let newList= virtualClassList.filter(
    (elementItem) => {
      const sys = Date.parse(new Date()) / 60000;
      const start =
        Date.parse(
          elementItem.date_virtual_class.slice(0, 10) +
            " " +
            moment(elementItem.start_time_class).format("HH:mm")
        ) / 60000;
      const end =
        Date.parse(
          elementItem.date_virtual_class.slice(0, 10) +
            " " +
            moment(elementItem.end_time_class).format("HH:mm")
        ) / 60000;
      if ( (start > sys && end > sys) || ( start < sys && end > sys)
      ) {
        return elementItem;
      }  
    }
  );

  return  newList
  
}


export default connect(
  mapStateToProps,
  {
    editClassVirtual,
     deleteClassVirtual,
  }
)(VirtualClassList);
