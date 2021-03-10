import React from "react";
import IntlMessages from '../../../../../util/IntlMessages';
import ContainerHeader from '../../../../../components/ContainerHeader/index';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddSchoolYearEtab from './AddSchoolYearEtab';
import { connect } from 'react-redux';
import { getEstablishment } from '../../../../../actions/establishmentAction';
import { getSchoolYearEtabs } from '../../../../../actions/SchoolYearEtabAction';
import axios from 'axios';
import baseUrl from '../../../../../config/config';
import { UncontrolledAlert } from 'reactstrap';
import SchoolYearEtabList from './SchoolYearEtabList';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
 

class SchoolYearEtab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addSchoolYearModal: false,
            schoolYearsList: [],
            school_year_id: '',
            schoolYearEtabsFilredList: []
        };
        this.addSchoolYear = this.addSchoolYear.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.handleChange = this.handleChange.bind(this);



    }
    componentDidMount() {
        this.props.dispatch(getEstablishment());
        this.props.dispatch(getSchoolYearEtabs());

        axios
            .get(`${baseUrl.baseUrl}/school_years?access_token=${localStorage.token}`)
            .then(res => {
                this.setState({ schoolYearsList: res.data });
            });
    }
    addSchoolYear() {
        this.setState({ addSchoolYearModal: true });
    }
    handleCancelModal() {
        this.setState({ addSchoolYearModal: false });

    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        let schoolYearEtabsFilredLists = this.props.schoolYearEtabs.filter(
            (element) => element.school_year_id === event.target.value
        );
        this.setState({ schoolYearEtabsFilredList: schoolYearEtabsFilredLists });
    };
    render() {   /* eslint eqeqeq: "off" */
        var schoolYearEtabsFilred = [];
        if ((typeof this.state.school_year_id === 'string')) {
            schoolYearEtabsFilred = this.props.schoolYearEtabs;
        } else {
            schoolYearEtabsFilred = this.state.schoolYearEtabsFilredList
        }



        return (
            <div>
                <ContainerHeader
                    match={this.props.match}
                    title={<IntlMessages id="sidebar.components.schoolYears" />}
                />

                {this.props.successStatus ? (
                    <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
                        <span className="icon-addon alert-addon">
                            <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                        </span>
                        <span className="d-inline-block"> {this.props.message} </span>
                    </UncontrolledAlert>
                ) : (
                        ''
                    )}
                {this.props.errorStatus ? (
                    <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                        <span className="icon-addon alert-addon">
                            <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                        </span>
                        <span className="d-inline-block"> {this.props.message} </span>
                    </UncontrolledAlert>
                ) : (
                        ''
                    )}
                <div className="col-md-12 text-left d-flex justify-content-between">
                    <div className="col-md-4 text-left">
                        <TextField
                            className="mt-0"
                            variant="outlined"
                            required
                            name="school_year_id"
                            id="school_year_id"
                            select
                            label={<IntlMessages id="sidebar.components.schoolYears" />}
                            value={this.state.school_year_id}
                            onChange={this.handleChange('school_year_id')}
                            SelectProps={{}}
                            margin="normal"
                            fullWidth >
                            <MenuItem key="0" value="0">
                                <IntlMessages id="all.years" />
                            </MenuItem>
                            {this.state.schoolYearsList.map(year => (
                                <MenuItem key={year.id} value={year.id}>
                                    {year.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-2 text-right " >
                        <Fab
                            size="small"
                            color="primary"
                            aria-label="Add"
                            onClick={this.addSchoolYear}
                        >
                            <AddIcon />
                        </Fab>
                    </div>

                </div>
                <SchoolYearEtabList
                    schoolYearEtabs={schoolYearEtabsFilred}
                    establishmentsList={this.props.establishments}
                    schoolYearsList={this.state.schoolYearsList}
                    settings={this.props.settings}



                />
                {
                    this.state.addSchoolYearModal ? (
                        <AddSchoolYearEtab
                            cancelModal={this.handleCancelModal}
                            establishments={this.props.establishments}
                            schoolYearsList={this.state.schoolYearsList}
                            schoolYearEtabs={this.props.schoolYearEtabs}
                            settings={this.props.settings}

                        />
                    ) : (
                            ''
                        )
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        establishments: state.establishment.remoteEstablishments,
        successStatus: state.alert.success,
        errorStatus: state.alert.error,
        message: state.alert.message,
        schoolYearEtabs: state.schoolYearEtab.remoteSchoolYearEtab,
        settings: state.settings.locale.languageId,


    };
};

export default connect(mapStateToProps)(SchoolYearEtab);


