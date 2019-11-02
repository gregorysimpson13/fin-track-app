// Purchase summary list object
function PurchaseSummaryList(rawDataList) {
  this.purchaseSummaries = [];
  this.parseDataList(rawDataList);
}

// parse the data list
PurchaseSummaryList.prototype.parseDataList = function(rawDataList) {
  for (let rawData of rawDataList) {
    this.lazyAdd(rawData);
  }
};

PurchaseSummaryList.prototype.lazyAdd = function(rawData) {
  for (const purchaseSummary of this.purchaseSummaries) {
    if (purchaseSummary.sameMonthAndYear(rawData.date)) {
      purchaseSummary.addSum(rawData.category, rawData.price);
      return;
    }
  }
  this.add(rawData);
};

PurchaseSummaryList.prototype.add = function(rawData) {
  const purchaseSummary = new PurchaseSummary(rawData.date);
  purchaseSummary.addSum(rawData.category, rawData.price);
  this.purchaseSummaries.push(purchaseSummary);
};

// Purchase Summary Constructor
// Purchase Summary should hold the monthly summary
function PurchaseSummary(stringDate) {
  this.year = this.getYearFromDate(stringDate);
  this.month = this.getMonthFromDate(stringDate);
  this.categories = {};
  this.total = 0.0;
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
  this.total += value;
};

module.exports = PurchaseSummaryList;
