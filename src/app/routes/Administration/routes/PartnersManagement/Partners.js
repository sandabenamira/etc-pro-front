import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { editPARTNER2 } from "../../../../../store/actions/Partner";

function Partners() {
  const data = useSelector((state) => state.Partner.PARTNERs);
  let dispatch = useDispatch();

  const handleAdd = (row) => {
    dispatch(
      editPARTNER2({
        nom: row.nom,
        pays: row.pays,
        gouvernerat: row.gouvernerat,
        adresse: row.adresse,
        email: row.email,
        Ntel: row.Ntel,
        add: true,
      })
    );
  };
  const handleAdd2 = (row) => {
    dispatch(
      editPARTNER2({
        nom: row.nom,
        pays: row.pays,
        gouvernerat: row.gouvernerat,
        adresse: row.adresse,
        email: row.email,
        Ntel: row.Ntel,
        add: false,
      })
    );
  };
  return (
    <div className="app-wrapper">
      <div
        className="p-2"
        style={{ color: "#4C25B7", fontSize: "26px", marginBottom: "6%" }}
      >
        Vous pouvez choisir vos partenaires !
      </div>
      <div className="d-flex flex-wrap flex-row col-lg-12 col-md-12 col-sm-12">
        {data.map((row) => (
          <div
            className="d-flex col-lg-6 col-md-6 col-sm-6"
            style={{ borderRight: "1px solid grey" }}
          >
            <div
              className="d-flex flex-row col-lg-5 col-md-5 col-sm-5"
              style={{ padding: 0 }}
            >
              <Avatar
                alt="go my code"
                src="https://scontent.ftun15-1.fna.fbcdn.net/v/t1.6435-9/120805521_3329728503784965_2984770882616413953_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=973b4a&_nc_ohc=vbnp_4xquz0AX_Yim4t&_nc_oc=AQkW2XHfakV7hkLrJ5k9pjbQofkR1StF5kZU5NK5FZzZYeTdzz3mWLgaNsq0pqPDkR4&_nc_ht=scontent.ftun15-1.fna&oh=43803f658fe1942a63615850e24b8331&oe=61569C5E"
                style={{ height: 50, width: 50 }}
              />
              <div
                className="d-flex flex-column"
                style={{ marginLeft: "15px" }}
              >
                <div
                  style={{
                    marginBottom: 5,
                    fontSize: "1.25vw",
                  }}
                >
                  {row.nom}
                </div>
                <div
                  style={{
                    fontSize: "1.15vw",
                  }}
                >
                  {row.pays}
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-7">
              {row.add ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "25px",
                    fontSize: "1.3vw",
                    fontFamily: "Roboto",
                    textTransform: "none",
                    float: "right",
                  }}
                  onClick={() => handleAdd2(row)}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "25px",
                    fontSize: "1.3vw",
                    fontFamily: "Roboto",
                    textTransform: "none",
                    float: "right",
                  }}
                  onClick={() => handleAdd(row)}
                >
                  Ajouter à mon réseau
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
