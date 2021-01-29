import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from "react-redux";
import {deleteHomework} from '../../../../../actions/ToDo'


class DeleteHomework extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
        this.handleCancel = this.handleCancel.bind(this);

    };

    handleCancel() {
        this.props.cancelModal();
    };
    handleDelete = (e) => {
        e.preventDefault();
        const idHomework = this.props.idHomework;
        this.props.dispatch(deleteHomework(idHomework));   
    };


    render() {
        
        return (
            <div>
                <Dialog open={this.state.open} TransitionComponent={Slide} onClose={this.handleCancel}>
                    <DialogTitle>
                        {"Supprimer Devoir"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {<IntlMessages id="message.confirm.modal" />}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="secondary">
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

export default connect()(DeleteHomework);
