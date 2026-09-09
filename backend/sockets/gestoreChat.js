const Message = require('../models/Message');

module.exports = (io) => {
    // Quando un frontend si connette al "tubo"
    io.on('connection', (socket) => {
        console.log(`Nuovo client connesso a Socket.io: ${socket.id}`);

        // 1. L'utente entra in una chat room privata
        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`Client ${socket.id} è entrato nella stanza: ${roomId}`);
        });

        // 2. L'utente invia un messaggio
        socket.on('send_message', async (data) => {
            try {
                // data conterrà: { senderId, receiverId, roomId, text }
                
                // Salviamo prima il messaggio su MongoDB così non andrà mai perso
                const newMessage = new Message({
                    sender: data.senderId,
                    receiver: data.receiverId,
                    text: data.text
                });
                await newMessage.save();

                // Inoltriamo il messaggio in tempo reale A TUTTI quelli nella stanza
                io.to(data.roomId).emit('receive_message', newMessage);
            } catch (error) {
                console.error('Errore nel salvataggio del messaggio:', error);
            }
        });

        // Quando l'utente chiude la pagina
        socket.on('disconnect', () => {
            console.log(`Client disconnesso: ${socket.id}`);
        });
    });
};