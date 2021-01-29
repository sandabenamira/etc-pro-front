import React from "react";

class ChartCard extends React.Component {

  

  state = {
    isHide: false,
    children: '',
    
    prize:0,

    prize: 0,
    chartProperties: {
      

      title: '',
      bgColor: '',
      styleName: '',
      desc: '',
      percent: '',
    }
  }


  componentDidMount(previousState) {


   



    this.setState((previousState) => ({
      chartProperties: this.props.chartProperties,
    

    }));
  }


  componentDidUpdate(prevProps) {
    if (this.props.chartProperties.prize !== prevProps.chartProperties.prize) {
      this.setState({ prize: this.props.chartProperties.prize })

    }
  }

  handleToggle() {
    this.setState((previousState) => ({
      isHide: !previousState.isHide,
    }));
  }


  render() {

    const { chartProperties, isHide, children } = this.props;
    const { title, styleName, desc, bgColor, percent, prize } = chartProperties;
    return (
      <div className="jr-card jr-card-full">
        <div
          className={isHide === true ? `jr-fillchart bg-${bgColor} jr-fillchart-nocontent` : `jr-fillchart bg-${bgColor} jr-overlay-fillchart`}>
          <div className="card-title mb-3">{title}</div>
          {children}
          <div className="jr-fillchart-content">
            <div className="card-title mb-4">{title}</div>
            <h2 className="mb-2 jr-fs-xl jr-font-weight-medium" > {prize}</h2>
            {percent > 0}
            <p className="mb-0 jr-fs-sm"><span
              className={`jr-font-weight-medium jr-fs-md jr-chart-${styleName}`}>{percent}
              {percent > 0 ? <i className="zmdi zmdi-caret-down jr-fs-sm" /> : null}</span>{desc}</p>
          </div>
          <div className="jr-fillchart-btn-close" onClick={this.handleToggle.bind(this)}><i
           className="zmdi zmdi-close" />
           </div>
           <div className="jr-fillchart-btn" onClick={this.handleToggle.bind(this)}><i
           className={`zmdi zmdi-equalizer jr-fs-lg`} />
           </div>
         </div>
       </div>
     );
   }
 };
 
 export default ChartCard;
  
