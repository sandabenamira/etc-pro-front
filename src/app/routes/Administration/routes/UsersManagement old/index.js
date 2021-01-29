import React from "react";
import asyncComponent from "../../../../../util/asyncComponent";
import { Redirect, Route, Switch } from "react-router-dom";
import Can from "../../../../../can";
// import { ContextConsumer } from "../../../../../Context";
import CommonInformation from "./UserInformation/CommonInformation";
import SpecificInformation from "./UserInformation/SpecificInformation";
import ParentInformation from "./UserInformation/ParentInformation";
import Users from "./User";
const UsersManagement = ({ match }) => (
  <div>
    <User match={match} />
  </div>
);

export default UsersManagement;
