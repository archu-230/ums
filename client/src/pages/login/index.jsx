import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "../../libs/validation/authSchema";
import { useAuth } from "../../hooks/useAuth";
import LOGIN_MESSAGES from "../../constants/messages/login-messages";
import getValidationErrors from "../../utils/validation";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [infoMessage] = useState(location.state?.message || "");

    const handleChange = (field, value) => {
        setCredentials((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
            setErrors(getValidationErrors(result.error.issues));
            return;
        }

        try {
            await login(result.data);
            navigate("/");
        } catch (err) {
            const message =
                err.response?.data?.message ||
                LOGIN_MESSAGES.INVALID_CREDENTIALS;
            setSubmitError(message);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold font-serif text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">Email</label>
                        <input
                            type="email"
                            value={credentials.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">Password</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        <div className="text-right mt-1">
                            <Link to="/forgot-password" className="text-sm text-purple-900 font-semibold">
                                Forgot password
                            </Link>
                        </div>
                    </div>

                    {infoMessage && <p className="text-green-600 text-sm text-center">{infoMessage}</p>}
                    {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

                    <button type="submit" className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500">
                        Login
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Don't have an account? <Link to="/signup" className="text-purple-600 font-semibold">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;