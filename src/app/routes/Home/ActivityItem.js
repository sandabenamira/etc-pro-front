import React from "react";
import moment from "moment";

const ActivityItem = ({ item }) => {
 
  return (
    <div className="media-body align-self-center">
      <p className="mb-0" style={{ fontSize: "16px", fontFamily: "Fantasy" }}>
        {item.subjectName}: {item.profSurname} {item.profName}
      </p>
      <p>
        {moment(item.start_time_class).format("HH")}h:
        {moment(item.start_time_class).format("mm")} -{" "}
        {moment(item.end_time_class).format("HH")}h:
        {moment(item.end_time_class).format("mm")}{" "}
      </p>
    </div>
  );
};

export default ActivityItem;
