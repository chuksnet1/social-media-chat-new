const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"   //link where the react is
    }
})

let activeUsers = []


io.on("connection", (socket) => {  //the "on" here is when we want to take something from the other side
    //add new User
    socket.on('new-user-add', (newUserId) => {    //the newUser is from the react socket side
        //if user is not added previosly
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        //use to send data to react client  side
        console.log("Connected user", activeUsers)
        io.emit('get-users', activeUsers)   //the emit is when we want to send something on the other side
    })


    //send message
    socket.on("send-message", (data)=>{
        const {receiverId} = data;
        const user = activeUsers.find((user)=>user.userId === receiverId)
        console.log("Sending from socket to: ", receiverId) 
        console.log("Data", data)
        if(user){
            io.to(user.socketId).emit("receive-message", data)
        }
    })

    socket.on("disconect",()=>{
        activeUsers= activeUsers.filter((user)=>user.socketId !==socket.id);
        console.log("User Disconnected", activeUsers)
        io.emit('get-users', activeUsers)
    })
    
})