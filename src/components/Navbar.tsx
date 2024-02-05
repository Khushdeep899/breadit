

import Link from "next/link"
import { Icons } from "./Icons"
import { buttonVariants } from "./ui/Button"
import { getAuthSession } from "@/lib/auth"
import UserAccountNav from "./UserAccountNav.client"




const Navbar = async () => {      // made async so that we can get the session for the user
                            // with link routing only happens on client side without a hard refresh if we press this home component, goes to home page in this context

    const session = await getAuthSession()                         


    return <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-zinc-300 z-[10] py-2'>
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 "> 
        
        <Link href='/' className='flex gap-2 items-center'> 
            <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
            <p className="hidden text-zinc-700 text-sm font-medium md:block">DevHub</p>

        </Link> 
        {/* Search Bar */}

        { session?.user ? (
            <UserAccountNav user={session.user} />
        ) : (
        <Link href='/sign-in' className={buttonVariants()}>Sign In</Link> ) }
        
  

         {/*'Link href' component enables client side navigation to the route specified in 'href' wihtout full page reload */}
                                                                        {/* here buttonVariants() would apply the deafult button styling definedin Button.tsx */}

        </div>
    </div>
    
}

export default Navbar