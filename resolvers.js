const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservation');
/*
  Query:
    {
      reservation(id: 1) {
        id
        name
      }
    }
  Mutation:
    mutation {
      makeReservation(
        name: "Koos",
        hotelName: "Hilton",
        arrivalDate: "03/01/2018",
        departureDate: "03/10/2018"
      ) {
        id
      }
    }
*/

const resolvers = {
  Query: {
    reservations: async () => {
      const reservations = await(Reservation.find());
      // console.log(`find all: ${JSON.stringify(reservations)}`);
      return reservations;
    },
    reservation: async (root, { id }) => {
      const reservations = await(Reservation.findOne({ _id: id }));
      // console.log(`find by id: ${JSON.stringify(reservations)}`);
      // return reservations.find(reservation => reservation.id == id);
      return reservations;
    },
  },
  Mutation: {
    makeReservation: async (root, args) => {
      let newReservation = {
        name: args.name,
        hotelName: args.hotelName,
        arrivalDate: args.arrivalDate,
        departureDate: args.departureDate
      };
      //console.log(` new booking: ${JSON.stringify(newReservation)}`);
      const reservation = await(new Reservation(newReservation)).save();
      //console.log(` reservation saved: ${reservation._id}`);
      newReservation.id = reservation._id;
      //console.log(` reservation to send to graphql: ${JSON.stringify(newReservation)}`);

      //reservation.push(newReservation);
      return reservation;
    },
  },
};
module.exports = resolvers;