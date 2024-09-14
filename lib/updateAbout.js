"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import action from "@/services/action";

export default async function UpdateAbout(about, userId) {
  
 
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/about/${userId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      
      },
      credentials: "include",

      body: JSON.stringify({
       about
      }),
    },

  );

  if (result.status === 201) {
    return result.json();
  } else {
  
    return result.json();
  }




}
