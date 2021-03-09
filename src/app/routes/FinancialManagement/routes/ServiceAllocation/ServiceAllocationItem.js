import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import 'jspdf-autotable';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
const styles = (theme) => ({
  textColorPrimary: {
    color: '#FFFFFF',
  },
});
const useStyles = makeStyles({
  header: {
    backgroundColor: 'transparent',
    color: 'yellow',
    boxShadow: '0px 0px 0px 0px',
  },
});

class ServiceAllocationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    /* eslint eqeqeq: "off" */
    // const { classes } = this.props;
    const classes = useStyles;

    let { name, surname, name_ar, surname_ar, level, services, photo } = this.props.allocationItem;
    var item = this.props.allocationItem;
    return (
      <div className=" row col-lg-12 col-md-12 pt-2 ml-3 d-flex  ">
        <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
          {photo ? (
            <Avatar align="left" className="size-50" alt="..." src={photo} />
          ) : (
            <Avatar align="left" className="size-50" alt="..." src="https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-1.png" />
          )}
        </div>

        <div className="d-flex flex-row col-lg-11 col-md-10 col-sm-11  justify-content-start align-items-center ">
          <AppBar
            position="relative"
            color="transparent"
            position="sticky"
            className={classes.header}
            // style={{
            //   borderTopRightRadius: '12px',
            //   borderBottomRightRadius: '12px',
            //   borderTopLeftRadius: '12px',
            //   borderBottomLeftRadius: '12px',
            //   border: '1px solid #abada8',
            //   height: '100%',
            //    backgroundColor: 'red',
            // }}
          >
            <Tabs value={false} variant="scrollable" scrollButtons="on" textColor="primary">
              <Tab
                textColor="primary"
                style={{
                  minWidth: '200px',
                  textColor: '#FFFFFF',
                  marginTop: '10px',
                }}
                textColorPrimary="secondary	"
                icon={
                  <div className=" justify-content-start align-items-center ">
                    {this.props.languageId === 'tunisia' ? (
                      <h3>
                        {name_ar} {surname_ar}{' '}
                      </h3>
                    ) : (
                      <h3>
                        {surname} {name}
                      </h3>
                    )}
                  </div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <div
                    style={{
                      borderWidth: 'thin',
                      borderStyle: 'solid',
                      borderColor: '#979A9A',
                      height: '30px',
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF' }}
                icon={
                  <div>
                    <h3 style={{ marginBottom: '0px', fontSize: '15px' }}>{item.Class.name}</h3>
                  </div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <div
                    style={{
                      borderWidth: 'thin',
                      borderStyle: 'solid',
                      borderColor: '#979A9A',
                      height: '30px',
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF' }}
                icon={
                  <div>
                    <h3 style={{ marginBottom: '0px', fontSize: '15px' }}>{level.name}</h3>
                  </div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <div
                    style={{
                      borderWidth: 'thin',
                      borderStyle: 'solid',
                      borderColor: '#979A9A',
                      height: '30px',
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '390px' }}
                icon={
                  <div>
                    {services.map((element, index) => {
                      return <i key={index} className={`${element.service_v2.path_img_service}`} style={{ color: 'primary' }}></i>;
                    })}
                  </div>
                }
              />

              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <div
                    className="d-flex"
                    style={{
                      borderWidth: 'thin',
                      borderStyle: 'solid',
                      borderColor: '#979A9A',
                      height: '30px',
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <div
                    onClick={(e) => {
                      this.props.handleEdit(item);
                    }}
                  >
                    Modifier
                  </div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <div
                    className="d-flex"
                    style={{
                      borderWidth: 'thin',
                      borderStyle: 'solid',
                      borderColor: '#979A9A',
                      height: '30px',
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <i
                    className="zmdi zmdi-eye zmdi-hc-2x"
                    style={{
                      color: 'text-grey',
                    }}
                  />
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <div
                    className="d-flex"
                    style={{
                      borderWidth: 'thin',
                      borderStyle: 'solid',
                      borderColor: '#979A9A',
                      height: '30px',
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: '#FFFFFF', minWidth: '10px' }}
                icon={
                  <i
                    className="zmdi zmdi-delete zmdi-hc-2x "
                    style={{
                      color: 'text-grey',
                    }}
                    onClick={(e) => {
                      this.props.handleDelete(this.props.item);
                    }}
                  />
                }
              />
            </Tabs>
          </AppBar>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(ServiceAllocationItem));
