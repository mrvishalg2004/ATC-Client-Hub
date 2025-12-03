import ClientManager from "@/components/dashboard/client-manager";
import { getClients } from "@/lib/data";

export default async function DashboardPage() {
  const clients = await getClients();
  return <ClientManager initialClients={clients} />;
}
