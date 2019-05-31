const express = require('express');

const router = express.Router();

const DonationController = require('../controllers/donations');

router.post('', DonationController.criarDonation);

router.get('', DonationController.getDonations);

router.get('/:id', DonationController.getDonations);

module.exports = router;
