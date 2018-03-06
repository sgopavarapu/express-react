const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');


const typeDefs = `
    type Reservation {
      id: ID!
      name: String!
      hotelName: String!
      arrivalDate: String!
      departureDate: String!
    }

    type Query {
      reservations: [Reservation]
      reservation(id: ID!): Reservation
    }

    type Mutation {
      makeReservation(name: String!,hotelName: String!,arrivalDate: String!,departureDate: String!): Reservation
    }
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
