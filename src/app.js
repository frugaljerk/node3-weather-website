const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


console.log(__dirname);

const app = express();

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(path.join(__dirname, '..', 'public')))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Fu Kao Chiang'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Fu Kao Chiang'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Fu Kao Chiang'
    })
})

app.get('/weather',  (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a address term"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send(error)
        }else{
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send(error)
                }else{
                    res.send({
                        location:location,
                        forecastData: forecastData,
                    })
                }
            })
        }
    })


})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Help',
        name: 'Fu Kao Chiang', 
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Fu Kao Chiang',
        errorMessage: 'Page not Found'
    })
})

app.listen(8080, ()=>{
    console.log('Server is up on port 3000.')
});