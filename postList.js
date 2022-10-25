const express = require("express");
const morgan = require('morgan');

const postList = express()

postList.use(morgan('dev'))
postList.use(express.static('public'))

postList.get("/", (req, res) => {
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
    res.send(html);
  })

