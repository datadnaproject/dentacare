import testimonialimage1 from '../assets/img/testimonial-1.jpg'
import testimonialimage2 from '../assets/img/testimonial-2.jpg'
export function Testimonial() {
  return (
    <>
      {/* Testimonial Start */}
      <div
        className="container-fluid bg-primary bg-testimonial py-5 my-5 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                className="owl-carousel testimonial-carousel rounded p-5 wow zoomIn"
                data-wow-delay="0.6s"
              >
                <div className="testimonial-item text-center text-white">
                  <img
                    className="img-fluid mx-auto rounded mb-4"
                    src={testimonialimage1}
                    alt=""
                  />
                  <p className="fs-5">
                    Dolores sed duo clita justo dolor et stet lorem kasd dolore
                    lorem ipsum. At lorem lorem magna ut et, nonumy labore diam
                    erat. Erat dolor rebum sit ipsum.
                  </p>
                  <hr className="mx-auto w-25" />
                  <h4 className="text-white mb-0">Client Name</h4>
                </div>
                <div className="testimonial-item text-center text-white">
                  <img
                    className="img-fluid mx-auto rounded mb-4"
                    src={testimonialimage2}
                    alt=""
                  />
                  <p className="fs-5">
                    Dolores sed duo clita justo dolor et stet lorem kasd dolore
                    lorem ipsum. At lorem lorem magna ut et, nonumy labore diam
                    erat. Erat dolor rebum sit ipsum.
                  </p>
                  <hr className="mx-auto w-25" />
                  <h4 className="text-white mb-0">Client Name</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </>
  );
}
