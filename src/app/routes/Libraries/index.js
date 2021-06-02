import React from 'react';
import asyncComponent from '../../../util/asyncComponent';
import { Redirect, Route, Switch } from 'react-router-dom';
import Can from '../../../components/switchComponent/can';
import { RoleContext } from "../../../components/switchComponent/Context";
import Forum from "./routes/Forum/Forum"
import Qcm from "./routes/Qcm/Qcm";
import Quiz from "./routes/Quiz/Quiz";
import Test from "./routes/Test/Test"



const Libraries = ({ match, estabModule }) => (

    <div className="app-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/qcm`} />
            <Route path={`${match.url}/qcm`} render={() =>
                <RoleContext.Consumer>
                    {({ role }) => (
                        < Can
                            role={role}
                            perform="module-nav-access"
                            data={{
                                mod: 'e-libraries',
                                moduleList: estabModule
                            }}
                            yes={() => (
                                < Can
                                    role={role}
                                    perform={`module-nav-forum`}
                                    yes={() => (
                                        < Qcm match={match} />
                                    )}
                                    no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}

                                />
                            )}
                            no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}
                        />
                    )}
                </RoleContext.Consumer>
            } />
            <Route path={`${match.url}/quiz`} render={() =>
                <RoleContext.Consumer>
                    {({ role }) => (
                        < Can
                            role={role}
                            perform="module-nav-access"
                            data={{
                                mod: 'e-libraries',
                                moduleList: estabModule
                            }}
                            yes={() => (
                                < Can
                                    role={role}
                                    perform={`module-nav-quiz`}
                                    yes={() => (
                                        < Quiz match={match} />
                                    )}
                                    no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}

                                />
                            )}
                            no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}
                        />
                    )}
                </RoleContext.Consumer>
            } />
                <Route path={`${match.url}/tests`} render={() =>
                <RoleContext.Consumer>
                    {({ role }) => (
                        < Can
                            role={role}
                            perform="module-nav-access"
                            data={{
                                mod: 'e-libraries',
                                moduleList: estabModule
                            }}
                            yes={() => (
                                < Can
                                    role={role}
                                    perform={`module-nav-tests`}
                                    yes={() => (
                                        < Test match={match} />
                                    )}
                                    no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}

                                />
                            )}
                            no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}
                        />
                    )}
                </RoleContext.Consumer>
            } />
                <Route path={`${match.url}/forum`} render={() =>
                <RoleContext.Consumer>
                    {({ role }) => (
                        < Can
                            role={role}
                            perform="module-nav-access"
                            data={{
                                mod: 'e-libraries',
                                moduleList: estabModule
                            }}
                            yes={() => (
                                < Can
                                    role={role}
                                    perform={`module-nav-forum`}
                                    yes={() => (
                                        <Forum match={match} />
                                    )}
                                    no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}

                                />
                            )}
                            no={() => <Route component={asyncComponent(() => import('../../../components/Error404'))} />}
                        />
                    )}
                </RoleContext.Consumer>
            } />
        </Switch>
    </div>
)





export default Libraries; 