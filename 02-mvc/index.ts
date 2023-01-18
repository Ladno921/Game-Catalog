import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import { ItemsController } from './controllers/ItemsController';
import { AuthController } from './controllers/AuthController';

const app: Express = express();
const itemsController = new ItemsController();
const authController = new AuthController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

declare module "express-session" {
    interface SessionData {
      auth: boolean,
      name: String,
      password: String
      admin: boolean,
    }
};

app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get("/", (req: Request, res: Response) => {
  res.render('home',{
    auth:req.session.auth,
    admin:req.session.admin
  });
});

//items{
  app.get("/items", (req: Request, res: Response) => {
    itemsController.index(req, res);
  });

  app.get("/items/:id", (req: Request, res: Response) => {
    itemsController.show(req, res);
  });

  app.get("/items/action/create", (req: Request, res: Response) => {
    itemsController.create(req, res);
  });

  app.post("/items/store", (req: Request, res: Response) => {
    itemsController.store(req, res);
  });

  app.post("/items/delete", (req: Request, res: Response) =>{
    itemsController.delete(req, res);
  });

  app.post("/items/update", (req: Request, res: Response) =>{
    itemsController.update(req, res);
  });
//}

//categories{
  app.post("/store_category", (req:Request,res:Response) =>{
    itemsController.storeCategory(req,res);
  });
  
  app.get("/categories/:id", (req:Request,res:Response) =>{
    itemsController.categories(req,res);
  });
  
  app.get("/category/createCategory", (req:Request,res:Response) =>{
    itemsController.createCategory(req,res);
  });
//}

// register and login{
  app.get("/auth", (req:Request,res:Response) =>{
    authController.auth(req,res);
  });
  
  app.get("/registration", (req:Request,res:Response) =>{
    authController.registration(req,res);
  });
  
  app.post("/register", (req:Request,res:Response) =>{
    authController.register(req,res);
  });
  
  app.post("/login", (req:Request,res:Response) =>{
    authController.login(req,res);
  });

  app.get("/loGout", (req: Request, res: Response) => {
    authController.loGout(req, res);
  });
//}
