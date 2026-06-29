import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import HistoryPage from "./pages/HistoryPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import SettingsPage from "./pages/SettingsPage";
import LikedPage from "./pages/LikedPage";
import ProfilePage from "./pages/ProfilePage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import UploadVideoPage from "./components/profile/UploadVideoPage";
import EditProfilePage from "./components/profile/EditProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/subscriptions" element={<SubscriptionPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/profile">
          <Route index element={<ProfilePage />} />
          <Route path="upload" element={<UploadVideoPage />} />
          <Route path="edit" element={<EditProfilePage />} />
        </Route>
      </Route>
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
