import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "../../libs/validation/userSchema";
import userService from "../../services/user.service";
import CREATE_USER_MESSAGES from "../../constants/messages/create-user-messages";
import getValidationErrors from "../../utils/validation";
import DEFAULT_USER from "../../constants/defaultValues/user";
import USER_FIELDS from "../../constants/userFields";

const CreateUser = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [user, setUser] = useState(DEFAULT_USER);

    const handleInputChange = (field, value) => {
        setUser((prev) => ({
            ...prev,
            [field]: value
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const result = createUserSchema.safeParse(user);
        if (!result.success) {
            setErrors(getValidationErrors(result.error.issues));
            return;
        }

        try {
            await userService.createUser(result.data);
            navigate("/");
        } catch (err) {
            const message =
                err.response?.data?.message ||
                CREATE_USER_MESSAGES.CREATE_FAILED;

            setSubmitError(message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-purple-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 font-serif">
                        Create User
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Add a new user to the system
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => handleInputChange(USER_FIELDS.NAME, e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="Enter your name"
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => handleInputChange(USER_FIELDS.EMAIL, e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={user.password}
                            onChange={(e) => handleInputChange(USER_FIELDS.PASSWORD, e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="Enter your password"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {submitError && (
                        <p className="text-red-500 text-sm text-center">
                            {submitError}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#43245c] to-[#6d3ea3] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-300"
                    >
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;