import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PrintIcon from '@material-ui/icons/Print';
import IntlMessages from "../../../../../util/IntlMessages";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    height: 500,
    width: 600,

  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>

      ) : null}
    </MuiDialogTitle>
  );
});


function MaterialVisualisation({ setOpenModal }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <IntlMessages id="training.materials.title.support" />
        </DialogTitle>
        <Button variant="contained">
          <IntlMessages id="training.materials.page" /> &nbsp; &nbsp; 1/1 &nbsp; &nbsp; &nbsp;
          <SaveAltIcon /> &nbsp; &nbsp;
          <PrintIcon />
        </Button>
      </Dialog>
    </div>
  );
}

export default MaterialVisualisation;

