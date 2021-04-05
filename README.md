# Discord-Ticket-Bot
A discord bot that allows an interactive ticket system between the discord staff and the members

## How to install
Download the bot and go to the folder where it is installed.
Open a terminal of your choice and type **npm install**
Make sure the config contains your bot token and run the bot by typing **node index.js**

## Uptime

To keep your bot alive you need to make this repl into a webserver. The way you do that is that you `import keep_alive` (file included this repl) and call it `keep_alive()`.

Now that this repl is a server, all you have to do to keep your bot up is setup something to ping the site your bot made every 5 minutes or so.

Go to [uptimerobot.com](https://uptimerobot.com/) and create an accout if you dont have one.  After verifying your account, click "Add New Monitor".

+ For Monitor Type select "HTTP(s)"
+ In Friendly Name put the name of your bot
+ For your url, put the url of the website made for your repl.
+ Select any alert contacts you want, then click "Create Monitor" 
![Uptime robot example](https://i.imgur.com/Qd9LXEy.png)

Your bot should now be good to go, with near 100% uptime.



## Built with
*[Discord.js](https://discord.js.org/) - Discord Javascript libary

*[Node.js](https://nodejs.org/en//) - Serverside Javascript Libary

## Author
*[Bronze Gamer](https://github.com/BronzeGamerYT)

## Video
VIDEO IS COMMING SOON
