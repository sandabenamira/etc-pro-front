import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import CardBox from '../../../../../components/CardBox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import ListGradeItem from './ListGradeItem';
import DeleteGrades from './DeleteGrade';
import AddGrades from './AddGrade';
export class GradeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentList: [],
      exam_id: '',
      deleteIsopen: false,
      addIsopen: false,
    };
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.reset = this.reset.bind(this);
    this.handleShowAddModal = this.handleShowAddModal.bind(this);
    this.addGrades = this.addGrades.bind(this);
  }
  reset = () => {
    this.props.reset();
    this.setState({
      deleteIsopen: false,
    });
  };
  addGrades = () => {
    this.props.addGrade();
    this.setState({
      addIsopen: false,
    });
  };
  handleShowDeleteModal = () => {
    this.setState({ deleteIsopen: true });
  };
  handleShowAddModal = (e) => {
    e.preventDefault();

    this.setState({ addIsopen: true });
  };
  cancelModal() {
    this.setState({ deleteIsopen: false, addIsopen: false });
  }
  componentWillMount() {
    this.setState({
      studentList: this.props.studentList,
      exam_id: this.props.examId,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.studentList !== this.props.studentList) {
      this.setState({
        studentList: this.props.studentList,
        exam_id: this.props.examId,
      });
    }
  }
  StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#3f51b5',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  handleChange = (id) => (event) => {
    let ListNote = this.state.studentList;
    let index = _.findIndex(ListNote, { student_id: id });
    _.fill(
      ListNote,
      {
        id: ListNote[index].id,
        student_id: id,
        note: event.target.value,
        studentInfo: ListNote[index].studentInfo,
      },
      index,
      index + 1
    );
    this.setState({ studentList: ListNote });
  };
  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleShowAddModal}>
        <CardBox styleName="col-lg-12">
          <div className="table-responsive-material">
            <h1 align="center">
              {<IntlMessages id="component.note.list.student" />}
            </h1>
            <Table>
              <TableHead>
                <TableRow>
                  <this.StyledTableCell align="center">
                    {<IntlMessages id="stuppUser.user.avatar" />}
                  </this.StyledTableCell>
                  <this.StyledTableCell>
                    {<IntlMessages id="stuppUser.formadd.surname" />}
                  </this.StyledTableCell>

                  <this.StyledTableCell>
                    {<IntlMessages id="stuppUser.formadd.name" />}
                  </this.StyledTableCell>
                  <this.StyledTableCell>
                    {<IntlMessages id="appModule.email" />}
                  </this.StyledTableCell>
                  <this.StyledTableCell align="center">
                    {<IntlMessages id="components.note.student.markObtained" />}
                  </this.StyledTableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!_.isEmpty(this.state.studentList) ? (
                  this.props.studentList.map((student, index) => (
                    <ListGradeItem
                      student={student}
                      onChange={this.props.handleChangeNote}
                      key={index}
                    />
                  ))
                ) : (
                  <this.StyledTableCell></this.StyledTableCell>
                )}
              </TableBody>
            </Table>

            <br></br>
            <div
              //align="right"
              className="d-flex justify-content-between col-sm-12"
            >
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={this.handleShowDeleteModal}
                  startIcon={<DeleteIcon />}
                >
                  <IntlMessages id="button.reset" />
                </Button>
              </div>
              <div>
                <Button
                  disabled={this.props.examId == ''}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  //onClick={this.handleShowAddModal}
                  //onClick={this.props.addGrade}
                  startIcon={<SaveIcon />}
                >
                  <IntlMessages id="note.button.save" />
                </Button>
              </div>
            </div>
            <div>
              {this.state.deleteIsopen ? (
                <DeleteGrades
                  cancelModal={this.cancelModal}
                  deleteIsopen={this.state.deleteIsopen}
                  reset={this.reset}
                />
              ) : (
                ''
              )}
              {this.state.addIsopen ? (
                <AddGrades
                  cancelModal={this.cancelModal}
                  deleteIsopen={this.state.addIsopen}
                  addGrades={this.addGrades}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </CardBox>
      </form>
    );
  }
}

export default GradeList;
