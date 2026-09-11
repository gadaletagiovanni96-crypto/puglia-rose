const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const isLoggedIn = require('../middleware/authMiddleware');

router.post('/buy', isLoggedIn, ticketController.buyTicket);
router.post('/rimuovi', isLoggedIn, ticketController.resoBiglietto);
router.post('/scan', isLoggedIn, (req,res,next) => {
        if(!['scansionatore', 'organizzatore'].includes(req.user.role)) {
            return res.status(403).json({message: 'Accesso negato'})
        }
        next();
    }, ticketController.scanTicket);

router.get('/my-tickets', isLoggedIn, ticketController.getMyTickets);

module.exports = router;