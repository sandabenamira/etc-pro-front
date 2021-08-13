import React from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class DateRangeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.dateFrequency = this.dateFrequency.bind(this);
  }


  dateFrequency(startDate, endDate) {
    console.log('dateFrequencydateFrequencydateFrequency');
    this.setState({ startDate: startDate, endDate: endDate });
    if (startDate !== null && endDate !== null) {
      console.log('ttttt', startDate._d, endDate._d);
      this.props.setDate(startDate, endDate, this.props.index);
    }
  }

  render() {
    console.log('this.props.dateSession', this.props.dateSession);
    return (
      <div className="col-md-12">
        <DateRangePicker
          required={true}
          isOutsideRange={() => false}
          startDate={this.props.dateSession.start} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.props.dateSession.end} // momentPropTypes.momentObj or null,
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
