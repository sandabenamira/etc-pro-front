import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IntlMessages from '../../../../../../util/IntlMessages';
import EditSchoolSession from './EditSchoolSession';
import _ from 'lodash';
import SchoolSessionListItem from './SchoolSessionListItem';
import DeleteSchoolSessionItem from './DeleteSchoolSession';
import { connect } from 'react-redux';
import { editSchoolSession } from '../../../../../../actions/SchoolSessionAction';
import { deleteSchoolSession } from '../../../../../../actions/SchoolSessionAction';
import moment from 'moment';

class SchoolSessionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      nameSchoolSession: '',
      start_date: new Date(),
      end_date: new Date(),
      id: null,
      fk_id_education_type_v4: null,
      educationItem: {},
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteSchoolSession = this.handleDeleteSchoolSession.bind(this);
    this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
    this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeEducationType = this.handleChangeEducationType.bind(this);
  }
  handleChangeEducationType = (name) => (event) => {
    let obj = JSON.parse(event.target.value);
    this.setState({ educationItem: obj, fk_id_education_type_v4: obj.id });
  };
  handleDeleteSchoolSession = (event) => {
    event.preventDefault();
    this.props.deleteSchoolSession(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };

  handleCancel() {
    this.setState({ isOpen: false, deleteIsopen: false });
  }
  handleEdit = (item, event) => {
    event.preventDefault();
    this.setState({
      isOpen: true,
      item: item,
      nameSchoolSession: item.name,
      id: item.id,
      start_date: item.start_date,
      end_date: item.end_date,
      fk_id_education_type_v4: item.fk_id_education_type_v4,
      educationItem: item.educationType,
    });
  };
  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };

  handleAnnule() {
    this.handleCancel();
  }
  handleChangeStartDate = (date) => {
    this.setState({ start_date: date });
  };
  handleChangeEndDate = (date) => {
    this.setState({ end_date: date });
  };
  handleChangeDateStart = (date) => {
    var date2 = moment(date, 'DD/MM/YYYY', true).format();

    this.setState({ start_date: date });
  };
  handleChangeDateEnd = (date) => {
    var date2 = moment(date, 'DD/MM/YYYY', true).format();

    this.setState({ start_date: date2 });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleToggle() {
    this.handleCancel();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let checkDoubleSession = this.props.schoolSessions.filter(
      (element) =>
        element.fk_id_education_type_v4 == this.state.educationItem.id &&
        element.name == this.state.nameSchoolSession &&
        element.id != this.state.id
    );
    if (checkDoubleSession.length > 0) {
      this.props.handleChangeAlerte();
    } else {
      const data = {
        name: this.state.nameSchoolSession,
        id: this.state.id,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        fk_id_education_type_v4: this.state.fk_id_education_type_v4,
        educationType: this.state.educationItem,
      };
      this.props.editSchoolSession(data);
    }

    this.handleCancel();
  };

  render() {
     return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="list.school.session" />
            </b>
          </h1>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {' '}
                <IntlMessages id="sidebar.components.schoolSession" />
              </TableCell>
              <TableCell>
                {' '}
                <IntlMessages id="sidebar.components.typeOfEducation" />
              </TableCell>
              <TableCell>
                <IntlMessages id="components.class.formadd.startdate" />
              </TableCell>{' '}
              <TableCell>
                <IntlMessages id="components.class.formadd.enddate" />
              </TableCell>
              <TableCell>
                <IntlMessages id="action.type.of.education" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.schoolSessions.map((schoolSession) => {
              return (
                <SchoolSessionListItem
                  schoolSession={schoolSession}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditSchoolSession
            schoolSession={this.state.item}
            closeModal={this.handleCancel}
            isOpen={this.state.isOpen}
            values={this.state}
            handleAnnule={this.handleAnnule}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
            handleChangeDateStart={this.handleChangeDateStart}
            handleChangeDateEnd={this.handleChangeDateEnd}
            handleChangeStartDate={this.handleChangeStartDate}
            handleChangeEndDate={this.handleChangeEndDate}
            educationTypes={this.props.educationTypes}
            handleChangeEducationType={this.handleChangeEducationType}
          />
        ) : (
          ''
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteSchoolSessionItem
            handleDeleteSchoolSession={this.handleDeleteSchoolSession}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  editSchoolSession,
  deleteSchoolSession,
})(SchoolSessionList);
