"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import action from "@/services/action";
import getCookie from "@/services/getCookie";

export default async function ChangeEmail(currentEmail, newEmail) {
  const userId = (await getCookie('c_user').value)
 
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/changeEmail/${userId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      
      },
  

      body: JSON.stringify({
        currentEmail:currentEmail,
        newEmail: newEmail
      }),
    },

  );



  if (result.status === 201) {

    return result.json();
   
  } else {
  
    return result.json();
  }




}
