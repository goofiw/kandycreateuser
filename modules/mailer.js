var nodemailer = require('nodemailer');
 
// create reusable transporter object using SMTP transport 
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'goofiwmailer@gmail.com',
    pass: 'notsosecret'
  }
});
 
// NB! No need to recreate the transporter object. You can use 
// the same transporter object for all e-mails 
 
// setup e-mail data with unicode symbols 

 
// send mail with defined transport object 
var mail = function(mailOptions) {
  console.log('sending mail');
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  })
};

module.exports = mail;