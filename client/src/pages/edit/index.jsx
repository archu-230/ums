import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserSchema } from "../../libs/validation/userSchema";
import userService from "../../services/user.service";
import UPDATE_USER_MESSAGES from "../../constants/messages/update-user-messages";
import getValidationErrors from "../../utils/validation";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const result = await userService.getUserById(id);
                setUser({ name: result.name, email: result.email, password: "" });
            } catch (err) {
                setSubmitError(UPDATE_USER_MESSAGES.LOAD_FAILED);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const result = updateUserSchema.safeParse(user);

        if (!result.success) {
            setErrors(getValidationErrors(result.error.issues));
            return;
        }

        const payload = { name: result.data.name, email: result.data.email };
        if (result.data.password) {
            payload.password = result.data.password;
        }

        try {
            await userService.updateUser(id, payload);
            navigate("/");
        } catch (err) {
            const message =
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : UPDATE_USER_MESSAGES.UPDATE_FAILED;
            setSubmitError(message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold font-serif text-center text-[#3d2452] mb-8">
                    Edit User
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5a3d7a]"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}

                    <input
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5a3d7a]"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                    <input
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5a3d7a]"
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}

                    {submitError && <p className="text-red-500">{submitError}</p>}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#221133] to-[#5a3d7a] text-white py-3 rounded-xl hover:opacity-90 transition duration-300"
                    >
                        Update User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPage;