var socket = io();
// socket-nuevo-ticket.js trabaja en conjunto con la pagina nuevo-ticket.html en el lado del cliente

var label = $('#lblNuevoTicket');

// los on = escuchar desde el server
socket.on('connect', function() {
    console.log('conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Perdida de conexión al servidor');
});

$('button').on('click', function() {
    // emit= envia  o emite informacion al servidor
    socket.emit('siguienteTicket', null, function(RespTicket) {
        console.log('Respuesta del Servidor: ', RespTicket);
        label.text(RespTicket);
    });
});

// on = escuchar mensajes del servidor
socket.on('estadoActual', function(TicketActual) {
    console.log('Mensaje Servidor: ', TicketActual);
    label.text(TicketActual.actual);
});