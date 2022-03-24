import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import UserDetails from "./UserDetails";
import { editUser } from "../../../../../store/actions/User";
import { useDispatch } from "react-redux";

export default function UserListItem(props) {
  let dispatch = useDispatch();
  const [opendetails, setOpendetails] = useState(false);
  const [dateNaissance, setDateNaissance] = useState("");
  const [pays, setPays] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [adressePostale, setAdressePostale] = useState("");
  const [agency, setAgency] = useState("");
  const [genre, setGenre] = useState("");
  const [pieceJointe, setPieceJointe] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [password, setPassword] = useState("");
  const [profilId, setProfilId] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [entrepriseId, settEntrepriseId] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const data = props.data;
  const opendetailsUser = () => {
    setOpendetails(!opendetails);
  };

  const finalData = {
    ...props.data,

    genre: "genre",
    dateNaissance: dateNaissance,
    pays: pays,
    codePostal: codePostal,
    adressePostale: adressePostale,

    agency: agency,
    pieceJointe: pieceJointe,
    modifiedIn: new Date(),
    deletedIn: new Date(),
    archive: true,
    lastLogin: "lastLogin",
    numeroTelephone: numeroTelephone,
    password: password,
    profilId: profilId,
    modifiedBy: modifiedBy,
    entrepriseId: entrepriseId,
  };
  const handleArchive = (e) => {
    e.preventDefault();
    setDateNaissance(data.dateNaissance);
    setPays(data.pays);
    setCodePostal(data.codePostal);
    setAdressePostale(data.adressePostale);
    setAgency(data.agency);
    setGenre(data.setGenre);
    setPieceJointe(data.pieceJointe);
    setLastLogin(data.lastlogin);
    setNumeroTelephone(data.numeroTelephone);
    setPassword(data.password);
    setProfilId(data.profilId);
    setModifiedBy(data.modifiedBy);
    settEntrepriseId(data.entrepriseId);
    setCreatedBy(data.createdBy);
    console.log("final Data", finalData);
    dispatch(editUser(finalData));
  };
  return (
    <tr style={{ backgroundColor: "white", borderRadius: 15 }}>
      <th
        scope="row"
        style={{
          flexDirection: "row",
          textAlign: "center",
          backgroundColor: "#F5F5F5",
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        <div>
          <Avatar alt={data.prenom} src={data.photo} />
        </div>
      </th>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.nom}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.prenom}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.role}
      </td>

      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.email}
      </td>
      <td
        style={{
          textAlign: "center",
          backgroundColor: "#F5F5F5",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#3F51B5",
              width: "28px",
              height: "28px",
            }}
            onClick={opendetailsUser}
          >
            {" "}
            {console.log(opendetailsUser)}
            <VisibilityOutlinedIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#F15381",
              width: "28px",
              height: "28px",
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#F9972D",
              width: "28px",
              height: "28px",
            }}
            onClick={(e) => handleArchive(e)}
          >
            <DeleteOutlineRoundedIcon backgroundColor="white" />
          </IconButton>
        </div>
      </td>
      {opendetails && (
        <UserDetails opendetailsUser={opendetailsUser} {...props} />
      )}
    </tr>
  );
}
