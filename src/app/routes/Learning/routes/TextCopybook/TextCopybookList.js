import React from 'react';
import timeLineData from './timeLineData';
import CopybookItem from './CopybookItem';
import ContainerHeader from '../../../../../components/ContainerHeader/index';
import IntlMessages from "../../../../../util/IntlMessages";

const TextCopybookList = ({match}) => {
  return (
    <div>
      {/* <ContainerHeader title={<IntlMessages id="sidebar.timeLine.zigzag"/>} match={match}/> */}
   
      <div
        className="timeline-section timeline-center timeline-zigzag clearfix animated slideInUpTiny animation-duration-3">
        {timeLineData.map((timeLine, index) => <CopybookItem key={index}
                                                                   styleName={index % 2 === 0 ? '' : 'timeline-inverted'}
                                                                   timeLine={timeLine}/>)}
      </div>
    </div>
  )
};

export default TextCopybookList;

