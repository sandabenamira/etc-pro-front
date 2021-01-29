import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Badge } from "reactstrap";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../util/IntlMessages";

const users = [{ id: 1 }, { id: 2 }, { id: 3 }];

class CheckBoxListControl extends Component {
  state = {
    checked: [1],
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    return (
      <Card>
        <CardActionArea>
          <div
            className=" col-lg-12 col-md-12 justify-content-start align-items-center "
            style={{ height: "40px", backgroundColor: "#FACC03" }}
          >
            <span
              style={{
                position: "absolute",
                marginTop: "10px",
                color: "black",
              }}
            >
              <IntlMessages id="dashborad.prof.fiche" />{" "}
            </span>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
            >
              <IconButton>
                <i className="zmdi zmdi-more-vert" />
              </IconButton>
              &nbsp;
              <IconButton>
                <i className="zmdi zmdi-close" size="small" />
              </IconButton>
            </div>
          </div>
        </CardActionArea>
        <CardBody>
          <List>
            {users.map((user) => (
              <ListItem
                button
                key={user.email}
                onClick={(event) => this.handleToggle(event, user.id)}
              >
                <FiberManualRecordIcon
                  className=" "
                  color="primary"
                  style={{ fontSize:"15px", marginBottom: "10px" }}
                />
                <ListItemText
                  className="br-break "
                  primary="Mardi 1 déc"
                  secondary="Nov 8, 2017"
                />
                <Badge className="ml-1 text-uppercase" color="primary">
                  3éme D1
                </Badge>
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    );
  }
}

export default CheckBoxListControl;
