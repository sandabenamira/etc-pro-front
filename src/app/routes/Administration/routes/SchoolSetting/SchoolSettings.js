import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import ContainerHeader from '../../../../../components/ContainerHeader/index';
import Input from '@material-ui/icons/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardBox from '../../../../../components/CardBox/index';

class schoolSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addServiceModal: false,
      modalDelete: false,
      itemId: 0,
      serviceItem: [],
      roleIdSuperAdmin: 1,
    };
    this.addService = this.addService.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.requestDeleteService = this.requestDeleteService.bind(this);
    this.CancelModalDelete = this.CancelModalDelete.bind(this);
  }

  CancelModalDelete() {
    this.setState({ modalDelete: false, itemId: 0 });
  }

  requestDeleteService(id) {
    this.setState({ modalDelete: true, itemId: id });
  }

  addService() {
    this.setState({ addServiceModal: true });
  }

  handleCancelModal() {
    this.setState({ addServiceModal: false });
  }

//   componentDidMount() {
//     const roleId = this.props.userProfile.role_id;
//     if (roleId === roleIdAdmin) {
//       const establishmentId = this.props.userProfile.establishment_id;
//       this.props.dispatch(getServicesByEstablishmentId(establishmentId));
//     } else {
//       this.props.dispatch(getEstablishment());
//       this.props.dispatch(getServices());
//     }
//   }

  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="services" />}
        />
        <div className="col-md-12 text-right " style={{ marginBottom: 20 }}>
          <Fab
            size="small"
            color="primary"
            aria-label="Add"
            onClick={this.addService}
          >
            <AddIcon />
          </Fab>
          &nbsp;&nbsp;&nbsp;
          <Fab size="small" color="primary">
            <Input />
          </Fab>
        </div>
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
            <span className="d-inline-block"> {this.props.message} </span>
          </UncontrolledAlert>
        ) : (
          ''
        )}
        {
       // this.props.services.length !== 0 &&
        
          <CardBox styleName="col-lg-12">
            <div className="table-responsive-material">
              <Table className="default-table table-unbordered table table-sm table-hover">
                <TableHead className="th-border-b">
                  <TableRow>
                    {/* {this.props.userProfile.role_id ===
                    this.state.roleIdSuperAdmin ? ( */}
                      <TableCell>
                        {
                          <IntlMessages id="components.student.formadd.establishment" />
                        }
                      </TableCell>
                    {/* ) : (
                      ''
                    )} */}
                    <TableCell>
                      {
                        <IntlMessages id="components.student.formadd.establishment" />
                      }
                    </TableCell>
                    <TableCell align="right">
                      {<IntlMessages id="service.price" />}
                    </TableCell>
                    <TableCell align="right">
                      {<IntlMessages id="service.currency" />}
                    </TableCell>
                    <TableCell align="right">
                      {<IntlMessages id="service.paymentPeriodicity" />}
                    </TableCell>
                    <TableCell align="right">
                      {<IntlMessages id="components.note.student.comment" />}
                    </TableCell>
                    <TableCell align="right">
                      <IntlMessages id="stuppUser.action" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <Box
                    component="div"
                    mt={5}
                    textOverflow="clip"
                    overflow="hidden"
                    bgcolor="background.paper"
                  > */}
                  <b>
                    {' '}
                    <IntlMessages id="room.empty" />
                  </b>
                  {/* </Box> */}
                </TableBody>
              </Table>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: '25px',
              }}
            >
              <b>
                {' '}
                <IntlMessages id="service.empty" />
              </b>
            </div>
          </CardBox>
       }

        {/* {this.state.addServiceModal ? ( */}
          {/* <AddSchoolSettings */}
            {/* // servicesList={this.props.services}
            // establishments={this.props.establishments}
            // cancelModal={this.handleCancelModal}
            // userProfile={this.props.userProfile}
          /> */}
        {/* ) : (
          ''
        )} */}

        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    establishments: state.establishment.remoteEstablishments,
    services: state.service.remoteServices,
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
};

export default connect(mapStateToProps)(schoolSettings);
