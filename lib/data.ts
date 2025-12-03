import type { WithId } from "mongodb";
import { getCollection } from "./db";
import type { Client } from "./types";

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Innovate Corp',
    email: 'contact@innovatecorp.com',
    phone: '555-0101',
    projectType: 'Web Design',
    budget: 15000,
    status: 'In Progress',
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: '2',
    name: 'Quantum Solutions',
    email: 'hello@quantum.co',
    phone: '555-0102',
    projectType: 'App Development',
    budget: 45000,
    status: 'Completed',
    createdAt: '2023-08-15T14:30:00Z',
  },
  {
    id: '3',
    name: 'Apex Digital',
    email: 'info@apexdigital.net',
    phone: '555-0103',
    projectType: 'SEO',
    budget: 7500,
    status: 'New',
    createdAt: '2023-11-01T09:00:00Z',
  },
  {
    id: '4',
    name: 'Synergy Group',
    email: 'connect@synergy.com',
    phone: '555-0104',
    projectType: 'Marketing',
    budget: 22000,
    status: 'In Progress',
    createdAt: '2023-09-05T11:45:00Z',
  },
  {
    id: '5',
    name: 'NextGen Innovations',
    email: 'support@nextgen.io',
    phone: '555-0105',
    projectType: 'Web Design',
    budget: 12000,
    status: 'Completed',
    createdAt: '2023-07-20T16:00:00Z',
  },
  {
    id: '6',
    name: 'Stellar SEO',
    email: 'results@stellarseo.com',
    phone: '555-0106',
    projectType: 'SEO',
    budget: 8000,
    status: 'In Progress',
    createdAt: '2023-10-10T13:20:00Z',
  },
  {
    id: '7',
    name: 'Momentum Marketing',
    email: 'growth@momentum.agency',
    phone: '555-0107',
    projectType: 'Marketing',
    budget: 18000,
    status: 'New',
    createdAt: '2023-11-05T12:00:00Z',
  },
];

export async function getClients(): Promise<Client[]> {
  try {
    const collection = await getCollection<Client>("clients");
    const docs = await collection
      .find<WithId<Client>>({})
      .sort({ createdAt: -1 })
      .toArray();

    if (!docs.length) {
      return [];
    }

    return docs.map(({ _id, ...doc }) => ({
      ...doc,
      id: doc.id ?? _id.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch clients from MongoDB", error);
    return [];
  }
}
