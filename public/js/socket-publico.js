var socket = io();

var ticket1 = $('#lblTicket1');
var escritorio1 = $('#lblEscritorio1');
var ticket2 = $('#lblTicket2');
var escritorio2 = $('#lblEscritorio2');
var ticket3 = $('#lblTicket3');
var escritorio3 = $('#lblEscritorio3');
var ticket4 = $('#lblTicket4');
var escritorio4 = $('#lblEscritorio4');

var arrTicket = [ticket1, ticket2, ticket3, ticket4];
var arrEscritorios = [escritorio1, escritorio2, escritorio3, escritorio4];

// los on = escuchar desde el server
socket.on('connect', function() {
    console.log('conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Perdida de conexión al servidor');
});

// on = escuchar mensajes del servidor
socket.on('estadoActual', function(data) {
    actualizaHtml(data.ultimosTickets);
});

socket.on('ultimos4', function(data) {
    audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHtml(data.ultimosTickets);
});

function actualizaHtml(ultimos4) {
    console.log('ultimos: ', ultimos4);
    for (var i = 0; i < ultimos4.length; i++) {
        arrTicket[i].text('Ticket ' + ultimos4[i].numero);
        arrEscritorios[i].text('Modulo ' + ultimos4[i].modulo);
    }
}