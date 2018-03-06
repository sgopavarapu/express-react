const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const qs = require('qs')
const moment = require('moment');

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/base.html'));
})
router.get('/reservations', async (req, res) => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000'
    })

    try {
        let resp = await axiosInstance.get('/graphql', {
            params: {
                query: "{\n  reservations {\n    id\n    hotelName\n    name\n    arrivalDate\n    departureDate\n  }\n}"
            }
        })

        if (!isEmpty(req.query)) {
            let newArr = resp.data.data.reservations.filter(res => {
                if (moment(Date.parse(res.arrivalDate)).isSameOrAfter(Date.parse(req.query.arrivalDate)) &&
                    moment(Date.parse(res.departureDate)).isSameOrBefore(Date.parse(req.query.departureDate))) {
                    return true
                } else return false;
            });
            if (newArr.length === 0) {
                res.send("{\"error\": \"No results...\"}");
            } else {
                res.send(JSON.stringify(newArr));
            }
        } else res.send(JSON.stringify(resp.data.data.reservations))

    } catch (err) {
        console.error(err);
    }

});
router.get('/reservation/:id', async (req, res) => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000'
    })

    try {
        let resp = await axiosInstance.get('/graphql', {
            params: {
                query: "{\n  reservation(id : \""+ req.params.id + "\") {\n    id\n    hotelName\n    name\n    arrivalDate\n    departureDate\n  }\n}"
            }
        })

        res.send(JSON.stringify(resp.data.data.reservation))

    } catch (err) {
        console.error(err);
    }
});
router.post('/reservation', async (req, res) => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000'
    })
    let queryParam = "";
    if (!isEmpty(req.body)) {
        queryParam = "mutation {\n  makeReservation(name: \"" + req.body.name + "\", hotelName: \"" + req.body.hotelName + "\", arrivalDate: \"" + req.body.arrivalDate + "\", departureDate: \"" + req.body.departureDate + "\") {\n    id\n  }\n}";
    } else {
        queryParam = "mutation {\n  makeReservation(name: \"" + req.query.name + "\", hotelName: \"" + req.query.hotelName + "\", arrivalDate: \"" + req.query.arrivalDate + "\", departureDate: \"" + req.query.departureDate + "\") {\n    id\n  }\n}";
    }
    try {
        let resp = await axiosInstance.post('/graphql', qs.stringify({ 'query': queryParam }));
        res.send(JSON.stringify(resp.data))
    } catch (err) {
        console.error(err);
    }
});


module.exports = router;
