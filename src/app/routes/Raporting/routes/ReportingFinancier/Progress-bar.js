import React from "react";
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';

const ProgressBar = (props) => {
    const { color, percentage } = props;
  
    const containerStyles = {
      height: 20,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      marginTop: 12,
      marginBottom: 12,
      
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${percentage}%`,
      backgroundColor: color,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
   
      color: 'white',
      fontWeight: 'bold'
    }
 //{`${percentage}%`} 
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>
              <EmojiEmotionsTwoToneIcon></EmojiEmotionsTwoToneIcon>
          </span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;