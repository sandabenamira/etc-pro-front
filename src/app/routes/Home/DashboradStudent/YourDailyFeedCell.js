import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const YourDailyFeedCell = ({feed}) => {
  const {id, title, time, image, isSocial} = feed;
  return (
    <div key={id} className="media user-profile user-profile-border">
      <Avatar
        alt={image}
        src={image}
        className="user-avatar"
      />
      <div className="media-body align-self-center">
        <h5 className="mb-1">{title} </h5>
        <span className="meta-date">{time} </span>
     
      </div>
      <IconButton className="icon-btn p-1"><i
                    class="zmdi zmdi-circle zmdi-hc-lg "
                    style={{ color: 'green',fontSize:"15px" }}
                  /></IconButton>
    </div>
  );
};

export default YourDailyFeedCell;
