
import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import CardBox from '../../../../../components/CardBox';
import { connect } from "react-redux";
import { getGrades } from "../../../../../actions/gradeAction";

function mapStateToProps(state) {
  return {
    grades: state.grade.grades,
    subjects: state.subject.remoteSubjects,
    exams: state.exam.remoteExams,
    // students: state.
    classes: state.classes
  };
}

let counter = 0;
function createData(orderId, name, image, orderDate, deliveryDate, status) {
  counter += 1;
  return { id: counter, orderId, name, image, orderDate, deliveryDate, status };
}

export class TableReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ListGrade: [],
      mark: 0,
      comment: "",
      studentID: 0,
      obj: {},
      data: [
        createData('23545', 'Alex Dolgove', 'https://via.placeholder.com/150x150', '25 Oct', '25 Oct', 'Excellent'),
        createData('23653', 'Domnic Brown', 'https://via.placeholder.com/150x150', '28 Oct', '1 Nov', 'Bien'),
        createData('24567', 'Garry Sobars', 'https://via.placeholder.com/150x150', '5 Nov', '10 Nov', 'Mauvais'),
        createData('25745', 'Stella Johnson', 'https://via.placeholder.com/150x150', '23 Nov', '26 Nov', 'Passable'),
      ]
    };
  }

  componentDidMount() {
    this.props.getGrades();
  };

  render() {
    const grades=this.props.gradesFilter;
    const classId=this.props.classId;
    let gradesFilter=grades.filter(item => item.class_id==classId);
    return (
      <div className="table-responsive-material">
        <CardBox styleName="col-lg-12"  >
          <table className="default-table table-unbordered table table-sm table-hover">
            <thead className="th-border-b">
              <tr>
                <th><IntlMessages id="components.note.subject" /></th>
                <th><IntlMessages id="components.student.formadd.name" />/<IntlMessages id="components.student.formadd.surname" /></th>
                <th><IntlMessages id="component.note.info.general" /></th>
                <th><IntlMessages id="Components.bulletin.result" /></th>
                <th className="status-cell text-right"><IntlMessages id="components.note.student.comment" /></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {gradesFilter.map(data => {
                let students = Array.from(data);
                return (
                  <tr key={data.id}>
                    <td >Kais1</td>
                    <td >{data.student_id[0]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardBox>
      </div>
    )
  }
}

export default connect(mapStateToProps, { getGrades })(TableReport);