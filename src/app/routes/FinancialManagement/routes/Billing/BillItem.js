import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IntlMessages from "../../../../../util/IntlMessages";
import "jspdf-autotable";
import jsPDF from "jspdf";
import DetailsBill from "./DetailsBill";
import {
  invoiceNotificationWithMail,
  invoiceNotificationWithSMS,
} from "../../../../../actions/BillAction";
import { connect } from "react-redux";
import PayBill from "../Payment/PayBill";
import {
  unpaidInvoice,
  partiallyPaidInvoice,
  billPaid,
  lateInvoice,
} from "../../../../../config/config";
import { url } from "../ServiceAllocation/photo";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  textColorPrimary: {
    color: "#FFFFFF",
  },
});

export class BillItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDetails: false,
      payBill: false,
    };

    this.handleDetails = this.handleDetails.bind(this);
    this.handleCancelDetails = this.handleCancelDetails.bind(this);
    this.SendMail = this.SendMail.bind(this);
    this.sendSMS = this.sendSMS.bind(this);
  }

  sendSMS() {
    let data = this.props.item;
    let dataForNotif = {
      bill: data.bill,
      parent: data.student.student_parents[0].parent.profile.user,
    };
    this.props.dispatch(invoiceNotificationWithSMS(dataForNotif));
  }
  SendMail() {
    let data = this.props.item;
    let dataForNotif = {
      service_v2: data.service_v2,
      bill: data.bill,
      parent: data.student.student_parents[0].parent.profile.user,
    };
    this.props.dispatch(invoiceNotificationWithMail(dataForNotif));
  }

  handleDetails() {
    this.setState({ openDetails: true });
  }

  handleCancelDetails() {
    this.setState({ openDetails: false });
  }

  ///// Générer une facture //////////////////

  jsPdfGenerator = () => {
    let bill = this.props.item;
    var doc = new jsPDF("p", "pt", "a4", true);
    var imgData = url;

    doc.addImage(imgData, "JPEG", 485, 20, 80, 80);
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 255);
    doc.text(20, 50, "Facture N°: " + bill.bill.reference);
    doc.text(350, 50, "2020/2021");

    doc.setFontType("times");
    doc.setTextColor(0, 0, 0);
    doc.text(
      350,
      140,
      "M. ou Mme " +
        bill.student.student_parents[0].parent.profile.user.name +
        " " +
        bill.student.student_parents[0].parent.profile.user.surname
    );
    doc.text(
      350,
      160,
      "adresse : " + bill.student.student_parents[0].parent.profile.user.address
    );
    doc.text(
      350,
      180,
      "Code Postal : " +
        bill.student.student_parents[0].parent.profile.user.zip_code
    );

    doc.text(20, 140, "De ADN EXPERTISE ");
    doc.text(20, 160, "Rue : Cyber Parc ,Sousse");
    doc.text(20, 180, "Tel:+216 *******");
    doc.text(20, 200, "Email: Adn-Expertise@gmail.com");

    doc.setFontType("bold");
    doc.text(20, 240, "Facture des prestations:");
    doc.setFontType("times");
    doc.text(
      20,
      260,
      " L'élève " +
        bill.student.profile.user.name +
        " " +
        bill.student.profile.user.surname +
        " ( " +
        bill.student.class.name +
        " )"
    );

    var columns = [
      "ID",
      "Description",
      "Quantité",
      "Prix unitaire HT",
      "TVA",
      "TOTAL TTC",
    ];
    var rows = [
      [1, "Bus", "3", "15 DT", "6 DT", "21 DT"],
      [2, "Cantine", "3", "30 DT", "6DT", "36 DT"],
      [3, "Inscription", "1", "100 DT", "20 DT", "120 DT"],
      [, "", "", "", ""],
      [, "", "", "", "Total HT", "200 DT"],
      [, "", "", "", "TVA", "20 DT"],
      [, "", "", "", "Total TTC", "220 DT"],
    ];
    var rowsDynamiq = [];

    bill.service_v2.map((element) =>
      rowsDynamiq.push([
        element.id,
        element.name_fr_service,
        "1",
        element.price_service,
        element.vat_service + " %",
        (element.price_service * (element.vat_service + 100)) / 100,
      ])
    );

    rowsDynamiq.push([, "", "", "", ""]);
    rowsDynamiq.push([, "", "", "", "Total HT", bill.bill.total_excl_tax]);
    rowsDynamiq.push([, "", "", "", "TVA", bill.bill.total_vat + " %"]);
    rowsDynamiq.push([, "", "", "", "Total TTC", bill.bill.total_incl_tax]);

    doc.autoTable(columns, rowsDynamiq, { margin: { top: 300 } });

    doc.save(bill.bill.reference);
  };
  /////////////////////////////////////////
  render() {
    const { classes } = this.props;
    let element = this.props.item;
    let statusInvoice = element.statusInvoice;
    const statusStyle =
      statusInvoice === unpaidInvoice
        ? "text-white bg-danger"
        : statusInvoice === partiallyPaidInvoice
        ? "bg-amber"
        : statusInvoice === billPaid
        ? "text-white bg-success"
        : "text-white bg-warning";

    const status =
      statusInvoice === unpaidInvoice ? (
        <IntlMessages id="filter.unpaid.service" />
      ) : statusInvoice === partiallyPaidInvoice ? (
        <IntlMessages id="invoice.partially.paid" />
      ) : statusInvoice === billPaid ? (
        <IntlMessages id="filter.paid.service" />
      ) : (
        <IntlMessages id="invoice.late" />
      );

      console.log('Itemlmmmmmmmmm ',this.props.item)

    return (
      <div className=" row col-lg-12 col-md-12 pt-2 d-flex justify-content-center alignement-items-center">
        <div className="d-flex flex-row col-lg-12 col-md-12 justify-content-start align-items-center ">
          <AppBar
            position="relative"
            style={{
              borderTopRightRadius: "80px",
              borderBottomRightRadius: "80px",
              borderTopLeftRadius: "80px",
              borderBottomLeftRadius: "80px",
              border: "1px solid #abada8",
              height: "100%",
              backgroundColor: "#4a3ea3",
              fontSize: "15px",
            }}
          >
            <Tabs
              value={false}
              // onChange={this.handleChange}
              variant="scrollable"
              scrollButtons="on"
              textColor="primary"
            >
              <Tab
                style={{ width: "45%", textColor: "#FFFFFF" }}
                icon={
                  <div
                    style={{ textAlign: "left" }}
                    className={classes.textColorPrimary}
                  >
                    <h3 style={{ marginBottom: "0px" }}>
                      {element.invoiceNumber}
                    </h3>
                  </div>
                }
              />

              {this.props.month == "" ? (
                <Tab
                  style={{ backgroundColor: "#FFFFFF" }}
                  icon={
                    <h3 style={{ marginBottom: "0px", fontSize: "15px" }}>
                      {element.gerationDate}
                    </h3>
                  }
                />
              ) : (
                ""
              )}
              <Tab
                style={{ backgroundColor: "#FFFFFF", minWidth: "10px" }}
                icon={
                  <div
                    style={{
                      borderWidth: "thin",
                      borderStyle: "solid",
                      borderColor: "#979A9A",
                      height: "30px",
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: "#FFFFFF", minWidth: "260px" }}
                icon={
                  <h3 style={{ marginBottom: "0px", fontSize: "15px" }}>
                    {element.DataRecever.nomParent}
                  </h3>
                }
              />

              <Tab
                style={{ backgroundColor: "#FFFFFF", minWidth: "10px" }}
                icon={
                  <div
                    style={{
                      borderWidth: "thin",
                      borderStyle: "solid",
                      borderColor: "#979A9A",
                      height: "30px",
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: "#FFFFFF", minWidth: "250px" }}
                icon={
                  <h3 style={{ marginBottom: "0px", fontSize: "15px" }}>
                    {" "}
                    Montant : {element.totalPayed} DT
                  </h3>
                }
              />

              <Tab
                style={{ backgroundColor: "#FFFFFF", minWidth: "10px" }}
                icon={
                  <div
                    style={{
                      borderWidth: "thin",
                      borderStyle: "solid",
                      borderColor: "#979A9A",
                      height: "30px",
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: "#FFFFFF", minWidth: "200px" }}
                icon={
                  <div
                    style={{ marginBottom: "0px" }}
                    className={` badge text-uppercase ${statusStyle}`}
                  >
                    {status}
                  </div>
                }
              />

              <Tab
                style={{ backgroundColor: "#FFFFFF", minWidth: "10px" }}
                icon={
                  <div
                    className="d-flex"
                    style={{
                      borderWidth: "thin",
                      borderStyle: "solid",
                      borderColor: "#979A9A",
                      height: "30px",
                    }}
                  ></div>
                }
              />
              <Tab
                style={{ backgroundColor: "#FFFFFF", minWidth: "200px" }}
                icon={
                  <div>
                    <i
                      size="small"
                      className=" zmdi zmdi-download zmdi-hc-2x"
                      style={{
                        color: "text-grey",
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
                      onClick={this.jsPdfGenerator}
                    />
                    <i
                      className="zmdi zmdi-eye zmdi-hc-2x"
                      style={{
                        color: "text-grey",
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
                      // onClick={this.handleDetails}
                    />
                    <i
                      className="zmdi zmdi-email zmdi-hc-2x"
                      style={{
                        color: "text-grey",
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
              
                    onClick={()=>this.props.handleOpenInvoiceModal(this.props.item)}
                    />
                    <i
                      className="zmdi zmdi-smartphone-android zmdi-hc-2x"
                      style={{
                        color: "text-grey",
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
                      // onClick={this.sendSMS}
                    />
                  </div>
                }
              />
              {/* {this.props.item.bill.status !== billPaid ? ( */}
              <Tab
                icon={
                  <p
                    onClick={(e) => {
                      this.props.openPay(element);
                    }}
                    className=" mt-auto mb-0 pointer"
                  >
                    <b className={classes.textColorPrimary}>
                      {<IntlMessages id="button.proceedToThePayment" />}
                    </b>
                  </p>
                }
              />
              {/* ) : ""} */}
            </Tabs>
          </AppBar>
        </div>
        {/* <DetailsBill
          data={element}
          // openDetail={this.state.openDetails}
          // cancel={this.handleCancelDetails}
        /> */}
      </div>
    );
  }
}

export default withStyles(styles)(connect()(BillItem));
