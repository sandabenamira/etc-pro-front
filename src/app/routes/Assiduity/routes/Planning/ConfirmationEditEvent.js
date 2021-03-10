import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../../util/IntlMessages';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

export class ConfirmationEditEvent extends Component {
  render() {
    /* eslint eqeqeq: "off" */
    return (
      <Dialog open={this.props.modal} TransitionComponent={Slide}>
        <DialogContent>
          <DialogContentText>
            <h1> {<IntlMessages id="event.modal.confirmation.title" />}</h1>

            <div className="col-sm-12">
              <RadioGroup
                column
                aria-label="eventChecked"
                name="eventChecked"
                value={this.props.eventChecked}
                onChange={this.props.handleChangeEvent('eventChecked')}
              >
                <FormControlLabel value="all" control={<Radio color="primary" required />} label={'Tous les évènement'} />
                <FormControlLabel
                  value="uniq"
                  defaultChecked
                  control={<Radio color="primary" required />}
                  label={<IntlMessages id="edit.this.event" />}
                />
                <FormControlLabel
                  value="future"
                  control={<Radio color="primary" required />}
                  label={<IntlMessages id="edit.event.and.all.subsequent" />}
                />
              </RadioGroup>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={this.props.handleCancelEditEvent}>
            {<IntlMessages id="components.classes.formadd.buttonCancel" />}
          </Button>
          <Button onClick={this.props.handleSubmit} color="primary">
            {<IntlMessages id="button.ok" />}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmationEditEvent;
