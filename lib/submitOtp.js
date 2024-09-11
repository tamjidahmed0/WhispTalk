"use server";
import action from '@/services/action'
import { redirect } from "next/navigation";
import deleteCookie from "@/services/deleteCookies";
import getCookie from "@/services/getCookie";

export default async function submitOtp(otp) {
//   const cookieStore = cookies();
//   const token = cookieStore.get("sec");

const token = (await getCookie('svt')).value



  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/otp`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      // headers: {
      //     'Content-Type': 'application/json',

      //   },

      body: JSON.stringify({
        otp: otp,
      }),
    },
    { cache: "no-store" }
  );

  if (result.status === 201) {
    const { token, id } = await result.json();
    await deleteCookie("svt");
    await action("token", token);
    await action("c_user", id);
    redirect(`/t/messages`);
  }

  return result.json();
}
