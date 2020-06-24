const fs = require('fs');
// ticket-control.js trabaja en conjunto con socket.js en el lado server

class Ticket {
    constructor(numero, modulo) {
        this.numero = numero;
        this.modulo = modulo;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosTickets = [];
        let data = require('../data/data.json');
        console.log(data);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosTickets = data.ultimosTickets;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo = this.ultimo + 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    ultimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    ultimosCuatro() {
        return this.ultimosTickets;
    }

    atenderTicket(modulo) {
        if (this.tickets.length === 0) {
            return 'No existen Ticket'
        }

        let numeroTicket = this.tickets[0].numero;
        //saca el primero del arreglo
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, modulo);
        // agrega al inicio del arreglo unshift
        this.ultimosTickets.unshift(atenderTicket);
        if (this.ultimosTickets.length > 4) {
            // borra el ultimo elemento del arreglo splice
            this.ultimosTickets.splice(-1, 1);
        }
        //console.log('ticket atencion:', this.ultimosTickets);
        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosTickets = [];
        this.grabarArchivo();
        console.log('Reinicio de Sistema');
    }

    grabarArchivo() {
        let jsonData = {
            hoy: this.hoy,
            ultimo: this.ultimo,
            tickets: this.tickets,
            ultimosTickets: this.ultimosTickets
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl: TicketControl,
};