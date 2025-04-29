import { message } from "antd";

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