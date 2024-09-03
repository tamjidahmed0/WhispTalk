"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import action from "@/services/action";

export default async function UpdateName(firstName, lastName, userId) {
  
 
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/name/${userId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      
      },
      credentials: "include",

      body: JSON.stringify({
       firstName,
       lastName
      }),
    },

  );

  if (result.status === 201) {
    return result.json();
  } else {
  
    return result.json();
  }




}
