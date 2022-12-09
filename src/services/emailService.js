require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Thanh Hoa" <hoa17122001@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHtmlEmail(dataSend),
  });
};
let getBodyHtmlEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online ở hệ thống bệnh viện siêu cấp vũ trụ</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear ${dataSend.patientName}!</h3>
        <p>You are got this email because was set up the history of online at the system disease the super level of the Universe</p>
        <p>Hospital information calendar</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the information is correct, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Sincerely thank!!!</div>
    `;
  }

  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
