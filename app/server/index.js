const express = require('express')
const consola = require('consola')
const axios = require('axios');
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  const apiDomain = process.env.GUESTBOOK_API || 'http://localhost:3000';

  app.get('/api/', async (req, res) => {
    try {
      let result = await axios.get(`${apiDomain}/guests`);
      res.status('200').json(result.data);
    } catch (error) {
      res.status('500').json({ error });
    }
  });

  app.post('/api/', async (req, res) => {
    const { firstname, lastname, country } = req.body;
    try {
      const newGuest = { firstname, lastname, country };
      let result = await axios.post(`${apiDomain}/guests`, newGuest);
      res.status('201').json(result.data);
    } catch (error) {
      console.log(error);
      res.status('500').json({ error });
    }
  });

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
