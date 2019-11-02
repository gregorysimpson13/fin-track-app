const chai = require("chai");
const expect = chai.expect;

const PurchaseSummaryList = require("../../objects/PurchaseSummary");
const purchaseList = [
  {
    date: "2019-10-24T00:00:00.000Z",
    price: 10.31,
    category: "Food",
    merchant: "Panda Express"
  },
  {
    date: "2019-10-24T00:00:00.000Z",
    price: 6.24,
    category: "Food",
    merchant: "Jamba Juice"
  },
  {
    date: "2019-10-25T00:00:00.000Z",
    price: 130,
    category: "Personal",
    merchant: "Taylor Ranch Self Storage"
  },
  {
    date: "2019-10-25T00:00:00.000Z",
    price: 6.95,
    category: "Personal",
    merchant: "Walmart"
  },
  {
    date: "2019-10-25T00:00:00.000Z",
    price: 1.0,
    category: "Personal",
    merchant: "Dollar Tree"
  },
  {
    date: "2019-12-25T00:00:00.000Z",
    price: 9.44,
    category: "Personal",
    merchant: "Dollar Tree"
  }
];

const result = [
  {
    year: 2019,
    month: 10,
    categories: { Food: 16.65, Personal: 137.95 },
    total: 154.7
  },
  { year: 2019, month: 12, categories: { Personal: 18.88 }, total: 18.88 }
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
