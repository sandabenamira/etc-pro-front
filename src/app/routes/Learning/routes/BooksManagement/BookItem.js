import React, { Component } from 'react'
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import defaultAvatar from "../../../../../assets/images/default-Avatar.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../../../../../util/IntlMessages";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export default class BookItem extends Component {
    render() {   /* eslint eqeqeq: "off" */
        return (
            
             <>
                 <TableRow key={1}>
                 <TableCell align="left">
                 <i
                    className="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'red' }}
                  ></i>
                 </TableCell>
          <TableCell align="left">
            <Avatar
              align="left"
              className="size-60"
              alt="..."
              src={defaultAvatar}
            />
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
          <TableCell align="left">000001</TableCell>
          <TableCell align="left">Dev web</TableCell>
          <TableCell align="left">Louis Franco</TableCell>
          <TableCell align="left">Administrateur</TableCell>
          <TableCell align="left">Petit Paris</TableCell>
          <TableCell align="left">3</TableCell>
           <TableCell align="left">Papier</TableCell>
           <TableCell align="left">3</TableCell>
         
          <TableCell>
            
            
            <IconButton
              size="medium"
              className="icon-btn"
              // onClick={(e) => this.props.handleDelete(cours)}
            >
              <i className="zmdi zmdi-eye" style={{ color: "text-grey" }} />
            </IconButton>
            &nbsp; | 
            <Button
              style={{
                backgroundColor: "white",
                color: "#7C7C7C",
                width: "50px",
                height: "20px",
              }}
              onClick={(e) => {
                // this.props.editShowModal(cours);
              }}
              target="_blank"
            >
              <span style={{ fontSize: "12px", color: "#7C7C7C" }}>
                <IntlMessages id="button.modify" />
              </span>
            </Button>
            &nbsp; | 
            <IconButton
              size="medium"
              className="icon-btn"
              // onClick={(e) => this.props.handleDelete(cours)}
            >
              <i className="zmdi zmdi-delete" style={{ color: "text-grey" }} />
            </IconButton>
            &nbsp; | 
            <Button
              style={{
                backgroundColor: "white",
                color: "#7C7C7C",
                width: "50px",
                height: "20px",
              }}
              onClick={(e) => {
                // this.props.editShowModal(cours);
              }}
              target="_blank"
            >
              <span style={{ fontSize: "12px", color: "blue" }}>
                <IntlMessages id="book.affect" />
              </span>
            </Button>
             
           
          </TableCell>
        </TableRow>
             </>
           
        )
    }
}

