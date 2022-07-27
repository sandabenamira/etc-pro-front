
import {InputBase} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";

const BootstrapInput = withStyles((theme) => ({
  // root: {
  //   "label + &": {
  //     marginTop: theme.spacing(3),
  //   },
  // },
  input: {
    // borderRadius: 4,
    // position: "relative",
      color: "#9932CC", borderBottom: "1px solid #1a85b3",
      backgroundColor:"#9932CC  !important",
    //border: "1px solid #ced4da",
    // fontSize: "20px",
    // padding: "10px 26px 10px 12px",
   // transition: theme.transitions.create(["border-color", "box-shadow"]), borderBottom: "1px solid #1a85b3",
    // Use the system font instead of the default Roboto font.
    // "&:focus": {
    //   borderRadius: 4,
    //   borderColor: "none",
    //   boxShadow: "none",
    //   backgroundColor: theme.palette.background.paper,
    // },
  },
}))(InputBase);
export default BootstrapInput;