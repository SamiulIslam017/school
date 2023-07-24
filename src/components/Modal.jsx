
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Modal = () => {
    const course = useLoaderData();
    const navigate = useNavigate()
    const [feedback, setFeedback] = useState('');
    const handleFeedback = (e) => {
        const feedback = e.target.value;
        setFeedback(feedback);
    }
    const handleSubmit = () => {



        const updateFeedback = { feedback: feedback, status: 'denied' };
        fetch(`${import.meta.env.VITE_DOMAIN}/courses/feedback/${course._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateFeedback)

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    navigate('/dashboard/allCourses')
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Course Status Denied successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
            })
    }
    return (



        <div className="flex flex-col justify-center items-center w-8/12 mx-auto min-h-screen">
            <h3 className="font-bold text-lg">Send Feedback!</h3>
            <div className="w-full">
                <label className="label">
                    <span className="label-text">Feedback message</span>
                </label>
                <textarea onChange={handleFeedback} name="feedback" cols="30" rows="10" className="p-2 border border-neutral-300 w-full" ></textarea>
            </div>

            <div className="form-control mt-3">
                <input onClick={handleSubmit} type="submit" value="Send Feedback" className="btn bg-blue text-neutral-100" />
            </div>
        </div>
    );
};

export default Modal;