import React from 'react';
import IntlMessages from "../../../../../util/IntlMessages";
import CardBox from "../../../../../components/CardBox/index";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import languageData from '../../../../../components/LanguageSwitcher/data';
import MenuItem from '@material-ui/core/MenuItem';
import { getNameLanguage, getAppLanguage, initCalendar, alertSuccess, alertfailed } from '../../../../../actions/Setting';
import { TimePicker } from '@material-ui/pickers';
import { classService } from "../../../../../_services/class.service";
import { connect } from "react-redux";


class AddOption extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedStartTime: new Date(),
            selectedEndTime: new Date(),
            startTime: '',
            endTime:'',
            appLang_id:''
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    handleStartTimeChange = (time) => {
        this.setState({ selectedStartTime: time , startTime: time.format('LT')});
    };

    handleEndTimeChange = (time) => {
        this.setState({ selectedEndTime: time, endTime: time.format('LT') });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let apiEndpoint = `/settings/initLanguageAndTimeCalendar?access_token=${localStorage.token}`;
       let data ={
        "app_lang" : this.state.appLang_id,
        "start_time_calendar": this.state.startTime,
        "end_time_calendar": this.state.endTime,
        "establishment_id": this.props.establishment_id

        }
        classService.post(apiEndpoint, data)
            .then(response => {
                if(response){
                    this.props.dispatch(getAppLanguage(this.state.appLang_id));
                    this.props.dispatch(initCalendar(this.state.startTime, this.state.endTime))
                    this.handleCancel()
                    this.props.dispatch(alertSuccess())
                }else{
                    this.props.dispatch(alertfailed())
                }
             
                })
            
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleCancel() {
        this.setState({
            selectedStartTime: new Date(),
            selectedEndTime: new Date(),
            startTime: '',
            endTime:'',
            appLang_id:''
        })
    };
    render() {
        const { selectedEndTime ,selectedStartTime } = this.state;
        return (

            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <CardBox
                    heading={<IntlMessages id="component.etablishments.info.general" />} styleName="col-lg-12 text-primary">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <TextField
                                    required
                                    name='appLang_id'
                                    id="appLang_id"
                                    select
                                    label={<IntlMessages id="list.of.languages" />}
                                    value={this.state.appLang_id}
                                     onChange={this.handleChange('appLang_id')}

                                    fullWidth
                                    SelectProps={{}}
                                    margin="normal"
                                >

                                    {languageData.map((lang, index) =>
                                        <MenuItem key={index} value={lang.languageId}>
                                            {getNameLanguage(lang.languageId)}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </div>
                        </div>

                    </div><div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <div key="datetime_default" className="picker">

                                    <TimePicker
                                        label={<IntlMessages id="start.hour.calendar" />}
                                        fullWidth
                                        value={selectedStartTime}
                                        showTabs={false}
                                        onChange={this.handleStartTimeChange}
                                        leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                        rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                    />
                                </div>
                            </div></div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div key="datetime_default" className="picker">

                                    <TimePicker
                                        label={<IntlMessages id="end.hour.calendar" />}
                                        fullWidth
                                        value={selectedEndTime}
                                        showTabs={false}
                                        onChange={this.handleEndTimeChange}
                                        leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                        rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                    />
                                </div>

                            </div></div>
                            <div className="col-md-12 text-left ">
                        <br /><br />
                        <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" >{<IntlMessages id="components.establishments.formadd.buttonAdd" />}</Button>
                        <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleCancel}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
                    </div>
                    </div>
                   
                </CardBox>
            </form>


        );
    }
}
const mapStateToProps = state => {
    return {
      userProfile: state.auth.userProfile,
    };
  };

export default connect(mapStateToProps) (AddOption);