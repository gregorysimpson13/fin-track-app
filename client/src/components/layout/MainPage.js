import React, { Component } from "react";
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
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "Authorization"
    );
    axios
      .get("/api/purchase/all")
      .then(result => {
        console.log(result);
        this.setState({ purchases: result.data });
      })
      .catch(err => console.log(err));
  };

  getPurchases = () => {
    return (
      <div className="details-container container">
        <ol>
          {this.state.purchases.map((value, index) => {
            console.log(value);
            return (
              <ol className="purchase-details" key={index}>
                <li>Price: {value.price}</li>
                <li>Date: {value.date}</li>
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
