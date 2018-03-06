# Hilton Assessment
`npm install`

## To Run the application
`npm run dev`  -> `http://localhost:8000`

## Testing methods
I used the CLI tool from <httpie.org> to test the functionality via the graphiql interface. Install with `brew install httpie` and then run the following to test:

### GET /reservation/ID – Returns a single reservation with ID
    - Navigate to http://localhost:8000/reservations

### GET /reservations – Returns all reservations
    - Navigate to http://localhost:8000/reservation/5a8ee9287b3f905d5a4e50a0

### POST /reservation – Creates a new reservation, assigns an ID to it, and returns that ID
    - Use the http CLI tool or Postman or similar

`http POST http://localhost:8000/reservation name=Sasi hotelName="Hilton Garden Inn Mountain View" arrivalDate=04/01/2018 departureDate=04/08/2018`

## Graphiql interface
- `http://localhost:8000/graphiql`

### Queries
#### All Reservations example
    {
      reservations {
        id
        name
        hotelName
        arrivalDate
        departureDate
      }
    }

#### Reservations By ID example
    {
      reservation(id: "5a8ef2c112002468cafe9f17") {
        id
        name
        hotelName
        arrivalDate
        departureDate
      }
    }


### Add Booking/reservation mutation (only returns the ID)
    mutation {
      makeReservation(
        name: "Test Test",
        hotelName: "Hilton Hotel Nr1",
        arrivalDate: "03/01/2018",
        departureDate: "03/10/2018"
      ) {
        id
      }
    }

###NoSQL
Persisted to mongodb using mLab.
`mongodb://sasi:sasi@ds147118.mlab.com:47118/hilton`

### Issues:

I have enabled deployment to now.sh, but the add booking mutation isn't working. The GET queries and graphiql queries work though.
`https://sasi-task-vehddpgkkx.now.sh/reservations`


