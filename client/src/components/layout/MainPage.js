import React, { Component } from "react";
import Moment from "react-moment";

import AddButton from "../buttons/AddButton";
import axios from "axios";

export class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      purchases: []
    };
  }
  componentDidMount = () => {
    axios
      .get("/api/purchase/all")
      .then(result => {
        this.setState({ purchases: result.data });
      })
      .catch(err => {
        if (err.response.status === 401) {
          window.location.href = "/login";
        }
        console.log(err);
      });
  };

  getPurchases = () => {
    return (
      <div className="details-container container">
        <ol>
          {this.state.purchases.map((value, index) => {
            return (
              <ol className="purchase-details" key={index}>
                <li>Price: ${value.price}</li>
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
            );
          })}
        </ol>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2>Purchases</h2>
        {this.getPurchases()}
        <AddButton />
      </div>
    );
  }
}

export default MainPage;
