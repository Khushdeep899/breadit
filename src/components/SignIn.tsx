import Link from "next/link";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className='container mx-auto flex w-full flex-col items-center justify-center p-6 space-y-6 rounded-lg sm:w-[400px]'>
      <div className='flex flex-col items-center space-y-4 text-center'>
        <Icons.logo className='h-12 w-12 text-primary ' />
        <h1 className='text-3xl font-bold text-gray-800'>Welcome to DevHub!</h1>
        <p className='text-md text-gray-600'>
          Discover, connect, and collaborate with fellow developers.
        </p>


        <UserAuthForm />

        <p className='px-8 text-center text-sm text-muted-foreground'>
          New to DevHub?{' '}
          <Link
            href='/sign-up'
            className='hover:text-brand text-sm underline underline-offset-4'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
