import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from 'react-redux';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
class HomeworkItem extends Component {
  render() {   /* eslint eqeqeq: "off" */
     const { homeworkItem } = this.props;
    return (
      <div className="card package bg-white shadow">
        <div
          className="package-header  lighten-1 text-white"
          style={{
            backgroundColor: `${homeworkItem.homework.subject.color}`,
            height: '150px',
          }}
        >
          <h3 className="letter-spacing-base text-uppercase" style={{ margin: '0 auto' }}>
            {' '}
            <strong>
              {homeworkItem.homework.homework_type === 'serie' ? (
                <IntlMessages id="toDo.series.exercise" />
              ) : homeworkItem.homework.homework_type === 'book' ? (
                <IntlMessages id="toDo.book.exercise" />
              ) : (
                <IntlMessages id="toDo.other.exercise" />
              )}
            </strong>
          </h3>
        </div>

        <div class="d-flex flex-wrap flex-column bd-highlight ">
          <div class="p-1 bd-highlight">
            <div class="d-flex flex-wrap flex-row bd-highlight justify-content-between">
              <div class="p-1 bd-highlight">
                <div class="d-flex flex-wrap flex-column bd-highlight " style={{ color: 'green' }}>
                  <div class=" bd-highlight">
                    <strong>{homeworkItem.homework.subject.name}</strong>
                  </div>
                  <div class=" bd-highlight"> {homeworkItem.className}</div>
                </div>
              </div>
              <div class="p-1 bd-highlight">
                <div class="d-flex flex-wrap flex-column bd-highlight ">
                  <div class=" bd-highlight">
                    <div
                      className={` badge  ${
                        homeworkItem.status === 'programed'
                          ? 'bg-info'
                          : homeworkItem.status === 'progress'
                          ? 'text-white bg-amber'
                          : 'text-white bg-success'
                      }`}
                      style={{ height: '20px', width: '80px', float: 'left' }}
                    >
                      {homeworkItem.status === 'programed' ? (
                        <IntlMessages id="status.classe.virtual.programmé" />
                      ) : homeworkItem.status === 'progress' ? (
                        <IntlMessages id="status.classe.virtual.progrés" />
                      ) : (
                        <IntlMessages id="status.classe.virtual.términé" />
                      )}
                    </div>
                  </div>
                  <div class=" bd-highlight">
                    {moment(homeworkItem.homework.publication_date).format('L')}{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="p-1 bd-highlight">
            <div class="d-flex flex-wrap flex-row bd-highlight justify-content-between  ">
              <div class="pr-2 bd-highlight">Sciences</div>
            </div>
          </div> */}
          <div class="p-1 bd-highlight">
            <div class="d-flex flex-wrap flex-column bd-highlight ">
              <div class=" bd-highlight text-primary">{homeworkItem.homework.title}</div>
              <div class=" bd-highlight text-primary pointer" 
                onClick={(e) => {
                  this.props.handleShowDetail(homeworkItem);
                }}
              style={{ fontSize: '10px' }}>
                <IntlMessages id="homework.detail" />
              </div>
            </div>
          </div>
          <div>
            {!this.props.archived ? (
              <div class="d-flex flex-wrap flex-row  justify-content-around ">
                <div>
                  <Button
                    style={{
                      backgroundColor: 'white',
                      color: '#7C7C7C',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#7C7C7C' }}>
                      <IntlMessages id="message.attach.download" />|
                    </span>
                  </Button>
                </div>
                <RoleContext.Consumer>
                  {({ role }) => (
                    <Can
                      role={role}
                      perform="user-permission"
                      data={{
                        permission: 'edit-homework',
                        permissionList: this.props.userPermission,
                      }}
                      yes={() => (
                        <div>
                          <Button
                            style={{
                              backgroundColor: 'white',
                              color: '#7C7C7C',
                              width: '30px',
                            }}
                            onClick={(e) => {
                              this.props.handleEdit(homeworkItem);
                            }}
                          >
                            <span style={{ fontSize: '9px', color: '#7C7C7C' }}>
                              <IntlMessages id="button.modify" /> |
                            </span>
                          </Button>
                        </div>
                      )}
                    />
                  )}
                </RoleContext.Consumer>

                <div
                  className=" "
                  style={{
                    width: '18px',
                    height: '18px',
                  }}
                >
                  <IconButton size="small" className="icon-btn" onClick={(e) => {
                  this.props.handleShowDetail(homeworkItem);
                }}>
                    <i className="zmdi zmdi-eye" style={{ color: '#A3A3A3' }} />
                  </IconButton>
                </div>

                <RoleContext.Consumer>
                  {({ role }) => (
                    <Can
                      role={role}
                      perform="user-permission"
                      data={{
                        permission: 'delete-homework',
                        permissionList: this.props.userPermission,
                      }}
                      yes={() => (
                        <div
                          className=" "
                          style={{
                            width: '18px',
                            height: '18px',
                          }}
                        >
                          <IconButton size="small" className="icon-btn">
                            <i
                              className="zmdi zmdi-delete"
                              style={{ color: '#A3A3A3' }}
                              onClick={(e) => {
                                this.props.handleDelete(homeworkItem.homework.id);
                              }}
                            />
                          </IconButton>
                        </div>
                      )}
                    />
                  )}
                </RoleContext.Consumer>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    userPermission: state.PermissionReducer.userPermission,
  };
}

export default connect(mapStateToProps)(HomeworkItem);
