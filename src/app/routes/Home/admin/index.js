import React, { Component } from 'react';

export default class Admin extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="dashboard animated slideInUpTiny animation-duration-3 ">
          <div className="row">
            {/* ChartCard 1 */}
            {detailCards.map((data, index) => (
              <div
                key={index}
                className="col-xl-3 col-lg-3 col-md-3 col-sm-7 col-6"
              >
                <IconWithTextCard data={data} />
              </div>
            ))}
          </div>

          <div className="row">
            {/* ChartCard 2 */}

            <div className="col-lg-6 col-12 mb-5 mb-lg-1">
              <div className="jr-card">
                <h2>
                  {' '}
                  {<IntlMessages id="dashboard.rate.presence.absences" />}
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart
                    data={salesStatisticData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis type="number" domain={[0, 100]} />
                    <CartesianGrid strokeDasharray="0" stroke="#DCDEDE" />

                    <Tooltip />
                    <defs>
                      <linearGradient
                        id="salesStatistic"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#4258BC" stopOpacity={1} />
                        <stop offset="95%" stopColor="#FFF" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="uv"
                      strokeWidth={2}
                      stroke="#6F82E5"
                      fill="url(#salesStatistic)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* ChartCard 3 */}
            <div className="col-lg-3 col-12">
              <div className="jr-card">
                <ResponsiveContainer width="100%">
                  <SalesGauge />
                </ResponsiveContainer>
              </div>
            </div>
            {/* ChartCard 4 */}
            <div className="col-lg-3 col-12 jr-card">
              <h3 className="card-heading">
                {<IntlMessages id="dashboard.total.number.of.students" />}
              </h3>
              <ResponsiveContainer width="100%" height="80%">
                <DoughnutChart
                  nbreGirls={this.state.nbreGirls}
                  nbreBoys={this.state.nbreBoys}
                />
              </ResponsiveContainer>
              <div className="row">
                <div className="col-6">
                  <div className="media">
                    <i className="zmdi zmdi-android zmdi-hc-fw mr-2 text-success" />
                    <div className="media-body">
                      <h5 className="mb-0">
                        {<IntlMessages id="dashboard.male" />}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="media">
                    <i className="zmdi zmdi-apple zmdi-hc-fw mr-2 text-warning" />
                    <div className="media-body">
                      <h5 className="mb-0">
                        {<IntlMessages id="dashboard.female" />}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="row">
            {/* ChartCard 5 */}

            <div className="col-lg-6 col-12">
              <div className="jr-card">
                <h2> {<IntlMessages id="dashboard.rate.success" />}</h2>
                <ResponsiveContainer width="100%" height={425}>
                  <BarChart
                    data={data}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#3367d6" />
                    <Bar dataKey="uv" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* ChartCard 6 */}
            <div className="col-lg-3 col-12">
              <div className="jr-card">
                <div
                  className={`jr-card-header-color text-center bg-gradient-primary`}
                >
                  <div className="jr-card-header-top mb-3">
                    <IconButton
                      className="jr-menu-icon mr-auto"
                      aria-label="Menu"
                    >
                      <span className="menu-icon bg-white" />
                    </IconButton>
                    <IconButton
                      className="icon-btn p-2"
                      onClick={this.onOptionMenuSelect.bind(this)}
                    >
                      <i className="zmdi zmdi-more-vert text-white" />
                    </IconButton>
                  </div>

                  <Avatar className="bg-grey lighten-2 avatar-shadow size-90 mx-auto mb-4">
                    <h1 className="m-1 text-primary font-weight-bold">24</h1>
                  </Avatar>
                  <div className="jr-card-hd-content text-white">
                    <h2 className="text-white jr-font-weight-medium mb-1">
                      Monday
                    </h2>
                    <p className="mb-0">July 2017</p>
                  </div>
                </div>
                <div className="jr-card-body mb-6">
                  <div className="d-flex flex-column">
                    <div className="list-line-item">
                      <div className={`list-line-badge bg-primary`} />

                      <div className="list-line-content">
                        <h4 className={`mb-2 text-primary`}>Learning React</h4>
                        <p className="jr-fs-sm text-light">6:30 pm</p>
                      </div>
                    </div>

                    <div className="list-line-item">
                      <div className="list-line-badge bg-danger" />

                      <div className="list-line-content">
                        <h4 className="text-danger mb-1">Logo Design</h4>
                        <p className="jr-fs-sm text-light">7:15 pm</p>
                      </div>
                    </div>

                    <div className="list-line-item">
                      <div className="list-line-badge bg-success" />

                      <div className="list-line-content">
                        <h4 className="text-success mb-1">Timesheet Setup</h4>
                        <p className="jr-fs-sm text-light mb-0">8:45 pm</p>
                      </div>
                    </div>

                    <div className="list-line-item">
                      <div className="list-line-badge bg-warning" />

                      <div className="list-line-content">
                        <h4 className="text-warning mb-1">Timesheet Setup</h4>
                        <p className="jr-fs-sm text-light mb-0">8:45 pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                <CardMenu
                  menuState={menuState}
                  anchorEl={anchorEl}
                  handleRequestClose={this.handleRequestClose.bind(this)}
                />
              </div>
            </div>
            {/* ChartCard 7 */}

            <div className="col-lg-3 col-12">
              <div className="jr-card jr-full-card">
                <CardHeader
                  heading={<IntlMessages id="dashboard.list.of.paiement" />}
                />

                <UserDetailTable
                  data={this.state.listPayments}
                  tableStyle="full-table-last-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isopen === true ? (
          <ResetPasswordModal
            isopen={this.state.isopen}
            handleCancel={this.handleCancel}
            handleChange={this.handleChange}
            ResetPassword={this.ResetPassword}
            values={this.state}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}
