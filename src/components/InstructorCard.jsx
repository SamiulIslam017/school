
import { useEffect, useState } from "react";

const InstructorCard = () => {

    const [instructors, setInstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_DOMAIN}/instructors`)
            .then(res => res.json())
            .then(data => {
                setInstructors(data)
                setIsLoading(false)
            })
    }, [])

    const allInstructors = instructors.filter(instructor => instructor.role == "instructor")


    return (
        <>
            {
                isLoading ? <div className="min-h-screen flex justify-center items-center"><img src="https://i.ibb.co/GMCwfS6/loading-spinner.gif" /></div> :
                    <>
                        <div className="hero h-[300px] mb-10 md:mb-20 lg:mb-20" style={{ backgroundImage: `url('https://i.ibb.co/p0Vttrh/cool-background.png')` }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">Our Master Class Instructors</h1>
                                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-10 md:mb-20 lg:mb-20">
                            {allInstructors.map(instructor =>
                                <div key={instructor._id} className="hero min-h-[180px] rounded-md" style={{ backgroundImage: `url(${instructor.image})` }}>
                                    <div className="hero-overlay bg-opacity-60 rounded-md"></div>
                                    <div className="hero-content text-center text-neutral-content">
                                        <div className="max-w-md">
                                            <h1 className="mb-5 text-2xl font-bold">{instructor.name}</h1>
                                            <h1 className="mb-5 text-xl font-bold">{instructor.email}</h1>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </>
            }
        </>
    );
};

export default InstructorCard;