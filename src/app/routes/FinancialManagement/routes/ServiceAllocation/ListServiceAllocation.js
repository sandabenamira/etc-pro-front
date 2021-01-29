import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import CardBox from '../../../../../components/CardBox/index';
import ServiceAllocationItem from './ServiceAllocationItem';
import { ListItem } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import { connect } from 'react-redux';
import EditAllocationService from './EditAllocationService';
import DeleteAllcation from './DeleteAllocation';
import {
  addAllocationService,
  editAllocationService,
  getAllocationServiceByEstablishment,
} from '../../../../../actions/AllocationServiceAction';

import _ from 'lodash';

export class ListServiceAllocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEdit: false,
      allocationItemEdit: {},
      servicesSelected: [],
      idServicesAffected: [],
      serviceDefault: [],
      openDelete: false,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleIcon = this.handleIcon.bind(this);
    this.HandleSubmitAllocationService = this.HandleSubmitAllocationService.bind(this);
  }

  HandleSubmitAllocationService = () => {
    var newData = [];
    var oldData = [];
    this.state.servicesSelected.map((allocation, index) => {
      var allocationData = {};
      allocationData.fk_id_student = allocation.fk_id_student;
      allocationData.fk_id_service = allocation.fk_id_service;
      allocationData.allocation_month = allocation.allocation_month;
      if (allocation.id === '') {
        if (allocation.allocation_month.length > 0) {
          newData.push(allocationData);
        }
      } else {
        allocationData.id = allocation.id;

        if (allocation.allocation_month.length > 0) {
          oldData.push(allocationData);
          // this.props.editAllocationService(
          //   allocationData,
          //   this.props.userProfile.establishment_id,
          //   this.props.userProfile.school_year_id
          // );
        } else {
          allocationData.status = false;
          oldData.push(allocationData);
          // this.props.editAllocationService(
          //   allocationData,
          //   this.props.userProfile.establishment_id,
          //   this.props.userProfile.school_year_id
          // );
        }
      }
    });

    this.props.editAllocationService(
      oldData,
      this.props.userProfile.establishment_id,
      this.props.userProfile.school_year_id
    );
    if (newData.length > 0) {
      this.props.addAllocationService(
        newData,
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      );
    }
    this.setState({
      openEdit: false,
    });
  };
  handleIcon(itemSelected) {
    let serviceExistant = [];
    let idServices = this.state.idServicesAffected;
    let monthSelected =
      itemSelected.fk_id_frequency == 7 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [];
    let newService = {
      allocation_month: monthSelected,
      service_v2: itemSelected,
      id: '',
      fk_id_student: this.state.servicesSelected[0].fk_id_student,
      fk_id_service: itemSelected.id,
    };

    serviceExistant = this.state.servicesSelected.filter(
      (service) => service.service_v2.id == itemSelected.id
    );

    let serviceDelete = this.state.servicesSelected.filter(
      (service) => service.service_v2.id != itemSelected.id
    );
    let idServicesDelete = idServices.filter((service) => service != itemSelected.id);
    if (serviceExistant.length > 0) {
      this.setState({
        servicesSelected: serviceDelete,
        idServicesAffected: idServicesDelete,
      });
    } else {
      var newServicesSelected = this.state.servicesSelected;
      newServicesSelected.push(newService);
      idServices.push(itemSelected.id);
      this.setState({
        servicesSelected: newServicesSelected,
        idServicesAffected: idServices,
      });
    }
  }
  handleEdit = (item) => {
    let obj = {};
    obj.Class = item.Class;
    obj.address = item.address;
    obj.id = item.id;
    obj.level = item.level;
    obj.name = item.name;
    obj.name_ar = item.name_ar;
    obj.parents = item.parents;
    obj.phone = item.phone;
    obj.photo = item.photo;
    obj.surname = item.surname;
    obj.surname_ar = item.surname_ar;
    obj.zip_code = item.zip_code;
    let servicesSelected = item.services.filter((element) => element.id != '');
    let idServicesAffected = servicesSelected.map((element) => element.fk_id_service);
    this.setState({
      servicesSelected: servicesSelected,
      idServicesAffected,
      openEdit: true,
      allocationItemEdit: obj,
    });
  };
  handleDelete = (item) => {
    this.setState({ openDelete: true, allocationItem: item });
  };

  handleCancel() {
    this.setState({
      openEdit: false,
      openDelete: false,
      allocationItemEdit: {},
      servicesSelected: [],
      idServicesAffected: [],
    });
    this.props.getAllocationServiceByEstablishment(
      this.props.userProfile.establishment_id,
      this.props.userProfile.school_year_id
    );
  }

  render() {
    return (
      <>
        <CardBox styleName="text-black col-lg-12">
          <div className="row d-flex ">
            {this.props.allocationService.map((item) => (
              <ServiceAllocationItem
                key={item.id}
                allocationItem={item}
                languageId={this.props.settings.languageId}
                idEstablishment={this.props.userProfile.establishment_id}
                users={this.props.users}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                handleCancel={this.handleCancel}
              />
            ))}
          </div>
        </CardBox>
        {this.state.openEdit ? (
          <EditAllocationService
            openEdit={this.state.openEdit}
            cancel={this.handleCancel}
            handleIcon={this.handleIcon}
            HandleSubmitAllocationService={this.HandleSubmitAllocationService}
            services={this.props.services}
            allocationItemEdit={this.state.allocationItemEdit}
            servicesSelected={this.state.servicesSelected}
            idServicesAffected={this.state.idServicesAffected}
            values={this.state}
          />
        ) : (
          ''
        )}
        {/* {this.state.openDelete ? (
          <DeleteAllcation cancelModalDelete={this.handleCancel} item={this.state.allocationItem} />
        ) : (
          ''
        )} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    settings: state.settings.locale,
    users: state.stuppUsers.remoteStuppUsers,
    services: state.service.servicesV2,
  };
};
export default connect(mapStateToProps, {
  addAllocationService,
  editAllocationService,
  getAllocationServiceByEstablishment,
})(ListServiceAllocation);
