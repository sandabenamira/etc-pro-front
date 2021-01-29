
import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import CardBox from '../../../../../components/CardBox/index';
import Button from '@material-ui/core/Button';
import * as ModuleAction from '../../../../../actions/ModuleAction';
import { connect } from "react-redux";

class AddModule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleCancel() {
        this.setState({
            name: '',
            description: ''
        });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name;
        const description = this.state.description;
        const status = true
        const data = { name, description, status }
        this.props.dispatch(ModuleAction.addModule(data));
        this.setState({
            name: '',
            description: ''
        });
    }

    render() {
        return (
            <div className="app-wrapper">
                <CardBox styleName="col-lg-12" >
                    <form className="row" autoComplete="off" onSubmit={this.handleSubmit}>
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
                        <div className="col-md-12 text-right ">
                            <br /><br />
                            <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" >{<IntlMessages id="components.establishments.formadd.buttonAdd" />}</Button>
                            <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleCancel}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
                        </div>
                    </form>

                </CardBox>

            </div>
        )
    };
};

export default connect()(AddModule);