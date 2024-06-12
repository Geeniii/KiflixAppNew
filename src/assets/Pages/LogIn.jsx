import { UserAuth } from "../../Context/AuthContext";
import { A, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";

export function LogIn (){
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [error, setError] = createSignal('')
    const { user, logIn } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
          await logIn(email(), password());
          navigate('/')
        } catch (error) {
          console.log(error);
          setError('Incorect email or password');
        }
    };

    return (
        <div className='w-full h-screen'>
                <img
                className='hidden sm:block absolute w-full h-full object-cover'
                src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                alt='/'
                />
                <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
                <div className='fixed w-full px-4 py-24 z-20'>
                    <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                        <div className='max-w-[320px] mx-auto py-16'>
                            <h1 className='text-3xl font-bold'>Log In</h1>
                            {error() ? <p className='text-red-600 font-bold my-2'>{error()}</p> : null}
                            <form
                                onSubmit={handleSubmit}
                                className='w-full flex flex-col py-4'
                            >
                                <input
                                onChange={(e) => setEmail(e.target.value)}
                                className='p-3 my-2 bg-gray-700 rouded'
                                type='email'
                                placeholder='Email'
                                autoComplete='email'
                                />
                                <input
                                onChange={(e) => setPassword(e.target.value)}
                                className='p-3 my-2 bg-gray-700 rouded'
                                type='password'
                                placeholder='Password'
                                autoComplete='current-password'
                                />
                                <button className='bg-red-600 py-3 my-6 rounded font-bold'>
                                Log In
                                </button>
                                <div className='flex justify-between items-center text-sm text-gray-600'>
                                <p>
                                    <input className='mr-2' type='checkbox' />
                                    Remember me
                                </p>
                                <p>Need Help?</p>
                                </div>
                                <p className='py-8'>
                                <span className='text-gray-600'>
                                    New to Netflix?
                                </span>{' '}
                                
                                <A href="/SignIn">Sign UP</A>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}