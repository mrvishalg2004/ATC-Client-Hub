import { NextResponse } from "next/server";
import { z } from "zod";

import { getCollection } from "@/lib/db";
import { contactSchema } from "@/lib/schemas";
import { clientStatuses, type Client } from "@/lib/types";
import type { WithId } from "mongodb";

const dashboardClientSchema = contactSchema.extend({
  status: z.enum(clientStatuses),
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json().catch(() => null);
  const parsed = dashboardClientSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const collection = await getCollection<Client>("clients");
    const updated: WithId<Client> | null = await collection.findOneAndUpdate(
      { id: params.id },
      { $set: parsed.data },
      { returnDocument: "after" }
    );

    if (!updated) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const { _id: _mongoId, ...client } = updated;
    void _mongoId;
    return NextResponse.json({ client });
  } catch (error) {
    console.error("Failed to update client", error);
    return NextResponse.json(
      { error: "Unable to update client" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const collection = await getCollection<Client>("clients");
    const result = await collection.deleteOne({ id: params.id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete client", error);
    return NextResponse.json(
      { error: "Unable to delete client" },
      { status: 500 }
    );
  }
}
