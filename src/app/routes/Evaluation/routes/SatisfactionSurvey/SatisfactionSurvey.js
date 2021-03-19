import React, { Component } from 'react'
import AddSurvey from "./AddSurvey"

export default class SatisfactionSurvey extends Component {
    render() {
        return (
            <div className=" bd-highlight" >
            <div styleName="col-lg-12 col-sm-12 col-md-12   d-flex flex-column justify-content-center ">
               <AddSurvey/>
               
            </div>
  
          </div> 
        )
    }
}
