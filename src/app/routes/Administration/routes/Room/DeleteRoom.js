import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from "react-redux";
import {
    deleteRoom,
  } from "../../../../../actions/roomAction";
class DeleteRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    componentDidMount() {
        this.setState({ open: true });
    }
    handleDelete = (e) => {
        this.props.dispatch(deleteRoom(this.props.item_id));
        this.props.annuleModalDelete()
    }
    handleRequestClose = () => {
        this.props.annuleModalDelete()
    };
    render() {   /* eslint eqeqeq: "off" */
        return (
            <div>
                <Dialog open={this.state.open} TransitionComponent={Slide} onClose={this.handleRequestClose}>
                 
                    <DialogContent>
                        <DialogContentText>
                            {<IntlMessages id="message.confirm.modal" />}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="secondary">
                            {<IntlMessages id="button.no" />}
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                            {<IntlMessages id="button.yes" />}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
     };
  };
export default connect(mapStateToProps)(DeleteRoom);

