import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
        <NavLink to="/" className="navbar-brand p-0">
          <h1 className="m-0 text-primary">
            <i className="fa fa-tooth me-2" />
            DentCare
          </h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <NavLink to="/" className="nav-item nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About
            </NavLink>
            <NavLink to="/service" className="nav-item nav-link">
              Service
            </NavLink>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu m-0">
                <NavLink to="/pricing" className="dropdown-item">
                  Pricing Plan
                </NavLink>
                <NavLink to="/team" className="dropdown-item">
                  Our Dentist
                </NavLink>
                <NavLink to="/testimonial" className="dropdown-item">
                  Testimonial
                </NavLink>
                <NavLink to="/appointment" className="dropdown-item">
                  Appointment
                </NavLink>
              </div>
            </div>
            <NavLink to="/contact" className="nav-item nav-link">
              Contact
            </NavLink>
          </div>
          <button
            type="button"
            className="btn text-dark"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fa fa-search" />
          </button>
          <NavLink to="/appointment" className="btn btn-primary py-2 px-4 ms-3">
            Appointment
          </NavLink>
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}
