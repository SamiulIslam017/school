import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const img_hosting_token = import.meta.env.VITE_IMGBB_API;
const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createUser, googleLogin } = useContext(AuthContext);
    const [toggle1, setToggle1] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    const [imgUpload, setImageUpload] = useState('')
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const navigate = useNavigate();
    const handleImage = e => {
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData,
        }).then(res => res.json()).then(imgData => { setImageUpload(imgData.data.display_url) })
    }
    const onSubmit = async (data) => {
        try {
            await createUser(data.email, data.password, data.name, imgUpload);
            const userData = { name: data.name, email: data.email, image: imgUpload }
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
                    if (data.insertedId) {
                        navigate('/');
                    }

                })


        } catch (error) {
            console.log(error);
        }
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
                        navigate('/');
                    })

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="hero w-10/12 mx-auto">
            <div className="hero-content flex flex-col lg:flex-row">
                <div className="text-center lg:text-left w-7/12" >
                    <img src="https://i.ibb.co/q1nBJsY/9-SCENE.png" alt="" />
                </div>
                <div className="card flex-shrink-0 w-5/12 shadow-2xl bg-base-100 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register('name', { required: true })} name="name" placeholder="Your Name" className="input input-bordered" />
                            {errors.name && <span className="text-orange font-base">This field is required</span>}
                        </div>
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
                            <span onClick={() => { setToggle2(!toggle2) }} className="text-lg absolute top-[51px] right-2">{toggle2 ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                            <input type={toggle2 ? 'text' : 'password'} placeholder="Password"
                                name="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[@$!%*?&])/
                                })}
                                className="input input-bordered" />
                            {errors.password?.type === 'required' && <span className="text-orange font-base">This field is required </span>}
                            {errors.password?.type === 'minLength' && <span className="text-orange font-base">At lest 6 Characters</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-orange font-base">Maximum 20 Characters </span>}
                            {errors.password?.type === 'pattern' && <span className="text-orange font-base"> one uppercase and one special characters</span>}
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <span onClick={() => { setToggle1(!toggle1) }} className="text-lg absolute top-[51px] right-2">{toggle1 ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                            <input type={toggle1 ? 'text' : 'password'} {...register('cPassword', { required: true, validate: (value) => value === watch("password") || "Passwords do not match" })} placeholder="Confirm password" name="cPassword" className="input input-bordered" />
                            {errors.cPassword?.type === 'required' && <span className="text-orange font-base">This field is required </span>}
                            {errors.cPassword && <span className="text-orange font-base">Password did not matched</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pick a file</span>
                            </label>
                            <input type="file" onChange={handleImage} name="image" className="file-input file-input-bordered w-full max-w-xs" required />

                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary bg-blue">Register</button>
                        </div>
                    </form>
                    <p className="text-center ">Already have an account? <Link className="text-blue font-bold" to='/login'>Login</Link></p>
                    <div className="divider">OR</div>
                    <div className="flex justify-center mt-2 mb-6">
                        <button onClick={handleGoogleRegister} className='flex items-center rounded gap-3 py-2 px-3 bg-blue text-neutral-100 text-sm font-semibold'><FaGoogle></FaGoogle> Google</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Register;