import React, { Component } from 'react';
import GreenStepCard from "../DashboradStudent/GreenStepCard";
import ProjectsList from "../DashboradStudent/ProjectsList"
import { latestPostList, marketingData, projects, products, recentList, weeklyData } from '../DashboradStudent/data';
import CardHeader from '../../../../components/dashboard/Common/CardHeader/index';
import IntlMessages from '../../../../util/IntlMessages';
import RecentActivities from '../../../../components/dashboard/Common/RecentActivities/index';
// components/dashboard/Common/DailyFeed/index
class StudentDashboard extends Component {
    render() {
        return (
            <div className="app-wrapper">
                <div className="animated slideInUpTiny animation-duration-3">
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <GreenStepCard />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="jr-card">
                                <div className="jr-card-header mb-12 d-flex">
                                    <h3 className="mb-0 mr-auto">Liste des devoirs & examens</h3>
                                    <span className="badge badge-secondary">Cette semaine</span>
                                </div>
                                <ProjectsList data={projects} />
                            </div>

                        </div>
                        <div className="col-lg-4 col-4 col-sm-10">
                            <div className="jr-card">
                                <CardHeader heading={<IntlMessages id="dashboard.recentActivities" />}
                                    subHeading={<IntlMessages id="dashboard.lastActivity" />} />

                                {recentList.map((recentList, index) => <RecentActivities key={index}
                                    recentData={recentList} />)}

                            </div>
                        </div>
                        <div>
                            {/* <TableNotes />
                        </div>
                        <div className="col-lg-4 col-sm-10 col-12 order-lg-12">
                        <h6 class="MuiTypography-root MuiTypography-h6" >La liste des événements par jour</h6>
                            <TimerView headerColor="gradient-primary" /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (StudentDashboard);
// app/routes/widgets/routes/Modern/GreenStepCard"