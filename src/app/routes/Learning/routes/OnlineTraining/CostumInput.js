import { InputBase } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: '5px',
    position: "relative",
    backgroundColor: "#3f51b5",
    //border: "1px solid #ced4da",
    fontSize: "20px",
    padding: "5px 26px 5px 12px",
    //transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 4,
      borderColor: "none",
      backgroundColor: "#3f51b5",
    },
  },
}))(InputBase);
export default BootstrapInput;
