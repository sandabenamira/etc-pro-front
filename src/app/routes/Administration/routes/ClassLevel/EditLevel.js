
import React from 'react';

import Button from '@material-ui/core/Button';

import Auxiliary from "util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import IntlMessages from '../../../../../util/IntlMessages';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';



class EditLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            activeStep: 0,
            id: this.props.id,
            category: this.props.levelItem.category,
            niveau: this.props.levelItem.level,
            section: this.props.levelItem.section,
            CategoryList: [{ name: "Primaire", id: 1, }, { name: "college", id: 2, }, { name: "secondaire", id: 3, }],
            LevelList: [{ name: "Primaire", id: 1, }, { name: "Deuxiemme", id: 2, }, { name: "Troisiéme", id: 3, }, { name: "Quatérieme", id: 4, }, { name: "Cinquième", id: 5, }, { name: "Sixiemme", id: 6, }],
            SectionList: [{ name: "Science", id: 1, }, { name: "Math", id: 2, }, { name: "Technique", id: 3, }, { name: "informatique", id: 4, }, { name: "Lettre", id: 5, }, { name: "Sport", id: 6, }],
            SchoolLevel: [{ name: "septiéme", id: 1, }, { name: "septième", id: 2, }, { name: "huitième", id: 3, }],
            HightSchool: [{ name: "Prmiére", id: 1, }, { name: "Deuxiemme", id: 2, }, { name: "Troisiéme", id: 3, }, { name: "Quatérieme", id: 4, }],
            steps: [' Catégorie', 'Niveau', 'Filiére']




        }
        this.handleChange = this.handleChange.bind(this)
        this.getStepContent = this.getStepContent.bind(this)
        this.update = this.update.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleToggle = this.handleToggle.bind(this)



    };
    componentDidMount(){
        this.setState({
            id : this.props.levelItem.id,
            name: this.props.levelItem.name,
            category: this.props.levelItem.category,
            niveau: this.props.levelItem.level,
            section: this.props.levelItem.section,


            




        })
    }
    handleCancel(e) {
        this.props.cancelModal()
    };



    handleToggle() {
        this.props.cancelModal();
    };

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

                } else if (element === 'college') {

                    return level = this.state.SchoolLevel



                } else if (element === 'secondaire') {
                    return level = this.state.HightSchool


                }
                break;

            case 1:
                if (this.state.category === 'Primaire') {
                    return level = this.state.LevelList



                } else {
                    if (this.state.niveau === 'Troisiéme') {
                        return level = this.state.SchoolLevel


                        // this.setState({
                        //     LevelList: SchoolLevel

                        // })
                    } else {
                        return level = this.state.HightSchool


                        // this.setState({
                        //     LevelList: HightSchool

                        // })

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
        if (this.state.activeStep === 1 && this.state.category !== 'secondaire') {
            activeStep = getSteps().length;

        }

        this.setState({
            [name]: event.target.value, LevelList: level, activeStep: activeStep
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            id: this.state.id,
            category: this.state.category,
            level: this.state.niveau,
            section: this.state.section,
        }
        this.props.dispatch(updateLevel(data));
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

    render() {


        const steps = this.state.steps;
        const { activeStep } = this.state;

        return (
            <Auxiliary>

                <Modal isOpen={this.props.modal}  >
                    <ModalHeader toggle={this.handleToggle.bind(this)}>{<IntlMessages id="pages.establishementPage" />}</ModalHeader>
                    <ModalBody>
                        <div className="app-wrapper">
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
                                                                    Back
                                            </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={this.handleNext}
                                                                    className="jr-btn"
                                                                >
                                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
                                            <Typography>All steps completed - you&quot;re finished</Typography>
                                            <Button onClick={this.handleReset} className="jr-btn">
                                                Reset
                                </Button>
                                            <Button onClick={this.handleSubmit} className="jr-btn">
                                                Enregistrer
                                </Button>
                                            <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleCancel}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>


                                        </Paper>
                                    )}
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>
            </Auxiliary>

        )
    }

}

export default connect()(EditLevel);

function getSteps() {
    return [' Catégorie', 'Niveau', 'Filiére'];
}