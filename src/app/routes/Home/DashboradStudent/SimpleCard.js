import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Badge } from 'reactstrap';
import { Card, CardBody, CardSubtitle } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import IntlMessages from '../../../../util/IntlMessages';

const users = [{ id: 1 }, { id: 2 }];
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
}));

class SimpleCard extends Component {
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
    /* eslint eqeqeq: "off" */
    const classes = useStyles;

    return (
      <Card className="card shadow" style={{ height: '247px' }}>
        <CardBody>
          <CardActionArea></CardActionArea>
          <CardSubtitle className="text-black">
            <div class="d-flex">
              <div
                class="mt-2 d-flex justify-content-star"
                style={{
                  position: 'absolute',
                  top: 0,
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: '#3F51B5',
                    fontWeight: 'normal',
                    fontSize: '15px',
                    textAlign: 'center',
                    fontFamily: 'Roboto',
                  }}
                >
                  <IntlMessages id="dashborad.prof.course" />{' '}
                </Typography>
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
              >
                <IconButton>
                  <i className="zmdi zmdi-close" size="small" />
                </IconButton>
              </div>
            </div>
          </CardSubtitle>
          <List>
            {users.map((user) => (
              <ListItem button onClick={(event) => this.handleToggle(event, user.id)}>
                <Badge className=" text-uppercase" color="primary">
                  21 <br></br> nov
                </Badge>
                <ListItemText className="br-break " primary="Le 21/11/2020 de 08h00 à 12h00 BAC2" />
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    );
  }
}

export default SimpleCard;
