"use client";
import { useAuth } from "@/lib/AuthProvider";
import { sendEmail } from "@/lib/commonFun";
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
