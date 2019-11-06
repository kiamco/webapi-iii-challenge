const express = require('express');
const UserRouter = require('./users/userRouter');
const PostRouter = require('./posts/postRouter');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
//middleware
server.use(helmet());   
server.use(cors());
server.use(logger);
server.use(express.json());

// use Routers
server.use('/api/user', UserRouter);
server.use('/api/post', PostRouter);

server.get('/', (req,res) =>{
    res.send(`<h1> Api is working </h1>`)
})

server.listen(8000, ()=> console.log('listening on port 4000'))

//custom logger
function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
    );

    next();
}