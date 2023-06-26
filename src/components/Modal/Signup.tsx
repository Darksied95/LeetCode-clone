import { authModalState } from '@/atoms/authModalAtom';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const [formFields, setFormFields] = useState({email :'', name:'' , password:'' });
    const handleClick = () => {setAuthModalState(prev => ({...prev, type:'login'}))}

    const handleChange =(e :React.ChangeEvent<HTMLInputElement>) =>{   
        setFormFields(prev => ({...prev , [e.target.name] : e.target.value}))        
    }

    const handleRegister =(e :React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault()
        console.log(formFields);
    }
    
    return <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
    <h3 className='text-xl font-medium text-white'>Register to LeetClone</h3>
    <div>
        <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
            Email
        </label>
        <input
            name='email'
            type='email'
            id='email'
            placeholder='name@company.com'
            value={formFields.email}
            onChange={handleChange}
            className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
        />
    </div>
    <div>
        <label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
            Display Name
        </label>
        <input
            type='text'
            name='name'
            id='name'
            placeholder='name@company.com'
            value={formFields.name}
            onChange={handleChange}
            className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
        />
    </div>
    <div>
        <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
            Password
        </label>
        <input
            type='password'
            name='password'
            id='password'
            value={formFields.password}
            onChange={handleChange}
            className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
            placeholder='*******'
        />
    </div>

    <button
        type='submit'
        className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'
    >
        Register
    </button>
  
    <div className='text-sm font-medium text-gray-300' onClick={handleClick}>
        Already have an account{" "}
        <a href='#' className='text-blue-700 hover:underline'>
            Log In
        </a>
    </div>
</form>
}
export default Signup;