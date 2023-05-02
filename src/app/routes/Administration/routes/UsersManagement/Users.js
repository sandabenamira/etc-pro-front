import React, { useState } from "react";
import { connect } from "react-redux";
import UsersList from "./UsersList";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ArshivedUser from "./ArshivedUser";
import { useSelector } from "react-redux";

function User() {
   const [ setIsOpen] = useState(false);
  const [archived, setArchived] = useState(false);
  const [filter, setFilter] = useState({});
  const data = useSelector((state) => state.users.users);
  const handleopenArchived = () => {
    setArchived(!archived);
  };
  const openaddUser = () => {
    setIsOpen(true);
  };
  const n = data.filter((e) => e.isArchived === true).length;

  return (
    <div>
      {!archived && (
        <div className="app-wrapper ">
          <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
            <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
              <div className="p-2">
                <h1
                  style={{
                    color: "#3f51b5",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  <IntlMessages id="sidebar.usersManagement" />
                </h1>
              </div>
            </div>

            <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
              <UsersList
                openaddUser={openaddUser}
                data={data}
                filter={filter}
                setFilter={setFilter}
              />
            </div>
          </div>
          <div className="d-flex flex-row-reverse  col-lg-12 col-md-12 col-sm-12 ">
            <div
              className="d-flex justify-content-start align-items-center "
              style={{
                color: "#616A6B",
                textAlign: "center",
                fontSize: "25px",
              }}
            >
              <IconButton
                aria-label="archive"
                style={{
                  color: "#A4A4A4",
                  backgroundColor: "#FFFFFF",
                  width: "40px",
                  height: "40px",
                }}
                onClick={handleopenArchived}
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>
              <div className="p-2">
                <IntlMessages id="archive" />({n})
              </div>
            </div>
          </div>
        </div>
      )}
      {archived && (
        <ArshivedUser
          handleopenArchived={handleopenArchived}
          data={data}
          />
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(User);
