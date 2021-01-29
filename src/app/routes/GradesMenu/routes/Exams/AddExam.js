import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import CardBox from '../../../../../components/CardBox';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addExam } from '../../../../../actions/examAction';

const typeExam = [
  {
    value: 'DS',
    label: <IntlMessages id="Components.bulletin.test" />,
  },
  {
    value: 'Examen',
    label: <IntlMessages id="components.note.exam" />,
  },
  {
    value: 'Travaux Pratique',
    label: <IntlMessages id="Components.bulletin.practical.work" />,
  },
];
const periodExam = [
  {
    value: '1er Trimestre',
    label: <IntlMessages id="first.trimester" />,
  },
  {
    value: '2eme Trimestre',
    label: <IntlMessages id="second.trimester" />,
  },
  {
    value: '3eme Trimestre',
    label: <IntlMessages id="third.trimester" />,
  },
  {
    value: 'Session Controle',
    label: <IntlMessages id="controlSession" />,
  },
];

class AddExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      period: '',
      coefficient: 1,
      establishment_id: 0,
      subject_id: 0,
      classe_id: 0,
      subjectListFiltered: [],
      classListFiltered: [],
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const type = this.state.type;
    const period = this.state.period;
    const subject_id = this.state.subject_id;
    const coefficient = this.state.coefficient;
    const establishment_id = this.state.establishment_id;
    const class_id = this.state.classe_id;

    const data = {
      type,
      period,
      subject_id,
      coefficient,
      class_id,
      establishment_id,
    };

    this.props.dispatch(addExam(data));
    this.setState({
      type: '',
      period: '',
      subject_id: 0,
      coefficient: 1,
      classe_id: 0,
      establishment_id: 0,
    });
  };

  handleCancel() {
    this.setState({
      type: '',
      period: '',
      subject_id: 0,
      coefficient: 1,
      classe_id: 0,
      establishment_id: 0,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    if (name == 'establishment_id') {
      const listClassReturned = this.props.listClasses.filter(
        (classe) => event.target.value == classe.establishment_id
      );
      const listSubReturned = this.props.listSubject.filter(
        (subject) => event.target.value == subject.id_establishment
      );

      this.setState({
        classListFiltered: listClassReturned,
        subjectListFiltered: listSubReturned,
      });
    }
  };

  render() {
    const listEstablishment = this.props.listEstablishment;
    const listSubject = this.props.listSubject;
    return (
      <div className="app-wrapper">
        <CardBox styleName="col-lg-12">
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
                fullWidth
              >
                {this.props.listEstablishment.map((establishment) => (
                  <MenuItem key={establishment.id} value={establishment.id}>
                    {establishment.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-sm-6">
              <TextField
                required
                id="classe"
                select
                label={<IntlMessages id="components.exam.form.class" />}
                value={this.state.classe_id}
                onChange={this.handleChange('classe_id')}
                SelectProps={{}}
                margin="normal"
                fullWidth
              >
                {this.state.classListFiltered.map((classe) => (
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
                fullWidth
              >
                {this.state.subjectListFiltered.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-sm-6">
              <TextField
                required
                name="type"
                id="type"
                select
                label={<IntlMessages id="components.exam.form.type" />}
                onChange={this.handleChange('type')}
                value={this.state.type}
                SelectProps={{}}
                fullWidth
                margin="normal"
              >
                {typeExam.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-sm-6">
              <TextField
                required
                name="period"
                id="period"
                select
                label={<IntlMessages id="components.exam.form.period" />}
                onChange={this.handleChange('period')}
                value={this.state.period}
                SelectProps={{}}
                fullWidth
                margin="normal"
              >
                {periodExam.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-sm-6">
              <TextField
                required
                error={this.state.coefficient < 1}
                name="coefficient"
                variant="outlined"
                type="number"
                id="coefficient"
                min={0}
                max={20}
                label={<IntlMessages id="components.exam.form.coefficient" />}
                onChange={this.handleChange('coefficient')}
                value={this.state.coefficient}
                margin="normal"
                fullWidth
              />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="col-sm-12">
              <h4>
                <font color="red">*</font>{' '}
                {<IntlMessages id="component.required_fields" />}
              </h4>
            </div>
            <div className="col-md-12 text-left ">
              <br />
              <br />
              <Button
                variant="contained"
                className="jr-btn bg-indigo text-white "
                type="submit"
              >
                {
                  <IntlMessages id="components.establishments.formadd.buttonAdd" />
                }
              </Button>
              <Button
                variant="contained"
                className="jr-btn bg-grey text-white "
                onClick={this.handleCancel}
              >
                {
                  <IntlMessages id="components.establishments.formadd.buttonCancel" />
                }
              </Button>
            </div>
          </form>
        </CardBox>
      </div>
    );
  }
}

export default connect()(AddExam);
