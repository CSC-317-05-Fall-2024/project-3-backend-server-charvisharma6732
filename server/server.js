import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import restaurantModule from './data/restaurants.js';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from './data/restaurants.js'; 


const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

const {restaurantData} = restaurantModule;

app.get('/restaurants', (req, res) => {
    res.render('restaurants', {restaurants: restaurantData});
});

app.get('/newRestaurant', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newRestaurant.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
