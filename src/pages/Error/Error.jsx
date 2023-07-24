
import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <p className='text-red-600'>Sorry, an unexpected error has occurred.</p>
            <img src="https://i.ibb.co/RP8BQnY/undraw-Page-not-found-re-e9o6.png" className="w-6/12" />
            <Link to='/'><button className="btn bg-blue text-neutral-100 border-0 mt-4 hover:bg-transparent hover:border hover:border-blue hover:text-blue">Back To homePage</button></Link>
        </div>
    );
};

export default Error;