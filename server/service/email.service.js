module.exports.welcomeEmail = (email) => {

    var transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var mailOptions = {
      from: emailUser,
      to: email,
      subject: 'Welcome to Todo 4pp!',
      html: "<p>You successfully registered to <a href='https://todo4pp.herokuapp.com' target='_blank'>Todo 4pp</a>. Enjoy using our services.</p>"
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      }
      // else {
      //   console.log('Email sent: ' + info.response);
      // }
    });

}
