"use server";
import { cookies } from "next/headers";

const getProfileDetails = async (userId) => {
  const cookieStore = cookies();

  const hasUser = cookieStore.has("c_user");
  const hasToken = cookieStore.has("token");

  console.log(userId, "getprofile");

  if (hasToken && hasUser) {
    const token = cookieStore.get("token").value;
    const user = cookieStore.get("c_user").value;

   

   
      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/profile/${userId}`, {
        method: "GET",
        headers:{
            'Authorization': `Bearer ${token}`,
            "userid": user,
        }
      });

      return result.json();
    
  }
};

export default getProfileDetails;
