import priceimage1 from "../assets/img/price-1.jpg";
import priceimage2 from "../assets/img/price-2.jpg";
import priceimage3 from "../assets/img/price-3.jpg";

export function Pricing() {
  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Pricing Plan
              </h5>
              <h1 className="display-5 mb-0">
                We Offer Fair Prices for Dental Treatment
              </h1>
            </div>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor
              sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem
              et sit, sed stet no labore lorem sit. Sanctus clita duo justo
              eirmod magna dolore erat amet
            </p>
            <h5
              className="text-uppercase text-primary wow fadeInUp"
              data-wow-delay="0.3s"
            >
              Call for Appointment
            </h5>
            <h1 className="wow fadeInUp" data-wow-delay="0.6s">
              +012 345 6789
            </h1>
          </div>
          <div className="col-lg-7">
            <div id="carouselExampleCaptions" className="carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={0}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={priceimage1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={priceimage2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={priceimage3} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
