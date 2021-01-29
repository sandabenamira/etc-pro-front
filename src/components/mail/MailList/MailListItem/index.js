import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

var dateFormat = require("dateformat");

const MailListItem = ({ mail, onMailSelect, onMailChecked, onStartSelect }) => {
  return (
    <div className="module-list-item mail-cell">
      <Checkbox
        color="primary"
        checked={mail.selected}
        onClick={event => {
          event.stopPropagation();
          onMailChecked(mail);
        }}
        value="SelectMail"
      />
      <IconButton
        type="button"
        className="icon-btn size-50 p-0"
        onClick={() => {
          onStartSelect(mail);
        }}
      >
        {mail.starred ? (
          <i className="zmdi zmdi-star" />
        ) : (
          <i className="zmdi zmdi-star-outline" />
        )}
      </IconButton>
      <div
        className="module-list-info"
        onClick={() => {
          onMailSelect(mail);
        }}
      >
        <div className="module-list-content">
          <div className="mail-user-info">
            <span className="sender-name text-dark">
              {mail.profile.user.name}
            </span>
            <span className="toolbar-separator" />
            <span
              className="d-inline-block text-truncate text-dark"
              style={{ maxWidth: "calc(100% - 220px)" }}
            >
              {mail.subject}
            </span>
            {mail.hasAttachments && <i className="zmdi zmdi-attachment" />}
            <div className="time">
              {dateFormat(mail.date_hour_mail, "dddd, mmmm dS, yyyy, HH:MM")}
            </div>
          </div>
          <div className="message mb-2">
            <p> {mail.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailListItem;
