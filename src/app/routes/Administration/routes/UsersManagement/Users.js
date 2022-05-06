import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import UsersList from "./UsersList";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ArshivedUser from "./ArshivedUser";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../../store/actions/User";

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log("get users : ", data);

  const [archived, setArchived] = useState(false);

  const handleopenArchived = () => {
    setArchived(!archived);
  };

  const openaddUser = () => {
    setIsOpen(true);
  };

  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div>
      { !archived &&(
        <div className="app-wrapper ">
          <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
            <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
              <div className="p-2">
                <h1
                  style={{
                    color: "#484cb4",
                    marginBottom: "5%",
                    fontSize: "26px",
                  }}
                >
                  <IntlMessages id="sidebar.usersManagement" />
                </h1>
              </div>
            </div>

            <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
              <UsersList openaddUser={openaddUser} data={data}/>
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
                <DeleteOutlineRoundedIcon backgroundColor="white" />
              </IconButton>
              <div className="p-2">
                <IntlMessages id="archive" />
               </div>
            </div>
          </div>
        </div>
      )}
      {archived &&<ArshivedUser handleopenArchived={handleopenArchived}  data={data} increment={increment} count={count}/>}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(User);
