import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const SortArrow = ({ active, order }) => {
    if (!active) {
        return <FaSort className="inline-block ml-2 text-xs opacity-60" />;
    }

    return order === "asc" ? (
        <FaSortUp className="inline-block ml-2 text-xs" />
    ) : (
        <FaSortDown className="inline-block ml-2 text-xs" />
    );
};

const UserTable = ({ users, sortBy, onSort, onEdit, onDelete, onToggleBlock }) => {
    return (
        <div className="overflow-hidden border border-gray-200 bg-white shadow-xl">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-[#43245c] to-[#6d3ea3] text-white font-[Georgia]">
                        <tr>
                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                                ID
                            </th>

                            <th
                                onClick={() => onSort("name")}
                                className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider cursor-pointer select-none hover:bg-white/10 transition"
                            >
                                Name
                                <SortArrow active={sortBy === "name"} />
                            </th>

                            <th
                                onClick={() => onSort("email")}
                                className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider cursor-pointer select-none hover:bg-white/10 transition"
                            >
                                Email
                                <SortArrow active={sortBy === "email"} />
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 font-[Georgia]">
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`transition hover:bg-purple-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                            >
                                <td className="px-6 py-4 text-center text-sm text-gray-700 break-all">
                                    {index + 1}
                                </td>

                                <td className="px-6 py-4 text-center font-medium text-gray-800">
                                    {user.name}
                                </td>

                                <td className="px-6 py-4 text-center text-gray-600">
                                    {user.email}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-3 flex-wrap">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onToggleBlock(user)}
                                            className={`rounded-lg px-4 py-2 text-sm font-medium text-white shadow transition ${user.isBlocked
                                                ? "bg-amber-500 hover:bg-amber-600"
                                                : "bg-slate-600 hover:bg-slate-700"
                                                }`}
                                        >
                                            {user.isBlocked ? "Unblock" : "Block"}
                                        </button>

                                        <button
                                            onClick={() => onDelete(user._id)}
                                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-10 text-center text-gray-500 text-lg"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;