{
  /* User login */
}
<div
  className="dropdown"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <FontAwesomeIcon
    icon={faUser}
    aria-hidden="true"
    style={{
      marginRight: "50px",
      cursor: "pointer",
      marginTop: "15px",
      marginLeft: "15px",
      color: "white",
    }}
  />
  <div
    className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
    style={{
      backgroundColor: "white",
      border: "1px solid black",
      width: "10px",
      maxHeight: "200px",
      overflowY: "auto",
    }}
  >
    {isLoggedIn ? (
      <>
        <NavLink
          to="/profile"
          className="dropdown-item"
          style={{
            textTransform: "uppercase",
            fontSize: "12px",
            color: "black",
            backgroundColor: "transparent",
          }}
          hover={{ backgroundColor: "#007bff" }}
        >
          Profile
        </NavLink>
        <NavLink
          to="/seo-settings"
          className="dropdown-item"
          style={{
            textTransform: "uppercase",
            fontSize: "12px",
            color: "black",
            backgroundColor: "transparent",
          }}
        >
          SEO Settings
        </NavLink>
        <NavLink
          to="/adminpage"
          className="dropdown-item"
          style={{
            textTransform: "uppercase",
            fontSize: "12px",
            color: "black",
            backgroundColor: "transparent",
          }}
        >
          Admin Page
        </NavLink>
        <NavLink
          to="/"
          className="dropdown-item"
          onClick={handleLogout}
          style={{
            textTransform: "uppercase",
            fontSize: "12px",
            color: "black",
            backgroundColor: "transparent",
          }}
        >
          Logout
        </NavLink>
      </>
    ) : (
      <NavLink
        to="/signin"
        className="dropdown-item"
        style={{
          textTransform: "uppercase",
          fontSize: "12px",
          color: "black",
          backgroundColor: "transparent",
        }}
      >
        Login
      </NavLink>
    )}
  </div>
</div>;
{
  /* User login */
}
