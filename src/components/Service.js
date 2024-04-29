import beforeimage from '../assets/img/before.jpg'
import afterimage from '../assets/img/after.jpg'
import serviveimage1 from '../assets/img/service-1.jpg'
import serviveimage2 from '../assets/img/service-2.jpg'
import serviveimage3 from '../assets/img/service-3.jpg'
import serviveimage4 from '../assets/img/service-4.jpg'

export function Service() {
  return (
    <>
      <>
        {/* Service Start */}
        <div
          className="container-fluid py-5 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <div className="row g-5 mb-5">
              <div
                className="col-lg-5 wow zoomIn"
                data-wow-delay="0.3s"
                style={{ minHeight: 400 }}
              >
                <div className="twentytwenty-container position-relative h-100 rounded overflow-hidden">
                  <img
                    className="position-absolute w-100 h-100"
                    src={beforeimage}
                    style={{ objectFit: "cover" }}
                  />
                  <img
                    className="position-absolute w-100 h-100"
                    src={afterimage}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="section-title mb-5">
                  <h5 className="position-relative d-inline-block text-primary text-uppercase">
                    Our Services
                  </h5>
                  <h1 className="display-5 mb-0">
                    We Offer The Best Quality Dental Services
                  </h1>
                </div>
                <div className="row g-5">
                  <div
                    className="col-md-6 service-item wow zoomIn"
                    data-wow-delay="0.6s"
                  >
                    <div className="rounded-top overflow-hidden">
                      <img
                        className="img-fluid"
                        src={serviveimage1}
                        alt=""
                      />
                    </div>
                    <div className="position-relative bg-light rounded-bottom text-center p-4">
                      <h5 className="m-0">Cosmetic Dentistry</h5>
                    </div>
                  </div>
                  <div
                    className="col-md-6 service-item wow zoomIn"
                    data-wow-delay="0.9s"
                  >
                    <div className="rounded-top overflow-hidden">
                      <img
                        className="img-fluid"
                        src={serviveimage2}
                        alt=""
                      />
                    </div>
                    <div className="position-relative bg-light rounded-bottom text-center p-4">
                      <h5 className="m-0">Dental Implants</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-5 wow fadeInUp" data-wow-delay="0.1s">
              <div className="col-lg-7">
                <div className="row g-5">
                  <div
                    className="col-md-6 service-item wow zoomIn"
                    data-wow-delay="0.3s"
                  >
                    <div className="rounded-top overflow-hidden">
                      <img
                        className="img-fluid"
                        src={serviveimage3}
                        alt=""
                      />
                    </div>
                    <div className="position-relative bg-light rounded-bottom text-center p-4">
                      <h5 className="m-0">Dental Bridges</h5>
                    </div>
                  </div>
                  <div
                    className="col-md-6 service-item wow zoomIn"
                    data-wow-delay="0.6s"
                  >
                    <div className="rounded-top overflow-hidden">
                      <img
                        className="img-fluid"
                        src={serviveimage4}
                        alt=""
                      />
                    </div>
                    <div className="position-relative bg-light rounded-bottom text-center p-4">
                      <h5 className="m-0">Teeth Whitening</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-5 service-item wow zoomIn"
                data-wow-delay="0.9s"
              >
                <div className="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                  <h3 className="text-white mb-3">Make Appointment</h3>
                  <p className="text-white mb-3">
                    Clita ipsum magna kasd rebum at ipsum amet dolor justo dolor
                    est magna stet eirmod
                  </p>
                  <h2 className="text-white mb-0">+012 345 6789</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Service End */}
      </>
    </>
  );
}
