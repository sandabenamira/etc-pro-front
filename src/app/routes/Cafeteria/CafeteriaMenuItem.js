import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import IntlMessages from '../../../util/IntlMessages';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { Card, CardBody, CardFooter, CardSubtitle, CardText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { deleteMenus } from '../../../actions/CafeteriaAction';
import { connect } from 'react-redux';
import moment from 'moment';
import DeleteMenu from './DeleteCafeteriaMenu';
import { RoleContext } from '../../../Context';
import Can from '../../../can';

function TabContainer({ children, dir }) {
  return <div dir={dir}>{children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class CafeteriaMenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      deleteIsopen: false,
    };
    this.cancelModal = this.cancelModal.bind(this);
    this.handleDeleteMenu = this.handleDeleteMenu.bind(this);
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
  }

  handleDeleteMenu = () => {
    this.props.deleteMenus(this.props.MenuItem.id);
    this.setState({ deleteIsopen: false });
  };
  cancelModal() {
    this.setState({ deleteIsopen: false });
  }

  handleShowDeleteModal = () => {
    this.setState({ deleteIsopen: true });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    /* eslint eqeqeq: "off" */
    const { theme } = this.props;

    return (
      <Card className="shadow border-0 ">
        <RoleContext.Consumer>
          {({ role }) => (
            <div>
              <Can
                role={role}
                perform="cafeteria-menu-admin:visit"
                yes={() => (
                  <AppBar className="bg-primary card-header" position="static" style={{ paddingTop: 22, height: 70 }}>
                    <Tabs value={this.state.value} onChange={this.handleChange} variant="fullWidth">
                      <Tab className="tab" label="Menu" value={0} />
                      <Tab className="tab" label="Options" value={1} />
                    </Tabs>
                  </AppBar>
                )}
              />
            </div>
          )}
        </RoleContext.Consumer>
        <RoleContext.Consumer>
          {({ role }) => (
            <div>
              <Can
                role={role}
                perform="cafeteria-menu-student:visit"
                yes={() => (
                  <AppBar className="bg-primary card-header" position="static" style={{ paddingTop: 22, height: 70 }}>
                    <Tabs value={this.state.value} onChange={this.handleChange} variant="fullWidth">
                      <Tab className="tab" label="Menu" value={0} />
                    </Tabs>
                  </AppBar>
                )}
              />
            </div>
          )}
        </RoleContext.Consumer>
        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
          <TabContainer dir={theme.direction}>
            <div>
              <CardBody>
                <h3 className="card-title">
                  <b style={{ color: 'blue' }}>
                    <IntlMessages id="new.cantine.entree" />
                  </b>
                </h3>
                <CardText>{this.props.MenuItem.entree}</CardText>

                <h3 className="card-title">
                  <b style={{ color: 'blue' }}>
                    <IntlMessages id="new.cantine.suite" />
                  </b>
                </h3>
                <CardText>{this.props.MenuItem.suite}</CardText>
                <h3 className="card-title">
                  <b style={{ color: 'blue' }}>
                    <IntlMessages id="new.cantine.dessert" />
                  </b>
                </h3>
                <CardText>{this.props.MenuItem.dessert}</CardText>
              </CardBody>
            </div>
            <div className="d-flex align-items-end w-100 " style={{ paddingTop: '15%' }}>
              <CardFooter className="d-flex flex-row justify-content-around w-100 ">
                <b style={{ color: 'blue' }}>{moment(this.props.MenuItem.menu_date).format('LL')}</b>
                <b style={{ color: 'red' }}>
                  <IntlMessages id="cantine.prix" /> :{this.props.MenuItem.prix} dt
                </b>
              </CardFooter>
            </div>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <div className="d-flex align-items-center  ">
              <CardBody>
                <CardSubtitle className="d-flex flex-column justify-content-around">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ color: '#fff', marginTop: '3%' }}
                    startIcon={<CloudUploadIcon />}
                    onClick={(e) => {
                      this.props.editMenuShowModal(this.props.MenuItem);
                    }}
                  >
                    <IntlMessages id="button.modify" />
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#FF4500',
                      color: '#fff',
                      marginTop: '3%',
                    }}
                    startIcon={<DeleteIcon />}
                    onClick={this.handleShowDeleteModal}
                  >
                    <IntlMessages id="button.delete" />
                  </Button>
                </CardSubtitle>
              </CardBody>
            </div>
            <div className="d-flex align-items-end w-100 " style={{ paddingTop: '37%', marginRight: '0%' }}>
              <CardFooter className="d-flex flex-row justify-content-around w-100 ">
                <b style={{ color: 'blue' }}>{moment(this.props.MenuItem.menu_date).format('LL')}</b>
                <b style={{ color: 'red' }}>
                  {' '}
                  <IntlMessages id="cantine.prix" />: {this.props.MenuItem.prix} dt{' '}
                </b>
              </CardFooter>
            </div>
          </TabContainer>
        </SwipeableViews>

        {this.state.deleteIsopen === true ? (
          <DeleteMenu deleteIsopen={this.state.deleteIsopen} handleDeleteMenu={this.handleDeleteMenu} cancelModal={this.cancelModal} />
        ) : (
          ''
        )}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    settings: state.settings.locale,
  };
}

export default connect(mapStateToProps, { deleteMenus })(withStyles(null, { withTheme: true })(CafeteriaMenuItem));
