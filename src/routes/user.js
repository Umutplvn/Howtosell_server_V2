"use strict";
/* -------------------------------------------------------
    EXPRESSJS - How To Sell Project
------------------------------------------------------- */
const router=require('express').Router()
const User=require('../controllers/user')
const UserModel = require('../models/user')

router.post('/create', User.create)
// Opt in an EXISTING application. Never create a duplicate lead.
router.post('/waitlist', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || req.body?.consent !== true) {
    return res.status(400).json({ error: true, message: 'Valid email and explicit consent are required.' });
  }
  try {
    const lead = await UserModel.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!lead) return res.status(404).json({ error: true, message: 'Application not found. Please use the email from your application.' });
if (!['Under €10,000', '€5,000–€10,000'].includes(lead.investment)) {
  return res.status(400).json({
    error: true,
    message: 'Waitlist is available for lower-budget applicants.'
  });
}    lead.joinedWaitlist = true;
    if (!lead.waitlistJoinedAt) lead.waitlistJoinedAt = new Date();
    await lead.save();
    return res.json({ error: false, message: 'You have joined the waitlist.' });
  } catch (err) {
    console.error('Waitlist save error:', err);
    return res.status(500).json({ error: true, message: 'Unable to save waitlist request.' });
  }
});
router.put('/update/:userId', User.update)
router.get('/list', User.list)
router.delete('/delete', User.delete)



module.exports = router;
