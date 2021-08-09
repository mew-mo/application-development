
// https://nodejs.dev/learn/build-an-http-server

const http = require('http')
// declaring as const means it is going to remain constant. variable will change, but const will not. require is the keyword, and http is from node. require means we are accessing this: to run this program, this is required.

const port = 3000
// const port = process.env.PORT
// must identify what port we are going to use, can be hard coded to be 3000 or whatever. but process env port will find a server for you.

const server = http.createServer((req, res) => {
  // we are saying that we are gonna create a server. this method requires two parameters, request and response/result. the request goes in and the server responds with something.
  res.statusCode = 200
  // when the response is ok and the request is sent without any issue, you get a 200 as the status code. different numbers mean different things. 200 is http status success! when the status is ok u move on :} only WHEN THATS TRUE THO
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello, World!</h1>')
})

server.listen(port, () => {
  // listening to the port and checking if anything is coming through.
  console.log(`Server running at port ${port}`)
  // message that lets you know the server is listening. evaluates const port from earlier. though itll probs be 3000 even if you dont hard code it in
})
