const express = require('express');
const router = express.Router();
const gestoreMessaggi = require('../controllers/messageController');
const isLoggedIn = require('../middleware/authMiddleware');

router.get('/:contactId', isLoggedIn, (req,res,next)=> {
    if(!['organizzatore', 'fornitore'].includes(req.user.role)){
        return res.status(403).json({message: 'Accesso negato'});
    }
    next();
}, gestoreMessaggi.gestoreChat);

module.exports = router;