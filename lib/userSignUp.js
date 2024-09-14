"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import action from "@/services/action";

export default async function userSignUp({name, username , email, password}) {
  
 
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'User-Agent': userAgent,
      },
      credentials: "include",

      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    },

  );

  if (result.status === 201) {
    const { token, id } = await result.json();
   
  const cookies =  await action("svt", token).then(()=>{
    redirect(`/checkpoint`);
  });
  

    // console.log(await result.json());
    if(cookies){
   
    }

  
  } else {
  
    return result.json();
  }




}
