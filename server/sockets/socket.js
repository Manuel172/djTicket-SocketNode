const { io } = require('../server');
const { TicketControl } = require('../clases/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    // envia mensaje al cliente
    client.emit('estadoActual', {
        actual: ticketControl.ultimoTicket(),
        ultimosTickets: ticketControl.ultimosCuatro()
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    //Atender Ticket, escucha petición del cliente
    client.on('atenderTicket', (data, callback) => {
        if (!data.modulo) {
            return callback({
                ok: false,
                message: 'Debe ingresar el modulo de atención'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.modulo);
        callback(atenderTicket);
        // emitir a todos los cliente para actualizar los ultimos 4 ticket en pantalla
        client.broadcast.emit('ultimos4', {
            ultimosTickets: ticketControl.ultimosCuatro()
        });
    });

});