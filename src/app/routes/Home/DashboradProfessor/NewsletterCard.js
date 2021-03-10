import React from "react";
import { Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import CardActionArea from "@material-ui/core/CardActionArea";
 import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../util/IntlMessages";

const NewsletterCard = ({ headerText, cardStyle }) => {
  return (
    <Card
      className={`shadow border-0 ${cardStyle}`}
      style={{ width: "auto", height: "300px" }}
    >
      <CardActionArea>
        <div
          className="  justify-content-start align-items-center "
          style={{ height: "40px", backgroundColor: "#FACC03" }}
        >
          <span
            style={{
              position: "absolute",
              marginTop: "10px",
              color: "black",
              marginLeft:"10px"
            }}
          >
          {" "}  Évaluation{" "}
          </span>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <IconButton>
              <i className="zmdi zmdi-more-vert" />
            </IconButton>
            &nbsp;
            <IconButton>
              <i className="zmdi zmdi-close" size="small" />
            </IconButton>
          </div>
        </div>
      </CardActionArea>
      <CardBody>
        <CardSubtitle className="text-black"> </CardSubtitle>
        <CardText>
          <div className="  d-flex flex-row justify-content-center align-items-center ">
            <i
              className="zmdi zmdi-chevron-left zmdi-hc-2x "
              style={{ color: "#0000CD", fontSize: "20px" }}
              //   onClick={goToBack}
            ></i>
            <span style={{ color: "#0000CD" }}>
              <IntlMessages id="dashborad.prof.trimestre" />{" "}
            </span>
            <i
              className="zmdi zmdi-chevron-right zmdi-hc-2x "
              style={{ color: "#0000CD", fontSize: "20px" }}
              //   onClick={goToBack}
            ></i>
          </div>
          {/* <Badge className="mr-4 mt-2 text-uppercase" color="primary">
            3éme D1
          </Badge>
          <Badge className="mr-4 mt-2 text-uppercase" color="primary">
            3éme D2
          </Badge>
          <Badge className="mr-4 mt-2 text-uppercase" color="primary">
            3éme D3
          </Badge>
          <Badge className="mr-4 mt-2 text-uppercase" color="primary">
            3éme D4
          </Badge>
          <Badge className="mr-4 mt-2 text-uppercase" color="primary">
            BAC 1
          </Badge> */}
        </CardText>
      </CardBody>
    </Card>
  );
};
export default NewsletterCard;
