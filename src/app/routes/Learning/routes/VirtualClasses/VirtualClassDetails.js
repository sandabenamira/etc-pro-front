import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../../util/IntlMessages';
import moment from 'moment';
import { connect } from 'react-redux';
import { Card, CardTitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { classService } from '../../../../../_services';
import Fab from '@material-ui/core/Fab';

class VirtualClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      virtualClassItem: {},
      isBefore: false,
      isAfter: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.virtualClasses !== this.props.virtualClasses) {
      const sys = Date.parse(new Date()) / 60000;
      let virtualClassItem = this.props.virtualClasses.find(
        (element) => element.id == this.props.match.params.classId
      );
      if (virtualClassItem !== undefined) {
        const start =
          Date.parse(
            virtualClassItem.date_virtual_class.slice(0, 10) +
              ' ' +
              moment(virtualClassItem.start_time_class).format('HH:mm')
          ) / 60000;
        const end =
          Date.parse(
            virtualClassItem.date_virtual_class.slice(0, 10) +
              ' ' +
              moment(virtualClassItem.end_time_class).format('HH:mm')
          ) / 60000;
        if (start > sys) {
          this.setState({ isBefore: true });
        } else if (end < sys) {
          this.setState({ isAfter: true });
        }
      }
      this.setState({ virtualClassItem });
    }
  }
  UNSAFE_componentWillMount() {
    const sys = Date.parse(new Date()) / 60000;
    let virtualClassItem = this.props.virtualClasses.find(
      (element) => element.id == this.props.match.params.classId
    );
    if (virtualClassItem !== undefined) {
      const start =
        Date.parse(
          virtualClassItem.date_virtual_class.slice(0, 10) +
            ' ' +
            moment(virtualClassItem.start_time_class).format('HH:mm')
        ) / 60000;
      const end =
        Date.parse(
          virtualClassItem.date_virtual_class.slice(0, 10) +
            ' ' +
            moment(virtualClassItem.end_time_class).format('HH:mm')
        ) / 60000;
      if (start > sys) {
        this.setState({ isBefore: true });
      } else if (end < sys) {
        this.setState({ isAfter: true });
      }
    }
    this.setState({ virtualClassItem });
  }

  render() {
    let classItem = {};
    classItem = this.state.virtualClassItem;
     if (classItem == undefined) {
      return (
        <h1 style={{ textAlign: 'center' }}>Classe Virtuelle non disponible</h1>
      );
    } else {
      return (
        <div>
          <div className="col-md-12 text-left ">
            <br />
            <br />
            <Button
              className="bg-primary text-white "
              style={{ borderRadius: '15px' }}
            >
              <i class="zmdi zmdi-hc-2x zmdi-caret-left"></i>&nbsp;
              <NavLink to={'/app/e-learning/virtual_classes'}>
                <span className="text-white">
                  <IntlMessages id="components.establishments.formadd.buttonCancel" />
                </span>
              </NavLink>
            </Button>
          </div>
          <div className="row col-md-12 d-flex flex-row justify-content-between align-items-start">
            <div className="col-md-7 col-lg-8 col-sm-12 mb-2">
              {this.state.isBefore ? (
                <h1 style={{ textAlign: 'center', color: '#3F51B5' }}>
                  {' '}
                  {<IntlMessages id="virtuel.class.not.started" />}
                </h1>
              ) : this.state.isAfter ? (
                <h1 style={{ textAlign: 'center', color: '#3F51B5' }}>
                  {<IntlMessages id="virtuel.class.finished" />}
                </h1>
              ) : (
                <div className="jr-card-body pt-2">
                  <div style={{ height: '550px' }}>
                    <iframe
                      allow="camera; microphone; fullscreen; display-capture"
                      src={
                        'https://meet.jit.si/' + classItem.virtual_class_name
                      }
                      style={{ height: '100%', width: '100%', border: 0 }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-5 col-lg-4 col-sm-5 col-12 mt-5">
              <div className="col-12 mb-2">
                <div className="jr-card text-left pt-1">
                  <div className="jr-card-header-color text-white bg-gradient-primary">
                    <div className="d-flex flex-column">
                      <span
                        className="card-text pt-1"
                        style={{ fontSize: '18px' }}
                      >
                        {classItem.subjectName}
                      </span>
                      <br />
                      <span
                        className="card-text pt-1"
                        style={{ fontSize: '21px' }}
                      >
                        {' '}
                        {classItem.virtual_class_name}
                      </span>
                      <br />
                      <span
                        className="card-text pt-1"
                        style={{ fontSize: '21px' }}
                      >
                        {classItem.classeName}
                      </span>
                      <br />
                      <span
                        className="card-text pt-1"
                        style={{ fontSize: '18px' }}
                      >
                        <i
                          className="zmdi zmdi-account zmdi-hc-fw zmdi-hc-lg text-white align-self-center "
                          style={{ position: 'absolute', left: 0 }}
                        />
                        {"M.  "+ classItem.profName} &nbsp; {classItem.profSurname}
                      </span>
                      <br />
                      <span
                        className="card-text "
                        style={{
                          fontSize: '14px',
                          backgroundColor: 'white',
                          color: 'blue',
                          bottom: 1,
                          position: 'absolute',
                          left: 0,
                        }}
                      >
                        {' '}
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {moment(classItem.date_virtual_class).format(
                          'Do MMMM, '
                        )}
                        {moment(classItem.start_time_class).format('h:mm A')} -{' '}
                        {moment(classItem.end_time_class).format('h:mm A')}
                      </span>
                    </div>
                  </div>
                  {classItem.description == '' ? (
                    <h3 className="text-center  text-primary">
                      Pas de description{' '}
                    </h3>
                  ) : (
                    <div className="jr-card-body pt-1">
                      <h2 className="card-text text-primary">
                        <strong>
                          {' '}
                          <IntlMessages id="components.virtual.description" />:{' '}
                        </strong>
                      </h2>
                      <span style={{ fontSize: '14px' }}>
                        {classItem.description}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    virtualClasses: state.classVirtualReducer.remoteClassVirtual,
    userProfile: state.auth.userProfile,
  };
}

export default connect(mapStateToProps)(VirtualClassDetails);
