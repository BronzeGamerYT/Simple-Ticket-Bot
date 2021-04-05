const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const figlet = require('figlet');

const keep_alive = require("./keep_alive.js")



client.on("ready", () => {
	figlet('Indigos Tickets', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
	});
	console.log("TicketBot is online successfully!");
	console.log("-----------------")
	console.log("The prefix is '! Created By Bronze Gamer'")
	client.user.setActivity("type '!ticket help' to get  help");
});

client.on("message", async message => {
	if (message.author.bot || message.type == "dm") return;
	var arg = message.content.toLowerCase().split(" ");
	if (arg[0] != '!ticket') return;
	if (!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_ROLES")) {
		message.channel.send("Not enough permissions I require the `MANAGE_CHANNELS` and `MANAGE_ROLES` permission!");
		return;
	}
	let TicketCategory = message.guild.channels.find(channel => channel.name === "Open Tickets");
	if (TicketCategory == null) {
		await message.guild.createChannel('Open Tickets', {
			type: 'category',
			permissionOverwrites: [{
				id: message.guild.id,
				deny: ['READ_MESSAGES']
			}]
		})
			.then(t => TicketCategory = t)
			.catch(console.error);
	}
	switch (arg[1]) {
		case "create":
			if (arg.length <= 2) {
				message.reply("Incorrect usage! pls type `!ticket create (reason)`");
				return;
			}
			let reason = arg.slice(2).join(" ");
			// reason=message.author+" issued a ticket with the reason\n\n**"+reason+"**";
			reason = new Discord.RichEmbed()
				.setTitle("User " + message.author.username + " issued a ticket!")
				.setDescription(reason)
				.setFooter("Pls solve as quickly as possible!")
				.setColor('#32cd32');
			if (reason.length >= 1800) {
				message.reply("Pls describe your problem in less words")
				return;
			}
			let roles = message.guild.roles.filter(x => x.hasPermission("MANAGE_CHANNELS"));
			let perms = [];
			roles.forEach(role => {
				perms.push(
					{
						id: role.id,
						allow: ["READ_MESSAGES"]
					}
				)
			});
			perms.push(
				{
					id: message.guild.id,
					deny: ["READ_MESSAGES"]
				},
				{
					id: message.author.id,
					allow: ["READ_MESSAGES"]
				}
			);
			message.guild.createChannel(message.author.username + "s ticket", {
				type: "text",
				parent: TicketCategory.id,
				permissionOverwrites: perms
			}).then(channel => channel.send(reason))
			break;
		case "delete":
			if (!message.channel.name.endsWith("ticket")) {
				message.reply("You must type this command in a open ticket");
				break;
			}
			message.reply("Are you sure you want to close this ticket?\nType `!ticket confirm` to confirm.");

			const collector = message.channel.createMessageCollector(
				m => m.content.toLowerCase().startsWith("!ticket confirm") && m.author.id == message.author.id,
				{ time: 20000, max: 1 }
			);
			collector.on('collect', m => {
				if (!m.channel.deletable) message.reply("Error!!! I cannot delete this channel");
				else m.channel.delete();
			});
			break;
		case "help":
			var help = new Discord.RichEmbed()
				.setTitle("Hello " + message.author.username + "!")
				.setDescription("How to create a ticket? Use the commands in any channel of the discord server.")
				.addField("!ticket create <reason>", "Create a private channel with you and staff to solve to issuse together!")
				.addField("!ticket delete", "Issue is solved? then you can delete the channel with ticket delete")
				.setColor('#32cd32');
			message.author.send(help);
			break;
				case "invite":
					const exampleEmbed = {

	title: 'Click to add Indigos Tickets to your Discord server',
	url: 'https://discord.com/api/oauth2/authorize?client_id=771941431165845505&permissions=8&scope=bot',



	timestamp: new Date(),

};

message.channel.send({ embed: exampleEmbed });
			break;
		default:
			break;
	}
});



client.login(config.token);
