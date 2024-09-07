'use server'


import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function getConnectionReq () {
    const cookieStore = cookies()

    const hasUser = cookieStore.has('c_user')
    const hasToken = cookieStore.has('token')

    

    if(hasToken && hasUser){
        const token = cookieStore.get('token')
        const user = cookieStore.get('c_user')
    
    
      
            const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/getConnectionReq/${user.value}`,
            {
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${token.value}`,
                    "userid": user,
                }
            },
            
            )


            // console.log(result, 'getallchat')
          
            if(result.status === 404){

               console.log(result.status)
        
          

               return result.json()



            }else{
                // cookieStore.delete('c_user')
                // cookieStore.delete('token')
                return result.json()
            }

            


          




       
    }








}