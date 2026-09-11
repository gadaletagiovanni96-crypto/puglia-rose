const crypto = require('crypto');
const Ticket = require('../models/Tickets');

const buyTicket = async (req, res) => {
    try {
        const qrToken = crypto.randomBytes(20).toString('hex');
        
        const newTicket = new Ticket({
            owner: req.user._id,
            qrCodeToken: qrToken
        });

        await newTicket.save();
        res.status(201).json({ message: 'Biglietto acquistato con successo!', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ error: 'Errore durante l\'acquisto del biglietto' });
    }
};

const resoBiglietto = async (req,res) => {
    try {
        const {ticketId} = req.body;
        
        await Ticket.findOneAndDelete({qrCodeToken: ticketId});
        res.status(201).json({message:'Biglietto rimosso con successo'});
    } catch (error) {
        res.status(500).json({error: 'Errore nella rimozione del biglietto'});
    }
}

const getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ owner: req.user._id });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero dei biglietti' });
        console.error(error);
    }
};

const scanTicket = async (req,res)=>{
    try {
        const {qrCodeToken} = req.body;
        if(!qrCodeToken){
            return res.status(400).json({message: 'Nessun QR code fornito'});
        }
        const ticket = await Ticket.findOne({qrCodeToken});

        if(!ticket){
            return res.status(404).json({message:'Nessuna corrispondenza di biglietto'});
        }

        if(ticket.isScanned){
            return res.status(400).json({message:'Il biglietto è stato già scansionato', scannedAt: ticket.scannedAt});
        }

        //se ha superato tutti i controlli aggiorno la scansione e salvo
        ticket.isScanned = true;
        ticket.scannedAt = new Date();

        await ticket.save();
        res.status(200).json({message:'Biglietto validato', ticket});

    } catch (error) {
        res.status(500).json({error: 'Errore durante la validazione del biglietto!'});
    }
}

module.exports = {buyTicket, getMyTickets, scanTicket, resoBiglietto};
