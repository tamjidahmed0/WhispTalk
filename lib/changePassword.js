"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import action from "@/services/action";
import getCookie from "@/services/getCookie";

export default async function ChangePassword(currentPass, newPass) {
  const userId = (await getCookie('c_user').value)
 
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/changePassword/${userId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      
      },
  

      body: JSON.stringify({
        currentPass:currentPass,
        newPass: newPass
      }),
    },

  );



  if (result.status === 201) {

    return result.json();
   
  } else {
  
    return result.json();
  }




}
