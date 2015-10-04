var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
	res.render('contact', {
		title: 'Contact'
	});
});

router.post('/send', function(req, res, next) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'EMAIL@MAIL.COM',
			pass: 'EMAIL PASS'
		}
	});

	var mainOptions = {
		from: 'Aleksey Lovchikov <EMAIL@MAIL.COM>',
		to: 'EMAIL@MAIL.COM',
		subject: 'Web Site message',
		text: 'Hello from node... name: ' + req.body.username + '\nemail: ' + req.body.email + '\nmessage: ' + req.body.message,
		html: '<p>You got a new message...</p><p>Username: ' + req.body.username + '<br />Email: ' + req.body.email + '<br />Message: ' + req.body.message + '</p>'
	};

	transporter.sendMail(mainOptions, function(err, info) {
		if (err) {
			console.log(err);
			res.redirect('/');
		} else {
			console.log('Message Sent: ' + info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;