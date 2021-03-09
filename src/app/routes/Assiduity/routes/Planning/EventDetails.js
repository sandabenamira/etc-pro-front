import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import Auxiliary from '../../../../../util/Auxiliary';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import { RoleContext } from '../../../../../Context';
import Can from '../../../../../can';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
var options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    const { values, language } = this.props;
    return (
      <Auxiliary>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Popover
            placement={'left'}
            target={'Popover-' + values.details.id}
            isOpen={values.isOpen}
          >
            <PopoverHeader>
              <div className="col-md-12 text-right">
              <RoleContext.Consumer>
                  {({ role }) => (
                    <Can
                      role={role}
                      perform="user-permission"
                      data={{
                        permission: 'edit-planning',
                        permissionList: this.props.userPermission,
                      }}
                      yes={() => (
                        <IconButton
                          size="medium"
                          className="icon-btn"
                          onClick={(e) => this.props.handleEdit(values.details, e)}
                        >
                          <i className="zmdi zmdi-edit " style={{ color: 'text-grey' }} />
                        </IconButton>
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
                        permission: 'delete-planning',
                        permissionList: this.props.userPermission,
                      }}
                      yes={() => (
                        <IconButton
                          size="medium"
                          className="icon-btn"
                          onClick={(e) => this.props.handleDeleteConfirmation(values.details, e)}
                        >
                          <i className="zmdi zmdi-delete" style={{ color: 'text-grey' }} />
                        </IconButton>
                      )}
                    />
                  )}
                </RoleContext.Consumer>
                <IconButton
                  size="medium"
                  className="icon-btn"
                  onClick={(e) => this.props.handleNotifMailConfirmation(values.details, e)}
                >
                  <i className="zmdi zmdi-email" style={{ color: 'text-grey' }} />
                </IconButton>
                &nbsp;&nbsp;
                <IconButton
                  size="medium"
                  className="icon-btn"
                  onClick={(e) => this.props.handleCancel()}
                >
                  <i className="zmdi zmdi-close " />
                </IconButton>
              </div>
            </PopoverHeader>
            <PopoverBody>
              <form className="row">
                <div className="card-body">
                  <ul className="contact-list list-unstyled">
                    <li className="media">
                      <i className="zmdi zmdi-crop-3-2 zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                      <span className="media-body">
                        <b>
                          {values.details.eventType === 'lesson' ? (
                            <IntlMessages id="sidebar.components.lesson" />
                          ) : values.details.eventType === 'exam' ? (
                            <IntlMessages id="components.note.exam" />
                          ) : values.details.eventType === 'event' ? (
                            <IntlMessages id="planning.event" />
                          ) : values.details.eventType === 'holidays' ? (
                            <IntlMessages id="planning.free.day" />
                          ) : (
                            <IntlMessages id="planning.education.free.day" />
                          )}
                          : {values.details.subjectName}
                        </b>
                        <br />
                        {language === 'tunisia'
                          ? new Date(values.details.start).toLocaleDateString('ar-TN', options)
                          : language === 'french'
                          ? new Date(values.details.start).toLocaleDateString('fr-FR', options)
                          : new Date(values.details.start).toLocaleDateString(
                              'en-US',
                              options
                            )}{' '}
                        {values.details.eventType === 'lesson' ||
                        values.details.eventType === 'exam' ||
                        values.details.eventType === 'event' ? (
                          <>
                            {moment(values.details.start).format('HH:mm A')} -{' '}
                            {moment(values.details.end).format('HH:mm A')}{' '}
                          </>
                        ) : (
                          ''
                        )}
                        <br />
                        {values.details.frequency === 'weekly' ? (
                          <IntlMessages id="data.weekly" />
                        ) : values.details.frequency === 'fortnightly' ? (
                          <IntlMessages id="data.fortnightly" />
                        ) : (
                          <IntlMessages id="mode_payment.establishment.annual" />
                        )}
                      </span>
                    </li>
                    {values.details.eventType === 'lesson' ||
                    values.details.eventType === 'exam' ||
                    values.details.eventType === 'event' ? (
                      <li className="media">
                        <i className="zmdi zmdi-format-subject zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                        <span className="media-body">
                          {values.details.eventType === 'lesson' ? (
                            <>
                              {' '}
                              <IntlMessages id="detail.lesson" />{' '}
                              <IntlMessages id="planning.details.room.name" />{' '}
                              <b>{values.details.roomName}</b>
                              <IntlMessages id="planning.details.professor.name" />{' '}
                              <b>
                                {values.details.profSurname} {values.details.profName}{' '}
                              </b>{' '}
                            </>
                          ) : values.details.eventType === 'exam' ? (
                            <>
                              <IntlMessages id="detail.exam" />{' '}
                              <IntlMessages id="planning.details.room.name" />{' '}
                              <b>{values.details.roomName}</b>
                              <IntlMessages id="planning.details.professor.name" />{' '}
                              <b>
                                {values.details.profSurname} {values.details.profName}{' '}
                              </b>{' '}
                            </>
                          ) : (
                            <>
                              <IntlMessages id="detail.event" />{' '}
                              <IntlMessages id="planning.details.room.name" />{' '}
                              <b>{values.details.roomName}</b>
                              <IntlMessages id="planning.details.professor.name" />{' '}
                              <b>
                                {values.details.profSurname} {values.details.profName}{' '}
                              </b>{' '}
                            </>
                          )}
                        </span>
                      </li>
                    ) : (
                      ''
                    )}

                    <li className="media">
                      <i className="zmdi zmdi-calendar zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                      <span className="media-body">
                        <IntlMessages id="components.note.class" /> :{' '}
                        {values.details.classeName === 'all' ? (
                          <IntlMessages id="userStuppDisplay.all" />
                        ) : (
                          <b>{values.details.classeName} </b>
                        )}
                        <br />
                        <IntlMessages id="planning.creator.name" /> :{' '}
                        {values.details.creatorSurname} {values.details.creatorName}
                      </span>
                    </li>
                  </ul>
                  <br />
                </div>
              </form>
            </PopoverBody>
          </Popover>
        </MuiPickersUtilsProvider>
      </Auxiliary>
    );
  }
}

export default EventDetails;
