import IntlMessages from '../../../../../util/IntlMessages';
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
 import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import moment from 'moment';
import { RoleContext } from '../../../../../Context';
import Can from '../../../../../can';
import { NavLink } from 'react-router-dom';

class SupportCoursListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cours } = this.props;
    let pathMoocs =
      cours.moocsList[0] === undefined
        ? this.props.pathAttached.url
        : `/app/e-learning/moocs_details/${cours.moocsList[0].id}/${cours.moocsList[0].moocs_topic}`;
    // eslint-disable-next-line
    let pathVituel =
      cours.virtualClassList[0] === undefined
        ? this.props.pathAttached.url
        : `/app/e-learning/virtual_classes_details/${cours.virtualClassList[0].id}/${cours.virtualClassList[0].virtual_class_name}`;

    return (
      <TableRow key={cours.id}>
        <TableCell style={{ color: '#FF69B4' }}>
          {cours.fileList.map((file) => {
            const fileExtension = file.url_course_materials_files.replace(/^.*\./, '');
            return (
              <Button href={file.url_course_materials_files} target="_blank">
                <i class="zmdi zmdi-file zmdi-hc-lg">{fileExtension} </i>
              </Button>
            );
          })}
          {cours.urlCourse === '' ? (
            ''
          ) : (
            <Button href={cours.urlCourse} target="_blank">
              <i class="zmdi zmdi-file zmdi-hc-lg">URL </i>
            </Button>
          )}
        </TableCell>
        <TableCell style={{ color: '#FF69B4' }}>{cours.name}</TableCell>
        <TableCell>{cours.classes.map((classItem) => classItem.name + ' ; ')}</TableCell>
        <TableCell>{moment(cours.creationDate).format('DD/MM/YYYY')}</TableCell>
        <TableCell>{cours.professor.profName}</TableCell>
        <TableCell>
          <RadioGroup row aria-label="typeCours" name="typeCours">
            <FormControlLabel
              value="Moocs"
              control={
                <NavLink to={pathMoocs}>
                  <Radio checked={cours.moocsList.length > 0} />
                </NavLink>
              }
              label={<IntlMessages id="mooc" />}
            />

            <FormControlLabel
              value="ToDo"
              control={
                <NavLink to={`/app/home`}>
                  <Radio checked={cours.toDoList.length > 0} />
                </NavLink>
              }
              label={<IntlMessages id="sidebar.components.mail.devoir" />}
            />

            <FormControlLabel
              value="virtualClass"
              control={
                <NavLink to={pathVituel}>
                  <Radio checked={cours.virtualClassList.length > 0} />
                </NavLink>
              }
              label={<IntlMessages id="sidebar.components.virtual_classes" />}
            />
          </RadioGroup>
        </TableCell>
        <TableCell>{cours.comment}</TableCell>
        <TableCell>
          {!this.props.archived ? (
            <>
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'edit-course-material',
                      permissionList: this.props.userPermission,
                    }}
                    yes={() => (
                      <>
                        <Button
                          style={{
                            backgroundColor: 'white',
                            color: '#7C7C7C',
                            width: '50px',
                            height: '20px',
                          }}
                          onClick={(e) => {
                            this.props.editShowModal(cours);
                          }}
                          target="_blank"
                        >
                          <span style={{ fontSize: '12px', color: '#7C7C7C' }}>
                            <IntlMessages id="button.modify" />
                          </span>
                        </Button>
                        &nbsp; | &nbsp;
                      </>
                    )}
                  />
                )}
              </RoleContext.Consumer>
              <RoleContext.Consumer>
                {({ role }) => (
                  <Can
                    role={role}
                    perform="user-permission"
                    data={{
                      permission: 'delete-course-material',
                      permissionList: this.props.userPermission,
                    }}
                    yes={() => (
                      <IconButton size="large" className="icon-btn" onClick={(e) => this.props.handleDelete(cours)}>
                        <i className="zmdi zmdi-delete" style={{ color: 'text-grey' }} />
                      </IconButton>
                    )}
                  />
                )}
              </RoleContext.Consumer>
            </>
          ) : (
            ''
          )}
        </TableCell>
      </TableRow>
    );
  }
}

export default SupportCoursListItems;
