//Import Module
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

//Use express module
const app = express()

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //Changing default views folder name to templates and its settings
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))




app.get('',(req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Devendra Johari'
  })
})

app.get('/help',(req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'This is some helpful text',
    name: 'Devendra Johari'
  })
})

app.get('/about',(req, res) => {
  res.render('about',{
    title: 'About Me',
    name: 'Devendra Johari'
  })
})

app.get('/weather',(req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geoCode(req.query.address, (error, data={}) => {
    if(error) {
      return res.send({ error })
    }
    foreCast(data.lattitude, data.longitude, (error, foreCastdata) => {
      if(error){
        return res.send({error})
      }
      res.send({
        forecast: foreCastdata,
        location: data.location,
        address: req.query.address,
      })
    })
  })
    // res.send({
    //   forecast: 'It is snowing',
    //   location: 'Philadelphia',
    //   address: req.query.address
    // })
})

app.get('/products',(req, res) => {
  if (!req.query.search){
    return res.send({
      error: 'You must Provide a search item'
    })
  } else {
    console.log(req.query.search);
    res.send({
      products: []
    })
  }

})

app.get('/help/*',(req, res) => {
  res.render('error',{
    errorMessage: 'Help Article Not Found',
    title: 'Help  Me',
    name: 'Devendra Johari'
  })
})

app.get('*',(req, res) =>{
  res.render('error',{
    errorMessage: 'Page not found',
    title: '404',
    name: 'Devendra Johari'
  })
})

app.listen(3000, () => {
  console.log('Server is Up on Port 3000');
})
