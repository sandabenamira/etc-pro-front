import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    settings: state.settings.locale,
  };
}
class ListGradeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.student.note,
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <TableRow key={this.props.key}>
        <TableCell align="left">
          <Avatar
            align="left"
            className="size-90"
            alt="..."
            src="https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-1.png"
          />
        </TableCell>
        <TableCell align="left">
          {this.props.settings.languageId == 'tunisia'
            ? this.props.student.studentInfo.profile.user.name_ar
            : this.props.student.studentInfo.profile.user.name}
        </TableCell>
        <TableCell align="left">
          {this.props.settings.languageId == 'tunisia'
            ? this.props.student.studentInfo.profile.user.surname_ar
            : this.props.student.studentInfo.profile.user.surname}
        </TableCell>
        <TableCell align="left">
          {this.props.student.studentInfo.profile.user.email}
        </TableCell>
        <TableCell align="center">
          <TextField
            id="note"
            type="number"
            variant="outlined"
            error={this.props.student.note < 0 || this.props.student.note > 20}
            value={this.props.student.note}
            onChange={this.props.onChange(this.props.student.student_id)}
            inputProps={{ min: 0, max: 20, step: 0.01 }}
          />
        </TableCell>
      </TableRow>
    );
  }
}
export default connect(
  mapStateToProps,
  {}
)(ListGradeItem);
