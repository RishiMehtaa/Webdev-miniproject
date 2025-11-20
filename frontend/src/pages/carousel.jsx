import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./carousel.css";

function ImageCarousel() {
  const images = [
    "/images/main1.jpeg",
    "/images/main2.avif",
    "/images/main3.jpg",
  ];
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };
  
  return (
    <Slider {...settings} className="main-slider">
      {images.map((img, index) => (
        <div key={index}>
          <div
            className="main-slide"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="main-overlay">
              <h1>Empowering Rural Communities</h1>
              <p>Supporting sustainable development and growth in India</p>
              <div className="main-buttons">
                <button className="white-btn">Donate Now</button>
                <button className="dark-btn">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );    
}

export default ImageCarousel;