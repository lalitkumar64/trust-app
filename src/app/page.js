"use client";
import { useAuth } from "@/lib/AuthProvider";
import { getDeviceInfo, sendEmail } from "@/lib/commonFun";
import { App, Button, } from "antd";
import Image from "next/image";


export default function Home() {
  const { user, loading } = useAuth();
  const { message } = App.useApp();
  const handleClick = async () => {
    // messageApi.open({
    //   type: "success",
    //   content: "Sending email...",
    //   duration: 0,
    // });
    const ipRes = await fetch("https://ipapi.co/json/");
    const locationData = await ipRes.json();
  console.log(locationData,'locationData')
    const deviceInfo = getDeviceInfo();
    console.log(deviceInfo, 'deviceInfo')
    const session = {
      ip: locationData.ip,
      location: `${locationData.city}, ${locationData.region}, ${locationData.country_name}`,
      device: deviceInfo.device,
      os: deviceInfo.os,
      browser: deviceInfo.browser,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };
    console.log(session, 'session')
    message.error("An error occurred while sending email.");
    // try {
    //   const res = await sendEmail({ to: "lalitkumar6458@gmail.com",
    //     subject: "Test Email",
    //     htmlContent: "<h1 style='color:green;'>Hello!</h1><p>This is a test email.</p>",
    //     textContent: "Hello! This is a test email.",
    //     attachments: []})

    // } catch (error) {
    //   message.error("An error occurred while sending email.");
    // }
    console.log(user,'user')
  };
  
  return (
    <div className="">
      <Button onClick={handleClick} type="primary" className="bg-blue-500 hover:bg-blue-600">
        Send
      </Button>
    </div>
  );
}
