import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardBox from '../../../../../components/CardBox/index';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import EditLevel from './EditLevel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Levellist extends React.Component {

  constructor() {
    super();
    this.state = {
      modal: false,
      archiveModal: false,
      idClass: '',
      levelItem: [],
      anchorEl: undefined,
      menuState: false,
      itemId: 0

    }
    this.archiver = this.archiver.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.editClose = this.editClose.bind(this)

  }

  onOptionMenuSelect = event => {
    this.setState({ menuState: true, anchorEl: event.currentTarget, itemId: event.currentTarget.value });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };

  handleClickOpen(e) {
    this.setState({
      archiveModal: true,
      idClass: e.currentTarget.value,

    }, function () {

    });
  }
  editClose() {
    this.setState({
      modal: false
    })
  }

  handleClose() {
    this.setState({
      archiveModal: false
    });
  }
  componentDidMount() {
  }

  handleEdit(e) {
    const levelItem = this.props.ClassLevels.find(element => element.id == this.state.itemId)
    this.setState({
      modal: true,
      levelItem: levelItem
    })
    this.setState({ menuState: false });
  }
  archiver() {
    this.props.dispatch(archiverLevel(this.state.itemId))
    this.setState({
      archiveModal: false
    })
    this.setState({ menuState: false });
  }



  render() {
    const { anchorEl, menuState } = this.state;
    if (this.props.ClassLevels.length) {
      return (
        <div className="app-wrapper">
          {this.state.modal ? <EditLevel modal={this.state.modal} cancelModal={this.editClose} levelItem={this.state.levelItem} /> : ""}

          <CardBox styleName="col-lg-12" >
            <div className="table-responsive-material">
              <Table>

                <TableHead >
                  <TableRow >
                    <TableCell align="right">{<IntlMessages id="components.note.niveau" />}</TableCell>
                    <TableCell align="right">{<IntlMessages id="components.establishments.formadd.Categories" />}</TableCell>
                    <TableCell align="right">{<IntlMessages id="components.class.level.input.label.section" />}</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.ClassLevels.map(classItem => {
                    if (classItem.status) {
                      return (
                        <TableRow key={classItem.id}>
                          <TableCell align="right">{classItem.category}</TableCell>
                          <TableCell align="right">{classItem.level}</TableCell>
                          <TableCell align="right">{classItem.section}</TableCell>
                          <TableCell>
                            <IconButton onClick={this.onOptionMenuSelect.bind(this)} value={classItem.id}>
                              <i className="zmdi zmdi-more-vert" />
                            </IconButton>
                            <Menu id="long-menu"
                              anchorEl={anchorEl}
                              open={menuState}
                              onClose={this.handleRequestClose.bind(this)}
                              MenuListProps={{
                                style: {
                                  width: 150,
                                  paddingTop: 0,
                                  paddingBottom: 0
                                },
                              }}>
                              <MenuItem onClick={this.handleEdit} value={classItem.id} >{<IntlMessages id="button.modify" />}</MenuItem>
                              <MenuItem onClick={this.handleClickOpen} value={classItem.id} >{<IntlMessages id="button.delete" />}</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      );
                    }

                  })}
                </TableBody>
              </Table>
            </div>
          </CardBox>

          <Dialog
            open={this.state.archiveModal}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{<IntlMessages id="message.confirm.modal" />}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {<IntlMessages id="message.confirm.modal" />}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                {<IntlMessages id="button.no" />}
              </Button>
              <Button onClick={this.archiver} color="primary" autoFocus>
                {<IntlMessages id="button.yes" />}

              </Button>
            </DialogActions>
          </Dialog>

        </div>)
    } else {
      return (<div>pas  de classe</div>)
    }
  }
}


export default connect()(Levellist);
