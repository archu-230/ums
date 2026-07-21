import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetWithLinkSchema } from "../../libs/validation/passwordResetSchema";
import passwordResetService from "../../services/password-reset.service";
import FORGOT_PASSWORD_MESSAGES from "../../constants/messages/forgot-password-messages";
import getValidationErrors from "../../utils/validation";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
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

        const result = resetWithLinkSchema.safeParse(form);

        if (!result.success) {
            setErrors(getValidationErrors(result.error.issues));
            return;
        }

        try {
            setIsSubmitting(true);
            await passwordResetService.resetWithLink({
                token,
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

    if (!token) {
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
                <h2 className="text-2xl font-bold font-serif text-center mb-6">Reset Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    Remembered your password? <Link to="/login" className="text-purple-600 font-semibold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPasswordPage;