import React from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import img2 from "../../../assets/images/supAdmin.png";

class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div
        className="app-wrapper"
        // style={{
        //   marginLeft: '5%',
        //   marginRight: '10%',
        // }}
      >
        <div className="d-flex flex-wrap flex-row bd-highlight mb-3 col-lg-12 col-md-12  col-sm-12">
          <div className="p-2 bd-highlight col-lg-8 col-md-8  col-sm-12 bg-yellow">
            <div class="d-flex flex-wrap flex-column bd-highlight mb-3">
              <div className="p-2 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="media jr-featured-item "
                  style={{ borderRadius: "30px", background: "#484cb4" }}
                >
                  <div className="media-body jr-featured-content">
                    <div className="jr-featured-content-left">
                      <h1 className="mb-2 text-white p-3">
                        Bienvenue M/Mme. Admin ADMIN{" "}
                      </h1>
                      <div className="row-flex">
                        <div className="media text-white p-3">
                          <h3>
                            {" "}
                            Le futur de l'éducation est entre vos mains .
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="jr-featured-content-right jr-profile-content-right">
                      <div className="jr-featured-thumb mt-3">
                        <Avatar className="size-90" alt="..." src={img2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap  flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight col-lg-5 col-md-5 col-sm-12">Flex item 1</div>
                <div className="p-2 bd-highlight col-lg-5 col-md-5 col-sm-12">Flex item 2</div>
              </div>
              <div className="p-2 bd-highlight">Flex item 3</div>
            </div>
          </div>
          <div className="p-2 bd-highlight col-lg-4 col-md-8  col-sm-12 bg-red">
            Flex item 2
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Home);
