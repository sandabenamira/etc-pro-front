import React from 'react';
import HomeworkItem from './HomeworkItem';
import { connect } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';
import IntlMessages from '../../../../../util/IntlMessages';

class ListHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      alertWarning: false

    };
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.alertWarning = this.alertWarning.bind(this);
  }
  alertWarning(status) {
    this.setState({ alertWarning: status })
  }

  handleChangeClass = name => event => {
    let data = this.props.classesList.find(item => item.id === event.target.value)
    let levelId = data.level_id;
    let subjects = this.props.subjectList.filter(element => element.level_id === levelId)
    this.setState({ [name]: event.target.value, subjects: subjects });
  };
  handleChangeSubject = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.filtreListToDo(event.target.value)
  };
  render() {
    let { toDos, classesList, classId } = this.props
    return (
      <div>
        {this.state.alertWarning ? (
          <UncontrolledAlert className="alert-addon-card bg-info bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {<IntlMessages id={"message.check.student.selected"} />} </span>
          </UncontrolledAlert>
        ) : (
            ''
          )}
        <div className="row animated slideInUpTiny animation-duration-3">

          {toDos.map((todo, index) =>

            <HomeworkItem key={index} index={index}
              todo={todo}
              classesList={classesList}
              classId={classId}
              alertWarning={this.alertWarning}

            />
          )}
        </div>
      </div>
    )
  }
};


export default connect()(ListHomework);