var socket = io();
// socket-escritorio.js trabaja en conjunto con la escritorio.html en el lado del cliente

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Debe Ingresar Modulo de Atención');
}
var modulo = searchParams.get('escritorio');
$('#escritorio').text('Escritorio N°' + modulo);


// los on = escuchar desde el server
socket.on('connect', function() {
    console.log('conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Perdida de conexión al servidor');
});

$('button').on('click', function() {
    socket.emit('atenderTicket', { modulo: modulo }, function(RespTicket) {
        // console.log('Respuesta del Servidor: ', RespTicket.numero);
        if (RespTicket === 'No existen Ticket') {
            $('#atiende').text(RespTicket);
            alert(RespTicket);
            return;
        }
        $('#atiende').text(RespTicket.numero);
    });
});