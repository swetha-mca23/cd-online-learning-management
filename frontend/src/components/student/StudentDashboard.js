import React, { useEffect, useState } from 'react';
import StudentSidebar from './StudentSidebar';
import logo from '../../assets/img/userLogo.jpg';
import v1 from '../../assets/videos/v1.mp4';
import img from '../../assets/img/some.png'
import url from '../../helper/url';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function StudentDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ course: '', date: '', time: '' });
    const [courses, setCourses] = useState([]); // State to hold available courses
    const [enrolledCourses, setEnrolledCourses] = useState([]); // State to hold enrolled courses
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [loadingEnrolled, setLoadingEnrolled] = useState(true); // State to manage loading enrolled courses

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${url}/api/courses`); 
                const data = await response.json();
                console.log(data);
                
                setCourses(data); 
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchCourses();
    }, []); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            try {
                const response = await fetch(`${url}/enroll/enrolledCourses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
             if(!data.message){
                setEnrolledCourses(data); 
             }
               
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            } finally {
                setLoadingEnrolled(false); // Set loading to false after fetching
            }
        };

        fetchEnrolledCourses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve the token from local storage
    
        try {
            const response = await fetch(`${url}/enroll/course`, {
                method:"post",
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify(formData)
            });
            const temp= await response.json()
            
            console.log('Form submitted:', temp); // Log the response data
            setShowForm(false); // Hide the form after submission
        } catch (error) {
            console.error('Error submitting form:', error); // Handle any errors
        }
    };
    return (
        <div style={styles.container}>
<ToastContainer position="top-center" autoClose={3000} />
            <div style={styles.content}>

                <div style={styles.topSection}>
                    <div style={styles.topRight}>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={styles.searchBar}
                        />
                        <img
                            src={logo}
                            alt="User Profile"
                            style={styles.profileLogo}
                        />
                    </div>
                </div>


                <div style={styles.mainSection}>

                    <div style={styles.leftColumn}>

                        <div style={styles.videoSection}>
                            <p
                                style={{ marginLeft: "50px", margin: 0 }}
                            >Introduction Video</p>
                            <div style={styles.videoContainer}>
                                <video
                                    style={styles.video}
                                    controls
                                    src={v1}
                                />
                            </div>
                        </div>

                        {/* My Progress Section */}
                        <div style={styles.progressSection}>
                            <h2 style={{ fontSize: "18px" }}>My Progress</h2>
                            <div style={styles.cards}>
                                <div style={styles.card}>
                                    <div style={styles.cardHeader}>
                                        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Interaction - I</p>
                                        <p style={{ color: "gray" }}>...</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#000", fontSize: "14px" }}>some random text goes here..........</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                            <ion-icon
                                                name="person"
                                                style={{ fontSize: '24px', color: 'gray', }}>
                                            </ion-icon>

                                            <p style={{ fontSize: "16px", color: "gray" }}>some name</p>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                                <ion-icon
                                                    name="document"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '10px' }}
                                                ></ion-icon>
                                                <p style={{ fontSize: "16px", color: "gray" }}>B classes</p>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                                <ion-icon
                                                    name="time"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '10px' }}
                                                ></ion-icon>
                                                <p style={{ fontSize: "16px", color: "gray" }}> 50 mins</p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: "100%" }}>
                                            <div style={styles.ratingContainer}>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                            </div>
                                            <p style={{ backgroundColor: "#0F52BA", padding: "2px 5px", borderRadius: "5px", color: "#fff" }}>4 <ion-icon
                                                name="star"
                                                style={{ color: 'white', fontSize: '14px', marginRight: '10px' }}
                                            ></ion-icon></p>
                                        </div>
                                    </div>

                                </div>
                                <div style={styles.card}>
                                    <div style={styles.cardHeader}>
                                        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Interaction - II</p>
                                        <p style={{ color: "gray", fontWeight: "bold" }}>...</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#000", fontSize: "14px" }}>some random text goes here..........</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                            <ion-icon
                                                name="person"
                                                style={{ fontSize: '24px', color: 'gray', }}>
                                            </ion-icon>

                                            <p style={{ fontSize: "16px", color: "gray" }}>some name</p>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                                <ion-icon
                                                    name="document"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '10px' }}
                                                ></ion-icon>
                                                <p style={{ fontSize: "16px", color: "gray" }}>B classes</p>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                                <ion-icon
                                                    name="time"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '10px' }}
                                                ></ion-icon>
                                                <p style={{ fontSize: "16px", color: "gray" }}> 50 mins</p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: "100%" }}>
                                            <div style={styles.ratingContainer}>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                            </div>
                                            <p style={{ backgroundColor: "#0F52BA", padding: "2px 5px", borderRadius: "5px", color: "#fff" }}>4 <ion-icon
                                                name="star"
                                                style={{ color: 'white', fontSize: '14px', marginRight: '10px' }}
                                            ></ion-icon></p>
                                        </div>
                                    </div>

                                </div>
                                <div style={styles.card}>
                                    <div style={styles.cardHeader}>
                                        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Interaction - III</p>
                                        <p style={{ color: "gray" }}>...</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#000", fontSize: "14px" }}>some random text goes here..........</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                            <ion-icon
                                                name="person"
                                                style={{ fontSize: '24px', color: 'gray', }}>
                                            </ion-icon>

                                            <p style={{ fontSize: "16px", color: "gray" }}>some name</p>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                                <ion-icon
                                                    name="document"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '10px' }}
                                                ></ion-icon>
                                                <p style={{ fontSize: "16px", color: "gray" }}>B classes</p>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                                <ion-icon
                                                    name="time"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '10px' }}
                                                ></ion-icon>
                                                <p style={{ fontSize: "16px", color: "gray" }}> 50 mins</p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: "100%" }}>
                                            <div style={styles.ratingContainer}>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'orange', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                                <ion-icon
                                                    name="star"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                            </div>
                                            <p style={{ backgroundColor: "#0F52BA", padding: "2px 5px", borderRadius: "5px", color: "#fff" }}>4 <ion-icon
                                                name="star"
                                                style={{ color: 'white', fontSize: '14px', marginRight: '10px' }}
                                            ></ion-icon></p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Upcoming Schedules */}
                    <div style={styles.rightColumn}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ fontWeight: "bold" }}>My Special Classes</p>
                            <button style={{ borderRadius: "10px" }} onClick={() => setShowForm(true)}>Book Now</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', backgroundColor: "#dceff1", borderRadius: "20px" ,padding:"10px 20px"}}>
                            {loadingEnrolled ? (
                                <p>Loading enrolled courses...</p>
                            ) : enrolledCourses.length === 0 ? (
                                <>
                                    <p style={{ color: "#0F52BA", fontWeight: "bold" }}>You don't have special booking</p>
                                    <img src={img} alt="No bookings" />
                                    <button style={{ borderRadius: "10px", backgroundColor: "#fff", color: "#0F52BA" }}>Book Now</button>
                                    <p style={{ fontSize: "14px", width: "300px", textAlign: "center" }}>We noticed that the "Special Booking" features is currently not being utilized</p>
                                </>
                            ) : (
                                <div style={{ width: '100%'}}>
                                    {enrolledCourses.map(course => (
                                        <div key={course._id} style={styles.enrolledCourseCard}>
                                           <div style={{width:"10%"}}>
                                           <ion-icon
                                                    name="star"
                                                    style={{ color: 'blue', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon>
                                           </div>
                                           <div style={{width:"80%"}}>
                                           <h3 style={{color:"gray"}}>{course?.courseId?.courseName}</h3>
                                            <div style={{display:"flex" , justifyContent:"space-between"}}>
                                            <p> <ion-icon
                                                    name="calendar-outline"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon> {new Date(course.enrollmentDate).toLocaleDateString()}</p>
                                            <p><ion-icon
                                                    name="time"
                                                    style={{ color: 'gray', fontSize: '24px', marginRight: '2px' }}
                                                ></ion-icon> {course.scheduleTime}</p>
                                            </div>
                                           </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                       
                    </div>

                    {showForm && (
                        <div style={styles.formOverlay}>
                            <div style={styles.formContainer}>
                                <div style={{display:"flex" ,alignItems:'center' , justifyContent:"space-between"}}>
                                    <h2>Book a Special Class</h2>
                                    <ion-icon
                                        name="close"
                                        style={{ color: 'black', fontSize: '24px', marginRight: '2px' }}
                                        onClick={() => setShowForm(false)}></ion-icon>
                                </div>
                                <form onSubmit={handleSubmit} style={styles.form}>
                                <select
                                        name="course"
                                        value={formData.course}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    >
                                        <option value="" disabled>Select a course</option>
                                        {loading ? (
                                            <option>Loading courses...</option>
                                        ) : (
                                            courses.map(course => (
                                                <option key={course.id} value={course._id}>{course.courseName}</option>
                                            ))
                                        )}
                                    </select>
                                    
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.timing}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        required
                                    />
                                    <button type="submit" style={styles.submitButton}>Submit</button>
                                    {/* <button type="button" onClick={() => setShowForm(false)} style={styles.cancelButton}>Cancel</button> */}
                                </form> </div></div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: "100vh",
        overflow: "hidden",
        // padding:"20px",
        paddingLeft:"50px",
        // marginLeft:"100px"
    },
    ratingContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    topSection: {
        display: 'flex',
        padding: "5px 8px", // Reduce the padding to make it thinner
        justifyContent: 'space-between',
        marginBottom: '10px', // Reduce marginBottom
        borderBottom: "1px solid lightgray",
    },
    topRight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    searchBar: {
        width: '30%',
        // padding: '10px',
        fontSize: '16px',
        borderRadius: '50px',
        border: '1px solid #ccc',
    },
    profileLogo: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    smallLogo: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    mainSection: {
        display: 'flex',
        justifyContent: 'space-between',
         overflowY:"scroll"
        // padding:"10px"
    },
    leftColumn: {
        width: '65%',
    },
    rightColumn: {
        height: "100%",
        width: '30%',
        padding: '20px',
        borderLeft: "1px solid lightgray",
        // backgroundColor: '#f1f1f1',
        // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        // borderRadius: '10px',
        overflow: "hidden",
        marginTop: "-10px"
    },
    videoSection: {
        marginBottom: '30px',
        padding: '0 10px',
        height: "auto"
    },
    videoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0',
        height: "auto"
        // marginTop: '20px',
    },
    video: {
        width: '100%',
        maxWidth: '600px',
        height: 'auto',
        maxHeight: '400px',
        borderRadius: '22px',
        objectFit: 'contain',
        // marginLeft: "-120px"
    },
    progressSection: {
        marginBottom: '30px',
    },
    cards: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: "10px",
        marginTop: '20px',
    },
    card: {
        width: '30%',
        padding: '0px 4px',
        borderRadius: '10px',
        backgroundColor: '#dceff1',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        borderTop: "4px solid #0F52BA"
    },
    scheduleCard: {
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    formOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        paddingRight: "10px",
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '2px',
        border: "none",
        borderBottom: '1px solid #000',
        outline: "none"
    },
    submitButton: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#0F52BA',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    cancelButton: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'gray',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px',
    },
    enrolledCourseCard: {
        // padding: '3px 10px',
        backgroundColor: 'aliceblue',
        borderRadius: '10px',
        marginBottom: '10px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        display:"flex",
        alignItems:"center",
        // gap:"20px"
        justifyContent:"space-around"
    },
};
