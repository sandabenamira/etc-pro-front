import React from "react";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../../util/IntlMessages";
import AddRoom from "./AddRoom";
import RoomList from "./RoomList";
import EditRoom from "./EditRoom";
import DeleteRoom from "./DeleteRoom";
import { UncontrolledAlert } from "reactstrap";
import { getEstablishment } from "../../../../../actions/establishmentAction";
import { connect } from "react-redux";
import { classService } from "../../../../../_services";
import Input from "@material-ui/icons/Input";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardBox from "../../../../../components/CardBox/index";
import Box from "@material-ui/core/Box";
import { roleIdDirector, roleIdAdmin, roleIdSuperAdmin} from '../../../../../config/config'
import { getRoomsByEstablshment } from "../../../../../actions/roomAction";

const mapStateToProps = (state) => {
  return {
    establishments: state.establishment.remoteEstablishments,
    userProfile: state.auth.userProfile,
    rooms: state.rooms.rooms,
  };
};
class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addRoomModal: false,
      successStatus: false,
      errorStatus: false,
      message: "",
      edit: false,
      Rooms_list: [],
      room_Item: [],
      modal_delete: false,
      item_id: 0,
    };
     this.EditItemRoom = this.EditItemRoom.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.RequestDeleteRoom = this.RequestDeleteRoom.bind(this);
    this.handleAnnuleModalDelete = this.handleAnnuleModalDelete.bind(this);
    this.deleteItemRoom = this.deleteItemRoom.bind(this);
    this.addRoom = this.addRoom.bind(this);
  }
  addRoom() {
    this.setState({ addRoomModal: true });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      const establishmentId = this.props.userProfile.establishment_id;
      this.props.getRoomsByEstablshment(establishmentId,this.props.userProfile.school_year_id);
    }
  }
  componentWillMount() {
    const roleId = this.props.userProfile.role_id;
    if (roleId === roleIdAdmin || roleId === roleIdDirector) {
      this.props.getEstablishment();
      const establishmentId = this.props.userProfile.establishment_id;
      this.props.getRoomsByEstablshment(establishmentId,this.props.userProfile.school_year_id);
    } else {
      // this.props.dispatch(getEstablishment());
      let apiEndpoint = `/rooms?access_token=${localStorage.token}`;
      classService
        .get(apiEndpoint)
        .then((res) => {
          const Room_list = res.data;
          const Rooms_list = Room_list.filter((element) => element.status);
          this.setState({ Rooms_list });
        })
        .catch((error) => {});
    }
  }
  EditItemRoom(id) {
    const room_Item = this.props.rooms.find((element) => element.id == id);
    this.setState({ room_Item: room_Item, edit: true });
  }
  handleSubmitEdit(room) {
    let classroomData = {
      name: room.name,
      max_number: room.max_number,
      description: room.description,
      status: room.status,
      establishment_id: room.establishment_id,
      id: room.id,
      fk_id_school_year: room.schoolYear

    };
    let apiEndpoint =
      `/rooms/` + room.id + `?access_token=${localStorage.token}`;
    classService.put(apiEndpoint, classroomData).then((res) => {
      if (res) {
        this.setState({
          Rooms_list: [
            ...this.state.Rooms_list.filter(
              (element) => element.id !== room.id
            ),
            res.data,
          ],
          edit: false,
          successStatus: true,
          message: "La modification est effectuée avec succès",
        });
        setTimeout(() => {
          this.setState({ successStatus: false });
        }, 4000);
      } else {
        this.setState({
          errorStatus: true,
          message:
            "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
        });
        setTimeout(() => {
          this.setState({ errorStatus: false });
        }, 4000);
      }
    });
  }
  deleteItemRoom(idItem) {
    let apiEndpoint =
      `/rooms/` + idItem + `?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((res) => {
        const data_room = res.data;
        let data = {
          name: data_room.name,
          description: data_room.description,
          status: false,
          establishment_id: data_room.establishment_id,
          id: data_room.id,
        };
        let apiEndpoint2 =
          `/rooms/` + data_room.id + `?access_token=${localStorage.token}`;
        classService
          .put(apiEndpoint2, data)
          .then((res) => {
            this.setState({
              Rooms_list: [
                ...this.state.Rooms_list.filter(
                  (element) => element.id !== data_room.id
                ),
              ],
            });
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }
  RequestDeleteRoom(id) {
    this.setState({ modal_delete: true, item_id: id });
  }

  handleCancelModal() {
    this.setState({ edit: false, addRoomModal: false });
  }
  handleAnnuleModalDelete() {
    this.setState({ modal_delete: false, item_id: 0 });
  }
  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.rooms" />}
        />
        <div className="col-md-12 text-right " style={{ marginBottom: 20 }}>
          <Fab
            size="small"
            color="primary"
            aria-label="Add"
            onClick={this.addRoom}
          >
            <AddIcon />
          </Fab>
          &nbsp;&nbsp;&nbsp;
          <Fab size="small" color="primary">
            <Input />
          </Fab>
        </div>
        {this.state.successStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.state.message} </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        {this.state.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.state.message} </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        {this.state.addRoomModal ? (
          <AddRoom
            rooms={this.props.rooms}
            ListEstablishment={this.props.establishments}
            cancelModal={this.handleCancelModal}
            userProfile={this.props.userProfile}
          />
        ) : (
          ""
        )}
        {this.props.rooms.length !== 0 &&
        this.props.userProfile.role_id !== undefined ? (
          <RoomList
            rooms={this.props.rooms}
            ListEstablishment={this.props.establishments}
            editRoom={this.EditItemRoom}
            RequestDeleteRoom={this.RequestDeleteRoom}
            userProfile={this.props.userProfile}
          />
        ) : (
          <CardBox styleName="col-lg-12">
            <div className="table-responsive-material bg-dark d-flex justify-content-center">
              <Table className="default-table table-unbordered table table-sm table-hover">
                <TableHead className="th-border-b">
                  <TableRow>
                    {this.props.userProfile.role_id ===
                    this.state.roleIdSuperAdmin ? (
                      <TableCell>
                        {
                          <IntlMessages id="components.student.formadd.establishment" />
                        }
                      </TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell>{<IntlMessages id="room.name" />}</TableCell>
                    <TableCell align="right">
                      {<IntlMessages id="room.description" />}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: "25px",
              }}
            >
              <b>
                {" "}
                <IntlMessages id="room.empty" />
              </b>
            </div>
          </CardBox>
        )}
        {this.state.edit ? (
          <EditRoom
            rooms={this.props.rooms}
            room={this.state.room_Item}
            ListEstablishment={this.props.establishments}
            cancelModal={this.handleCancelModal}
            handleSubmit={this.handleSubmitEdit}
            userProfile={this.props.userProfile}
          />
        ) : (
          ""
        )}
        {this.state.modal_delete ? (
          <DeleteRoom
            item_id={this.state.item_id}
            annuleModalDelete={this.handleAnnuleModalDelete}
            handleDelete={this.deleteItemRoom}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps,{getEstablishment,getRoomsByEstablshment})(Rooms);
