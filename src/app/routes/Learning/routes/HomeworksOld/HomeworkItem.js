import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../../util/IntlMessages';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteHomework from './deleteHomework';
import EditHomework from './editHomework';
import { classService } from "../../../../../_services/class.service";
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import HomeworkDetail from './HomeworkDetail';
import { roleIdProfessor } from '../../../../../config/config';
import { getName } from "../../../../../actions/countriesAction";
import { initHomework } from "../../../../../actions/ToDo"
import Switch from '@material-ui/core/Switch';
import defaultImg from './Assets/homework.png';
import professor1 from "./Assets/prof1.jpg"
import professor2 from "./Assets/prof2.jpg"


let apiEndpoint = '';

class HomeworkItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      deleteModel: false,
      editModel: false,
      detailsModel: false,
      homework: {},
      studentsList: [],
      checkedE: true,
      nbreStudents: 0

    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.editHomeworkClass = this.editHomeworkClass.bind(this);
    this.toDoDetails = this.toDoDetails.bind(this);

  }

  downloadFile(info) {
    var files;
    if (this.props.todo.studentHomework === false) {
      files = this.props.todo.files
    }
    else {
      files = this.props.todo.homework.files
    }
    if (files !== null) { 

      var estblishmentId = localStorage.getItem('establishment_id');
      apiEndpoint = `/establishments/` + estblishmentId + `?access_token=${localStorage.token}`
      classService.get(apiEndpoint)
        .then(response => {
          if (response) {
            this.setState({
              establishmentName: response.data.name
            })
            apiEndpoint = `/containers/checkFileExist/classebook.data.storage?access_token=${localStorage.token}`
            classService.get(apiEndpoint)
              .then((response) => {
                if (response) {
                  let fileList = _.isEmpty(response.data.checkFile) ? null :
                    response.data.checkFile.find(item => item.name === files);
                  const establishLogoUrl = _.isEmpty(fileList) ? null : `/containers/` + "classebook.data.storage" + '/download/' + fileList.name + `?access_token=${localStorage.token}`;

                  if (establishLogoUrl !== null) {
                    const fileExtension = fileList.name.replace(/^.*\./, '');
                    classService.getPhoto(establishLogoUrl)

                      .then((response) => {

                        if (response) {
                          var arr = response.data;
                          var data2 = new Uint8Array(arr);
                          var blob = []
                          if (fileExtension === 'pdf') {
                            blob = new Blob([data2], { type: 'application/pdf' });
                          } else if (fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'gif') {
                            blob = new Blob([data2], { type: 'image/*' });
                          } else {
                            blob = new Blob([data2], { type: 'application/txt' });
                          }
                          var url = window.URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          if (info === "download") {
                            if (this.props.todo.files_name !== null) {
                              const name = this.props.todo.files_name
                              link.setAttribute("download", name);
                            } else {
                              link.setAttribute("download", "file.pdf");
                            }

                          } else {
                            link.setAttribute('target', '_blank');
                          }
                          document.body.appendChild(link);
                          link.click();

                        }
                      })
                      .catch((err) => {
                       })
                  }
                  else {
                    this.setState({
                      url: null
                    })
                  }
                }
              });
          }
        })
    } else {
      alert(<IntlMessages id="message.no.file" />)
    }
  }

  toDoDetails(e) {
    e.preventDefault();
    if ((this.props.userProfile.role_id === roleIdProfessor)) {
      if (!_.isEmpty(this.props.todo.homeworkClass)) {
        const classId = _.head(this.props.todo.homeworkClass).class_id
        apiEndpoint = `/students?access_token=${localStorage.token}&filter[where][class_id]=${classId}&filter[include][profile][user]`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ studentsList: _.map(response.data, 'profile') })
          }
        })
      }

      this.setState({ detailsModel: true, })



    } else {
      this.setState({ detailsModel: true, })
    }
  }

  handleCancel() {
    this.setState({ deleteModel: false, editModel: false, detailsModel: false, })
  };

  handleDelete(e) {
    e.preventDefault();
    this.setState({ deleteModel: true, idHomework: this.props.todo.id });
  };

  editHomeworkClass(e) {
    e.preventDefault();
    this.setState({ editModel: true, homework: this.props.todo });
  };

  handleChange = name => (event, checked) => {
    const data = { "active": checked }
    apiEndpoint = `/homeworks/${this.props.todo.id}?access_token=${localStorage.token}`;
    classService.patch(apiEndpoint, data)
      .then(response => {
        if (response) {
          let result = _.omit(this.props.todo, ['active']);
          let initHomeworkdata = {
            ...result,
            active:checked
          }
          this.props.dispatch(initHomework(initHomeworkdata))
          this.setState({ [name]: checked });
        }
      })

  };
  componentDidMount() {
    let apiEndpoint = '';
    if (this.props.userProfile.role_id === roleIdProfessor && this.props.todo.homeworkClass[0]) {
      const classId = this.props.todo.homeworkClass[0].class_id;
      apiEndpoint = `/students/count?access_token=${localStorage.token}&where={"class_id":${classId}}`;
      classService.get(apiEndpoint).then(response => {
        if (response) {
          this.setState({ nbreStudents: response.data.count });
        }
      })
      // this.props.dispatch(getNumberOfHomeworkStudents(this.props.todo.id))

    }
    this.setState({ checkedE: this.props.todo.active })
  }
  render() {

    var things = [defaultImg, professor1, professor2];
    var thing = things[Math.floor(Math.random() * things.length)];
    const { title, date_creation, subject, homeworkClass, files } = this.props.todo;
    return (
      <div className="col-xl-3 col-md-6 col-sm-6 col-12">
        <div className="card product-item" >
          <div className="card-header border-0 p-0" >
            <div className="card-image">
              <div className="grid-thumb-equal">
                <span className="grid-thumb-cover jr-link">
                  <img alt="Remy Sharp" src={thing} />
                </span>
              </div>
            </div>
          </div>
          <div className="card-body">

            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="todo-menu-action:visit"
                  yes={() => (
                    <div>
                      <div className="d-flex  bd-highligh justify-content-between text-dark">
                        <div className="p-1 bd-highlight">
                          <h3 >
                            <b>{getName(subject)} </b><br />
                            <Can
                              role={role}
                              perform="todo-menu-action-modif:visit"
                              yes={() => (<p>
                                {homeworkClass[0] ? <h5><b>{homeworkClass[0].class.name}</b></h5> : ''}
                              </p>
                              )}
                            />
                          </h3></div>
                        <Can
                          role={role}
                          perform="todo-menu-active-homework:visit"
                          yes={() => (
                            <>
                              <div className="p-2 bd-highlight">
                                <Switch
                                  classes={{
                                    checked: 'text-success',
                                    // bar: 'bg-success',
                                  }}
                                  checked={this.state.checkedE}
                                  onChange={this.handleChange('checkedE')}
                                  aria-label="checkedE"
                                />
                              </div>
                              <div >
                                <Button className=" bg-success text-white ">
                                  {<IntlMessages id="notification.success" />}
                                </Button>
                                <br /> <p> {moment(date_creation).format('L')}</p>
                              </div>
                            </>
                          )}
                        />

                      </div>

                      <div className="d-flex flex-row bd-highligh justify-content-between text-primary">
                        <div className="p-1 bd-highlight mt-auto mb-0 pointer" onClick={this.toDoDetails}>
                          <h3>{title} </h3>
                          <h6 >{<IntlMessages id="homework.detail" />}</h6>

                        </div>
                      </div>

                      <div className="d-flex flex-row bd-highligh justify-content-between text-grey pl-0">
                        <Can
                          role={role}
                          perform="todo-menu-action-modif:visit"
                          yes={() => (
                            <div className="p-1  bd-highlight">
                              <p className=" pointer" onClick={this.editHomeworkClass}><IntlMessages id="button.modify" /></p>
                            </div>
                          )}
                        />
                        <div className=" bd-highlight ml-auto">
                          {files !== null ?
                            <>
                              <IconButton
                                size="small"
                                className="icon-btn"
                                onClick={this.downloadFile.bind(this, "download")}
                              >
                                <i
                                  className="zmdi zmdi-download"
                                  style={{ color: 'text-grey' }}
                                />
                              </IconButton>
                              &nbsp; | &nbsp;

                          <IconButton
                                size="small"
                                className="icon-btn"
                                onClick={this.downloadFile.bind(this, "display")}
                              >
                                <i
                                  className="zmdi zmdi-eye"
                                  style={{ color: 'text-grey' }}
                                />
                              </IconButton>
                            </> : ""}
                          <Can
                            role={role}
                            perform="todo-menu-action-delete:visit"
                            yes={() => (
                              <>
                                {files !== null ? <>&nbsp; | &nbsp; </> : ""}

                                <IconButton
                                  size="small"
                                  className="icon-btn"
                                  onClick={this.handleDelete}
                                >
                                  <i
                                    className="zmdi zmdi-delete"
                                    style={{ color: 'text-grey' }}
                                  />
                                </IconButton>{' '}
                              </>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                />
              )}
            </RoleContext.Consumer>

          </div>


        </div>
        {this.state.deleteModel ? <DeleteHomework idHomework={this.state.idHomework} cancelModal={this.handleCancel} /> : ''}
        {this.state.editModel ? <EditHomework homework={this.state.homework} cancelModal={this.handleCancel} classesList={this.props.classesList} /> : ''}
        {this.state.detailsModel ? <HomeworkDetail open={this.state.detailsModel} cancelModal={this.handleCancel} todo={this.props.todo} userProfile={this.props.userProfile} studentsList={this.state.studentsList} /> : ''}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,


  };
}
export default connect(mapStateToProps)(HomeworkItem);

