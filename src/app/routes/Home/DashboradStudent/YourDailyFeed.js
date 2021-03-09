import React, {Component} from 'react';
import YourDailyFeedCell from './YourDailyFeedCell';


let counter = 0;

function createData(title, time, image, isSocial) {
  counter += 1;
  return {id: counter, title, time, image, isSocial};
}

class YourDailyFeed extends Component {
  state = {
    feeds: [
      createData([<span className="jr-link"  key={7}></span>, " Physique - 7/12/20 de 8h30 à 12h30 ",
      <div> <span
          className="jr-link" key={1}>Mme sana hlima</span></div>,], ''),
          
          createData([<span className="jr-link"  key={7}></span>, " Physique - 7/12/20 de 8h30 à 12h30 ",
          <div> <span
              className="jr-link" key={1}>Mme sana hlima</span></div>,], ''),
              createData([<span className="jr-link"  key={7}></span>, " Physique - 7/12/20 de 8h30 à 12h30 ",
              <div> <span
                  className="jr-link" key={1}>Mme sana hlima</span></div>,], ''),
     
      ,
    ],
  };

  render() {   /* eslint eqeqeq: "off" */
    const {feeds} = this.state;
    return (

      <div className="pb-3" >
        {feeds.map(feed => {
          return (
            <YourDailyFeedCell key={feed.id} feed={feed} />
          );
        })}
      </div>
    );
  }
}

export default YourDailyFeed;