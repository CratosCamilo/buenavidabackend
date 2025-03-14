import path from "path";
import express, { Application } from "express";
import RouterExpressInterface from "../../domain/RouterExpressInterface";
import ExpressProvider from "../provider/ExpressProvider";

export default class Server {
  private readonly app: Application;

  constructor(
    private readonly routersExpress: RouterExpressInterface[],
    private readonly errorRouter: RouterExpressInterface
  ) {
    this.app = express();
    this.configure();
    this.routes();
  }

  public routes() {
    this.routersExpress.forEach((router) => {
      this.app.use(router.path, router.router);
    });

    this.app.use(this.errorRouter.path, this.errorRouter.router);
  }

  public configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // DEBUG: Verificar la ruta absoluta de uploads
    const uploadsPath = path.resolve(__dirname, "..", "..", "..", "..", "uploads");


    console.log(`📂 Serviendo archivos estáticos desde: ${uploadsPath}`);

    // Servir la carpeta uploads
    this.app.use("/uploads", express.static(uploadsPath));
  }

  public start() {
    const PORT = ExpressProvider.getPort();
    this.app.listen(PORT, () =>
      console.log(`Server is running on ${ExpressProvider.getAPIDomain()}`)
    );
  }
}
