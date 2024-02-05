import CloseModal from '@/components/CloseModal'
import SignIn from '@/components/SignIn'





const page = () => {
  return (
  <div className='fixed inset-0 bg-zinc-900/20 z-10'>
    <div className='container flex items-center h-full max-w-lg mx-auto'>
        <div className='realtive bg-white w-full h-fit py-20 px-2 rounder-lg'>
            <div className='absolute top-4 right-4'>
                <CloseModal />
                X
            </div>
            <SignIn />
        </div>
    </div>
  </div>
  )
}



export default page