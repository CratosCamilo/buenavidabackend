import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

export default class DatabaseProvider {
  private static instance: DatabaseProvider;
  private static pool: sql.ConnectionPool;

  private constructor() {}

  public static async getInstance(): Promise<DatabaseProvider> {
    if (!DatabaseProvider.instance) {
      DatabaseProvider.instance = new DatabaseProvider();
      await DatabaseProvider.connectDB();
    }
    return DatabaseProvider.instance;
  }

  private static async connectDB() {
    try {
      DatabaseProvider.pool = await new sql.ConnectionPool({
        server: process.env.DB_SERVER ?? "localhost",
        database: process.env.DB_DATABASE ?? "TIENDA_BUENA_VIDA",
        port: Number(process.env.DB_PORT) || 1433,
        options: {
          encrypt: false, 
          trustServerCertificate: true, 
        },
        user: process.env.DB_USER,  
        password: process.env.DB_PASSWORD, 
      }).connect();

      console.log("🟢 Conectado a SQL Server correctamente con SQL Server Authentication");
    } catch (error) {
      console.error("🔴 Error conectando a SQL Server:", error);
      throw error;
    }
  }

  public static async getConnection(): Promise<sql.ConnectionPool> {
    if (!DatabaseProvider.pool) {
      await DatabaseProvider.getInstance();
    }
    return DatabaseProvider.pool;
  }
}
