
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../util/IntlMessages';
import { connect } from "react-redux";
import { deleteData } from "../../../../actions/establishmentAction";

class ModalDeleteEstablishment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    };

    handleRequestClose = () => {
        this.props.cancelModalDelete()
    };

    handleDelete = (e) => {
        const idEstablishment = this.props.itemId;
        this.props.dispatch(deleteData(idEstablishment));
        this.props.cancelModalDelete()
    };

    render() {

        return (
            <div>
                <Dialog open={this.state.open} TransitionComponent={Slide} onClose={this.handleRequestClose}>
                    <DialogTitle>
                        {"Supprimer Établissement"}
                    </DialogTitle>
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

export default connect()(ModalDeleteEstablishment);
