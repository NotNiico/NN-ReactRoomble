import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import App from "../App";
import Login from "../pages/log/Login";
import Signup from "../pages/log/Signup";
import Dashboard from "../pages/dashboard/dashboard";
import AdminPanel from "../pages/admin/AdminPanel";
import Home from "../pages/Home";
import PropertyDetail from "../components/propertyDetails/PropertyDetail";
import Bookings from "../components/bookings/Bookings";
import Favorites from "../components/favorites/Favorites";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        index: true,
        element: (
            <Home />
        ),
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: 'property/:id',
        element: (
          <ProtectedRoute>
            <PropertyDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'favorites',
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: (
          <h1>Error 404</h1>
        ),
      },
    ],
  },
]);

export default function Router() {
    return <RouterProvider router={router} />
}