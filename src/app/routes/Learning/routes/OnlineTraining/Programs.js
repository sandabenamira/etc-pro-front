import TextField from "@material-ui/core/TextField";

import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import IntlMessages from "../../../../../util/IntlMessages";

export default function Programs(props) {
  const description = props.values.programs;
  
  console.log("description", description);
  return (
    <div className="p-2 d-flex flex-row">
      <div className="max-width-100 mt-5">
        <CircularProgressbar
          percentage="100"
          text={`Jour ${props.index + 1}`}
          styles={{
            path: { stroke: "orange", height: "100%" },
            text: { fill: "#3D3D3D", fontSize: "18px" },
          }}
        />
      </div>

      <div className="p-2 d-flex flex-column  col-md-8 ml-2">
        <div
          style={{
            color: "#3f51b5",
            fontSize: "18px",
            marginLeft: "3%",
          }}
        >
          <IntlMessages id="title" />{" *"}
        </div>
        <div className="col-md-6">
          <TextField
            className="textfield"
            id="titleProg"
            value={props.values.programs.title}
            onChange={(e) =>
              props.handleChangePrograms(e, "title", props.index)
            }
            SelectProps={{}}
            margin="normal"
            fullWidth
            size="small"
            required
          />
        </div>

        <div
          className="mt-2"
          style={{
            color: "#3f51b5",
            fontSize: "18px",
            marginLeft: "3%",
          }}
        >
          <IntlMessages id="Description" />{" *"}
        </div>

        <div className="p-2 d-flex flex-row col-md-12">
          <div className="col-md-10">
            <TextField
              className="textfield"
              id="descriptionProg"
              value={props.values.programs.description}
              onChange={(e) =>
                props.handleChangePrograms(e, "description", props.index)
              }
              SelectProps={{}}
              margin="normal"
              fullWidth
              size="small"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
