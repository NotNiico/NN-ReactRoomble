import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <div>Hola desde Router index</div>
            },
            {
                path:"explore",
                element: <ProtectedRoute element={ <Explore /> } />
            },
            {
                path: "about",
                element: <ProtectedRoute element={ <About /> } />
            }
        ]
    }
]);

export default function Router() {
    return <RouterProvider router={router} />
}