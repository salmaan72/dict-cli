import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;

app.get('/home', function(req, res) {
    console.log(process.env.API_KEY);
    res.send(`voila! it's working...`);
})
app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});
