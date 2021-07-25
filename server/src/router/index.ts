import { Router } from "express";
import multer from "multer";
import { AdminController } from "../controllers/AdminController";
import { AuthController } from "../controllers/AuthController";
import { DataController } from "../controllers/DataController";
import { LandingController } from "../controllers/LandingController";
import { ClientController } from "../controllers/ClientController";
import { AdminMiddleware } from "../middlewares/AdminMiddleware";
import { ClientMiddleware } from "../middlewares/ClientMiddleware";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ dest: "/tmp/", storage: storage });

// Controllers
const auth = new AuthController();
const admin = new AdminController();
const client = new ClientController();
const landing = new LandingController();
const data = new DataController();

// Middlewares
const adminMW = new AdminMiddleware();
const clientMW = new ClientMiddleware();

/** Routes for landing controller */

//Experts section-------------------------------------
router.get("/experts", landing.getExperts);
router.get("/experts/:id", landing.getExpertById);
router.post("/experts", landing.addExpert);
router.post("/experts/import", upload.single("file"), data.importExperts);
router.put("/experts/:id", upload.single("file"), landing.editExpert);
router.delete("/experts/:id", landing.deleteExpert);
/****************************************************/

// Contacts section *********************************/
router.post("/feedback/", landing.writeFeedback);
/****************************************************/
// Routes for login and register
router.post("/login", auth.formLogin);
router.post("/register", auth.formRegister);

// Routes for admin dashboard
router.post("/admin/check-jwt", admin.checkJWT);
router.get("/admin/orders", adminMW.check, admin.getOrders);
router.get("/admin/get-user/:id", adminMW.check, auth.getUser);
router.get("/admin/logout/:id", auth.formLogout);
router.get("/admin/orders/:id", adminMW.check, admin.getSingleOrder);

// Routes for user account
router.get(
  "/client/:client_id/orders",
  clientMW.check,
  client.getOrdersForClient
);
router.get(
  "/client/:client_id/orders/:id",
  clientMW.check,
  client.getOrdersForClientById
);
router.post("/client/:client_id/send-order", clientMW.check, client.sendOrder);

// Routes for get data
router.get("/users", adminMW.check, auth.getUsers);

export default router;