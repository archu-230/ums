import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/Main";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const HomePage = lazy(() => import("../pages/home"));
const CreateUser = lazy(() => import("../pages/createuser"));
const EditPage = lazy(() => import("../pages/edit"));
const LoginPage = lazy(() => import("../pages/login"));
const SignupPage = lazy(() => import("../pages/signup"));
const ForgotPasswordPage = lazy(() => import("../pages/forgot-password"));
const ResetPasswordOtpPage = lazy(() => import("../pages/reset-password-otp"));
const ResetPasswordPage = lazy(() => import("../pages/reset-password"));

const Loader = () => <div>Loading...</div>;

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/login",
                element: (
                    <Suspense fallback={<Loader />}>
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: "/signup",
                element: (
                    <Suspense fallback={<Loader />}>
                        <SignupPage />
                    </Suspense>
                ),
            },
            {
                path: "/forgot-password",
                element: (
                    <Suspense fallback={<Loader />}>
                        <ForgotPasswordPage />
                    </Suspense>
                ),
            },
            {
                path: "/reset-password-otp",
                element: (
                    <Suspense fallback={<Loader />}>
                        <ResetPasswordOtpPage />
                    </Suspense>
                ),
            },
            {
                path: "/reset-password",
                element: (
                    <Suspense fallback={<Loader />}>
                        <ResetPasswordPage />
                    </Suspense>
                ),
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loader />}>
                                <HomePage />
                            </Suspense>
                        ),
                    },
                    {
                        path: "/create-user",
                        element: (
                            <Suspense fallback={<Loader />}>
                                <CreateUser />
                            </Suspense>
                        ),
                    },
                    {
                        path: "/edit/:id",
                        element: (
                            <Suspense fallback={<Loader />}>
                                <EditPage />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;