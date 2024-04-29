export function Banner() {
  return (
    <>
      {/* Banner Start */}
      <div className="container-fluid banner mb-5">
        <div className="container">
          <div className="row gx-0">
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.1s">
              <div
                className="bg-primary d-flex flex-column p-5"
                style={{ height: 300 }}
              >
                <h3 className="text-white mb-3">Opening Hours</h3>
                <div className="d-flex justify-content-between text-white mb-3">
                  <h6 className="text-white mb-0">Mon - Fri</h6>
                  <p className="mb-0"> 8:00am - 9:00pm</p>
                </div>
                <div className="d-flex justify-content-between text-white mb-3">
                  <h6 className="text-white mb-0">Saturday</h6>
                  <p className="mb-0"> 8:00am - 7:00pm</p>
                </div>
                <div className="d-flex justify-content-between text-white mb-3">
                  <h6 className="text-white mb-0">Sunday</h6>
                  <p className="mb-0"> 8:00am - 5:00pm</p>
                </div>
                <a className="btn btn-light" to="/appointment">
                  Appointment
                </a>
              </div>
            </div>
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.3s">
              <div
                className="bg-dark d-flex flex-column p-5"
                style={{ height: 300 }}
              >
                <h3 className="text-white mb-3">Search A Doctor</h3>
                <div
                  className="date mb-3"
                  id="date"
                  data-target-input="nearest"
                >
                  <input
                    type="text"
                    className="form-control bg-light border-0 datetimepicker-input"
                    placeholder="Appointment Date"
                    data-target="#date"
                    data-toggle="datetimepicker"
                    style={{ height: 40 }}
                  />
                </div>
                <select
                  className="form-select bg-light border-0 mb-3"
                  style={{ height: 40 }}
                >
                  <option>Select A Service</option>
                  <option value={1}>Service 1</option>
                  <option value={2}>Service 2</option>
                  <option value={3}>Service 3</option>
                </select>
                <a className="btn btn-light" href="">
                  Search Doctor
                </a>
              </div>
            </div>
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.6s">
              <div
                className="bg-secondary d-flex flex-column p-5"
                style={{ height: 300 }}
              >
                <h3 className="text-white mb-3">Make Appointment</h3>
                <p className="text-white">
                  Ipsum erat ipsum dolor clita rebum no rebum dolores labore,
                  ipsum magna at eos et eos amet.
                </p>
                <h2 className="text-white mb-0">+012 345 6789</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Start */}
    </>
  );
}
