import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, googleLogin } = useContext(AuthContext);
    const [toggle1, setToggle1] = useState(false)
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const onSubmit = (data) => {

        login(data.email, data.password)
            .then(result => {
                console.log(result);
                navigate(from, { replace: true })
            })
            .catch(err => setError("Email or password din not matched", err.message))
    }
    const handleGoogleRegister = () => {
        googleLogin()
            .then(result => {
                const googleUser = result.user;
                console.log(googleUser);
                const userData = { name: googleUser.displayName, email: googleUser.email, image: googleUser.photoURL }
                fetch(`${import.meta.env.VITE_DOMAIN}/users`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (

        <div className="hero  w-10/12 mx-auto">
            <div className="hero-content flex flex-col lg:flex-row">
                <div className="text-center lg:text-left w-7/12" >
                    <img src="https://i.ibb.co/q1nBJsY/9-SCENE.png" alt="" />
                </div>
                <div className="card flex-shrink-0 w-5/12  shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email"
                                name="email"
                                {...register('email', { required: true })}
                                className="input input-bordered" />
                            {errors.email && <span className="text-orange font-base">This field is required</span>}
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <span onClick={() => { setToggle1(!toggle1) }} className="text-lg absolute top-[51px] right-2">{toggle1 ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                            <input type={toggle1 ? 'text' : 'password'} placeholder="Password"
                                name="password"
                                {...register('password', {
                                    required: true,
                                })}
                                className="input input-bordered" />
                            {errors.password?.type === 'required' && <span className="text-orange font-base">This field is required </span>}
                        </div>
                        <p className="text-orange my-2 font-base">{error}</p>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary bg-blue">Login</button>
                        </div>
                    </form>
                    <p className="text-center ">Do not have an account!! <Link className="text-blue font-bold" to='/register'>Register</Link></p>
                    <div className="divider">OR</div>
                    <div className="flex justify-center mt-2 mb-6">
                        <button onClick={handleGoogleRegister} className='flex items-center rounded gap-3 py-2 px-3 bg-blue text-neutral-100 text-sm font-semibold'><FaGoogle></FaGoogle> Google</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;