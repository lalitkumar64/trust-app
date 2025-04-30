import { message } from "antd";
import * as UAParser from "ua-parser-js";

export const getDeviceInfo = () => {
  const parser = new UAParser.UAParser(); // Use UAParser from the imported object
  const result = parser.getResult();
console.log(result,'result')
  return {
    os: result.os.name ,
    browser: result.browser.name + " " + result.browser.version || '',
    device: result.device.type || "desktop",
  };
};
export  const sendEmail = async(Data)=>{
    try {
        const res = await fetch("/api/email-send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Data),
        });
        const data = await res.json();
        console.log(data,'data')
        if (data.success) {
          message.success("Email sent successfully!");
        } else {
          message.error(data.error || "Failed to send email.");
        }   
      } catch (error) {
        message.error("An error occurred while sending email.");
      }
}