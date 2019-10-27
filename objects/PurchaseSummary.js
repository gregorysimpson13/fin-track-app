function PurchaseSummaryList(rawDataList) {
  this.purchaseSummaries = [];
  this.parseDataList(rawDataList);
}

PurchaseSummaryList.prototype.parseDataList = function(rawDataList) {
  if (rawDataList.length === 0) {
    return;
  }
  this.add(rawDataList[0]);
  for (
    let rawDataIndex = 1;
    rawDataIndex < rawDataList.length;
    rawDataIndex++
  ) {
    const rawData = rawDataList[rawDataIndex];
    const { date, category, price } = rawDataList[rawDataIndex];
    for (const pSummary of this.purchaseSummaries) {
      if (pSummary.sameMonthAndYear(date)) {
        pSummary.addSum(category, price);
      } else if (
        this.purchaseSummaries.indexOf(pSummary) ===
        this.purchaseSummaries.length - 1
      ) {
        this.add(rawData);
      }
    }
  }
};

PurchaseSummaryList.prototype.add = function(rawData) {
  const purchaseSummary = new PurchaseSummary(rawData.date);
  purchaseSummary.addSum(rawData.category, rawData.price);
  this.purchaseSummaries.push(purchaseSummary);
};

// Purchase Summary Constructor
function PurchaseSummary(stringDate) {
  this.year = this.getYearFromDate(stringDate);
  this.month = this.getMonthFromDate(stringDate);
  this.categories = {};
}

// Has same month and year
PurchaseSummary.prototype.sameMonthAndYear = function(date) {
  const localMonth = this.getMonthFromDate(date);
  if (localMonth !== this.month) return false;
  const localYear = this.getYearFromDate(date);
  return localYear === this.year;
};
PurchaseSummary.prototype.getMonthFromDate = function(date) {
  const parsedDate = typeof date !== Date ? new Date(date) : date;
  return parsedDate.getMonth() + 1;
};
PurchaseSummary.prototype.getYearFromDate = function(date) {
  const parsedDate = typeof date !== Date ? new Date(date) : date;
  return parsedDate.getYear() + 1900;
};
PurchaseSummary.prototype.addCategory = function(category) {
  if (category in this.categories) {
    return;
  }
  this.categories[category] = 0.0;
};
PurchaseSummary.prototype.addSum = function(category, value) {
  // make sure the category exist
  this.addCategory(category);
  this.categories[category] += value;
};
// const date1 = "2019-12-25T00:00:00.000Z";
// const date2 = "2019-11-25T00:00:00.000Z";
// const date3 = "2020-12-25T00:00:00.000Z";

// const test = new PurchaseSummary(date1);
// console.log(test);
// console.log(test.sameMonthAndYear(date1));
// console.log(test.sameMonthAndYear(date2));
// console.log(test.sameMonthAndYear(date3));

// test.addCategory("Food");
// console.log(test);
// test.addCategory("Food");
// console.log(test);
// test.addSum("Food", 23.12);
// test.addSum("Food", 11.43);
// console.log(test);

module.exports = PurchaseSummaryList;
