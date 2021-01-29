import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { classService } from "../../_services";
import _ from "lodash";
import baseUrl from "../../config/config";
import imageSchool from "../../assets/images/logoEducapGris.png";

const Logo = (props) => {
  const [uri, setUri] = useState("");
  useEffect(() => {
    const establishmentId = localStorage.getItem("establishment_id");
    let apiEndpoint = "";
    apiEndpoint = `/establishments/${establishmentId}?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        let dataEstablishment = response.data;
        const name = dataEstablishment.name;
        if (name) {
          apiEndpoint = `/containers/checkFileExist/${name}?access_token=${localStorage.token}`;
          classService
            .get(apiEndpoint)
            .then((response) => {
              let itemList = _.isEmpty(response.data.checkFile)
                ? null
                : response.data.checkFile.find(
                    (item) => item.name === dataEstablishment.logo
                  );
              _.isEmpty(itemList)
                ? setUri(null)
                : setUri(
                    `${baseUrl.baseUrl}/containers/` +
                      name +
                      "/download/" +
                      dataEstablishment.logo +
                      `?access_token=${localStorage.token}`
                  );
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="container-sm" style={{ padding: "40px" }}>
      {uri ? (
        <img
          className="img-fluid"
          src={uri}
          alt="EDUCAP"
          title="EDUCAP"
          //  onError={(e) => {
          //   e.target.src = { imageSchool }
          //    e.target.style = 'padding: 8px; margin: 16px'
          // }}
        />
      ) : (
        <img
          className="img-fluid"
          src={imageSchool}
          alt="EDUCAP"
          title="EDUCAP"
        />
      )}
    </div>
  );
};

export default Logo;
