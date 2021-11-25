const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths
const directorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//set up handlebar engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(directorypath))

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Latha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Latha'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help',
        message : 'Please contact us',
        name : 'Latha'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address) {
        return res.send({
            error : 'You must provide error to know the address'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location}) => {
            if(error){
                return res.send({
                    error
                })
            }
            // Forecast API Calling
            forecast(latitude, longitude, (error, forecastdata) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                // console.log(Place)
                // console.log(forecastdata)
                res.send({
                    location,forecastdata,
                    Address : req.query.address
                })
            })
            
        })
    }
    // console.log(req.query.address)
    // res.send({
    //     Place : 'Gnt',
    //     Temperature : 35,
    //     Forecast : 'Clear'
    // })
})
app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'You moust provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title : 404,
        message : 'Help content is not available',
        name : 'Latha'
    })
})


app.get('*',(req,res) => {
    res.render('404', {
        title : 404,
        message : '404 Not Found',
        name : 'Latha'
    })
})
app.listen(port, ()=>{
    console.log('Server is up on Port', port)
})