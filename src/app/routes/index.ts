import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ParcelRoutes } from "../modules/parcel/parcel.routes";
import { AuthRouter } from "../modules/auth/auth.Route";

export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes,
    },
    {
        path: "/parcels",
        route: ParcelRoutes,
    },
    {
        path: "/auth",
        route: AuthRouter,
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
