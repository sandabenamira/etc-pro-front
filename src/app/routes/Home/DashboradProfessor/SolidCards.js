import React from "react";
import { Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../util/IntlMessages";

const SolidCards = ({ headerText, cardStyle }) => {
  return (
    <Card
      className={`shadow border-0 ${cardStyle}`}
      style={{ width: "auto", height: "300px", marginTop: "25px" }}
    >
      <CardBody>
        <CardSubtitle className="text-black">
          <div class="d-flex">
            <div
              class="mt-2 d-flex justify-content-star"
              style={{
                position: "absolute",
                top: 0,
              }}
            >
              <IntlMessages id="dashborad.prof.memo" />{" "}
            </div>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
            >
              <IconButton>
                <i className="zmdi zmdi-close" size="small" />
              </IconButton>
            </div>
          </div>
        </CardSubtitle>
        <CardText></CardText>
        <CardText></CardText>
      </CardBody>
    </Card>
  );
};
export default SolidCards;
