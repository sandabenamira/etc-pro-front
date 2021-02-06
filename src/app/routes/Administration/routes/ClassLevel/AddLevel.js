
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IntlMessages from '../../../../../util/IntlMessages';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";



class ClassLevel extends React.Component {
    constructor() {
        super();
        this.state = {
            previewVisible: true,
            activeStep: 0,
            category: '',
            niveau: '',
            section: '',
            CategoryList: [{ name: "Primaire", id: 1, }, { name: "Collège", id: 2, }, { name: "Secondaire", id: 3, }],
            LevelList: [{ name: "Premiére", id: 1, }, { name: "Deuxiemme", id: 2, }, { name: "Troisiéme", id: 3, }, { name: "Quatérieme", id: 4, }, { name: "Cinquième", id: 5, }, { name: "Sixiemme", id: 6, }],
            SectionList: [{ name: "Science", id: 1, }, { name: "Math", id: 2, }, { name: "Technique", id: 3, }, { name: "Informatique", id: 4, }, { name: "Lettre", id: 5, }, { name: "Sport", id: 6, }],
            SchoolLevel: [{ name: "Septiéme", id: 1, }, { name: "Huitième", id: 2, }, { name: "Neuvième", id: 3, }],
            HightSchool: [{ name: "Premiére", id: 1, }, { name: "Deuxiemme", id: 2, }, { name: "Troisiéme", id: 3, }, { name: "Quatérieme", id: 4, }],
            steps: [<IntlMessages id="components.establishments.formadd.Categories" />, <IntlMessages id="components.note.niveau" />, <IntlMessages id="components.class.level.input.label.section" />]




        }
        this.handleChange = this.handleChange.bind(this)
        this.getStepContent = this.getStepContent.bind(this)
        this.update = this.update.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)






    }
    componentDidMount() {

    }
    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
    update(element) {
        let active = this.state.activeStep;
        let level = [];
        let activeStep = getSteps().length

        switch (active) {
            case 0:

                if (element == 'Primaire') {

                    return this.state.LevelList;

                } else if (element === 'Collège') {

                    return level = this.state.SchoolLevel



                } else if (element === 'Secondaire') {
                    return level = this.state.HightSchool


                }
                break;

            case 1:
                if (element === 'Primaire') {
                    return level = this.state.LevelList



                } else {
                    if (this.state.niveau === 'Troisiéme') {
                        return level = this.state.SchoolLevel


                    } else {
                        return level = this.state.HightSchool


                    }

                }
                break;

            case 2:
                return level = this.state.HightSchool


                break;


            default:

        }


    }
    handleChange = name => event => {
        let level = this.update(event.target.value);
        let activeStep = this.state.activeStep;
        if (this.state.activeStep === 1 && this.state.category !== 'Secondaire') {
            activeStep = getSteps().length;

        }
        if (this.state.activeStep == 1) {
            if (event.target.value == 'Premiére' || event.target.value == 'Deuxiemme') {
                activeStep = getSteps().length;
            }
        }

        this.setState({
            [name]: event.target.value, LevelList: level, activeStep: activeStep
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            category: this.state.category,
            level: this.state.niveau,
            section: this.state.section,
            status: true
        }
        // this.props.dispatch(addLevel(data));
        this.setState({
            previewVisible: false,
            category: '',
            niveau: '',
            section: '',
        });
        this.props.cancelModal();
    }
    getStepContent(step) {
        switch (step) {
            case 0:
                return <div className="col-lg-3 col-sm-6 col-12">

                    <FormControl className="w-100 mb-2">
                        <InputLabel htmlFor="age-simple">{<IntlMessages id="components.establishments.formadd.Categories" />}</InputLabel>
                        <Select
                            value={this.state.category}
                            onChange={this.handleChange('category')}
                            input={<Input id="category" />}
                        >
                            {this.state.CategoryList.map(category => (
                                <MenuItem key={category.id} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div>;
            case 1:
                return <div className="col-lg-3 col-sm-6 col-12">

                    <FormControl className="w-100 mb-2">
                        <InputLabel htmlFor="age-simple">{<IntlMessages id="components.class.level.input.label.level" />}</InputLabel>
                        <Select
                            value={this.state.niveau}
                            onChange={this.handleChange('niveau')}
                            input={<Input id="niveau" />}
                        >
                            {this.state.LevelList.map(niveau => (
                                <MenuItem key={niveau.id} value={niveau.name}>
                                    {niveau.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div>;
            case 2:
                return <div className="col-lg-3 col-sm-6 col-12">

                    <FormControl className="w-100 mb-2">
                        <InputLabel htmlFor="age-simple">{<IntlMessages id="components.class.level.input.label.section" />}</InputLabel>
                        <Select
                            value={this.state.section}
                            onChange={this.handleChange('section')}
                            input={<Input id="section" />}
                        >
                            {this.state.SectionList.map(section => (
                                <MenuItem key={section.id} value={section.name}>
                                    {section.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div>;
            default:
                return 'Unknown step';
        }
    }
    handleToggle() {
        this.props.cancelModal();
    };

    render() {
        const steps = this.state.steps;
        const { activeStep } = this.state;
        return (
            <div className="app-wrapper">
                <Auxiliary>

                    <Modal isOpen={this.state.previewVisible} >
                        <ModalHeader toggle={this.handleToggle.bind(this)} className="modal-box-header bg-primary text-white" >{<IntlMessages id="sidebar.submenu.classlevel" />}</ModalHeader>
                        <ModalBody>
                            <form className="row" noValidate autoComplete="off" onSubmit={this.handleSubmit}>


                                <div className="w-100">

                                    <Stepper activeStep={activeStep} orientation="vertical">
                                        {steps.map((label, index) => {
                                            return (
                                                <Step key={label}>
                                                    <StepLabel>{label}</StepLabel>
                                                    <StepContent className="pb-3">
                                                        <Typography component={'span'} variant={'body2'}>
                                                            {this.getStepContent(index)}
                                                        </Typography>
                                                        <div className="mt-2">
                                                            <div>
                                                                <Button
                                                                    disabled={activeStep === 0}
                                                                    onClick={this.handleBack}
                                                                    className="jr-btn"
                                                                >

                                                                    {<IntlMessages id="components.class.level.button.back" />}
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={this.handleNext}
                                                                    className="jr-btn"
                                                                >
                                                                    {activeStep === steps.length - 1 ? <IntlMessages id="components.class.level.button.terminer" /> : <IntlMessages id="components.class.level.button.next" />}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </StepContent>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    {activeStep === steps.length && (
                                        <Paper square elevation={0} className="p-2">
                                            <Button onClick={this.handleReset} className="jr-btn">
                                            <IntlMessages id="button.reset" />
                        </Button>
                                            <Button variant="contained" color="primary" onClick={this.handleSubmit} className="jr-btn">
                                            <IntlMessages id="note.button.save" />
                        </Button>

                                        </Paper>
                                    )}
                                </div>
                            </form>

                        </ModalBody>
                    </Modal>
                </Auxiliary>
            </div>


        );
    }
}



export default connect()(ClassLevel);

function getSteps() {
    return [' Catégorie', 'Niveau', 'Filiére'];
}