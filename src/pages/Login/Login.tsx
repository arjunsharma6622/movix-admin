import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { login } from '../../apiCalls/auth';
import './login.css';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({ email, password });
        toast.success("Logged in!");
        setTimeout(() => { window.location.reload() }, 1000);
    }

    return (
        <div className='login'>
            <div className='loginContainer'>
                <div className='loginHeader'>
                    <h1 className='text-2xl font-semibold'>MoviX</h1>
                    <h2>Admin Login</h2>
                </div>
                <form onSubmit={handleLogin} className="loginForm">
                    <div className='loginFormItem'>
                        <input type="text" className="loginInput" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='loginFormItem'>
                        <input type="password" className="loginInput" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='loginFormItem'>
                        <button className='loginButton' type='submit'>Login</button>
                    </div>
                </form>
                <div className='flex items-start flex-col gap-4'>
                    <p className='text-sm text-gray-500'>Use the below given credentials for demo</p>
                    <div className='flex flex-col items-start text-sm text-gray-700'>
                        <p>Email : admin@mail.com</p>
                        <p>Password : 1234</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
