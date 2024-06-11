import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../authContext/index";
import { FcGoogle } from "react-icons/fc";
// import { FaEyeSlash } from "react-icons/fa";
// import { FaRegEye } from "react-icons/fa";
import sleep from "/sleep.gif";
import eye from "/eye.gif";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        toast.success("Welcome to Game-Store");
      } catch (error) {
        setIsSigningIn(false);
        if (error.code === "auth/user-not-found") {
          setErrorMessage(
            "This email is not registered. Please sign up or check your credentials."
          );
        } else {
          setErrorMessage(
            "Invalid email or password. Please check your credentials and try again."
          );
        }
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login | Game-Store</title>
      </Helmet>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div className="container-fluid d-flex flex-column align-items-center vh-100 justify-content-center">
        <img
          src="/logo-white.svg"
          alt="Logo"
          style={{
            height: "200px",
            width: "200px",
            color: "white",
            margin: "-3rem auto",
          }}
        />
        <div
          className="card shadow-lg p-4 border rounded-lg"
          style={{ width: "30rem" }}
        >
          <div className="text-center">
            <h2 className="text-dark font-weight-bold mt-2">Welcome Back</h2>
          </div>
          <form onSubmit={onSubmit} className="mt-4">
            <div className="form-group">
              <label className="font-weight-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mt-2"
              />
            </div>

            <div className="form-group position-relative mt-3">
              <label className="font-weight-bold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mt-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-link position-absolute"
                style={{ top: "2.0rem", right: "1rem" }}
              >
                {showPassword ? (
                  <img
                    src={eye}
                    width="35px"
                    height="35px"
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "-5px",
                    }}
                  ></img>
                ) : (
                  <img
                    src={sleep}
                    width="35px"
                    height="35px"
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "-5px",
                    }}
                  ></img>
                  // <FaEyeSlash size={20} />
                )}
              </button>
            </div>

            {errorMessage && (
              <span className="text-danger font-weight-bold">
                {errorMessage}
              </span>
            )}

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                disabled={isSigningIn}
                className={`btn btn-primary mt-3 ${
                  isSigningIn ? "disabled" : ""
                }`}
                style={{ width: "50%" }}
              >
                {isSigningIn ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="d-flex justify-content-between  mt-4">
            <p className="mb-0">
              Don't have an account?{" "}
              <Link to={"/signup"} className="font-weight-bold">
                New Here? Register
              </Link>
            </p>
            <p className="mb-0">
              <Link to={"/forgotpassword"} className="font-weight-bold">
                Forgot Password?
              </Link>
            </p>
          </div>

          <div className="d-flex align-items-center mt-4">
            <hr className="flex-grow-1 mr-2" />
            <span className="font-weight-bold">OR</span>
            <hr className="flex-grow-1 ml-2" />
          </div>
          <button
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
            className={`btn btn-outline-secondary btn-block mt-3 d-flex align-items-center justify-content-center gap-3 ${
              isSigningIn ? "disabled" : ""
            }`}
          >
            <FcGoogle color="orange" />
            {isSigningIn ? "Signing In..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
