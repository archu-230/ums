import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.service";
import UserTable from "../../components/table/UserTable";
import Pagination from "../../components/pagination/Pagination";
import API_MESSAGES from "../../constants/messages/api-messages";

const DEFAULT_SORT_BY = "createdAt";

const HomePage = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const sortOrder = useMemo(() => {
        return sortBy === DEFAULT_SORT_BY ? "desc" : "asc";
    }, [sortBy]);

    const loadUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const result = await userService.getUsers({
                page,
                limit: 10,
                sortBy,
                sortOrder
            });

            setUsers(result.users);
            setPagination(result.pagination);

        } catch (err) {
            setError(API_MESSAGES.LOAD_USERS_FAILED);
        } finally {
            setLoading(false);
        }
    }, [page, sortBy, sortOrder]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleSort = useCallback((field) => {
        setSortBy((prev) =>
            prev === field ? DEFAULT_SORT_BY : field
        );
    }, []);

    const removeUser = useCallback(async (id) => {
        try {
            await userService.deleteUser(id);
            loadUsers();
        } catch (err) {
            setError(API_MESSAGES.DELETE_USER_FAILED);
        }
    }, [loadUsers]);

    const toggleBlock = useCallback(async (user) => {
        try {
            await userService.updateBlockStatus(user._id, !user.isBlocked);
            loadUsers();
        } catch (err) {
            setError(API_MESSAGES.TOGGLE_BLOCK_FAILED);
        }
    }, [loadUsers]);

    const handleEdit = useCallback((user) => {
        navigate(`/edit/${user._id}`);
    }, [navigate]);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-400 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-cover" >
            <UserTable
                users={users}
                sortBy={sortBy}
                onSort={handleSort}
                onEdit={handleEdit}
                onDelete={removeUser}
                onToggleBlock={toggleBlock}
            />

            {pagination && <Pagination pagination={pagination} onPageChange={setPage} />}
        </div>
    );
};

export default HomePage;