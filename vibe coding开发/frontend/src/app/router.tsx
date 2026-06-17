import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { HomePage } from "../pages/home/HomePage";
import { PostCreatePage } from "../pages/posts/PostCreatePage";
import { PostDetailPage } from "../pages/posts/PostDetailPage";
import { CampusNewsPage } from "../pages/channels/CampusNewsPage";
import { LostFoundPage } from "../pages/channels/LostFoundPage";
import { MarketplacePage } from "../pages/channels/MarketplacePage";
import { StudyHelpPage } from "../pages/channels/StudyHelpPage";
import { MessageCenterPage } from "../pages/messages/MessageCenterPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { SettingsPage } from "../pages/profile/SettingsPage";
import { SearchPage } from "../pages/search/SearchPage";
import { ReviewDashboardPage } from "../pages/admin/ReviewDashboardPage";
import { AppErrorBoundary } from "../pages/system/AppErrorBoundary";
import { NotFoundPage } from "../pages/system/NotFoundPage";
import { UnauthorizedPage } from "../pages/system/UnauthorizedPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <MainLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <HomePage /> },
      { path: "/posts/new", element: <PostCreatePage /> },
      { path: "/posts/:postId", element: <PostDetailPage /> },
      { path: "/campus-news", element: <CampusNewsPage /> },
      { path: "/lost-found", element: <LostFoundPage /> },
      { path: "/marketplace", element: <MarketplacePage /> },
      { path: "/marketplace/:postId", element: <PostDetailPage /> },
      { path: "/study-help", element: <StudyHelpPage /> },
      { path: "/messages", element: <MessageCenterPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/unauthorized", element: <UnauthorizedPage /> },
    ],
  },
  {
    element: <AdminLayout />,
    errorElement: <AppErrorBoundary />,
    children: [{ path: "/admin/review", element: <ReviewDashboardPage /> }],
  },
  { path: "*", element: <NotFoundPage /> },
]);
