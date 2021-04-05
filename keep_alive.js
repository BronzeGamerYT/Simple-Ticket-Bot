
/*
THIS FILE IS FOR REPL.IT HOSTING
*/



//import the default http core module that is shipped with NODE JS
const http= require("http");

//The module creates a Node js WEB Server that can listens to request and send responses
const server = http.createServer((req,res)=>{


    //sets the header of the response to the user and the type of response that you would be sending back
    res.setHeader('Content-Type', 'text/html');
    res.write("<html>");
    res.write("<head><title>My First Page</title> </head>");
    res.write("<body><h1>I am alive! </h1> </body>")
    res.write("<html>");

    //this most be called to specify the end of the response
    res.end();
});


//makes your created server listen on port 3000
server.listen(3000);
