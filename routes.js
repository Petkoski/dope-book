const fs = require('fs');

const requestHandler = (request, response) => {
    const url = request.url;
    const method = request.method;
    if(url === '/') {
        response.write('<html>');
        response.write('<head><title>Enter Message</title></head>');
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Save</button></form></body>');
        response.write('</html>');
        return response.end();
    }
    else if (url === '/message' && method === "POST") {
        const body = [];
        request.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
    
        return request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // console.log(parsedBody);
            fs.writeFile('message.txt', message, err => {
                response.statusCode = 302; //stands for redirection
                response.setHeader('Location', '/'); //Default header accepted by the browser - redirect to /
                return response.end();
            });
        });
    }
    
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>Test</title></head>');
    response.write('<body><h1>Hello from Node.js</h1></body>');
    response.write('</html>');
    response.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Hardcoded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Hardcoded text';

//Shortcut supported by Node.js:
exports.handler = requestHandler;
exports.someText = 'Hardcoded text';