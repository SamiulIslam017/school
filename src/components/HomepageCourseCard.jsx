import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../layouts/Main";


const HomepageCourseCard = () => {

    const [courses, setCourses] = useState([]);
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext)
    const [hidden, setHidden] = useState({ user })
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${import.meta.env.VITE_DOMAIN}/users/hidden/${user?.email}`)
            .then(res => res.json())
            .then(data => {

                setHidden(data)
            }
            )
    }, [user])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_DOMAIN}/open`)
            .then(res => res.json())
            .then(data => {

                setCourses(data)
            })
    }, [])
    const handleBooking = course => {
        console.log(course);
        if (user && user?.email) {
            const bookingItems = {
                courseId: course._id,
                course_name: course.course_name,
                instructor_name: course.instructor_name,
                image: course.image,
                price: course.price,
                date: new Date(),
                user_email: user?.email,
                payment_status: false
            }
            fetch(`${import.meta.env.VITE_DOMAIN}/booking`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bookingItems)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Successfully Added Course',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Want to join this Course!',
                text: "Please Login first",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FEBF00',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login')
                }
            })
        }
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-10 md:mb-20 lg:mb-20">
            {
                courses.slice(0, 6).map(course => <div key={course._id} className={`card ${theme === 'dark' ? 'bg-[#fff] text-[#000]' : 'glass'}`}>
                    <figure><img className="h-[200px] w-full object-cover" src={course.image} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{course.course_name}</h2>
                        <p>Instructor: {course.instructor_name}</p>
                        <div className="flex justify-between my-5">

                            <p className="font-bold text-xl">Available Seats: {course.total_seats}</p>
                            <p className="font-bold text-orange text-xl text-right">$ {course.price}</p>
                        </div>
                        <div className="card-actions justify-center">
                            <button onClick={() => handleBooking(course)} className="btn bg-blue text-neutral-100 border-0 hover:bg-transparent hover:text-blue hover:border hover:border-blue" disabled={hidden.role === "instructor" || hidden.role === "admin" || course.total_seats < 0 ? 'disable' : ''}>Join Course</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default HomepageCourseCard;