import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../../assets/Banner/pexels-photo-1327430.jpeg'
import img2 from '../../../assets/Banner/pexels-photo-7940018.webp'
import img3 from '../../../assets/Banner/saxophone-music-gold-gloss-45243.jpeg'


const Banner = () => {
    return (
        <Carousel  className="">
        <div >
            <img src={img1}/>
            
        </div>
        <div>
            <img src={img2} />
           
        </div>
        <div>
            <img src={img3} />
        </div>
    </Carousel>
    );
};

export default Banner;