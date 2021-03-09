import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import moment from 'moment';
import {
  frequencyMonthly,
  frequencyQuarterly,
  frequencyAnnually,
} from '../../../../../../config/config';
import { UncontrolledAlert } from 'reactstrap';

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const monthNames = [
  'Jan.',
  'Fev.',
  'Mar.',
  'Avr.',
  'Mai.',
  'Jui.',
  'Jul.',
  'Aou.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
];
class EditAllocationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      SelectedMonthList: [],
      monthList: [],
      alerteMonth: false,
    };
    this.SelectedMonth = this.SelectedMonth.bind(this);
  }
  handleChange = (monthId, monthValue) => (event) => {
    var tab = this.state.SelectedMonthList;

    if (new Date() - new Date(monthValue) > 0) {
      this.setState({
        alerteMonth: true,
      });
      setTimeout(() => {
        this.setState({
          alerteMonth: false,
        });
      }, 1500);
    } else {
      var index = tab.findIndex((element) => element===parseInt(monthId, 10));
      if (index===-1) {
        tab.push(parseInt(monthId, 10));
        this.setState({
          SelectedMonthList: tab,
        });
      } else {
        tab.splice(index, 1);
        this.setState({
          SelectedMonthList: tab,
        });
      }
     }
  };

  SelectedMonth = (monthId) => {
    var tab = this.state.SelectedMonthList;
    let checked = false;
    var test = tab.findIndex((element) => element===parseInt(monthId, 10));

    if (this.props.item.allocation_month.length !== 0) {
      if (test===-1) {
        checked = false;
      } else {
        checked = true;
      }
    }

    return checked;
  };
 
  componentDidMount() {
    let element = this.props.item;
    var dateStart = moment(element.service_v2.start_date_service);
    var dateEnd = moment(element.service_v2.end_date_service);
    var monthList = [];
    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
      var month = new Date(dateStart.format('YYYY-MM-01'));
      monthList.push({
        idMonth: parseInt(dateStart.format('MM'), 10),
        label: monthNames[month.getMonth()],
        value: dateStart.format('YYYY-MM-01'),
      });

      dateStart.add(1, 'month');
    }
    const SelectedMonthList = this.props.item.allocation_month;
    this.setState({
      monthList: monthList,
      SelectedMonthList,
    });
  }
 

  render() {   /* eslint eqeqeq: "off" */
    const { value, monthList } = this.state;
    let element = this.props.item;

    return (
      <>
        {this.state.alerteMonth ? (
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> Mois non modifiable </span>
            </UncontrolledAlert>
          </div>
        ) : (
          ''
        )}
        <div className="w-100 d-flex align-items-center justify-content-center ">
          <AppBar
            color="inherit"
            position="static"
            style={{
              borderRadius: '80px',
              border: '0.5px solid #abada8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              width: '92%',
            }}
          >
            <div value={value} onChange={this.handleChange} className="">
              <Tab
                disabled
                icon={
                  <div className="d-flex align-items-center justify-content-start ">
                    <i
                      className="p-1 icon-btn zmdi zmdi-check-circle zmdi-hc-1x "
                      style={{ color: '#4a3ea3' }}
                    ></i>{' '}
                    <i
                      className={`${element.service_v2.path_img_service} pl-2 pr-2`}
                      style={{ color: 'blue' }}
                    ></i>
                    <h5 className=" pt-3" style={{ fontWeight: 'bold', color: '#4a3ea3' }}>
                      {element.service_v2.name_fr_service}
                    </h5>
                    <div className="d-flex pl-2 align-items-center pt-2">
                      <h1>|</h1>
                    </div>
                  </div>
                }
              />

              <Tab
                icon={
                  <div className="d-flex align-items-center justify-content-start ">
                    <i className="p-1 icon-btn zmdi  zmdi-check-circle zmdi-hc-1x "></i>{' '}
                    <h5 className=" pt-3 pl-2" style={{ fontWeight: 'bold' }}>
                      {this.props.item.service_v2.fk_id_frequency === frequencyMonthly
                        ? 'Mensuel'
                        : this.props.item.service_v2.fk_id_frequency === frequencyQuarterly
                        ? 'Trimestrielle'
                        : this.props.item.service_v2.fk_id_frequency === frequencyAnnually
                        ? 'Annuelle'
                        : 'Autre Choix'}
                    </h5>
                  </div>
                }
              />
              <Tab
                disabled
                style={{
                  width: '50px',
                  marginRight: '20px',
                }}
                icon={
                  <div className="d-flex  align-items-center justify-content-start ">
                    <i className="p-1 icon-btn  zmdi zmdi-shopping-basket zmdi-hc-2x "></i>{' '}
                    <h5 className=" pt-3 pl-2" style={{ fontWeight: 'bold' }}>
                      {element.service_v2.price_service}
                    </h5>
                  </div>
                }
              />
            </div>

            {this.props.item.service_v2.fk_id_frequency === 4 ||
            this.props.item.service_v2.fk_id_frequency === 5 ? (
              <div
                style={{}}
                className="col-lg-10 col-md-10  d-flex justify-content-end align-items-center "
              >
                <div
                  className="col-lg-8 col-md-8 d-flex flex-row justify-content-end align-items-center "
                  style={{
                    borderTop: '2px solid black',
                  }}
                >
                  {monthList.map((month) => {
                    return (
                      <h6
                        key={month.idMonth}
                        id={month.idMonth}
                        name={month.idMonth}
                        onClick={this.handleChange(month.idMonth, month.value)}
                        className={
                          this.SelectedMonth(month.idMonth) === false
                            ? 'pt-3 pl-3 text-center text-secondary'
                            : 'pt-3 pl-3 text-center text-primary'
                        }
                        style={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        {month.label}
                      </h6>
                    );
                  })}
                </div>
              </div>
            ) : (
              ''
            )}
          </AppBar>
        </div>
      </>
    );
  }
}

export default EditAllocationItem;
