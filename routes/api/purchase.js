const express = require("express");
const passport = require("passport");

const PurchaseSummaryList = require("../../objects/PurchaseSummary");

const router = express.Router();

// load Purchase model
const Purchase = require("../../models/Purchase");

// @route   POST api/purchase/add
// @desc    add a purhcase
// @access  PRIVATE
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // hack to make sure its the correct date (add one second)
    const date = new Date(new Date(req.body.date).getTime() + 60000000);
    const purchaseData = {
      price: req.body.price,
      date,
      category: req.body.category,
      subcategory: req.body.subcategory,
      merchant: req.body.merchant,
      user: req.user
    };
    if (req.body.subcategory !== "")
      purchaseData["subcategory"] = req.body.subcategory;
    if (req.body.notes !== "") purchaseData["notes"] = req.body.notes;
    new Purchase(purchaseData)
      .save()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  }
);

// @route   GET api/purchase/all
// @desc    get all purhcases for user
// @access  PRIVATE
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Purchase.find({ user: req.user }).then(purchases => {
      if (!purchases) {
        return req.json();
      }
      return res.json(purchases);
    });
  }
);

// @route   GET api/purchase/all
// @desc    get all purhcases for user
// @access  PRIVATE
router.get(
  "/summary",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Purchase.find({ user: req.user }).then(purchases => {
      if (!purchases) {
        return req.json();
      }
      const pSummaryList = new PurchaseSummaryList(purchases);
      return res.json(pSummaryList.purchaseSummaries);
    });
  }
);

module.exports = router;
