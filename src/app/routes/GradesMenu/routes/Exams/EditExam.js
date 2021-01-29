
import React from 'react';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from "../../../../../util/Auxiliary";
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import { editExam } from "../../../../../actions/examAction";

const typeExam = [
    {
        value: 'DS',
        label: 'DS',
    },
    {
        value: 'Examen',
        label: 'Examen',
    },
    {
        value: 'Travaux Pratique',
        label: 'Travaux Pratique',
    }
];
const periodExam = [
    {
        value: '1er Trimestre',
        label: '1er Trimestre',
    },
    {
        value: '2eme Trimestre',
        label: '2eme Trimestre',
    },
    {
        value: '3eme Trimestre',
        label: '3eme Trimestre',
    },
    {
        value: 'Session Controle',
        label: 'Session Controle',
    }
];

class EditExam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: true,
            type: '',
            period: '',
            coefficient: '',
            establishment_id: 0,
            subject_id: 0,
            classe_id: 0,
            status: '',
            id: 0,
            subjectListFiltered: [],
            classListFiltered: []
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        this.setState({
            type: this.props.ExamItem.type,
            period: this.props.ExamItem.period,
            subject_id: this.props.ExamItem.subject_id,
            establishment_id: this.props.ExamItem.establishment_id,
            classe_id: this.props.ExamItem.class_id,
            coefficient: this.props.ExamItem.coefficient,
            id: this.props.ExamItem.id,
            subjectListFiltered: this.props.listSubject.filter(subject => (this.props.ExamItem.establishment_id == subject.id_establishment)) ,
            classListFiltered: this.props.listClasses.filter(classe => (this.props.ExamItem.establishment_id == classe.establishment_id))
        })
    };

    handleCancel() {
        this.props.cancelModal();
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        if (name == 'establishment_id') {
            const listClassReturned = this.props.listClasses.filter(classe => (event.target.value == classe.establishment_id));
            const listSubReturned = this.props.listSubject.filter(subject => (event.target.value == subject.id_establishment));

            this.setState({ classListFiltered: listClassReturned, subjectListFiltered: listSubReturned });
        }
    };

    handleToggle() {
        this.props.cancelModal();
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const type = this.state.type;
        const period = this.state.period;
        const subject_id = this.state.subject_id;
        const establishment_id = this.state.establishment_id;
        const class_id = this.state.classe_id;
        const coefficient = this.state.coefficient;
        const id = this.state.id;

        const data = { id, type, period, subject_id, coefficient , class_id, establishment_id};

        this.props.dispatch(editExam(data));
        this.props.cancelModal();
    };

    render() {
        const listEstablishment = this.props.listEstablishment;

        return (
            <Auxiliary>
                <Modal isOpen={this.state.previewVisible} toggle={this.handleToggle.bind(this)}>
                    <ModalHeader className="modal-box-header bg-primary text-white" >
                        {<IntlMessages id="modal.modif.room" />}
                    </ModalHeader>
                    <ModalBody>
                        <form className="row" onSubmit={this.handleSubmit}>
                            <div className="col-sm-6">
                                <TextField
                                    required
                                    id="establishment"
                                    select
                                    label={<IntlMessages id="components.exam.form.establishment" />}
                                    value={this.state.establishment_id}
                                    onChange={this.handleChange('establishment_id')}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth >
                                    {listEstablishment.map(establishment => (
                                        <MenuItem key={establishment.id} value={establishment.id}>
                                            {establishment.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    required
                                    id="classe_id"
                                    select
                                    label={<IntlMessages id="components.exam.form.class" />}
                                    value={this.state.classe_id}
                                    onChange={this.handleChange('classe_id')}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth >
                                    {this.state.classListFiltered.map(classe => (
                                        <MenuItem key={classe.id} value={classe.id}>
                                            {classe.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    required
                                    id="subject"
                                    select
                                    label={<IntlMessages id="components.exam.form.subject" />}
                                    value={this.state.subject_id}
                                    onChange={this.handleChange('subject_id')}
                                    SelectProps={{}}
                                    margin="normal"
                                    fullWidth >
                                    {this.state.subjectListFiltered.map(subject => (
                                        <MenuItem key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    required
                                    name='type'
                                    id="type"
                                    select
                                    label={<IntlMessages id="components.exam.form.type" />}
                                    onChange={this.handleChange('type')}
                                    value={this.state.type}
                                    SelectProps={{}}
                                    fullWidth
                                    margin="normal" >
                                    {typeExam.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    required
                                    name='period'
                                    id="period"
                                    select
                                    label={<IntlMessages id="components.exam.form.period" />}
                                    onChange={this.handleChange('period')}
                                    value={this.state.period}
                                    SelectProps={{}}
                                    fullWidth
                                    margin="normal" >
                                    {periodExam.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    required
                                    name='coefficient'
                                    type='number'
                                    id="coefficient"
                                    label={<IntlMessages id="components.exam.form.coefficient" />}
                                    onChange={this.handleChange('coefficient')}
                                    value={this.state.coefficient}
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

export default connect()(EditExam);

