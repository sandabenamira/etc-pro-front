import { InputBase } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: '5px',
    position: "relative",
    backgroundColor: "#3f51b5",
     fontSize: "20px",
    padding: "5px 26px 5px 12px",
      "&:focus": {
      borderRadius: 4,
      borderColor: "none",
      backgroundColor: "#3f51b5",
    },
  },
}))(InputBase);
export default BootstrapInput;
