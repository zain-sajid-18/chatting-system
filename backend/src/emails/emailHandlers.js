import { resendClient,sender} from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export const sendWelcomeEmail=async(email,name,clientURL)=>
{
    const {data,error}=await resendClient.emails.send(
        {
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject: "Welcome to my Chatting system.",
        html: createWelcomeEmailTemplate(name,clientURL),
});
if(error)
{
    console.error("Error sending wecome email:",error);
    throw new Error("Failed to send welcome emeil");
}
console.log("Welcome Email sent successsfully",data);
}