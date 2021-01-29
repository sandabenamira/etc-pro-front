import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Badge } from "reactstrap";

var dateFormat = require("dateformat");

const ReclamListItem = ({
  mail,
  onMailSelect,
  onMailChecked,
  onStartSelect
}) => {
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
            <div>
              <Badge className="d-block" color="orange">
                en cours
              </Badge>
            </div>
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

export default ReclamListItem;
