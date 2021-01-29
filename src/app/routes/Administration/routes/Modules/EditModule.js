
import React from 'react';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from "../../../../../util/Auxiliary";
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import { editModule } from "../../../../../actions/ModuleAction";

class EditModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: true,
            name: '',
            description: '',
            id: 0
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        this.setState({
            name: this.props.moduleItem.name,
            description: this.props.moduleItem.description,
            id: this.props.moduleItem.id,
        })
    };

    handleCancel() {
        this.props.cancelModal();
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    handleSubmit = (e) => {
        e.preventDefault();

        const name = this.state.name;
        const description = this.state.description;
        const id = this.state.id;
        const data = { name, description, id };

        this.props.dispatch(editModule(data));
        this.props.cancelModal();
    };

    render() {
       
        return (
            <Auxiliary>
                <Modal isOpen={this.state.previewVisible} >
                    <ModalHeader className="modal-box-header bg-primary text-white" >
                        {<IntlMessages id="modal.modif.module" />}
                    </ModalHeader>
                    <ModalBody>
                        <form className="row" onSubmit={this.handleSubmit}>
                            <div className="col-sm-6">
                                <TextField
                                    required
                                    name='name'
                                    id="name"
                                    label={<IntlMessages id="component.module" />}
                                    onChange={this.handleChange('name')}
                                    value={this.state.name}
                                    margin="normal"
                                    fullWidth
                                />
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    name='description'
                                    id="description"
                                    label={<IntlMessages id="room.description" />}
                                    onChange={this.handleChange('description')}
                                    value={this.state.description}
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
                                <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" >{<IntlMessages id="components.establishments.formModify.buttonModify" />}</Button>
                                <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleCancel}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </Auxiliary>
        )
    }
}

export default connect()(EditModule);

