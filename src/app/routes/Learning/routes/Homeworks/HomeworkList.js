import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getSectionFromLevel } from '../../../../../actions/sectionAction';
import { getLevelListFromEstabType } from '../../../../../actions/classLevelAction';
import axios from 'axios';
import baseUrl from '../../../../../config/config';
 import { roleIdAdmin } from '../../../../../config/config';
import { roleIdProfessor } from '../../../../../config/config';
import { roleIdParent } from '../../../../../config/config';
import { roleIdStudent } from '../../../../../config/config';
import _ from 'lodash';
import { privateStatus, publicStatus, allStatus } from '../../../../../config/config';
import moment from 'moment';
import HomeworkItem from './HomeworkItem';
import DeleteHomework from './DeleteHomework';
import { deleteHomework, editHomework } from '../../../../../actions/HomeworkAction';
import EditHomework from './EditHomework';
import IntlMessages from '../../../../../util/IntlMessages';
import { classService } from '../../../../../_services/class.service';
import DetailHomework from './DetailHomework';
import { object } from 'prop-types';

class HomeworkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HomeworkTypes: [
        {
          label: <IntlMessages id="toDo.book.exercise" />,
          value: 'book',
          id: 1,
        },
        {
          label: <IntlMessages id="toDo.series.exercise" />,
          value: 'serie',
          id: 2,
        },
        {
          label: <IntlMessages id="toDo.other.exercise" />,
          value: 'other',
          id: 3,
        },
      ],
      classes: [],
      subjects: [],
      deleteIsopen: false,
      itemIdDelete: '',
      editIsopen: false,
      itemEdit: {},
      nameFile: '',
      subjectId: null,
      subjectItem: {},
      classItem: [{}],
      publicationDate: new Date(),
      postTime: new Date(),
      renderingDate: new Date(),
      correctionDate: new Date(),
      description: '',
      courseUrl: '',
      nameFiles: [],
      homeworkFiles: [],
      messageAlerte: '',
      alerteStatus: false,
      errorClass: false,
      isEmptylistClass: false,
      homeworkId: '',
      homeworkFilesDelete: [],
      isOpenDetail: false,
      nameFilesDetails: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeHomeworkType = this.handleChangeHomeworkType.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeClassList = this.handleChangeClassList.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.attachFile = this.attachFile.bind(this);
    this.handleChangePostTime = this.handleChangePostTime.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.submitEditHomework = this.submitEditHomework.bind(this);
    this.handleShowDetail = this.handleShowDetail.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.communActions = this.communActions.bind(this);
  }
  handleCancel() {
    this.setState({ isOpenDetail: false });
  }

  handleShowDetail(item) {
    this.communActions(item);
    this.setState({ isOpenDetail: true });
  }

  submitEditHomework(e) {
    e.preventDefault();
    if (this.state.subjectId === null) {
      this.setState({ errorClass: true });
    } else if (_.isEmpty(this.state.classesId)) {
      this.setState({ isEmptylistClass: true });
    } else {
      let oldFiles = this.state.itemEdit.homework.homeworkFiles.filter(
        (element) => !this.state.homeworkFilesDelete.includes(element.id)
      );
      let dataHomework = {};
      dataHomework.title = this.state.nameFile;
      dataHomework.homeworkType =
        this.state.homeworkType.value===undefined ? '' : this.state.homeworkType.value;
      dataHomework.subjectId = this.state.subjectId;
      dataHomework.subjectColor = this.state.subjectColor;
      dataHomework.classesId = this.state.classesId;
      dataHomework.publicationDate = this.state.publicationDate;
      dataHomework.publicationTime = this.state.postTime;
      dataHomework.courseUrl = this.state.courseUrl;
      dataHomework.description = this.state.description;
      dataHomework.correctionDate = this.state.correctionDate;
      dataHomework.renderingDate = this.state.renderingDate;
      dataHomework.subjectName = this.state.subjectName;
      dataHomework.homeworkId = this.state.homeworkId;
      dataHomework.files_deleted = this.state.homeworkFilesDelete;

      this.props.dispatch(
        editHomework(dataHomework, this.state.homeworkFiles, this.state.classItem, oldFiles)
      );
      this.cancelModal();
    }
  }
  deleteFile(filename) {
    let nameFiles = this.state.nameFiles.filter((element) => element != filename);
    let homeworkFiles = this.state.homeworkFiles.filter((element) => element.name != filename);
    let deletedFiles = [];
    if (this.state.itemEdit.homework.homeworkFiles != undefined) {
      this.state.itemEdit.homework.homeworkFiles.map((element) => {
        if (element.name===filename) {
          deletedFiles.push(element.id);
        }
      });
    }
    this.state.homeworkFilesDelete.map((element) => {
      deletedFiles.push(element);
    });
    this.setState({ nameFiles, homeworkFiles, homeworkFilesDelete: deletedFiles });
  }

  handleChangePostTime = (time) => {
    this.setState({ postTime: time._d });
  };
  attachFile(e) {
    var oldFiles = this.state.homeworkFiles;
    var files = Object.values(e.target.files);
    var nameFiles = this.state.nameFiles;
    if (files !== undefined && this.state.nameFiles.length + files.length < 6) {
      files.map((element) => {
        nameFiles.push(element.name);
        oldFiles.push(element);
      });
      this.setState({ homeworkFiles: oldFiles, nameFiles });
    } else {
      this.setState({
        messageAlerte: 'vous avez dépasser 5 fichiers',
        alerteStatus: true,
      });
      setTimeout(() => {
        this.setState({ messageAlerte: '', alerteStatus: false });
      }, 4000);
    }
  }
  handleChangeDate = (name) => (date) => {
    this.setState({ [name]: date });
  };
  handleChangeClassList = (selectedOption) => {
    if (selectedOption != null) {
      let classesId = _.map(selectedOption, 'id');
      this.setState({
        classesId,
        isEmptylistClass: false,
        classItem: selectedOption,
      });
    } else {
      this.setState({ classesId: [], classItem: [] });
    }
  };
  handleChangeSubject = (selectedOption) => {
    if (selectedOption.id != this.state.subjectId) {
      this.setState({
        subjectColor: selectedOption.color,
        subjectName: selectedOption.label,
        subjectId: selectedOption.id,
        subjectItem: selectedOption,
        classItem: [],
        classesId: [],
        errorClass: false,
      });
      if (this.props.userProfile.role_id === roleIdAdmin) {
        let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_subject_v4]=${selectedOption.value}&filter[include]=class&filter[include]=course`;
        classService.get(apiEndpoint).then((response) => {
          if (response) {
            let classesSubjects = response.data.filter((element) => element.status);
            let newList = [];
            classesSubjects.map((element) => {
              let object = {};
              if (!_.isEmpty(element.course)) {
                object.label = element.class.name;
                object.id = element.course[0].id;
                object.value = element.course[0].id;

                newList.push(object);
              }
            });

            this.setState({ classes: newList });
          }
        });
      } else {
        let apiEndpoint = `/assignment_class_subjects/${selectedOption.value}?access_token=${localStorage.token}&filter[include]=class&filter[include]=course`;
        classService.get(apiEndpoint).then((response) => {
          if (response) {
            let element = response.data;
            if (element.status) {
              let object = {};
              object.label = element.class.name;
              object.id = element.course[0].id;
              object.value = element.course[0].id;
              this.setState({ classes: [object] });
            }
          }
        });
      }
    }
  };
  handleChangeHomeworkType = (selectedOption) => {
    this.setState({ homeworkType: selectedOption });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  communActions(item) {
    let homeworkType = this.state.HomeworkTypes.find(
      (element) => element.value===item.homework.homework_type
    );
    let subjectItem = this.props.subjects.find(
      (element) => element.id===item.homework.fk_id_subject
    );
    let classItem = {
      label: item.className,
      id: item.courseId,
      value: item.courseId,
    };
    var nameFiles = item.homework.homeworkFiles.map((element) => element.name);
    var nameFilesDetails = item.homework.homeworkFiles.map((element) => {
      let obj = {};
      obj.name = element.name;
      obj.url = element.url_file;
      return obj;
    });
    this.setState({
      homeworkId: item.homework.id,
      itemEdit: item,
      nameFile: item.homework.title,
      homeworkType,
      subjects: this.props.subjects,
      subjectItem,
      subjectId: item.homework.fk_id_subject,
      subjectColor: item.homework.subject.color,
      subjectName: item.homework.subject.name,
      classItem: [classItem],
      classesId: [item.courseId],
      description: item.homework.description,
      publicationDate: item.homework.publication_date,
      renderingDate: item.homework.rendering_date,
      correctionDate: item.homework.correction_date,
      postTime: item.homework.publication_time,
      courseUrl: item.homework.course_url,
      nameFiles,
      nameFilesDetails,
    });
  }

  handleEdit(item) {
     this.communActions(item);
    if (this.props.userProfile.role_id === roleIdAdmin) {
      let apiEndpoint = `/assignment_class_subjects?access_token=${localStorage.token}&filter[where][fk_id_subject_v4]=${item.homework.fk_id_subject}&filter[include]=class&filter[include]=course`;
      classService.get(apiEndpoint).then((response) => {
        if (response) {
          let classesSubjects = response.data.filter((element) => element.status);
          let newList = [];
          classesSubjects.map((element) => {
            let object = {};
            if (!_.isEmpty(element.course)) {
              object.label = element.class.name;
              object.id = element.course[0].id;
              object.value = element.course[0].id;

              newList.push(object);
            }
          });

          this.setState({ classes: newList });
        }
      });
    } else {
      let apiEndpoint = `/assignment_class_subjects/${item.homework.fk_id_subject}?access_token=${localStorage.token}&filter[include]=class&filter[include]=course`;
      classService.get(apiEndpoint).then((response) => {
        if (response) {
          let element = response.data;
          if (element.status) {
            let object = {};
            object.label = element.class.name;
            object.id = element.course[0].id;
            object.value = element.course[0].id;
            this.setState({ classes: [object] });
          }
        }
      });
    }
    this.setState({ editIsopen: true });
  }
  handleSubmitDelete() {
    this.setState({ deleteIsopen: false });
    this.props.dispatch(deleteHomework(this.state.itemIdDelete));
  }
  handleDelete(id) {
    this.setState({ deleteIsopen: true, itemIdDelete: id });
  }

  handleCancelDelete() {
    this.setState({ deleteIsopen: false, itemIdDelete: '' });
  }
  cancelModal() {
    this.setState({
      classes: [],
      subjects: [],
      editIsopen: false,
      itemEdit: {},
      nameFile: '',
      subjectId: null,
      subjectItem: {},
      classItem: [{}],
      publicationDate: new Date(),
      postTime: new Date(),
      renderingDate: new Date(),
      correctionDate: new Date(),
      description: '',
      courseUrl: '',
      nameFiles: [],
      homeworkFiles: [],
      messageAlerte: '',
      alerteStatus: false,
      errorClass: false,
      isEmptylistClass: false,
      homeworkId: '',
      homeworkFilesDelete: [],
    });
  }
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="col-xl-12 col-md-12 col-lg-12 col-sm-6 ">
        <div className="   price-tables row pt-default d-flex flex-wrap justify-content-start ">
          {this.props.homeworks.map((homeworkItem, index) => (
            <div className="col-md-12 col-lg-6 col-sm-6 col-xl-3 ">
              <HomeworkItem
                key={index}
                homeworkItem={homeworkItem}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                archived={false}
                handleShowDetail={this.handleShowDetail}
              />
            </div>
          ))}
        </div>

        {this.state.editIsopen === true ? (
          <EditHomework
            editIsopen={this.state.editIsopen}
            values={this.state}
            handleChange={this.handleChange}
            handleChangeHomeworkType={this.handleChangeHomeworkType}
            handleChangeSubject={this.handleChangeSubject}
            handleChangeClassList={this.handleChangeClassList}
            cancelModal={this.cancelModal}
            handleChangeDate={this.handleChangeDate}
            attachFile={this.attachFile}
            handleChangePostTime={this.handleChangePostTime}
            deleteFile={this.deleteFile}
            submitEditHomework={this.submitEditHomework}
          />
        ) : (
          ''
        )}

        {this.state.deleteIsopen === true ? (
          <DeleteHomework
            modal={this.state.deleteIsopen}
            handleCancelDelete={this.handleCancelDelete}
            handleSubmitDelete={this.handleSubmitDelete}
          ></DeleteHomework>
        ) : (
          ''
        )}

        {this.state.isOpenDetail && (
          <DetailHomework values={this.state} handleCancel={this.handleCancel} />
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

export default connect(mapStateToProps)(HomeworkList);
