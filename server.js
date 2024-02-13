const http = require("http"); //this is for protocol like http,https
const port = 3456; //this port number to listen the server
const array = ["hi", "everyone"];
http
  .createServer((req, res) => {
    //this is used to create server
    const { method, url } = req;
    if (url === "/web") {
      //if we give /web in search box this below conditions are executed

      //get method
      if (method === "GET") {
        res.writeHead(200); //this is like 404
        res.write(array.toString()); //this is for show output in browser
        console.log("im in /web url");
        console.log("im GET method");
      }

      //post method
      else if (method === "POST") {
        let body = ""; //this is connected with thunder client
        req
          .on("error", (err) => {
            console.log(err); // if any error occurs it may execute in terminal
          })
          .on("data", (chunk) => {
            //if any data have it moves to next step
            body += chunk; //body= body+chunck >>chuck means send the data part by part
            console.log("chunk :", chunk.toString()); // it calls the parameter
          })

          .on("end", () => {
            //this is for end the request
            body = JSON.parse(body); //this is connected with thunder client->body->JSON
            console.log("data ", body); // CALL THE VARIABLE
            let new_array = array; //declare the variable to call array variablle which is in above
            new_array.push(body.name, body.age); //this is post those keys(name, age) in thunder client
          });
      }

      //delete method
      else if (method === "DELETE") {
        let body = ""; //this is connected with thunder client
        req
          .on("error", (err) => {
            console.log(err); // if any error occurs it may execute in terminal
          })
          .on("data", (chunk) => {
            //if any data have it moves to next step
            body += chunk; //body= body+chunck >>chuck means send the data part by part
            console.log("chunk :", chunk.toString());
          })
          .on("end", () => {
            body = JSON.parse(body);
            console.log("deleted data ", body); //this is connected with thunder client->body->JSON
            let deleteitem = body.item; //this is for delete the details in array on body

            // for (let i = 0; i < array.length; i++) {
            //   if (array[i] === deleteitem) {
            // array.splice(i, 1); //splice method is used to remove the element
            // break; // this is for break the loop
            // }
            // }

            //another method
            array.find((element, index) => {
              if (element === deleteitem) {
                array.splice(index, 1);
              }
            });
          });
      } else {
        res.writeHead(404);
        console.log("Im in other method");
      }
    } else if (url === "/") {
      //if we give / in search box this below conditions are executed
      console.log("im in / url");
    }
    res.end();
  })

  .listen(port, () => {
    //this is for port listen
    console.log(`server is running ${port}`);
  });
