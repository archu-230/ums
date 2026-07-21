import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetWithOtpSchema } from "../../libs/validation/passwordResetSchema";
import passwordResetService from "../../services/password-reset-service";
import FORGOT_PASSWORD_MESSAGES from "../../constants/messages/forgot-password-messages";
import getValidationErrors from "../../utils/validation";

const ResetPasswordOtpPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [form, setForm] = useState({ otp: "", newPassword: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        if (!email) {
            setSubmitError(FORGOT_PASSWORD_MESSAGES.GENERIC_ERROR);
            return;
        }

        const result = resetWithOtpSchema.safeParse(form);

        if (!result.success) {
            setErrors(getValidationErrors(result.error.issues));
            return;
        }

        try {
            setIsSubmitting(true);
            await passwordResetService.resetWithOtp({
                email,
                otp: result.data.otp,
                newPassword: result.data.newPassword,
            });
            navigate("/login", { state: { message: FORGOT_PASSWORD_MESSAGES.RESET_SUCCESS } });
        } catch (err) {
            setSubmitError(
                err.response?.data?.message || FORGOT_PASSWORD_MESSAGES.GENERIC_ERROR
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 text-center">
                    <p className="text-gray-700 mb-4">{FORGOT_PASSWORD_MESSAGES.MISSING_TOKEN}</p>
                    <Link to="/forgot-password" className="text-purple-600 font-semibold">
                        Go back
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold font-serif text-center mb-2">Enter OTP</h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    We sent a code to <span className="font-semibold">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">OTP</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={form.otp}
                            onChange={(e) => handleChange("otp", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 tracking-widest text-center"
                        />
                        {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">New Password</label>
                        <input
                            type="password"
                            value={form.newPassword}
                            onChange={(e) => handleChange("newPassword", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-serif">Confirm Password</label>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => handleChange("confirmPassword", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 disabled:opacity-60"
                    >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Didn't get a code? <Link to="/forgot-password" className="text-purple-600 font-semibold">Try again</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPasswordOtpPage;