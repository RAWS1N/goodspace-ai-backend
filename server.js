const {app}  = require("./app.js")
const { connectDB } =  require('./config/connectDB.js')
const dotenv = require('dotenv')

// settinng envitonment variables
dotenv.config({
  path : '.env'
})



// setting up socket.io server
const {Server} = require('socket.io')





// function to connect db
connectDB()

// port where server will run
const port = process.env.PORT || 5000

// listening server on port
const server = app.listen(port,() => {
    console.log(`server is listening on port:${port}`)
})

// setting socket.io configuration
const io = new Server(server, {
    pingTimeout:1000*60,
    allowEIO3: true,
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
  });
  
  
  // listening socket.io events
  io.on('connection',(socket) => {
    socket.on('message',(message) => {
      socket.emit('message',message)
    })
    socket.off('disconnect',() => {
      console.log("user disconnected")
    })
  })

