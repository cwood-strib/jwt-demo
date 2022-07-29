const bodyParser = require('body-parser')
const express = require('express')

const { signToken, isValidToken, signTokenTwo } = require("./jwt");

const app = express()
const port = 3000;

app.use(bodyParser.json())

app.post('/sign', (req, res) => {
  let { article_id, sub_id } = req.body;

  if (!article_id || !sub_id) {
    res.status(400);
    return res.json({
      errors: "Missing article id and/or sub_id"
    })
  }

  // TODO: validate they exist or throw 400
  let token = signToken(article_id, sub_id);

  return res.json({
    token
  })
})

app.post('/sign2', (req, res) => {
  let { article_id, sub_id } = req.body;

  if (!article_id || !sub_id) {
    res.status(400);
    return res.json({
      errors: "Missing article id and/or sub_id"
    })
  }

  // TODO: validate they exist or throw 400
  let token = signToken(article_id, sub_id);

  return res.json({
    token
  })
})

app.post('/verify', (req, res) => {
  let { token, article_id } = req.body;

  if (!token || !article_id) {
    res.status(400);
    return res.json({
      errors: "Missing token and/or article id"
    })
  }

  let result = isValidToken(token, article_id);

  return res.json({
    verified: result 
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})