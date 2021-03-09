import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import { getNameFromID } from "../../../../actions/countriesAction";
import ClassNames from "classnames";

export default class SchoolLicenceListItem extends Component {
  render() {   /* eslint eqeqeq: "off" */
     const { schoolLicence, listEstablishments } = this.props;

    let schoolYear;
    schoolYear = this.props.schoolYearList.find(
      (element) => element.id===schoolLicence.fk_id_school_year
    );
    return (
      <TableRow key={schoolLicence.id}>
        <TableCell>
          {getNameFromID(listEstablishments, schoolLicence.fk_id_establishment)}
        </TableCell>
        <TableCell>
          {schoolLicence.licenceModule !== undefined ? (
            schoolLicence.licenceModule.map((element, index) => {
              let sperator =
                index === schoolLicence.licenceModule.length - 1 ? "" : "-";
              return <span>{" " + element.module.name + sperator}</span>;
            })
          ) : (
            <span></span>
          )}
        </TableCell>
        <TableCell>{schoolYear===undefined ? " " : schoolYear.name}</TableCell>

        <TableCell
          class={ClassNames("mb-2  ", {
            "text-warning": schoolLicence.situation === "Expired",
            "text-success": schoolLicence.situation === "Actif",
            "text-primary": schoolLicence.situation === "Pending",
            "text-danger": schoolLicence.situation === "Blocked",
          })}
        >
          {schoolLicence.situation}
        </TableCell>
        <TableCell>{schoolLicence.mode_payment}</TableCell>
        <TableCell>{schoolLicence.number_sms}</TableCell>
        <TableCell>{schoolLicence.number_students}</TableCell>
        <TableCell>
          <IconButton
            size="large"
            className="icon-btn"
            onClick={(e) => this.props.handleEdit(schoolLicence, e)}
            value={schoolLicence.id}
          >
            <i className="zmdi zmdi-edit " style={{ color: "text-grey" }} />
          </IconButton>
          {/* &nbsp; | &nbsp;
            <IconButton
              size="large"
              className="icon-btn"
              onClick={(e) => this.props.handleDelete(schoolLicence, e)}
            >
              <i className="zmdi zmdi-delete" style={{ color: "text-grey" }} />
            </IconButton> */}
        </TableCell>
      </TableRow>
    );
  }
}
