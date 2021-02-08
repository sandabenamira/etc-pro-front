import React, { Component } from "react";
import Comments from "./CommentsTable";
import IntlMessages from "../../../../../util/IntlMessages";
import StackedBarChart from "./StackedBarChart";
import CardHeader from "../../../../../components/dashboard/default/CardHeader";
import CardBox from "../../../../../components/CardBox";
import SimpleRadarChart from "./SimpleRadarChart";
import TextField from "@material-ui/core/TextField";
import IntegrationAutosuggest from "../../../Community/routes/Complaint/IntegrationAutosuggest";
import MenuItem from "@material-ui/core/MenuItem";
import ContainerHeader from "../../../../../components/ContainerHeader/index";

export default class ReportingKPI extends Component {
  render() {
    return (
      <div className="d-flex flex-wrap justify-content-center flex-column align-items-center">
        <div className="col-lg-12 col-12">
      
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.components.reporting-kpi" />}
        />
        </div>

        <div class="d-flex flex-wrap flex-row bd-highlight mb-3 col-lg-12 col-12">
          <div class="p-2 bd-highlight  col-lg-8 col-md-12">
            <div className="d-flex flex-wrap flex-row bd-highlight justify-content-center  ">
              <div className="p-2 bd-highlight col-lg-2 col-md-5 col-sm-6">
                <TextField
                  id="Role"
                  name="Role"
                  select
                  // value={this.state.filterClassId}
                  // onChange={this.handleChangeFilter('filterClassId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`Formation`} />}
                  InputProps={{ disableUnderline: true }}
                  margin="normal"
                  fullWidth
                >
                  {/* {this.state.filterClasses.length > 0 ? (
                            this.state.filterClasses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de classe
                            </MenuItem>
                          )} */}
                  <MenuItem>Prise de parole</MenuItem>
                  <MenuItem>Négociation</MenuItem>
                </TextField>
              </div>

              <div className="pt-5 ">|</div>
              <div className="p-2 bd-highlight col-lg-2 col-md-5 col-sm-6">
                <TextField
                  id="status"
                  name="status"
                  select
                  // value={this.state.filterClassId}
                  // onChange={this.handleChangeFilter('filterClassId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`Type`} />}
                  InputProps={{ disableUnderline: true }}
                  margin="normal"
                  fullWidth
                >
                  {/* {this.state.filterClasses.length > 0 ? (
                            this.state.filterClasses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de classe
                            </MenuItem>
                          )} */}
                  <MenuItem>Intra Entreprise</MenuItem>
                  <MenuItem>Inter Entreprise</MenuItem>
                </TextField>
              </div>

              <div
                className=" bd-highlight col-lg-3 col-md-6 col-sm-2"
                style={{ paddingTop: "27px" }}
              >
                <IntegrationAutosuggest />
              </div>
            </div>
          </div>
          <div class="p-2 bd-highlight  col-lg-12 col-md-12">
            <SimpleRadarChart />
          </div>
        </div>
        <div class="p-2 col-lg-9 col-12 ">
          <div className="jr-card jr-full-card overflow-hiden">
            <CardHeader title="Commentaires" />
            <Comments />
          </div>
        </div>
        <div class="p-2 col-lg-9 col-12 ">
          <StackedBarChart />
        </div>
      </div>
    );
  }
}
