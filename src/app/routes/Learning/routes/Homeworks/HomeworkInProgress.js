import React from "react";
 import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";

const listHomework = [
    {name: "Exercice 6eme", dateHomwork:"Oct 21", status: "Terminé" },
    {name: "Exercice 2", dateHomwork:"Oct 23", status: "En cours" },
    {name: "Exercice 3eme", dateHomwork:"Oct 27", status: "Reporté" },
    {name: "Exercice 5eme", dateHomwork:"Oct 28", status: "Terminé" }
]

class HomeworkInProgress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      
       
          <div className=" d-flex flex-column justify-content-center">
            <div className="p-2 d-flex flex-row">
              <div className="p-2"> <IntlMessages id="homework.in.progress" /></div>
              <div className="pl-5 p-2">
              <div
                    className={` badge bg-secondary`}
                    // style={{ height: "20px", width: "80px", float: "left" }}
                  >
                 <IntlMessages id="this.week" />
                  </div>
              </div>
              <div className="pl-2">
              <IconButton
                  >
                    <i className="zmdi zmdi-more-vert" />
                  </IconButton>
              </div>
            </div>
            <div className="p-2">
              <Table className="default-table table-unbordered table table-sm table-hover">
                <TableHead className="th-border-b">
                  <TableRow>
                    <TableCell>
                      <IntlMessages id="components.student.formadd.name" />
                    </TableCell>
                    <TableCell>
                      <IntlMessages id="complaint.date" />
                    </TableCell>
                    <TableCell>
                      <IntlMessages id="component.model.status" />
                    </TableCell>
                    
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
           
                  {listHomework.map((item, index) => {
              return (
                <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.dateHomwork}</TableCell>
                <TableCell>
                  <div
                    className={` badge ${
                        item.status === "Terminé" ? "bg-success"
                        :item.status === "Reporté" ? "bg-info"
                        :"bg-orange"
                    } `}
                    style={{ height: "20px", width: "80px", float: "left" }}
                  >
                 {item.status}
                  </div>
                  
                </TableCell>
                <TableCell>
                  <IconButton
                  // onClick={this.onOptionMenuSelect.bind(this)}
                  // value={room.id}
                  >
                    <i className="zmdi zmdi-more-vert" />
                  </IconButton>
                  {/* <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={menuState}
                    onClose={this.handleRequestClose.bind(this)}
                    MenuListProps={{
                      style: {
                        width: 150,
                        paddingTop: 0,
                        paddingBottom: 0,
                      },
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
                  </Menu> */}
                </TableCell>
              </TableRow>
              );
            })}
                </TableBody>
              </Table>
            </div>
          </div>
       
     
    );
  }
}

export default HomeworkInProgress;
