'use server'

import getCookie from '@/services/getCookie';


export default async function ImageUpload (formData) {
 

        const userId = await getCookie ('c_user').value
    
    



    const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/test/${userId}?type=profile`,
    {
        method: 'POST',

          body: formData,
    
  
       
        }, { cache: 'no-store', })

        
if(result.status === 201){

}

   
        return result.json()

    
}