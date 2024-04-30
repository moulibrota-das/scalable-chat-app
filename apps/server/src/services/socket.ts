import { Server } from "socket.io"
import { Redis } from "ioredis";

const pub = new Redis({
    host:'redis-2e9ea705-dasmoulibrota.a.aivencloud.com',
    port: 12134,
    username: 'default',
    password: process.env.REDIS_PASS
});
const sub = new Redis({
    host:'redis-2e9ea705-dasmoulibrota.a.aivencloud.com',
    port: 12134,
    username: 'default',
    password: process.env.REDIS_PASS
});

class SocketService{
    private _io: Server;
    constructor(){
        console.log("Init Socket Server");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        sub.subscribe("MESSAGES")
    }

    public initListener(){
        const io=this._io;
        console.log("Init socket Listeners...");
        io.on("connect", (socket)=>{
            console.log(`New socket connected: ${socket.id}`);
            socket.on("event:message", async ({message}:{message:string})=>{
                console.log("New message received");
                console.log("Msg: ", message)
                await pub.publish("MESSAGES", JSON.stringify({message}))
            }) 
        })

        sub.on('message', (channel, message)=>{
            if(channel === 'MESSAGES'){
                io.emit('message', message)
            }
        })
    }

    get io(){
        return this._io;
    }
}

export default SocketService;