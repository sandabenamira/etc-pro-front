import { InputBase } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: "5px",
    position: "relative",
    borderBottom: "1px solid #1a85b3",
     fontSize: "20px",
    padding: "5px 26px 5px 12px",
    "&:focus": {
      borderRadius: 4,
      borderColor: "none",
    },

   },
}))(InputBase);
export default BootstrapInput;
