const express = require("express")
const morgan = require('morgan')
const postBank = require('./postBank')

const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))

app.get("/", (req, res) => {
  const posts = postBank.list()
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title> Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
    <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
    ${posts.map(post => `
    <div class='news-item'>
      <p><a href="/posts/${post.id}">${post.title}</a>
        <span class="news-position">${post.id}. ▲</span>
        <small>(by ${post.name})</small>
      </p>
      <small class="news-info">
        ${post.upvotes} upvotes | ${post.date}
      </small>
    </div>`
  ).join('')}
</div>
</body>
</html>`
  res.send(html)
})



app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
 
  const timeAgo = require('node-time-ago') 
  const getTime = timeAgo(new Date());


  if (!post.id) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
    res.send(html)
  }
  else {
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title> Wizard News: ${post.title}</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
    <header><img src="/logo.png"/>Wizard News</header>
      <h2> ${post.title} </h2>
      <div> ${post.content} </div>
      <small>(by ${post.name})</small>
      <small class="news-info">
        ${post.upvotes} upvotes | ${post.date} | ${getTime}
      </small>
    </body>
  </html>`
  res.send (html)}
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
