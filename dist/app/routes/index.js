"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const parcel_routes_1 = require("../modules/parcel/parcel.routes");
const auth_Route_1 = require("../modules/auth/auth.Route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/parcels",
        route: parcel_routes_1.ParcelRoutes,
    },
    {
        path: "/auth",
        route: auth_Route_1.AuthRouter,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
