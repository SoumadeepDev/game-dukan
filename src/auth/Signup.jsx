import { useEffect, useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/index";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const navigate = useNavigate();

  const { userLoggedIn, currentUser } = useAuth();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setIsRegistering(false);
    setIsPasswordValid(false);
    setIsEmailValid(true);
    setIsConfirmPasswordValid(true);
  };

  useEffect(() => {
    resetForm();
  }, []);

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setIsPasswordValid(
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+])(?=.*?[a-z]).{8,}$/.test(
        value
      )
    );
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setIsConfirmPasswordValid(value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        setIsRegistering(false);
        return;
      }
      if (!isPasswordValid) {
        setErrorMessage(
          "Password must be at least 8 characters long and start with a capital letter."
        );
        setIsRegistering(false);
        return;
      }
      if (!isEmailValid) {
        setErrorMessage("Please enter a valid email address.");
        setIsRegistering(false);
        return;
      }
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        toast.success("Account is created successfully");
        await currentUser.updateProfile({ displayName: name });
        resetForm();
      } catch (error) {
        setIsRegistering(false);
        console.log("I am getting this error->", error);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage(
            "This email is already registered. Please use a different email address or log in using this email."
          );
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    }
  };

  console.log(currentUser);

  return (
    <>
      <Helmet>
        <title>SignUp | Game-Store</title>
      </Helmet>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <div className="login template d-flex justify-content-center align-items-center vh-100 aliceblue">
        <div className="form_container p-5 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Create New Account</h3>
            <div className="mb-2 row">
              <label
                htmlFor="name"
                className="mb-2 col-12 col-md-3 col-form-label"
              >
                Name
              </label>
              <div className="col-12 col-md-9">
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            </div>
            <div className="mb-2 row">
              <label
                htmlFor="email"
                className="mb-2 col-12 col-md-3 col-form-label"
              >
                Email
              </label>
              <div className="col-12 col-md-9">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  className={`form-control ${isEmailValid ? "" : "is-invalid"}`}
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {!isEmailValid && (
                  <div className="invalid-feedback">
                    Please enter a valid email address
                  </div>
                )}
              </div>
            </div>

            <div className="mb-2 row">
              <label htmlFor="password" className="mb-2 col-12 col-md-3">
                Password
              </label>
              <div className="col-12 col-md-9">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  className={`form-control ${
                    isPasswordValid ? "is-valid" : "is-invalid"
                  }`}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {isPasswordValid && (
                  <div className="valid-feedback">Password is valid.</div>
                )}
                {!isPasswordValid && (
                  <div className="invalid-feedback">
                    Password must be at least 8 characters long and start with a
                    capital letter, must have at least one number and one
                    special character (@#$%)
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2 row">
              <label
                htmlFor="confirm_password"
                className="mb-2 col-12 col-md-3"
              >
                Confirm Password
              </label>
              <div className="col-12 col-md-9">
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Enter same password again"
                  className={`form-control ${
                    isConfirmPasswordValid ? "" : "is-invalid"
                  }`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {!isConfirmPasswordValid && (
                  <div className="invalid-feedback">Passwords do not match</div>
                )}
              </div>
            </div>

            <div className="d-grid m-4">
              <button className="btn btn-success w-100 text-center justify-content-center d-flex mx-auto">
                Sign Up
              </button>
            </div>
          </form>

          {errorMessage && (
            <span className="text-danger font-weight-bold">{errorMessage}</span>
          )}

          <p
            className="text-center m-2"
            style={{
              fontSize: "larger",
              color: "red",
            }}
          >
            already have an account?
            <a href="/" className="m-2" style={{ color: "red" }}>
              Continue to Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
