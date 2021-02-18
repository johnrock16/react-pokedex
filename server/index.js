
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var Pokedex = require('pokedex-promise-v2');
var options = {
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000,
    timeout: 5 * 1000
}
var P = new Pokedex(options);

const app = express();
const port = 8000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(express.static('dist'))

app.get('/getPokemon', async (req, res) => {
    const interval={
        limit:req.query.limit,
        offset:req.query.offset
    }
    const result=await P.getPokemonsList(interval);
    res.status(200).send(result);
});

app.get(`/pokemon`, async (req, res) => {
    number=req.query.number;
    const result=await P.resource([`/api/v2/pokemon/${number}`]);
    res.status(200).send(result[0]);
});

app.get(`/pokemon-species`, async (req, res) => {
    number=req.query.number;
    const result=await P.resource([`/api/v2/pokemon-species/${number}`])/
    res.status(200).send(result[0]);
});

app.listen(port, () => {
    console.log(`Server is running`,port);
});