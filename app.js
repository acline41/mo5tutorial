const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//connect to mongodb
const dbURI= 'mongodb+srv://alexcline:scammer12@cluster0.vsbmtf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'))

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet:'about my new blog',
    body: 'more about my new blog'
  });
  blog.save()
  .then((result)=> {
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  });
});
app.get('/all-blogs', (req, res) =>{
  blog.find()
  .then((result)=> {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
})
///app.get('/single-blog',(req, res)=> {
  
app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});



app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
