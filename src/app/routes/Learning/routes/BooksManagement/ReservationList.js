import React, { Component } from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";
 import ReservationItem from "./ReservationItem"
 import PrintIcon from "@material-ui/icons/Print";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

export default class ReservationList extends Component {
    render() {   /* eslint eqeqeq: "off" */
        return (
            <div className="table-responsive-material">
            <div>
              <h1>
                <b>
                  <IntlMessages id="book.list.reservation" />
                  
                </b>
              </h1>
              <div className="d-flex flex-row-reverse ">
            &nbsp;&nbsp;&nbsp;
            <PrintIcon
              style={{
                fontSize: "35",
              }}
              color="inherit"
            />
            &nbsp;&nbsp;&nbsp;
            <PictureAsPdfIcon
              style={{
                fontSize: "35",
              }}
              color="inherit"
            />
          </div>
            </div>
            <Table className="default-table table-unbordered table table-sm table-hover">
              <TableHead className="th-border-b">
                <TableRow>               
                  <TableCell>
                     <IntlMessages id="book.photo" />
                  </TableCell>
                  <TableCell>
                     <IntlMessages id="book.title.table" />
                  </TableCell>
                  <TableCell>
                    <IntlMessages id="book.prelevement" />
                  </TableCell>
                  <TableCell>
                    <IntlMessages id="book.retour" />
                  </TableCell>
                  <TableCell>
                    <IntlMessages id="book.user.name" />
                  </TableCell>
                  <TableCell>
                    <IntlMessages id="book.user.lastName" />
                  </TableCell>
                  <TableCell>
                    <IntlMessages id="book.user.classe" />
                  </TableCell>
                  <TableCell>
                    <IntlMessages id="book.recomondation" />
                  </TableCell>
                  <TableCell>
                    <IntlMessages id="book.status" />
                  </TableCell>
                  <TableCell>
                    <IntlMessages id="book.options" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[0, 1, 2].map((element) => {
                  return (
                    <ReservationItem
                      key={element}
                     
                    />
                  );
                })}
              </TableBody>
            </Table>
            
          </div>
        )
    }
}
