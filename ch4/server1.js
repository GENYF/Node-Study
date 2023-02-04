const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server!</p>');
    res.end('<p>Bye Client!</p>');
}).listen(8080);

server.on('listening', () => {
    console.log('8080 port is waiting');
});
server.on('error', (error) => {
    console.error(error);
});