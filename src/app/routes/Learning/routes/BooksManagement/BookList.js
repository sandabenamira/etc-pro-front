import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IntlMessages from '../../../../../util/IntlMessages';
import BookItem from './BookItem';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

export default class BookList extends Component {
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="book.list" />
            </b>
          </h1>
          <div className="d-flex flex-row-reverse ">
            &nbsp;&nbsp;&nbsp;
            <PrintIcon
              style={{
                fontSize: '35',
              }}
              color="inherit"
            />
            &nbsp;&nbsp;&nbsp;
            <PictureAsPdfIcon
              style={{
                fontSize: '35',
              }}
              color="inherit"
            />
          </div>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <IntlMessages id="book.photo" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.title.table" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.auteur" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.langue" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.genre.table" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.maison" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.volume" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.format" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.stock.tab" />
              </TableCell>
              <TableCell>
                <IntlMessages id="book.options" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[0, 1, 2].map((element) => {
              return <BookItem key={element} />;
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
