import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import IntlMessages from '../../../../../util/IntlMessages';
import EstablishmentItemCard from './EstablishmentItemCard';

class EstablishmentsCard extends React.Component {
  state = {
    activeTab: 0,
    loader: false,
    filteredList: [],
    photo: '',
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      let filteredList = this.props.listEstablishment.filter((element) => element.estab_type_id === tab);
      this.setState({
        activeTab: tab,
        filteredList: filteredList,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      loader: true,
    });
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1500);
  };

  render() {
    /* eslint eqeqeq: "off" */
    const { listEstablishment, editEstablishment, moduleList, countries, estabTypes } = this.props;

    return (
      <>
        <div className="d-flex flex-row justify-content-between mb-2">
          <h4 className="mr-2">{<IntlMessages id="sidebar.dashboard.listing" />}</h4>

          <span className="ml-2 pointer">
            <i className="zmdi zmdi-search text-primary jr-fs-xl" onClick={() => this.setState({ searchInput: true })} />
            {this.state.searchInput ? <h2>{' '}</h2> : ''}
          </span>
        </div>
        {/* <div className="jr-tabs-up jr-tabs-up-no-border">
            <Nav className="jr-tabs-pills-ctr" pills>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 0 })}
                  onClick={() => {
                    this.toggle(0);
                  }}
                >
                  <IntlMessages id="extraPages.all" />
                </NavLink>
              </NavItem>
              {this.props.estabTypes.map((estabType, index) => (
                <NavItem key={index}>
                  <NavLink
                    key={index}
                    className={classnames({ active: this.state.activeTab === estabType.id })}
                    onClick={() => {
                      this.toggle(estabType.id);
                    }}
                  >
                    {estabType.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </div> */}

        <TabContent className="jr-tabs-content" activeTab={this.state.activeTab}>
          <TabPane tabId={0}>
            {listEstablishment.map((data, index) => (
              <EstablishmentItemCard
                key={index}
                estabTypes={estabTypes}
                countries={countries}
                data={data}
                editEstablishment={editEstablishment}
                RequestDeleteEstablishment={this.RequestDeleteEstablishment}
                moduleList={moduleList}
                logo={data.logo}
              />
            ))}
          </TabPane>
          {this.props.estabTypes.map((estabType, index) => (
            <TabPane key={index} tabId={estabType.id}>
              {this.state.filteredList.map((data, index) => (
                <EstablishmentItemCard
                  key={index}
                  estabTypes={estabTypes}
                  countries={countries}
                  data={data}
                  editEstablishment={editEstablishment}
                  RequestDeleteEstablishment={this.RequestDeleteEstablishment}
                  moduleList={moduleList}
                />
              ))}
            </TabPane>
          ))}
        </TabContent>
      </>
    );
  }
}

export default EstablishmentsCard;
