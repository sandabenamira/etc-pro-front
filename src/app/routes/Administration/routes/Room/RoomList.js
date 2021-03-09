import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardBox from "../../../../../components/CardBox/index";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const roleIdSuperAdmin = 1;
class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      menuState: false,
      itemId: 0
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
  }

  onOptionMenuSelect = event => {
    this.setState({
      menuState: true,
      anchorEl: event.currentTarget,
      itemId: event.currentTarget.value
    });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };

  handleEdit(e) {
    e.preventDefault();
    this.props.editRoom(this.state.itemId);
    this.setState({ menuState: false });
  }
  handleRequestDelete(e) {
    e.preventDefault();
    this.props.RequestDeleteRoom(this.state.itemId);
    this.setState({ menuState: false });
  }
  render() {   /* eslint eqeqeq: "off" */
    const { anchorEl, menuState } = this.state;
    const ListEstablishment = this.props.ListEstablishment;
    return (
      <div>
        <CardBox styleName="col-lg-12">
          <div className="table-responsive-material">
            <Table className="default-table table-unbordered table table-sm table-hover">
              <TableHead className="th-border-b">
                <TableRow>
                  {this.props.userProfile.role_id === roleIdSuperAdmin ? (
                    <TableCell>
                      {
                        <IntlMessages id="components.student.formadd.establishment" />
                      }
                    </TableCell>
                  ) : (
                      ""
                    )}
                  <TableCell>{<IntlMessages id="room.name" />}</TableCell>
                  <TableCell > {<IntlMessages id="room.max_number" />}</TableCell>
                  <TableCell>
                    {<IntlMessages id="room.description" />}
                  </TableCell>
                  <TableCell align="right"><IntlMessages id="stuppUser.action" /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.rooms.map(room => {
                  return (
                    <TableRow key={room.id}>
                      {this.props.userProfile.role_id === roleIdSuperAdmin
                        ? ListEstablishment.map(establishment => {
                          if (establishment.id === room.establishment_id) {
                            return (
                              <TableCell key={establishment.id}>
                                {establishment.name}
                              </TableCell>
                            );
                          } else {
                            return null;
                          }
                        })
                        : ""}
                      <TableCell>{room.name}</TableCell>
                      <TableCell>{room.max_number}</TableCell>
                      <TableCell>{room.description}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={this.onOptionMenuSelect.bind(this)}
                          value={room.id}
                        >
                          <i className="zmdi zmdi-more-vert" />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          open={menuState}
                          onClose={this.handleRequestClose.bind(this)}
                          MenuListProps={{
                            style: {
                              width: 150,
                              paddingTop: 0,
                              paddingBottom: 0
                            }
                          }}
                        >
                          <MenuItem onClick={this.handleEdit} value={room.id}>
                            {<IntlMessages id="button.modify" />}
                          </MenuItem>
                          <MenuItem
                            onClick={this.handleRequestDelete}
                            value={room.id}
                          >
                            {<IntlMessages id="button.delete" />}
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardBox>
      </div>
    );
  }
}
export default RoomList;
