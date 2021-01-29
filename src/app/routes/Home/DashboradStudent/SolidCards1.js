import React from 'react';
import {Card, CardBody, CardSubtitle, CardText} from 'reactstrap';
import IconButton from "@material-ui/core/IconButton";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Badge } from "reactstrap";

const SolidCards1 = ({headerText, cardStyle}) => {
  return (

    <Card className={`shadow border-1 ${cardStyle}`}style={{  height: "290px",boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
      <CardBody>
        <h4 className="mb-md-4" style={{color : "#F15381"}}><SentimentVeryDissatisfiedIcon /> {headerText}</h4>
        <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                      }}
                    >
                      <IconButton color="primary">
                        <i className="zmdi zmdi-more-vert" />
                      </IconButton>
                      &nbsp;
                      <IconButton color="primary">
                        <i className="zmdi zmdi-close" size="small" />
                      </IconButton>
                    </div>
       
        <CardText>
        <div class="d-flex flex-wrap flex-column bd-highlight mb-3">
  <div class=" bd-highlight">

  <div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-1 bd-highlight">
  {/* <Badge className=" text-uppercase" color="secondary">
                  21 <br></br> nov
                </Badge> */}
  </div>
  <div class="p-1 bd-highlight" style={{fontSize:"10px"}}>
    {/* Le 21/11/2020 de 10h à 12h <br/>Sans justification  */}
  </div>
</div>

  </div>
  <div class=" bd-highlight">
  <div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-1 bd-highlight">
  {/* <Badge className=" text-uppercase" color="secondary">
                  20 <br></br> nov
                </Badge> */}
  </div>
  <div class="p-1 bd-highlight" style={{fontSize:"10px"}}>
    {/* Le 20/11/2020 de 10h à 12h <br/>Sans justification  */}
  </div>
</div>
  </div>
</div>
        </CardText>
       
      </CardBody>
    </Card>

  );
};
export default SolidCards1;