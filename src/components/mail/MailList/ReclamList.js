import React from "react";
import ReclamListItem from "./MailListItem/ReclamListItem";
import CustomScrollbars from "../../../util/CustomScrollbars";

const ReclamList = ({
  mails,
  onMailSelect,
  onMailChecked,
  onStartSelect,
  getSenderName,
  width
}) => {
  return (
    <div className="module-list mail-list">
      <CustomScrollbars
        className="module-list-scroll scrollbar"
        style={{
          height: width >= 1200 ? "calc(100vh - 265px)" : "calc(100vh - 245px)"
        }}
      >
        {mails.reverse().map((mail, index) => (
          <ReclamListItem
            key={index}
            mail={mail}
            onMailSelect={onMailSelect}
            onMailChecked={onMailChecked}
            onStartSelect={onStartSelect}
          />
        ))}
      </CustomScrollbars>
    </div>
  );
};

export default ReclamList;