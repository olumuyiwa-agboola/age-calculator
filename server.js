import express from 'express';
import { DateTime } from 'luxon';

const app = express();

// set static folder
app.use(express.static('public'));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// parse JSON bodies (as sent by API clients)
app.use(express.json());

// handle POST requests calculate age
app.post('/age', (req, res) => {
    const [year, month, day] = req.body.birthdate.split('-');
    const birthdate = DateTime.local(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10));
    const currentdate = DateTime.local();

    var diff = currentdate.diff(birthdate, ['years', 'months', 'days']).toObject();
    res.send(`
    <p><i>${Math.floor(diff.years).toString().padStart(2, '0')} years</i></p>
    <p><i>${Math.floor(diff.months).toString().padStart(2, '0')} months</i></p>
    <p><i>${Math.floor(diff.days).toString().padStart(2, '0')} days</i></p>
    `);
});

// -----LISTEN FOR REQUESTS---------------------------------------------------------
app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});

