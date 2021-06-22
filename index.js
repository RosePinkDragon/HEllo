const express = require('express')

const app = express()

app.get('/',(req, res) => {
  res.send('Hello World')
});

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('*', (req, res) => {
  res.send('404 page')
})

app.listen(3000, ()=>{
  console.log('Port running on 3000')
})