module.exports = (user, message) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
    </head>
    <body>
      <h1>New commentary in your post!</h1>
      <h5>From: ${user}</h5>
      <p>${message}</p>
    </body>
  </html>
`
