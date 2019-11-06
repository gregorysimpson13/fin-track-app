import React, { Component } from "react";
import Moment from "react-moment";
import CurrencyFormat from "react-currency-format";

import AddButton from "../buttons/AddButton";
import axios from "axios";

export class Summary extends Component {
  constructor() {
    super();
    this.state = {
      summary: []
    };
  }
  componentDidMount = () => {
    axios
      .get("/api/purchase/summary")
      .then(result => {
        this.setState({ summary: result.data });
      })
      .catch(err => {
        if (err.response.status === 401) {
          window.location.href = "/login";
        }
        console.log(err);
      });
  };

  getSummary = () => {
    return (
      <div className="details-container container">
        {this.state.summary.map((value, index) => {
          const momentDate = `${value.year}-${value.month}`;
          return (
            <div key={index} className="monthly-summary">
              <h4>
                <Moment format="MMM YYYY">{momentDate}</Moment>
              </h4>
              {Object.entries(value.categories).map((category, val) => {
                return (
                  <h5 key={val}>
                    {category[0]}{" "}
                    <CurrencyFormat
                      value={category[1]}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </h5>
                );
              })}
              <h5>
                Total:{" "}
                <CurrencyFormat
                  value={value.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  fixedDecimalScale={true}
                  decimalScale={2}
                />
              </h5>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2>Summary</h2>
        {this.getSummary()}
        <AddButton />
      </div>
    );
  }
}

export default Summary;
