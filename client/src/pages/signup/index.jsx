import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../libs/validation/authSchema";
import { useAuth } from "../../hooks/useAuth";
import SIGNUP_MESSAGES from "../../constants/messages/signup-messages";
import getValidationErrors from "../../utils/validation";

const SignupPage = () => {

    const navigate = useNavigate();
    const { signUp } = useAuth();

    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");

    const handleChange = (field, value) => {
        setUser((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const result = signupSchema.safeParse(user);

        if (!result.success) {
            setErrors(getValidationErrors(result.error.issues));
            return;
        }

        try {
            await signUp(result.data);
            navigate("/");
        } catch (err) {
            const message =
                err.response?.data?.message ||
                SIGNUP_MESSAGES.SIGNUP_FAILED;

            setSubmitError(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold font-serif text-center mb-6">Sign Up</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">Name</label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">Password</label>
                        <input
                            type="password"
                            value={user.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

                    <button type="submit" className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500">
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Already have an account? <Link to="/login" className="text-purple-600 font-semibold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;