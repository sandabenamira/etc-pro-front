import React from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class DateRangeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
    };
    this.dateFrequency = this.dateFrequency.bind(this);
  }
  componentWillMount() {
    this.setState({
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    });
  }

  dateFrequency(startDate, endDate) {
    this.setState({ startDate: startDate, endDate: endDate });
    if (startDate !== null && endDate !== null) {
    //   this.props.setDate(startDate._d, endDate._d);
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <DateRangePicker
          required={true}
          isOutsideRange={() => false}
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.dateFrequency(startDate, endDate)
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          showDefaultInputIcon
          inputIconPosition="after"
          startDatePlaceholderText="Début"
          endDatePlaceholderText="Fin"
          minimumNights={this.props.minimumNights}
        />
      </div>
    );
  }
}

export default DateRangeComponent;
