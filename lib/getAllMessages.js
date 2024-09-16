'use server'
import { cookies } from 'next/headers'


export default async function getAllMessages (receiverId, limit, offset) {

    const cookieStore = cookies()
    const hasToken = cookieStore.has('token')
    const hasUser = cookieStore.has('c_user')
    const token = cookieStore.get('token')
    const user = cookieStore.get('c_user')?.value



    if(hasUser && hasToken){


            const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/message/${user}/${receiverId}?limit=${limit}&offset=${offset}`,
            {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.value}`,
                    "userid": user,
                }
            }
            
            )



            // if(result.status === 401){

            //     cookieStore.delete('c_user')
            //     cookieStore.delete('token')
               
            // }

            if(result.status === 401){

            }else{
                return result.json()
            }

         
    




    }
   

  


    
}