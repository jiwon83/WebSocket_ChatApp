const express = require("express")
const {WebSocketServer, WebSocket} = require("ws")
const app = express()


app.use(express.static("front"))

app.listen(8000, () => {
    console.log(`Server listening on port 8000`)
});

const wss = new WebSocketServer({ port: 8001 })
let count_users = 0;
    
wss.on('connection', ws => {

    //count_users 1씩 증가 후, count_users 브로드 캐스팅
    count_users++;
    broadCastData(`참가자 수 : ${count_users} `);

    ws.on('message', data => {
        broadCastData(data);
        // wss.clients.forEach(client => {
        //     if (client.readyState == WebSocket.OPEN) {
        //         client.send(data.toString());
        //     }
        // });
        // console.log(`Received from client: ${data}`)
    });

    ws.on('close', () => {
        count_users--;
        broadCastData(`참가자 수 : ${count_users} `);
    });
});

// function broadCastUserCount() {
//     wss.clients.forEach( client => {
//         if (client.readyState == WebSocket.OPEN) {
//             client.send(`User count: ${count_users}` );
//         }
//     });
//     console.log(`User count: ${count_users}`);
// }
function broadCastData(data) {
    wss.clients.forEach( client => {
        if (client.readyState == WebSocket.OPEN) {
            client.send(data.toString() );
        }
    });
    console.log(`data: ${data}`);
}
