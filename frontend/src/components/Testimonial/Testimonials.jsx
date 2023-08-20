import React from 'react';
import Slider from 'react-slick';
import ava01 from '../../assets/images/ava-1.jpg';
import ava02 from '../../assets/images/ava-2.jpg';
import ava03 from '../../assets/images/ava-3.jpg';

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            <div className='testimonial py-4 px-3'>
                <p>
                    Absolutely amazed by the personalized travel plans from
                    Travel Box! Their tailored itinerary helped me explore the
                    heart of Bangladesh, uncovering hidden gems I wouldn't have
                    found on my own. The real-time updates and round-the-clock
                    support added an extra layer of comfort. I can't wait for my
                    next adventure with them!
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img
                        src={ava01}
                        className='w-25 h-25 rounded-2'
                        alt=''
                    />
                    <div>
                        <h6 className='mb-0 mt-3'>Aminul Hussain</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className='testimonial py-4 px-3'>
                <p>
                    I had an incredible journey thanks to Travel Box. The
                    seamless booking process made planning my trip effortless,
                    and the local insights shared by the app helped me discover
                    the true essence of Bangladesh. Their immersive experiences
                    and local partnerships made my trip unforgettable. Highly
                    recommended!
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img
                        src={ava02}
                        className='w-25 h-25 rounded-2'
                        alt=''
                    />
                    <div>
                        <h6 className='mb-0 mt-3'>Farida Rahman</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className='testimonial py-4 px-3'>
                <p>
                    I'm beyond impressed with Travel Box. The personalized
                    service, attention to detail, and prompt support truly set
                    them apart. From booking accommodations to experiencing
                    cultural activities, every aspect of my trip was well taken
                    care of. Thanks to the app, I explored Bangladesh like a
                    local and created memories that will last a lifetime
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img
                        src={ava03}
                        className='w-25 h-25 rounded-2'
                        alt=''
                    />
                    <div>
                        <h6 className='mb-0 mt-3'>Ahmed Khan</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className='testimonial py-4 px-3'>
                <p>
                    Using Travel Box was a game-changer for my Bangladesh
                    adventure! The curated itineraries and local insights
                    transformed my trip into an unforgettable journey. The
                    real-time updates and 24/7 support ensured I felt safe and
                    informed throughout. Thanks to the app, I explored
                    Bangladesh's wonders with ease and had the time of my life!"
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img
                        src={ava02}
                        className='w-25 h-25 rounded-2'
                        alt=''
                    />
                    <div>
                        <h6 className='mb-0 mt-3'>Nusrat Ahmed</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
        </Slider>
    );
};
export default Testimonials;
