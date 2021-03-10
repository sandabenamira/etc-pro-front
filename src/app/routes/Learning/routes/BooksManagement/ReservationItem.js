import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import defaultAvatar from '../../../../../assets/images/default-Avatar.png';
import IntlMessages from '../../../../../util/IntlMessages';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

export default class ReservationItem extends Component {
  render() {
    /* eslint eqeqeq: "off" */
    return (
      <>
        <TableRow key={1}>
          <TableCell align="left">
            <Avatar align="left" className="size-60" alt="..." src={defaultAvatar} />
            {/* {this.props.user.user.photo ? (
       <Avatar
         align="left"
         className="size-90"
         alt="..."
         src="https://www.pinterest.com/pin/823736588076106083/"
       />
     ) : (
         <Avatar
           align="left"
           className="size-90"
           alt="..."
           src={defaultAvatar}
         />
       )} */}
          </TableCell>
          <TableCell align="left">Dev web</TableCell>
          <TableCell align="left">10/01/2021</TableCell>
          <TableCell align="left">10/02/2021</TableCell>
          <TableCell align="left">Louis</TableCell>
          <TableCell align="left">Marco</TableCell>
          <TableCell align="left">3 eme</TableCell>
          <TableCell align="left">Gabriel</TableCell>
          <TableCell align="left">
            <Checkbox
            // checked={checked}
            // onChange={handleChange}
            />
          </TableCell>

          <TableCell>
            <IconButton
              size="medium"
              className="icon-btn"
              // onClick={(e) => this.props.handleDelete(cours)}
            >
              <i className="zmdi zmdi-comment-more" style={{ color: 'text-grey' }} />
            </IconButton>
            &nbsp; |
            <IconButton
              size="medium"
              className="icon-btn"
              // onClick={(e) => this.props.handleDelete(cours)}
            >
              <i className="zmdi zmdi-email" style={{ color: 'text-grey' }} />
            </IconButton>
            &nbsp; |
            <Button
              style={{
                backgroundColor: 'white',
                color: '#7C7C7C',
                width: '50px',
                height: '20px',
              }}
              onClick={(e) => {
                // this.props.editShowModal(cours);
              }}
              target="_blank"
            >
              <span style={{ fontSize: '12px', color: '#7C7C7C' }}>
                <IntlMessages id="button.modify" />
              </span>
            </Button>
            &nbsp; |
            <IconButton
              size="medium"
              className="icon-btn"
              // onClick={(e) => this.props.handleDelete(cours)}
            >
              <i className="zmdi zmdi-delete" style={{ color: 'text-grey' }} />
            </IconButton>
          </TableCell>
        </TableRow>
      </>
    );
  }
}
