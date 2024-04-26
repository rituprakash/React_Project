import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/SignUp";
import Login from "./auth/Login";
import ListMedicine from "./medicine/ListMedicine";
import CreateMedicine from "./medicine/CreateMedicine";
import EditMedicine from "./medicine/EditMedicine";
import DeleteMedicineItem from "./medicine/DeleteMedicineItem";
import ViewMedicine from "./medicine/ViewMedicine";
import App from "../App";

const router = createBrowserRouter([
    
    {path: '/', element: <App/>},
    { path: '/register', element: <Register/> },
    { path: '/login', element: <Login/> },
    { path: '/medicine/posts', element: <ListMedicine/> },
    { path :'/medicine/posts/create' , element : <CreateMedicine/> },
    { path : '/medicine/posts/:postId/delete', element: <DeleteMedicineItem/>},
    { path : '/medicine/posts/:postId/edit', element: <EditMedicine/>},
    { path:  'medicine/posts/:postId/view', element: <ViewMedicine/>},

]);

export default router;

