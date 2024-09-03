"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import action from "@/services/action";

export default async function UpdateUsername(username, userId) {
  
 
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/username/${userId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      
      },
      credentials: "include",

      body: JSON.stringify({
       username
      }),
    },

  );

  if (result.status === 201) {
    return result.json();
  } else {
  
    return result.json();
  }




}
