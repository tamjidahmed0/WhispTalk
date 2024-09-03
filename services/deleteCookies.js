'use server'
 
import { cookies } from 'next/headers'
 
async function deleteCookies(data) {
  cookies().delete(data)
}

export default deleteCookies