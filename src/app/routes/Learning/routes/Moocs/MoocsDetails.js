import React, { Component } from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from 'react-redux';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
 import moocsPoster from './Assets/moocsPoster.jpg';

class MoocsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemMoocs: {},
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.listMoocs !== this.props.listMoocs) {
      let itemMoocs = this.props.listMoocs.find(
        (element) => element.id== this.props.match.params.moocsId
      );
      this.setState({ itemMoocs });
    }
  }
  componentWillMount() {
    let itemMoocs = this.props.listMoocs.find(
      (element) => element.id== this.props.match.params.moocsId
    );
    this.setState({ itemMoocs });
  }

  render() {   /* eslint eqeqeq: "off" */
    let moocsItem = {};
    moocsItem = this.state.itemMoocs;
    if (moocsItem===undefined) {
      return <h1 style={{ textAlign: 'center' }}>MOOCs non disponible</h1>;
    } else {
      return (
        <div>
          <div className="col-md-12 text-left ">
            <Button
              className="bg-primary text-white "
              style={{ borderRadius: '15px' }}
            >
              <i class="zmdi zmdi-hc-2x zmdi-caret-left"></i>&nbsp;
              <NavLink to={'/app/e-learning/moocs'}>
                <span className="text-white">
                  <IntlMessages id="components.establishments.formadd.buttonCancel" />
                </span>
              </NavLink>
            </Button>
          </div>
         

          <div className="row col-md-12 d-flex flex-row justify-content-between align-items-start">
            <div className="col-md-7 col-lg-8 col-sm-12 mb-2">
            <h1 className="text-center text-grey">
            <strong> {moocsItem.moocsTopic}</strong>
          </h1>
              <video
                width="100%"
                height="100%"
                controls={true}
                poster={moocsPoster}
              >
                <source src={moocsItem.moocsUrl} type="video/mp4" />
              </video>
              <h1 style={{ textAlign: 'left', color: 'grey' }}>
                {' '}
                <strong>
                  {' '}
                  <IntlMessages id="apropos" />
                </strong>{' '}
              </h1>
              <span className="text-grey pt-1" style={{ fontSize: '16px' }}>
                {' '}
                {moocsItem.educationalGoals}
              </span>
            </div>

            <div className="col-md-5 col-lg-4 col-sm-5 col-12 mt-5">
              <div className="col-12 mb-2">
                <div className="jr-card text-left ">
                  <div className="jr-card-header-color text-white bg-gradient-primary">
                    <div className="d-flex flex-column">
                      <span
                        className="card-text pt-1"
                        style={{ fontSize: '18px' }}
                      >
                        <strong> {moocsItem.moocsTopic}</strong>
                      </span>
                      <br />

                      <span className="card-text pt-1">
                        {moocsItem.moocsAssignCourse.map((element) => (
                          <strong style={{ fontSize: '21px' }}>
                            {element.className + ',  '}
                          </strong>
                        ))}
                      </span>
                      <br />
                      <span style={{ fontSize: '21px' }}>
                        <i
                          className="zmdi zmdi-account zmdi-hc-fw zmdi-hc-lg text-white align-self-center "
                          style={{ position: 'absolute', left: 0 }}
                        />
  &nbsp;
                        <strong>
                          {"M. "+moocsItem.poster.name +
                            ' ' +
                            moocsItem.poster.surname}{' '}
                        </strong>
                      </span>
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
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <IntlMessages id="moocs.date.add" />{' '}
                        {moment(moocsItem.dateOfCreation).format('Do MMMM ')}
                        &nbsp; &nbsp;
                      </span>
                    </div>
                  </div>
                  {moocsItem.prerequiste==='' ? (
                    <h3 className="text-center  text-primary">
                      {' '}
                      <IntlMessages id="prerequis" />{' '}
                    </h3>
                  ) : (
                    <div className="jr-card-body pt-1">
                      <h2 className="card-text text-primary">
                        <strong>
                          {' '}
                          <IntlMessages id="add.input.prerequisite" />:{' '}
                        </strong>
                      </h2>
                      <span style={{ fontSize: '14px' }}>
                        {moocsItem.prerequiste}
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
    listMoocs: state.MoocsReducer.remoteMoocs,
  };
}

export default connect(mapStateToProps)(MoocsDetails);
