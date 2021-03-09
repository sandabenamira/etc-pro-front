import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntlMessages from '../../../../../util/IntlMessages';
import Widget from "../../../../../components/Widget/index";
import PropertiesItemPayment from "./PropertiesItemPayment";
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import { DatePicker } from '@material-ui/pickers';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardBox from '../../../../../components/CardBox/index';
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { getPayments, clearListPayments } from '../../../../../actions/PaymentAction';
import EditPayment from './EditPayment';

let currentDate = new Date()
export class PaymentFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'Non payé',
            establishment: '',
            listClasses: [],
            classId: '',
            selectedDate: moment(),
            monthselected: '',
            edit: false,
        }
        this.handleChangeEstablishment = this.handleChangeEstablishment.bind(this);
        this.handleChangeClass = this.handleChangeClass.bind(this);
        this.editPayment = this.editPayment.bind(this);
        this.cancelModal = this.cancelModal.bind(this);

    };

    componentDidUpdate(prevProps) {
        if (prevProps.classes !== this.props.classes) {
            let activeClass = this.props.classes.filter( classInfo => classInfo.status)
            this.setState({
                listClasses: activeClass,
                monthselected: moment(currentDate)._d.getMonth() + 1
            })
        }
    }

    toggle = (tab) => {
        this.setState({ activeTab: tab });
        this.props.dispatch(getPayments(this.state.classId, tab, this.state.monthselected))
    }

    editPayment(data) { this.setState({ edit: true, paymentItem: data }) };

    cancelModal() { this.setState({ edit: false }) };

    handleDateChange = (date) => {
        this.setState({ monthselected: date._d.getMonth() + 1, selectedDate: date });
        this.props.dispatch(getPayments(this.state.classId, this.state.activeTab, date._d.getMonth() + 1))
    };

    render() {   /* eslint eqeqeq: "off" */
        const { selectedDate } = this.state;
        return (
            <CardBox styleName="col-12" >
                <RoleContext.Consumer>
                    {({ role }) => (
                        <Can
                            role={role}
                            perform="payment-filter:visit"
                            yes={() => (
                                <Widget>
                                    {this.state.edit ?
                                        <EditPayment paymentItem={this.state.paymentItem}
                                            profileId={this.props.userProfile.id}
                                            cancelModal={this.cancelModal}
                                        /> : ''}
                                    <div className="row">
                                        <Can
                                            role={role}
                                            perform="payment-filter-establishment:visit"
                                            yes={() => (
                                                <div className="col-lg-2 col-sm-6 col-12">
                                                    <FormControl className="w-100 mb-2">
                                                        <InputLabel htmlFor="age-simple">{<IntlMessages id="components.student.formadd.establishment" />}</InputLabel>
                                                        <Select
                                                            value={this.state.establishment}
                                                            onChange={this.handleChangeEstablishment('establishment')}
                                                        >
                                                            {this.props.establishments.map(establishment => (
                                                                <MenuItem key={establishment.id} value={establishment.id}>
                                                                    {establishment.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            )}
                                        />
                                        <Can
                                            role={role}
                                            perform="payment-filter-class:visit"
                                            yes={() => (
                                                <div className="col-lg-2 col-sm-6 col-12">
                                                    <FormControl className="w-100 mb-2">
                                                        <InputLabel htmlFor="age-simple">{<IntlMessages id="components.note.class" />}</InputLabel>
                                                        <Select
                                                            value={this.state.classId}
                                                            onChange={this.handleChangeClass('classId')}
                                                        >
                                                            {this.state.listClasses.map(classe => (
                                                                <MenuItem key={classe.id} value={classe.id}>
                                                                    {classe.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            )}
                                        />
                                        <Can
                                            role={role}
                                            perform="payment-filter-group:visit"
                                            yes={() => (
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <Nav className="jr-tabs-pills-ctr" pills>
                                                        <NavItem>
                                                            <NavLink
                                                                className={classnames({ active: this.state.activeTab === "tous" })}
                                                                onClick={() => { this.toggle("tous") }} >{<IntlMessages id="userStuppDisplay.all" />}
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={classnames({ active: this.state.activeTab === "Non payé" })}
                                                                onClick={() => { this.toggle("Non payé") }} > {<IntlMessages id="filter.unpaid.service" />}
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={classnames({ active: this.state.activeTab === "Payé" })}
                                                                onClick={() => { this.toggle("Payé") }} >{<IntlMessages id="filter.paid.service" />}
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </div>
                                            )}
                                        />
                                        <Can
                                            role={role}
                                            perform="payment-filter-picker:visit"
                                            yes={() => (
                                                <div className=" jr-featured-content-left">
                                                    <div className="form-group picker" key="basic_day">
                                                        <DatePicker
                                                            label={<IntlMessages id="filter.month.service" />}
                                                            fullWidth
                                                            value={selectedDate}
                                                            onChange={this.handleDateChange}
                                                            animateYearScrolling={false}
                                                            leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                                            rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="jr-news-action jr-tabs-classic jr-tabs-classic-no-border">
                                        <TabContent className="jr-tabs-content" activeTab={this.state.activeTab}>
                                            <TabPane tabId={this.state.activeTab}>
                                                {this.props.listPayments.map((data, index) =>
                                                    <PropertiesItemPayment key={index} data={data} editPayment={this.editPayment} establishment={this.state.estab_name} />
                                                )}
                                            </TabPane>
                                        </TabContent>
                                    </div>

                                </Widget>
                            )}
                        />
                    )}

                </RoleContext.Consumer>

            </CardBox>
        )
    }


    handleChangeEstablishment = name => event => {
        let listClasses = this.props.classes.filter(element => element.establishment_id === event.target.value)
        this.setState({
            [name]: event.target.value,
            listClasses
        })
        this.props.dispatch(clearListPayments())
    };

    handleChangeClass = name => event => {
        this.setState({ [name]: event.target.value });
        this.props.dispatch(getPayments(event.target.value, this.state.activeTab, this.state.monthselected))  
    };
}

const mapStateToProps = (state) => {
    return {
        listPayments: state.payment.listPayments,
        userProfile: state.auth.userProfile
    }
}


export default connect(mapStateToProps)(PaymentFilter)
