
import React from 'react';
import ContainerHeader from '../../../../../components/ContainerHeader/index';
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import CardBox from '../../../../../components/CardBox/index';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TableReport from './TableReport';
import { connect } from "react-redux";
import { getGrades } from "../../../../../actions/gradeAction";
import { getSubject } from "../../../../../actions/subjectAction";
import { getExam } from "../../../../../actions/examAction";
import { getEstablishment } from "../../../../../actions/establishmentAction";
 import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { classService } from "../../../../../_services/class.service";


function mapStateToProps(state) {
  return {
    grades: state.grade.grades,
    subjects: state.subject.remoteSubjects,
    exams: state.exam.remoteExams,
    establishments: state.establishment.remoteEstablishments,
    classes: state.classes
  };
}

const roleIdSuperAdmin = 1;
const roleIdParent = 4;
const roleIdStudent = 5;
const roleIdAdmin = 2;
const roleIdProfessor = 3;
const roleId = parseInt(localStorage.roles_id);
let apiEndpoint ='';
class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gradesList: [],
      subjectsList: [],
      classesList: [],
      studentList: [],
      establishmentList: [],
      examen: '',
      classe: '',
      niveau: '',
      subject: '',
      establishment: '',
      student: '',
      subjectId: '',
      subjectsNames: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.props.getGrades();
    this.props.getSubject();
    this.props.getExam();
    this.props.getEstablishment();
 
    if (roleId === roleIdParent) {
       apiEndpoint = `/parents/findOne?access_token=${localStorage.token}&filter={"where":{"profile_id":` + localStorage.profileId + `}}`
      classService.get(apiEndpoint)
      .then(res => {
        if(res){
          let parentId = res.data.id;
          apiEndpoint = `/students?access_token=${localStorage.token}&filter={"where":{"parent_id":` + parentId + `}}`
          classService.get(apiEndpoint)
          .then(res => {
            if(res){
              let results = res.data;
              results.map(element => {
                let classId = element.class_id;
                let studentId = element.id;
                apiEndpoint = `/class_subjects?access_token=${localStorage.token}&filter={"where":{"class_id":` + classId + `}}`
                classService.get(apiEndpoint)
                .then(res => {
                  if(res){
                    let subjectIds = res.data[0].subjects_ids;
                    let subjects = [];
                    let subjectList = [];
                    let obj = {};
                    subjectIds.map(element => {
                       apiEndpoint = `/subjects/` + element+`?access_token=${localStorage.token}`
                      classService.get(apiEndpoint)
                      .then(res => {
                        if(res){
                          let subjectName = res.data.name;
                          let subjectCoefficient = res.data.coefficient
                           apiEndpoint =`/exams?access_token=${localStorage.token}&filter={"where":{"subject_id":` + element + `}}`
                          classService.get(apiEndpoint)
                          .then(res => {
                            if(res){
                              let exam = res.data;
                              let grade = [];
                              for (let i = 0; i < exam.length; i++) {
                                apiEndpoint = `/grades?access_token=${localStorage.token}&filter={"where":{"exam_id":` + res.data[i].id + `}}`
                                classService.get(apiEndpoint)
                                  .then(res => {
                                    if(res){
                                    grade.push(res.data);
                                    }  })
                              }
                              obj = {
                                "subjectName": subjectName,
                                "subjectCoefficient": subjectCoefficient,
                                "exams": { "name": exam, "note": grade }
                              }
                              subjectList.push(obj);

                          }  })
                     } })

                    })
                }  })
              })

         } })
      }  })
    }


  };

  handleBlur = event => {
    this.setState({
      gradesList: this.props.grades.filter(grade =>
        grade.class_id == this.state.classe
      )
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const classes = Array.from(this.props.classes);

    return (
      <div className="app-wrapper">
        {(() => {

          if (roleId === roleIdSuperAdmin || roleId === roleIdProfessor || roleId === roleIdAdmin) {
            return (
              <div>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                  <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="sidebar.submenu.components.report" /></h1>
                  </div>
                  <div className="row">
                    <CardBox styleName="col-lg-12"
                      heading={<IntlMessages id="component.report.form.tip.class" />}>
                      <div className="row">
                        <div className="col-sm-3" align="right">
                          <TextField
                            required
                            id="niveau"
                            select
                            label={<IntlMessages id="components.student.formadd.establishment" />}
                            value={this.state.establishment}
                            onChange={this.handleChange('establishment')}
                            SelectProps={{}}
                            margin="normal"
                            fullWidth >
                            {this.props.establishments.map(option => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}({option.id})
											</MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div className="col-sm-3" align="right">
                          <TextField
                            required
                            id="classe"
                            select
                            label={<IntlMessages id="components.note.class" />}
                            value={this.state.classe}
                            onChange={this.handleChange('classe')}
                            onBlur={this.handleBlur}
                            SelectProps={{}}
                            margin="normal"
                            fullWidth >
                            {classes.map(option => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}({option.id})
										</MenuItem>
                            ))}
                          </TextField>
                        </div>
                        {/* <div className="col-sm-3" align="right" >
                          <TextField
                            required
                            id="subject"
                            select
                            label={<IntlMessages id="components.note.exam" />}
                            value={this.state.examen}
                            onChange={this.handleChange('examen')}
                            onBlur={this.handleBlur}
                            SelectProps={{}}
                            margin="normal"
                            fullWidth >
                            {this.props.exams.map(option => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.type} ({option.id} )
                      </MenuItem>
                            ))}
                          </TextField>
                        </div> */}
                        <div className="col-sm-3">
                          <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" onSubmit={this.state.onSubmit}>{<IntlMessages id="component.report.button.generate.student" />}</Button>
                        </div>
                      </div>
                    </CardBox>
                  </div>
                </form>
                <TableReport gradesFilter={this.state.gradesList} classId={this.state.classe} examId={this.state.examen} />
              </div>)
          }
        })()}
        {(() => {
          const roleId = parseInt(localStorage.roles_id);
          if (roleId === roleIdParent || roleId === roleIdStudent) {
            return (
              <CardBox styleName="col-12" cardStyle="p-0" 
                headerOutside>
                <div className="table-responsive-material">
                  <Table className="default-table table-unbordered table table-sm table-hover">
                    <TableHead >
                      <TableRow className=" bg-primary ">
                        <TableCell className="text-white">{<IntlMessages id="sidebar.subjects" />}</TableCell>
                        <TableCell className="text-white" >{<IntlMessages id="subject.coefficient" />}</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="Components.bulletin.oral" />}</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="Components.bulletin.practical.work" />}</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="Components.bulletin.test" />}</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="Components.bulletin.control" />}1</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="Components.bulletin.control" />}2</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="Components.bulletin.synthesis" />}</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="Components.bulletin.grading" />}</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="Components.bulletin.result" />}</TableCell>
                        <TableCell className="text-white">{<IntlMessages id="components.note.student.comment" />}</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>

                      <TableRow  >
                        <TableCell>Mathematique</TableCell>
                        <TableCell >3</TableCell>
                        <TableCell >--</TableCell>
                        <TableCell >--</TableCell>
                        <TableCell >15</TableCell>
                        <TableCell >18</TableCell>
                        <TableCell >17 </TableCell>
                        <TableCell >16,5</TableCell>
                        <TableCell >4</TableCell>
                        <TableCell >16</TableCell>
                        <TableCell >Vous pouvez faire mieux </TableCell>

                      </TableRow>
                      <TableRow  >
                        <TableCell>Français</TableCell>
                        <TableCell >2</TableCell>
                        <TableCell >18</TableCell>
                        <TableCell >--</TableCell>
                        <TableCell >--</TableCell>
                        <TableCell >15</TableCell>
                        <TableCell >17 </TableCell>
                        <TableCell >15,5</TableCell>
                        <TableCell >6</TableCell>
                        <TableCell >15,75</TableCell>
                        <TableCell >Vous pouvez faire mieux </TableCell>

                      </TableRow>


                    </TableBody>
                  </Table>
                </div>
              </CardBox>
            )
          }
        })()}
      </div>
    )
  }

}

export default connect(mapStateToProps, { getEstablishment, getGrades, getSubject, getExam })(Report);