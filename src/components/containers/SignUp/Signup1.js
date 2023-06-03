import React, { useState } from "react";

function SignUp1() {
  return (
    <div className="app-login-container d-flex justify-content-center">
      <div
        className="d-flex flex-column "
        style={{
          backgroundColor: "#1a85b3",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "5%",
          paddingTop: "4%",
          minHeight: "1000px",
          minWidth: "100%",
        }}
      >
        <div
          className="d-flex  flex-column col-lg-12 col-md-12 col-sm-11  "
          fullWidth
          style={{
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "40px 20px #125f80",
          }}
        >
          <div className="d-flex   justify-content-center mt-4  ">
            <img
              width={70}
              src={require("../../../assets/images/educapProLogo.png")}
              alt="logo"
              title="logo"
              style={{
                height: "80px",
                top: "90px",
              }}
            />
            <h1
              style={{
                color: "#1a85b3",
                maxFontSize: "40%",
                fontWeight: 700,
                textAlign: "center",
                position: "relative",
              }}
            >
              <strong>Créer votre compte entreprise sur ETC Pro</strong>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp1;
