import './parallax.css'
import img from './../../img/parallax.jpg'


const Parallax = () => {
    return ( 
        <section className="promo">
      <div className="container">
        <div className="promo__text">
          <div className="mutetit">
            <p>
                MSL - это удобство вашего времени
            </p>
          </div>
        </div>
        <div className="promo_img">
            <img src={img} alt="" />
        </div>
      </div>
    </section>
     );
}
 
export default Parallax;