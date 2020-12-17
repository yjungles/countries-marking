/**
 * Plugin para instanciar servidor API fake
 */
import { makeServer } from "~/services/mirageServer";

if (process.env.NODE_ENV === "development") {
  makeServer();
}
