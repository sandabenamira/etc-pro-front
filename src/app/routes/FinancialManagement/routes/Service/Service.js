import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import CardBox from '../../../../../components/CardBox/index';
import AddService from './AddService';
import { getServiceV2 } from '../../../../../actions/ServiceAction';
import { connect } from 'react-redux';
import ServiceItem from './ServiceItem';
import { classService } from '../../../../../_services';
import ArchiveService from './ArchiveService';
import { UncontrolledAlert } from 'reactstrap';
import { addServiceV2 } from '../../../../../actions/ServiceAction';

const typeList = [
  {
    value: 'obligatoire',
    name: <IntlMessages id="service.mandatory" />,
  },
  {
    value: 'optionnel',
    name: <IntlMessages id="service.optional" />,
  },
];
class Service extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: undefined,
      menuState: false,
      openEdit: false,
      openDetails: false,
      currency: [],
      frequency: [],
      services: [],
      alerteFiltre: false,
      messageAlerte: '',

      mensuel: false,
      trimestriel: false,
      hebdomadaire: false,
      annuel: false,
      frequencyVal: '',
      daily: false,
      nameFrService: '',
      typeService: '',
      pathImgService: '',
      idCurrency: 0,
      vatService: '',
      otherVatService: '',
      comment: '',
      priceService: '',
      startDateService: '',
      endDateService: '',
      idFrequency: 0,
      minimumNights: 1,
      alerte: false,
      nameError: false,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCancelDetails = this.handleCancelDetails.bind(this);
    this.handleEditDetails = this.handleEditDetails.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handlePrice = this.handlePrice.bind(this);

    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIcon = this.handleIcon.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  setDate(startDate, endDate) {
    this.setState({ startDateService: startDate, endDateService: endDate });
  }

  handleIcon(nameIcon) {
    this.setState({ pathImgService: nameIcon });
  }
  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.pathImgService == '') {
      this.setState({ alerte: true });
      setTimeout(() => {
        this.setState({ alerte: false });
      }, 2000);
    } else {
      let dataPrestation = {
        name_fr_service: this.state.nameFrService,
        name_an_service: 'string',
        name_ar_service: 'string',
        comment: this.state.comment,
        path_img_service: this.state.pathImgService,
        price_service: parseInt(this.state.priceService),
        vat_service: parseInt(this.state.vatService),
        other_vat_service: this.state.otherVatService,
        start_date_service: this.state.startDateService,
        end_date_service: this.state.endDateService,
        type_service: this.state.typeService,
        status_service: true,
        fk_id_establishment: this.props.userProfile.establishment_id,
        fk_id_school_year: this.props.userProfile.school_year_id,
        fk_id_frequency: this.state.idFrequency,
        fk_id_currency: this.state.idCurrency,
      };
      this.props.dispatch(addServiceV2(dataPrestation));
      this.openAddModal();
      this.setState({
        vatService: '',
        otherVatService: '',
        comment: '',
        nameFrService: '',
        typeService: '',
        idCurrency: 0,
        priceService: '',
        idFrequency: 0,
        frequencyVal: '',
      });
    }
  }

  handleArchive(event) {
    event.preventDefault();
    if (this.state.pathImgService == '') {
      this.setState({ alerte: true });
      setTimeout(() => {
        this.setState({ alerte: false });
      }, 2000);
    } else {
      let dataPrestation = {
        name_fr_service: this.state.nameFrService,
        name_an_service: 'string',
        name_ar_service: 'string',
        comment: this.state.comment,
        path_img_service: this.state.pathImgService,
        price_service: parseInt(this.state.priceService),
        vat_service: parseInt(this.state.vatService),
        other_vat_service: this.state.otherVatService,
        start_date_service: this.state.startDateService,
        end_date_service: this.state.endDateService,
        type_service: this.state.typeService,
        status_service: false,
        fk_id_establishment: this.props.userProfile.establishment_id,
        fk_id_schol_year_v2: 3,
        fk_id_frequency: this.state.idFrequency,
        fk_id_currency: this.state.idCurrency,
      };
      this.props.dispatch(addServiceV2(dataPrestation, this.props.userProfile.establishment_id));
      this.openAddModal();
      this.setState({
        vatService: '',
        otherVatService: '',
        comment: '',
        nameFrService: '',
        typeService: '',
        idCurrency: 0,
        priceService: '',
      });
    }
  }

  handleChange = (name) => (event) => {
    if (name == 'nameFrService') {
      let nameError = false;
      nameError =
        this.props.services.filter(
          (element) => element.name_fr_service === event.target.value.trim()
        ).length > 0;

      this.setState({ [name]: event.target.value, nameError: nameError });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleChangeRadio = (name) => (event) => {
    let item = this.state.frequency.filter(
      (element) => element.name_fr_frequency === event.target.value
    );
    this.setState({
      idFrequency: item[0].id,
      frequencyVal: event.target.value,
    });

    if (item[0].id === 1) {
      this.setState({
        minimumNights: 1,
      });
    } else if (item[0].id === 2) {
      this.setState({
        minimumNights: 6,
      });
    } else if (item[0].id === 3) {
      this.setState({
        minimumNights: 60,
      });
    } else if (item[0].id === 4) {
      this.setState({
        minimumNights: 29,
      });
    } else if (item[0].id === 5) {
      this.setState({
        minimumNights: 90,
      });
    } else if (item[0].id === 6) {
      this.setState({
        minimumNights: 180,
      });
    } else if (item[0].id === 7) {
      this.setState({
        minimumNights: 360,
      });
    }
  };

  handleEditDetails() {
    this.setState({ open: false, openDetails: false });
    this.setState({ menuState: false, openEdit: true });
  }
  handleCancelDetails() {
    this.setState({ open: false, openDetails: false });
  }
  handleCancel() {
    this.setState({ open: false, openEdit: false });
  }
  onOptionMenuSelect = (event) => {
    this.setState({
      menuState: true,
      anchorEl: event.currentTarget,
      itemId: event.currentTarget.value,
    });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };
  handleEdit() {
    this.setState({ menuState: false, openEdit: true });
  }
  handleDetails() {
    this.setState({ menuState: false, openDetails: true });
  }
  handleRequestDelete(e) {
    e.preventDefault();
    this.setState({ menuState: false });
  }
  componentWillMount() {
    this.setState({ services: this.props.services });
    this.props.dispatch(
      getServiceV2(this.props.userProfile.establishment_id, this.props.userProfile.school_year_id)
    );
    let apiEndpoint = '';

    apiEndpoint = `/currency_v2?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((res) => {
      if (res) {
        this.setState({ currency: res.data });
      }
    });

    apiEndpoint = `/frequency_v2?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((res) => {
      if (res) {
        this.setState({ frequency: res.data });
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.services !== this.props.services) {
      this.setState({ services: this.props.services });
    }
    if (prevProps.userProfile.school_year_id !== this.props.userProfile.school_year_id) {
      this.props.dispatch(
        getServiceV2(this.props.userProfile.establishment_id, this.props.userProfile.school_year_id)
      );
    }
  }

  handlePrice() {
    const sortedServices = this.state.services.sort((a, b) => b.price_service - a.price_service);

    this.setState({
      services: sortedServices,
      alerteFiltre: true,
      messageAlerte: 'les prestations les plus chères sont affichées en premier lieu',
    });
    setTimeout(() => {
      this.setState({ alerteFiltre: false, messageAlerte: '' });
    }, 3000);
  }

  handleCategory() {
    const sortedServices = this.state.services.sort((a, b) =>
      a.type_service > b.type_service ? 1 : b.type_service > a.type_service ? -1 : 0
    );
    this.setState({
      services: sortedServices,
      alerteFiltre: true,
      messageAlerte: 'les prestations obligatoirs sont affichées en premier lieu',
    });
    setTimeout(() => {
      this.setState({ alerteFiltre: false, messageAlerte: '' });
    }, 3000);
  }

  handleDate() {
    let newListService = [];
    this.state.services.forEach((element) => {
      let item = {
        ...element,
        date: new Date(element.start_date_service),
      };
      newListService.push(item);
    });

    const sortedServices = newListService.slice().sort((a, b) => b.date - a.date);
    this.setState({
      services: sortedServices,
      alerteFiltre: true,
      messageAlerte: 'les prestations les plus récentes sont affichées en premier lieu',
    });
    setTimeout(() => {
      this.setState({ alerteFiltre: false, messageAlerte: '' });
    }, 3000);
  }

  render() {
    let { archives } = this.props;

    const { anchorEl, menuState, services } = this.state;

    return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: '5%',
          marginRight: '10%',
        }}
      >
        <div className="  d-flex flex-column mb-3">
          <div className="p-2 bd-highlight" style={{ marginLeft: '4%' }}>
            <h1>
              <b>
                <IntlMessages id="sidebar.components.service" />
              </b>
            </h1>
          </div>
          <div className="d-flex flex-row bd-highlight mb-3" style={{ marginLeft: '4%' }}>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={this.handleDate}>
                <IntlMessages id="service.filter.with.date" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={this.handleCategory}>
                {' '}
                <IntlMessages id="service.filter.with.categorie" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={this.handlePrice}>
                <IntlMessages id="service.filter.with.Price" />
              </h5>
            </div>
          </div>
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
          {this.state.alerteFiltre ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.state.messageAlerte} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
          <div className=" bd-highlight" style={{ width: '90%' }}>
            <CardBox styleName="col-lg-12">
              <div className="row">
                {services.map((element) => (
                  <ServiceItem
                    services={services.concat(archives)}
                    key={element.id}
                    item={element}
                    handleDetails={this.handleDetails}
                    handleEdit={this.handleEdit}
                    frequency={this.state.frequency}
                    currency={this.state.currency}
                  />
                ))}
              </div>
            </CardBox>
          </div>
        </div>
        <div className=" bd-highlight" style={{ width: '90%' }}>
          <CardBox styleName="col-lg-12">
            <ArchiveService
              services={services.concat(archives)}
              data={archives}
              frequency={this.state.frequency}
              currency={this.state.currency}
            ></ArchiveService>
          </CardBox>
        </div>

        <div className=" bd-highlight" style={{ width: '90%' }}>
          <CardBox styleName="col-lg-12">
            <AddService
              services={services.concat(archives)}
              typeList={typeList}
              values={this.state}
              openAddModal={this.openAddModal}
              handleChangeRadio={this.handleChangeRadio}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleIcon={this.handleIcon}
              setDate={this.setDate}
              handleArchive={this.handleArchive}
            />
          </CardBox>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    services: state.service.servicesV2,
    archives: state.service.archiveServices,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
};

export default connect(mapStateToProps)(Service);
