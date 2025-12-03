export const projectTypes = ["Web Design", "SEO", "Marketing", "App Development"] as const;
export const clientStatuses = ["New", "In Progress", "Completed"] as const;

export type ProjectType = typeof projectTypes[number];
export type ClientStatus = typeof clientStatuses[number];

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: ProjectType;
  budget: number;
  status: ClientStatus;
  createdAt: string;
};
