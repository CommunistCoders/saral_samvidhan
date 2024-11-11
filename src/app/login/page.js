"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./formStyles.css";

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) return; // Don't render anything until session check is complete
    if (session) {
      if (typeof window !== "undefined") {
        window.location.href = "/profile";
      }
    }
      // router.push("/"); // Redirect to the main page if logged in
  }, [session, router]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert(`Login failed: ${result.error}`);
      } else {
        // alert("Login successful!");
        if (typeof window !== "undefined") {
          window.location.href = "/discussionforum"; // Adjust to your protected route
        }
      }
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // name: email.split("@")[0], // Derive name from email
          email:email,
          password: newPassword,
          username:username
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message || "Server Error"}`);
        return;
      }

      const data = await response.json();
      alert(`${data.message}`);
      if (typeof window !== "undefined") {
        window.location.href = "/login"; // Adjust to your protected route
      }
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="form-wrapper">
          <div className="form-container">
            <div className="toggle-buttons">
              <motion.button
                className={isLogin ? "active" : ""}
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsLogin(true)}
              >
                Login
              </motion.button>
              <motion.button
                className={!isLogin ? "active" : ""}
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsLogin(false)}
              >
                Signup
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="form-content"
            >
              {isLogin ? (
                <motion.form className="login-form" onSubmit={handleLogin}>
                  <div className="field">
                    <input
                      type="email"
                      required
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email Address</label>
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      required
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                  </div>
                  <motion.button
                    type="submit"
                    className="submit-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Login"}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form className="signup-form" onSubmit={handleRegister}>
                  <div className="field">
                    <input
                      type="username"
                      required
                      id="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <label>Username</label>
                  </div>
                  <div className="field">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email Address</label>
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label>Password</label>
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label>Confirm Password</label>
                  </div>
                  <motion.button
                    type="submit"
                    className="submit-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Signup"}
                  </motion.button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
