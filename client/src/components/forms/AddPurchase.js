import React, { Component } from "react";
import axios from "axios";

export class AddPurchase extends Component {
  constructor() {
    super();
    this.state = {
      price: "",
      date: "",
      category: "",
      merchant: "",
      subcategory: "",
      notes: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const purchaseData = {
      price: this.state.price,
      date: this.state.date,
      category: this.state.category,
      merchant: this.state.merchant,
      subcategory: this.state.subcategory,
      notes: this.state.notes
    };
    axios
      .post("/api/purchase/add", purchaseData)
      .then(result => {
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="add-content container">
        <div className="required-text">
          <span className="required">*</span> Required
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="price-container">
            <label htmlFor="price">
              Purchase Price <span className="required">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step=".01"
              onChange={this.onChange}
            />
          </div>
          <div className="date-container">
            <label htmlFor="date">
              Purchse Date <span className="required">*</span>
            </label>
            <input type="date" name="date" id="date" onChange={this.onChange} />
          </div>
          <div className="category-container">
            <label htmlFor="category">
              Category <span className="required">*</span>
            </label>
            <select name="category" id="category" onChange={this.onChange}>
              <option value="Donations">Donations</option>
              <option value="Investment">Investment</option> -->
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Food">Food</option>
              <option value="Insurance">Insurance</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Loan">Loans</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
          <div className="merchant-container">
            <label htmlFor="merchant">
              Merchant <span className="required">*</span>
            </label>
            <input
              type="text"
              name="merchant"
              id="merchant"
              onChange={this.onChange}
            />
          </div>
          <div className="subcategory-container">
            <label htmlFor="subcategory">Sub Category</label>
            <input
              type="text"
              name="subcategory"
              id="subcategory"
              onChange={this.onChange}
            />
          </div>
          <div className="notes">
            <label htmlFor="notes">Notes</label>
            <textarea
              type="text"
              name="notes"
              id="notes"
              onChange={this.onChange}
            ></textarea>
          </div>
          <div className="submit-container">
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddPurchase;
