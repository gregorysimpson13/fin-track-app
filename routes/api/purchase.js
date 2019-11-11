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
// @desc    get all purchase for user
// @access  PRIVATE
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Purchase.find({ user: req.user })
      .sort({ date: -1 })
      .then(purchases => {
        if (!purchases) {
          return req.json();
        }
        return res.json(purchases);
      });
  }
);

// @route   GET api/purchase/summary
// @desc    get summary for user
// @access  PRIVATE
router.get(
  "/summary",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Purchase.find({ user: req.user })
      .then(purchases => {
        if (!purchases) {
          return req.json();
        }
        const pSummaryList = new PurchaseSummaryList(purchases);
        return res.json(pSummaryList.purchaseSummaries);
      })
      .catch(err => {
        console.log(err);
      });
  }
);

// @route   DELETE api/purchase/:id
// @desc    get specific purchase for user
// @access  PRIVATE
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Purchase.findById(req.params.id).then(purchase => {
      if (!purchase) {
        return req.json({ error: "unable to find id" });
      }
      if (purchase.user.toString() !== req.user.id.toString()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      purchase
        .remove()
        .then(val => {
          return res.json({ message: "object removed" });
        })
        .catch(err => {
          return res.json({ error: "could not remove object" });
        });
    });
  }
);

// @route   POST api/purchase/edit/:id
// @desc    get all purhcases for user
// @access  PRIVATE
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Purchase.findById(req.params.id).then(purchase => {
      if (!purchase) {
        return req.json({ error: "unable to find id" });
      }
      if (purchase.user.toString() !== req.user.id.toString()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const { price, date, category, merchant, subcategory, notes } = req.body;
      purchase.price = price;
      const d = new Date(date);
      if (d.getTime() !== new Date(purchase).getTime()) {
        purchase.date = d.getTime() + 60000000;
      }
      purchase.category = category;
      purchase.merchant = merchant;
      purchase.subcategory = subcategory;
      purchase.notes = notes;
      purchase
        .save()
        .then(p => {
          return res.json(p);
        })
        .catch(err => console.log(err));
    });
  }
);

// @route   GET api/purchase/:id
// @desc    get specific purchase for user
// @access  PRIVATE
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Purchase.findById(req.params.id).then(purchase => {
      if (!purchase) {
        return req.json({ error: "unable to find id" });
      }
      if (purchase.user.toString() !== req.user.id.toString()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      return res.json(purchase);
    });
  }
);

module.exports = router;
