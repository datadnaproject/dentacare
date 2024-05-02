<div className="form_container">
                  <form onSubmit={handleUpdateProfile}>
                    <div className="form-group1 mb-3">
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="form-group1">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="form-group1">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group1">
                      <label htmlFor="age">Age:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="form-group1">
                      <label htmlFor="phoneNumber">Phone Number:</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        pattern="[0-9]*" // This allows only numeric input
                      />
                    </div>
                    <div className="form-group1">
                      <label>Gender:</label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          checked={gender === "male"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="male" className="radio-label">
                          Male
                        </label>
                      </div>
                      <div className="radio-container">
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          checked={gender === "female"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="female" className="radio-label">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="form-group1">
                      <label htmlFor="location">Location:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mt-0">
                      Update Profile
                    </button>
                  </form>
                  <p>{message}</p>
                </div>