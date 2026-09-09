const Message = require('../models/Message');

const gestoreChat = async (req,res)=>{
    try {
        const myId = req.user._id;
        const contactId = req.params.contactId //ricorda che qui stiamo prendendo il dato dai parametri della get e non da una post

        const message = await Message.find({

            //grazie all'or possiamo trovare i messaggi che io ho inviato al dest e che il dest ha inviato a me
            $or: [
                {sender: myId, receiver: contactId},
                {sender:contactId, receiver: myId}
            ]
        }).sort({createdAt: 1});

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({error: 'Errore nel recupero dei messaggi'});
    }
};

module.exports = {gestoreChat};