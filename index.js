import http from 'http';

// Define port
const PORT = process.env.PORT || 3000;

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to IT122!');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Me: My name is Nazila Rahimi, and I am studying IT.');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found - The requested resource does not exist.');
    }
});

// Start the server safely
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try stopping the existing process.`);
    } else {
        console.error(`Server error: ${err.message}`);
    }
});
