import ArshivedUserList from "./ArshivedUserList";
import IntlMessages from "../../../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

export default function ArshivedUser(props) {
  return (
    <div className="app-wrapper ">
      <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
        <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
          <div className="p-2">
            <div className="package-footer d-flex justify-content-start">
              <IconButton
                aria-label="delete"
                style={{
                  color: "#blue",
                  backgroundColor: "#blue",
                  width: "28px",
                  height: "28px",
                }}
                onClick={props.handleopenArchived}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              <h1
                style={{
                  color: "#3f51b5",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                <IntlMessages id="sidebar.usersManagement" /> -{" "}
                <IntlMessages id="gestion.agence.archive" />
              </h1>
            </div>
          </div>
        </div>

        <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
          <ArshivedUserList
            data={props.data}
           />
        </div>
      </div>
    </div>
  );
}
