import React, { Component } from "react";
import BillItem from "./BillItem";
import CardBox from "../../../../../components/CardBox/index";
import PayBill from "../Payment/PayBill";
import moment from "moment";
import { connect } from "react-redux";
import {SendInvoice} from "../../../../../actions/BillAction"
import ConfirmInvoiceModal from "./ConfirmInvoiceModal"
import {
  unpaidInvoice,
  partiallyPaidInvoice,
  billPaid,
  lateInvoice,
} from "../../../../../config/config";
let invoices = [
  {
    id: 1,
    invoiceNumber: "00001",
    schoolYear: "2019 / 2020",
    gerationDate: "01 / 11 / 2020",
    DataSender: {
      Nom: "Ecole les ulites",
      Adresse: "tunis-sousse",
      Pays: "tunis",
      telephoneNumber: "+216 98 745 632",
      siteInternet: "wwww.ulites.com",
      email: "ulites@gmail.com",
      urlLogoEstablishement: "aws",
      RIB: "string",
    },
    DataRecever: {
      nomParent: "M Marco",
      adresse: "tunis-sousse",
      telephoneNumber: "+216 98 745 632",
      email: "marco@gmail.com",
    },
    serviceList: [
      {
        serviceName: "Cantine",
        unitPrice: "200 ",
        quantity: "1",
        tva: "19%",
        total: "200 ",
      },
      {
        serviceName: "Bus",
        unitPrice: "20 ",
        quantity: "1",
        tva: "19%",
        total: "20 ",
      },
      {
        serviceName: "Club",
        unitPrice: "50 ",
        quantity: "1",
        tva: "19%",
        total: "50 ",
      },
      {
        serviceName: "Technologie",
        unitPrice: "30 ",
        quantity: "1",
        tva: "19%",
        total: "30 ",
      },
    ],
    totalPriceHT: "300 ",
    totalTVA: "57 ",
    totalTTC: "357",
    statusInvoice: 0,
    timeline: [
      {
        date: "05/09/020",
        amount: "120 ",
      },
      {
        date: "05/10/020",
        amount: "120 ",
      },
      {
        date: "05/11/020",
        amount: "120 ",
      },
    ],
    amountToAccount: "100 ",
    totalPayed: "257",
    paymeentconditions:
      "Veuillez trouver votre échéancier prévisionnel ci-contre.Les prélèvements seront effectués sur le RIB suivant : TU76 1745 6985 0458796 13154546",
  },
  {
    id: 2,
    invoiceNumber: "00002",
    schoolYear: "2019 / 2020",
    gerationDate: "01 / 12 / 2020",
    DataSender: {
      Nom: "Ecole les ailles",
      Adresse: "tunis-sousse",
      Pays: "tunis",
      telephoneNumber: "+216 98 745 586",
      siteInternet: "wwww.ulites.com",
      email: "ulites@gmail.com",
      urlLogoEstablishement: "aws",
      RIB: "string",
    },
    DataRecever: {
      nomParent: "Mme Nadia",
      adresse: "tunis-sousse",
      telephoneNumber: "+216 98 745 632",
      email: "ulites@gmail.com",
    },
    serviceList: [
      {
        serviceName: "Cantine",
        unitPrice: "40",
        quantity: "1",
        tva: "19%",
        total: "180",
      },
      {
        serviceName: "Arts plastique",
        unitPrice: "40",
        quantity: "1",
        tva: "19%",
        total: "40",
      },
    ],
    totalPriceHT: "220",
    totalTVA: "41,80",
    totalTTC: "261,80",
    statusInvoice: 1,
    timeline: [
      {
        date: "05/09/020",
        amount: "120",
      },
      {
        date: "05/10/020",
        amount: "120",
      },
      {
        date: "05/11/020",
        amount: "120",
      },
    ],
    amountToAccount: "120",
    totalPayed: 141,
    paymeentconditions:
      "Veuillez trouver votre échéancier prévisionnel ci-contre.Les prélèvements seront effectués sur le RIB suivant : TU76 1745 6985 0458796 13154546",
  },
];
class ListInvoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openPay: false,
      billSelected: {},
      price: "",
      paymentDay: new Date(),
      paymentMethode: "",
      oldPrice: 0,
      priceError: false,
      priceTotal: 0,
      priceRestant: 0,
      invoiceModal:false,
      InvoiceObject:{},
      ReceiverMail:"",
      secondMail:"",
      paymentMethodeError: false,

    };
    this.openPay = this.openPay.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangePaymentType = this.handleChangePaymentType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenInvoiceModal = this.handleOpenInvoiceModal.bind(this);
    this.handleCloseInvoiceModal = this.handleCloseInvoiceModal.bind(this);
    this.handleSubmitInvoice = this.handleSubmitInvoice.bind(this);
    this.handleChange = this.handleChange.bind(this);

    
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };



  handleOpenInvoiceModal=(item)=> {
    console.log('MMMMMMMMMMMMMMMMMMMMMMM')
    this.setState({
      invoiceModal:true,
      InvoiceObject:item
    },()=>console.log('RRRRRRRRRRRRRRR ',this.state.invoiceModal));
  }
  handleCloseInvoiceModal=()=> {
    this.setState({
      invoiceModal:false,
      InvoiceObject:{}
    },()=>console.log('RRRRRRRRRRRRRRR ',this.state.invoiceModal));
  }
  handleSubmitInvoice=(e)=> {
   e.preventDefault()
   console.log('KKKKKKKKKKKK ',this.state.InvoiceObject)
   var mails={}
   mails.ReceiverMail=this.state.ReceiverMail
   mails.secondMail=this.state.secondMail

var data={}
data.mails=mails
data.object=this.state.InvoiceObject
   this.props.SendInvoice(data)
   this.handleCloseInvoiceModal()
  }


  openPay(item) {
    this.setState({
      openPay: true,
      billSelected: item,
      priceTotal: item.totalPayed,
      priceRestant: 0,
    });
  }
  cancelModal() {
    this.setState({
      openPay: false,
      billSelected: {},
      priceError: false,
      price: '',
      priceTotal: 0,
      priceRestant: 0,
      paymentMethode:'',
      paymentMethodeError: false,
    });
  }
  handleChangePaymentType = (key) => (event, value) => {
    this.setState({
      paymentMethode: value,
      paymentMethodeError: false,
    });
  };

  handleChangeInput = (name) => (event) => {
    if (name == "price") {
      let priceError = false;
      priceError =
        this.state.billSelected.totalPayed < parseInt(event.target.value, 10);
      if (priceError) {
        this.setState({
          [name]: event.target.value,
          priceError,
        });
      } else {
        this.setState({
          [name]: event.target.value,
          priceError,
          priceRestant:
            this.state.priceTotal - parseInt(event.target.value, 10),
        });
      }
    } else {
      this.setState({ [name]: event.target.value });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("rrrrrrrrr");
    if (this.state.paymentMethode === "") {
      this.setState({ paymentMethodeError: true });
    }
    // else if (this.state.price > this.props.invoice.bill.total_incl_tax) {
    //   this.setState({ priceError: true });
    // }
    else {
      let data = {};
      if (this.state.billSelected.statusInvoice === partiallyPaidInvoice) {
        const newPrice = parseInt(this.state.price) + this.state.oldPrice;
        if (newPrice > this.state.billSelected.totalPayed) {
          this.setState({ priceError: true });
        }
        // else {
        //   data = { price_paid: newPrice };
        //   this.props.dispatch(
        //     editBill(data, this.state.idPaymentV2, this.props.invoice)
        //   );
        //   this.props.cancelModal();
        // }
      } else {
        data = {
          payment_day: moment(this.state.paymentDay).format("YYYY-MM-DD"),
          payment_methode: this.state.paymentMethode,
          fk_id_profile: this.props.userProfile.id,
          fk_id_bill: this.state.billSelected.id,
          price_invoice: this.state.billSelected.totalPayed,
          price_paid: parseInt(this.state.price),
        };
        console.log(data, "data envoyéééé");
        // this.props.dispatch(payBill(data, this.props.invoice));
      }
    }
  };
  render() {
    return (
      <>
        <div className="row col-lg-12 col-md-12">
          <CardBox styleName="text-black col-lg-12">
            <div className="row d-flex justify-content-center alignement-items-center">
              {invoices.map((element) => (
                <BillItem
                  month={this.props.month}
                  key={element.id}
                  item={element}
                  openPay={this.openPay}
                  handleOpenInvoiceModal = {this.handleOpenInvoiceModal}
                  handleCloseInvoiceModal = {this.handleCloseInvoiceModal}
                  values={this.state}
                  // languageId={this.props.settings.languageId}
                  // idEstablishment={this.props.userProfile.establishment_id}
                  // users={this.props.users}
                />
              ))}
            </div>
          </CardBox>
        </div>
        {this.state.openPay ? (
          <PayBill
            cancelModal={this.cancelModal}
            invoice={this.state.billSelected}
            values={this.state}
            handleChangeInput={this.handleChangeInput}
            handleChangePaymentType={this.handleChangePaymentType}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          " "
        )}

        {
          this.state.invoiceModal===true ?
          <ConfirmInvoiceModal
          values={this.state}
          handleCloseInvoiceModal = {this.handleCloseInvoiceModal}
          handleSubmitInvoice = {this.handleSubmitInvoice}
          handleChange = {this.handleChange}

          
          
          />
          :
          ""
        }
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
  };
};
export default connect(mapStateToProps,{
  SendInvoice
})(ListInvoices);
