const {app}  = require("./app.js")
const { connectDB } =  require('./config/connectDB.js')
const dotenv = require('dotenv')

dotenv.config({
  path : '.env'
})




const {Server} = require('socket.io')






connectDB()

const port = process.env.PORT || 5000

const server = app.listen(port,() => {
    console.log(`server is listening on port:${port}`)
})

const io = new Server(server, {
    pingTimeout:1000*60,
    allowEIO3: true,
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
  });
  
  
  
  io.on('connection',(socket) => {
    socket.on('message',(message) => {
      socket.emit('message',message)
    })
    socket.off('disconnect',() => {
      console.log("user disconnected")
    })
  })

