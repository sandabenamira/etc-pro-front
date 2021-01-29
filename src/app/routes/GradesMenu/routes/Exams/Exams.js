import React from 'react';
import ContainerHeader from '../../../../../components/ContainerHeader/index';
import IntlMessages from '../../../../../util/IntlMessages';
import AddExam from './AddExam';
import ExamList from './ExamList';
import EditExam from './EditExam';
import DeleteExam from './DeleteExam';
import { getSubject } from '../../../../../actions/subjectAction';
import { getExam } from '../../../../../actions/examAction';
import { getEstablishment } from '../../../../../actions/establishmentAction';
import { getClasses } from '../../../../../actions/classeAction';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    subjects: state.subject.remoteSubjects,
    establishments: state.establishment.remoteEstablishments,
    exams: state.exam.remoteExams,
    classes: state.classes,
  };
}

class Exams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExamsList: [],
      ExamItem: [],
      edit: false,
      modalDelete: false,
      itemId: 0,
      refresh: false,
    };
    this.editItemExam = this.editItemExam.bind(this);
    this.requestDeleteExam = this.requestDeleteExam.bind(this);
    this.handleCancelModalDelete = this.handleCancelModalDelete.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
  }

  requestDeleteExam(id) {
    this.setState({ modalDelete: true, itemId: id, refresh: true });
  }

  editItemExam(id) {
    const ExamItem = this.props.exams.find((element) => element.id == id);
    this.setState({ ExamItem: ExamItem, edit: true, refresh: true });
  }

  componentDidMount() {
    this.props.getExam();
    this.props.getEstablishment();
    this.props.getSubject();
    this.props.getClasses();
  }

  handleCancelModal() {
    this.setState({ edit: false });
  }

  handleCancelModalDelete() {
    this.setState({ modalDelete: false, itemId: 0 });
  }

  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.submenu.components.exams" />}
        />
        <AddExam
          listEstablishment={this.props.establishments}
          listSubject={this.props.subjects}
          listClasses={this.props.classes}
        />
        <ExamList
          listEstablishment={this.props.establishments}
          editExam={this.editItemExam}
          requestDeleteExam={this.requestDeleteExam}
          listExams={this.props.exams}
          listSubject={this.props.subjects}
        />
        {this.state.edit ? (
          <EditExam
            ExamItem={this.state.ExamItem}
            listEstablishment={this.props.establishments}
            listSubject={this.props.subjects}
            listClasses={this.props.classes}
            cancelModal={this.handleCancelModal}
          />
        ) : (
          ''
        )}
        {this.state.modalDelete ? (
          <DeleteExam
            cancelModalDelete={this.handleCancelModalDelete}
            itemId={this.state.itemId}
            requestDeleteExam={this.requestDeleteExam}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  { getClasses, getSubject, getExam, getEstablishment }
)(Exams);
