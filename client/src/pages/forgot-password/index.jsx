import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../../libs/validation/passwordResetSchema";
import passwordResetService from "../../services/password-reset-service";
import FORGOT_PASSWORD_MESSAGES from "../../constants/messages/forgot-password-messages";
import getValidationErrors from "../../utils/validation";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [loadingAction, setLoadingAction] = useState(null);

    const validateEmail = () => {
        const result = forgotPasswordSchema.safeParse({ email });

        if (!result.success) {
            setErrors(getValidationErrors(result.error.issues));
            return null;
        }

        setErrors({});
        return result.data.email;
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setSubmitError("");
        setInfoMessage("");

        const validEmail = validateEmail();
        if (!validEmail) return;

        try {
            setLoadingAction("otp");
            await passwordResetService.sendOtp(validEmail);
            navigate("/reset-password-otp", { state: { email: validEmail } });
        } catch (err) {
            setSubmitError(
                err.response?.data?.message || FORGOT_PASSWORD_MESSAGES.GENERIC_ERROR
            );
        } finally {
            setLoadingAction(null);
        }
    };

    const handleSendLink = async (e) => {
        e.preventDefault();
        setSubmitError("");
        setInfoMessage("");

        const validEmail = validateEmail();
        if (!validEmail) return;

        try {
            setLoadingAction("link");
            await passwordResetService.sendResetLink(validEmail);
            setInfoMessage(FORGOT_PASSWORD_MESSAGES.RESET_LINK_SENT);
        } catch (err) {
            setSubmitError(
                err.response?.data?.message || FORGOT_PASSWORD_MESSAGES.GENERIC_ERROR
            );
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold font-serif text-center mb-2">Forgot Password</h2>
            

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((prev) => ({ ...prev, email: "" }));
                            }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}
                    {infoMessage && <p className="text-green-600 text-sm text-center">{infoMessage}</p>}

                    <button
                        type="submit"
                        onClick={handleSendOtp}
                        disabled={loadingAction !== null}
                        className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 disabled:opacity-60"
                    >
                        {loadingAction === "otp" ? "Sending OTP..." : "Send OTP to Email"}
                    </button>

                    <button
                        type="submit"
                        onClick={handleSendLink}
                        disabled={loadingAction !== null}
                        className="w-full py-3 rounded-xl text-purple-600 font-semibold border border-purple-600 disabled:opacity-60"
                    >
                        {loadingAction === "link" ? "Sending Link..." : "Send Reset Link to Email"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Remembered your password? <Link to="/login" className="text-purple-600 font-semibold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;