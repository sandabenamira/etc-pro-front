import React from "react";
import { Card, CardBody , CardText } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
 const SolidCards3 = ({ headerText, cardStyle }) => {
  return (
    <Card
      className={`shadow border-0 ${cardStyle}`}
      style={{
        height: "290px",
        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <CardBody>
        <h4 className="mb-md-4 pt-2">{headerText}</h4>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <IconButton style={{ color: "white" }}>
            <i className="zmdi zmdi-more-vert" />
          </IconButton>
          &nbsp;
          <IconButton style={{ color: "white" }}>
            <i className="zmdi zmdi-close" size="small" />
          </IconButton>
        </div>
        <CardText>
          <div class="d-flex flex-wrap flex-column bd-highlight mb-3">
            <div class="p-1 bd-highlight">
              <i className="zmdi zmdi-circle " style={{ fontSize: "8px" }} />
              {/* &nbsp;<strong>Cause Sanitaire:</strong>{" "}
              <span style={{ fontSize: "10px" }}>
                {" "}
                Report de l’excursion de fin d’année
              </span> */}
            </div>
            <div class="p-1 bd-highlight">
              <i className="zmdi zmdi-circle " style={{ fontSize: "8px" }} />{" "}
              {/* <strong>Cause Sanitaire:</strong>
              <span style={{ fontSize: "10px" }}>
                &nbsp;Voyage d’études annulé
              </span> */}
            </div>
            <div class="p-1 bd-highlight">
              <i className="zmdi zmdi-circle " style={{ fontSize: "8px" }} />{" "}
              {/* <strong>Cause administrative:</strong>
              <span style={{ fontSize: "10px" }}>
                &nbsp; Réunion de parents urgente en ligne pour le ven.11
                décembre 2020 Lien : www.jitzi.com/admin/reu
              </span> */}
            </div>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};
export default SolidCards3;
