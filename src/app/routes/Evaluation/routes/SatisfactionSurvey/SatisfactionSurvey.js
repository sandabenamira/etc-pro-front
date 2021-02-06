import React, { Component } from 'react'
import CardBox from "../../../../../components/CardBox/index";
import { connect } from "react-redux";
import { UncontrolledAlert } from "reactstrap";
import _ from "lodash";
import moment from "moment";
import AddSurvey from "./AddSurvey"
class SatisfactionSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoles: [],
      listSchoolYears: [],
      roleId: "",
      roleName: "",
      schoolyearId: null,
      classRoomId: null,
      subjectId: null,
      parentId: null,
      studentId: null,
      userName: "",
      userLastName: "",
      userNationnality: "",
      userCIN: "",
      userIdentifier: "",
      userMail: "",
      userPhoneNumber: "",
      userAdress: "",
      userCountry: "",
      userZipCode: "",
      userPhoto: "",
      userGender: "",
      birthdayDate: moment().year() - 6 + "-01-01",
      birthdayPlace: "",
      countriesList: [],
      usefulInformation: "",
      userPapiersFiles: [],
      nameUserPapiersFiles: [],
      isOpen: false,
      openArchive: false,
      isOpenArchive: false,
      messageAlerte: "",
      photoText: "",
      nameFiles: [],
      establishmentsList: [],
      establishmentId: "",
      classRoomList: [],
      subjectsList: [],
      classForStudent: [],
      studentClass: null,
      functionName: "",
      missingValue: false,
      alertMessage: "",
      subjectItem: {},
      listOfSubjects: [
        {
          id: 0,
          classId: 0,
          subjectId: 0,
          subjects: [],
        },
      ],
      parentsList: [],
      studentsList: [],
      levelId: null,
      sectionId: null,
      userList: {
        users: [],
        students: [],
        parents: [],
        professors: [],
        admins: [],
        directors: [],
        supervisors: [],
      },
      permissionList: [],
      birthdayDateCheck: false,
      listGroupClass: [],
      groupId: null,
      subjectIds: [],
    };

  }




  componentDidUpdate(prevProps) {

  }
  UNSAFE_componentWillMount() {
  
  }

  componentDidMount() {
   
  }

  render() {
     return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: "5%",
          marginRight: "10%",
        }}
      >
        <div className="  d-flex flex-column mb-3">

      

     
        </div>
     <div className=" bd-highlight" style={{ width: '90%' }}>
          <CardBox styleName="col-lg-12 col-sm-12 col-md-12   d-flex flex-column justify-content-center ">
             <AddSurvey/>
             
          </CardBox>

        </div> 
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersReducer: state.usersReducer,
    userProfile: state.auth.userProfile,
    establishments: state.establishment.remoteEstablishments,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    schoolYearEtabs: state.schoolYearEtab.remoteSchoolYearEtab,
    courseAssignment: state.AssignementReducer.courseAssignment,
    ClassSettings: state.ClassSettingsReducer.classSettings,
    userPermission: state.PermissionReducer.userPermission,
    userLoading: state.usersReducer.userLoading,
    groupsList: state.GroupsReducer.groupsList,
  };
};

export default connect(mapStateToProps, {

})(SatisfactionSurvey);
