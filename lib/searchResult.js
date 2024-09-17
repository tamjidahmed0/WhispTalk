'use server'


import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function SearchResult (search) {
    const cookieStore = cookies()

    const hasUser = cookieStore.has('c_user')
    const hasToken = cookieStore.has('token')

    

    if(hasToken && hasUser){
        const token = cookieStore.get('token')
        const user = cookieStore.get('c_user').value
    
    
      
            const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/search/${user}?name=${search}`,
            {
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${token.value}`,
                    "userid": user,
                }
            },
            
            )


            // console.log(result, 'getallchat')
          
            if(result.status === 401){

               console.log(result.status)
                cookieStore.delete('c_user')
                cookieStore.delete('token')
          

            }else{
                // cookieStore.delete('c_user')
                // cookieStore.delete('token')
            }

            return result.json()
       
    }



}