
import React from 'react';
import IntlMessages from '../../../util/IntlMessages';
import ContainerHeader from '../../../components/ContainerHeader/index';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { addMenu } from '../../../actions/CafeteriaAction';
import { getMenusByEstablishmentId } from '../../../actions/CafeteriaAction';
import { UncontrolledAlert } from 'reactstrap';
import Can from '../../../can';
import { RoleContext } from '../../../Context';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import { roleIdSuperAdmin } from '../../../config/config';
import { roleIdAdmin } from '../../../config/config';
import { roleIdDirector } from '../../../config/config';
import AddCafeteriaMenu from './AddCafeteriaMenu';
import CafeteriaMenuList from './CafeteriaMenuList';
import CardBox from "../../../components/CardBox/index";


class Cafeteria extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addIsopen: false,
      menu_date: new Date(),
      prix: '',
      suite: '',
      dessert: '',
      entree: '',
      selectedFilterDate: null,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addMenuShowModal = this.addMenuShowModal.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.addCafeteriaMenu = this.addCafeteriaMenu.bind(this);
    this.handleChangeDateFilter = this.handleChangeDateFilter.bind(this);
  }
  handleChangeDateFilter = (date) => {
    if (date === null) {
      this.setState({
        selectedFilterDate: null,
      });
    } else {
      this.setState({
        selectedFilterDate: date.format().slice(0, 10),
      });
    }
  };

  addCafeteriaMenu = () => {
    var data = {};
    data.menu_date = this.state.menu_date;
    data.prix = this.state.prix;
    data.suite = this.state.suite;
    data.dessert = this.state.dessert;
    data.entree = this.state.entree;
    data.establishment_id = this.props.userProfile.establishment_id;
    data.status = true;
    this.props.addMenu(data);
    this.setState({
      addIsopen: false,
      menu_date: new Date(),
      prix: '',
      suite: '',
      dessert: '',
      entree: '',
    });
  };

  handleChangeDate = (date) => {
    this.setState({ menu_date: date });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleCancel = () => {
    this.setState({
      addIsopen: false,
    });
  };

  addMenuShowModal = () => {
    this.setState({ addIsopen: true });
  };

  componentWillMount() {
    this.props.getMenusByEstablishmentId(
      this.props.userProfile.establishment_id
    );
  }

  render() {

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.components.cafeteria" />}
        />
        {this.props.successStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message} </span>
          </UncontrolledAlert>
        ) : (
            ''
          )}
        {this.props.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message}</span>
          </UncontrolledAlert>
        ) : (
            ''
          )}
        <br />

        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="user-filter:visit"
              yes={() => (
                <CardBox styleName="col-lg-12 text-primary">
                  <div className="col-md-12  d-flex justify-content-between">
                    <Can
                      role={role}
                      perform="user-filter-establishment:visit"
                      yes={() => (
                        <div className="col-md-2 text-left">
                          <TextField
                            className="mt-0"
                            variant="outlined"
                            required
                            name="establishment_id"
                            id="establishment_id"
                            select
                            label={
                              <IntlMessages id="components.student.formadd.establishment" />
                            }
                            //  value={this.state.establishment_id}
                            // onChange={this.handleChangeEstablishment('establishment_id')}
                            SelectProps={{}}
                            margin="normal"
                            fullWidth
                          >
                            {/* {this.state.establishments.map(establishment => (
                            <MenuItem key={establishment.id} value={establishment.id}>
                              {this.props.settings == "tunisia" ? establishment.ar_name : establishment.name}
                            </MenuItem>
                          ))} */}
                          </TextField>
                        </div>
                      )}
                    />
                    <div className="col-md-4 text-left ">
                      <div className="form-group">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            label="                                           "
                            clearable
                            fullWidth
                            id="selectedFilterDate"
                            name="selectedFilterDate"
                            value={this.state.selectedFilterDate}
                            onChange={this.handleChangeDateFilter}
                            format="DD-MM-YYYY"
                            autoOk
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>

                    {this.props.userProfile.role_id === roleIdSuperAdmin ||
                      this.props.userProfile.role_id === roleIdAdmin ||
                      this.props.userProfile.role_id === roleIdDirector ? (
                        <div
                          className="col-md-2 text-right "
                          style={{ marginBottom: 20 }}
                        >
                          <Fab
                            size="small"
                            color="primary"
                            aria-label="Add"
                            onClick={this.addMenuShowModal}
                          >
                            <AddIcon />
                          </Fab>
                        </div>
                      ) : (
                        ''
                      )}
                  </div>
                </CardBox>
              )}
            />
          )}
        </RoleContext.Consumer>

        {this.state.addIsopen === true ? (
          <AddCafeteriaMenu
            MenuList={this.props.MenuList}
            values={this.state}
            handleCancel={this.handleCancel}
            handleChange={this.handleChange}
            handleChangeDate={this.handleChangeDate}
            addCafeteriaMenu={this.addCafeteriaMenu}
          />
        ) : (
            ''
          )}

        {
          <CafeteriaMenuList
            MenuList={this.props.MenuList}
            values={this.state}
          />
        }
      </div>
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
    MenuList: state.CafeteriaReducer.remoteCafeteria,
  };
}

export default connect(
  mapStateToProps,
  {
    addMenu,
    getMenusByEstablishmentId,
  }
)(Cafeteria);
