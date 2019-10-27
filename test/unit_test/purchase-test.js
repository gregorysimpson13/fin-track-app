const chai = require("chai");
const expect = chai.expect;

const PurchaseSummaryList = require("../../objects/PurchaseSummary");
const purchaseList = [
  {
    date: "2019-10-24T00:00:00.000Z",
    _id: "5db226c106a9c80017c7e03a",
    price: 10.31,
    category: "Food",
    merchant: "Panda Express",
    user: "5db2177661b7f0001713b229",
    __v: 0
  },
  {
    date: "2019-10-24T00:00:00.000Z",
    _id: "5db2664c76b2830017d6023f",
    price: 6.24,
    category: "Food",
    merchant: "Jamba Juice",
    user: "5db2177661b7f0001713b229",
    __v: 0
  },
  {
    date: "2019-10-25T00:00:00.000Z",
    _id: "5db33b829e8f4b0017e0287b",
    price: 130,
    category: "Personal",
    merchant: "Taylor Ranch Self Storage",
    user: "5db2177661b7f0001713b229",
    __v: 0
  },
  {
    date: "2019-10-25T00:00:00.000Z",
    _id: "5db3a55447bdce0017bd2444",
    price: 6.95,
    category: "Personal",
    merchant: "Walmart",
    user: "5db2177661b7f0001713b229",
    notes: "Supplies for vision week and $1 worth of candy",
    __v: 0
  },
  {
    date: "2019-10-25T00:00:00.000Z",
    _id: "5db3a5d247bdce0017bd2445",
    price: 9.44,
    category: "Personal",
    merchant: "Dollar Tree",
    user: "5db2177661b7f0001713b229",
    notes: "Supplies for vision week. Also grabbed $1 water.",
    __v: 0
  },
  {
    date: "2019-12-25T00:00:00.000Z",
    _id: "5db3a5d247bdce0017bd2445",
    price: 9.44,
    category: "Personal",
    merchant: "Dollar Tree",
    user: "5db2177661b7f0001713b229",
    notes: "Supplies for vision week. Also grabbed $1 water.",
    __v: 0
  }
];

const result = [
  {
    month: 10,
    year: 2019,
    categories: [
      { name: "Food", spent: 134.23 },
      { name: "Other", spent: 22.31 }
    ]
  }
];

// describe("Purchase Sync Test", () => {
//   it("Condenses the data", () => {
//     const data = condenseData(purchaseList);
//     console.log(data);
//   });
// });
describe("Purchase Summary Class Test", () => {
  it("tests the person class constructor", () => {
    const pSummaryList = new PurchaseSummaryList(purchaseList);
    console.log(pSummaryList.purchaseSummaries);
  });
});
