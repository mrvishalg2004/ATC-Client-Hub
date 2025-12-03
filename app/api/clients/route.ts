import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";

import { getClients } from "@/lib/data";
import { getCollection } from "@/lib/db";
import { contactSchema } from "@/lib/schemas";
import { clientStatuses, type Client } from "@/lib/types";

const dashboardClientSchema = contactSchema.extend({
  status: z.enum(clientStatuses),
});

export async function GET() {
  const clients = await getClients();
  return NextResponse.json({ clients });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = dashboardClientSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const client: Client = {
    id: randomUUID(),
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };

  try {
    const collection = await getCollection<Client>("clients");
    await collection.insertOne(client);
    return NextResponse.json({ client }, { status: 201 });
  } catch (error) {
    console.error("Failed to create client", error);
    return NextResponse.json(
      { error: "Unable to create client" },
      { status: 500 }
    );
  }
}
