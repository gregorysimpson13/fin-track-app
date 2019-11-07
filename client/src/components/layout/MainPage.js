import React, { Component } from "react";
import Moment from "react-moment";
import CurrencyFormat from "react-currency-format";
//import PropTypes from "prop-types";

import AddButton from "../buttons/AddButton";
import axios from "axios";

export class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      purchases: [],
      showConfirm: false
    };
  }

  deleteEvent = e => {
    console.log(e.target.value);
    const pObj = this.findPurchaseObject(e.target.value);
    console.log(pObj);
    const confirm = window.confirm(
      `Do you really want to delete ${pObj.merchant} Purchase?`
    );
    if (confirm) {
      console.log("del this");
    } else {
      console.log("nahhhh");
    }
  };

  editEvent = e => {
    console.log(e.target.value);
    const pObj = this.findPurchaseObject(e.target.value);
    console.log(pObj);
  };

  findPurchaseObject = id => {
    const pObj = this.state.purchases.find(purchase => {
      return purchase._id === id;
    });
    return pObj;
  };

  componentDidMount = () => {
    axios
      .get("/api/purchase/all")
      .then(result => {
        this.setState({ purchases: result.data });
      })
      .catch(err => {
        if (err.response.status === 401) {
          //window.location.href = "/login";
        }
        console.log(err);
      });
  };

  getPurchases = () => {
    return (
      <div className="details-container container">
        {this.state.purchases.map((value, index) => {
          return (
            <div className="purchase-details" key={index}>
              <ol>
                <li>
                  Price:{" "}
                  <CurrencyFormat
                    value={value.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    fixedDecimalScale={true}
                    decimalScale={2}
                  />
                </li>
                <li>
                  Date: <Moment format="MMM DD YYYY">{value.date}</Moment>
                </li>
                <li>Merchant: {value.merchant}</li>
                <li>Category: {value.category}</li>
                {value.subcategory ? (
                  <li>Sub Category: {value.subcategory}</li>
                ) : null}
                {value.notes ? <li>Notes: {value.notes}</li> : null}
              </ol>
              <div className="modify-buttons">
                <button
                  onClick={this.deleteEvent}
                  value={value._id}
                  className="del-button"
                >
                  Delete
                </button>
                <button
                  onClick={this.editEvent}
                  value={value._id}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2>Purchases</h2>
        {this.getPurchases()}
        <AddButton />
        {this.showConfirm ? <Confirm /> : null}
      </div>
    );
  }
}

export default MainPage;
