import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statusPath = path.join(process.cwd(), "src/app/summer26/sold-status.json");

type SoldStatus = {
  soldSkus: string[];
  updatedAt?: string;
};

function normalizeSoldSkus(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((sku): sku is string => typeof sku === "string" && sku.trim().length > 0))]
    .map((sku) => sku.trim())
    .sort((a, b) => a.localeCompare(b));
}

async function readStatus(): Promise<SoldStatus> {
  try {
    const raw = await readFile(statusPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<SoldStatus>;
    return {
      soldSkus: normalizeSoldSkus(parsed.soldSkus),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : undefined,
    };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return { soldSkus: [] };
    }
    throw error;
  }
}

async function writeStatus(soldSkus: string[]): Promise<SoldStatus> {
  const status = {
    soldSkus: normalizeSoldSkus(soldSkus),
    updatedAt: new Date().toISOString(),
  };
  await mkdir(path.dirname(statusPath), { recursive: true });
  await writeFile(statusPath, `${JSON.stringify(status, null, 2)}\n`, "utf8");
  return status;
}

export async function GET() {
  const status = await readStatus();
  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { sku, sold, soldSkus } = body as {
    sku?: unknown;
    sold?: unknown;
    soldSkus?: unknown;
  };

  if (Array.isArray(soldSkus)) {
    return NextResponse.json(await writeStatus(normalizeSoldSkus(soldSkus)));
  }

  if (typeof sku !== "string" || sku.trim().length === 0 || typeof sold !== "boolean") {
    return NextResponse.json({ error: "Expected sku and sold" }, { status: 400 });
  }

  const current = await readStatus();
  const next = new Set(current.soldSkus);
  if (sold) {
    next.add(sku.trim());
  } else {
    next.delete(sku.trim());
  }

  return NextResponse.json(await writeStatus([...next]));
}
