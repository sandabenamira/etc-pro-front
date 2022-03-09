import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

function ListesInscriptionItem(props) {
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
        {props.nom}
      </th>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.numSerie}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.addresse}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.codePostale}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.gouvernorat}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.pays}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.numero_Telephone}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.createdIn}
      </td>

      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.choixDevise}
      </td>

      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.nomUser}
      </td>

      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.prenoUser}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.dateNaissanceUser}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.addresseUser}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.numeroTelephoneUser}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.emailUser}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.confirme}
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
              width: "14px",
              height: "14px",
            }}
            onClick={props.opendetailsUser}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
          {/* 
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
        </IconButton> */}
          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#F9972D",
              width: "14px",
              height: "14px",
            }}
          >
            <DeleteOutlineRoundedIcon backgroundColor="white" />
          </IconButton>
        </div>
      </td>
    </tr>
  );
}

export default ListesInscriptionItem;
