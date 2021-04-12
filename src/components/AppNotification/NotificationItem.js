import React from "react";
import Avatar from "@material-ui/core/Avatar";
 import { makeStyles } from "@material-ui/core/styles";
 import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";

const NotificationItem = ({ notification }) => {
  const {image, title } = notification;
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: "6px 16px",
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));
  const classes = useStyles();

  return (
    <div className="d-flex flex-wrap flex-row col-lg-12 col-md-12 col-sm-12 justify-content-start align-items-center bg-white">
      <TimelineItem style={{ marginLeft: "-50px" }}>
        <TimelineSeparator style={{ marginTop: "0px" }}>
          <TimelineConnector style={{ marginTop: "0px" }} />
          <TimelineDot color="primary"></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
      </TimelineItem>

      <TimelineItem style={{ marginLeft: "-30px" }}>
        <Paper
          elevation={0}
          style={{ width: "370px", height: "60px", backgroundColor: "white" }}
        >
          <div className="d-flex flex-row col-lg-12 col-md-12 col-sm-12 align-items-center justify-content-start ">
            <div
              className="d-flex col-lg-2 col-md-2 col-sm-12 bg-white"
              style={{ marginLeft: "-6%" }}
            >
              <Avatar alt={image} src={image} className={classes.large} />
            </div>
            <div className="d-flex flex-column align-self-stretch  ml-2">
              <div className="d-flex flex-column align-self-stretch ">
                <h6 style={{ fontSize: "15px", marginTop: "2%",color:"#7e7e7f"}}> {title} </h6>
              </div>
              <div className="d-flex flex-column align-self-stretch ">
                <h6 style={{ fontSize: "12px",color:"#ffbc58" }}> Il y quelques secondes </h6>
              </div>
            </div>
          </div>
        </Paper>
      </TimelineItem>
    </div>
  );
};

export default NotificationItem;
