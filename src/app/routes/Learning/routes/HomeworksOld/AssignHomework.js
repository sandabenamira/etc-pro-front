
import React from 'react';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from "../../../../../util/Auxiliary";
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import { assignHomework } from '../../../../../actions/ToDo';


class AssignHomework extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: true,
            correction_date: '',
            class_id: 0,
            ClassesList: []
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleCancel() {
        this.props.cancelModal();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const homework_id = this.props.idHomework;
        const class_id = this.state.class_id;
        const correction_date = this.state.correction_date;
        const data = { homework_id, class_id, correction_date };
       
        this.props.dispatch(assignHomework(data, this.props.userProfile.id));
        this.setState({
            correction_date: '',
            class_id: 0,
        });
        this.props.cancelModal();
    };

    render() {
        return (
            <Auxiliary>
                <Modal isOpen={this.state.previewVisible}>
                    <ModalHeader className="modal-box-header bg-primary text-white" >
                        {<IntlMessages id="modal.assign_homework" />}
                    </ModalHeader>
                    <ModalBody>
                        <form className="row" onSubmit={this.handleSubmit}>
                            <div className="col-sm-12">
                                <TextField
                                    required
                                    id="class_id"
                                    select
                                    label={<IntlMessages id="sidebar.classes" />}
                                    value={this.state.class_id}
                                    onChange={this.handleChange('class_id')}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth >
                                    {this.props.classList.map(itemClass => (
                                        <MenuItem key={itemClass.class_id} value={itemClass.class_id}>
                                            {itemClass.className}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div className="col-sm-12">
                                <TextField
                                    required
                                    id="correction_date"
                                    onChange={this.handleChange('correction_date')}
                                    value={this.state.correction_date}
                                    type="date"
                                    helperText={<IntlMessages id="components.correction_dates" />}
                                    margin="normal"
                                    fullWidth
                                />
                            </div>
                            <br /><br /><br /><br /><br />
                            <div className="col-sm-12">
                                <h4><font color="red">*</font> {<IntlMessages id="component.required_fields" />}</h4>
                            </div>
                            <div className="col-md-12 text-left ">
                                <br /><br />
                                <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" >{<IntlMessages id="components.establishments.formadd.buttonAdd" />}</Button>
                                <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleCancel}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </Auxiliary>
        )
    };
}
const mapStateToProps = (state) => {
    return {
        classes: state.classes,
        userProfile: state.auth.userProfile
    }
}

export default connect(mapStateToProps)(AssignHomework);
