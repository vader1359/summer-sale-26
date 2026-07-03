import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import soldSkuSeed from "../../../summer26/sold-skus.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS summer26_sold_products (
      sku TEXT PRIMARY KEY,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

function normalizeSku(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const sku = value.trim();
  return sku.length > 0 ? sku : null;
}

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

function getSeedSoldSkus() {
  return soldSkuSeed.filter((sku): sku is string => typeof sku === "string" && sku.trim().length > 0);
}

function mergeSoldSkus(skus: string[]) {
  return Array.from(new Set([...getSeedSoldSkus(), ...skus])).sort((a, b) => a.localeCompare(b));
}

export async function GET() {
  try {
    await ensureTable();
    const result = await sql<{ sku: string }>`
      SELECT sku
      FROM summer26_sold_products
      ORDER BY sku ASC
    `;

    return NextResponse.json(
      { soldSkus: mergeSoldSkus(result.rows.map((row) => row.sku)) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to load sold products", error);
    return NextResponse.json(
      { soldSkus: mergeSoldSkus([]) },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  if (!body || typeof body !== "object") {
    return jsonError("Invalid payload", 400);
  }

  const { sku, sold } = body as { sku?: unknown; sold?: unknown };
  const normalizedSku = normalizeSku(sku);

  if (!normalizedSku || typeof sold !== "boolean") {
    return jsonError("Expected sku and sold", 400);
  }

  try {
    await ensureTable();
    if (sold) {
      await sql`
        INSERT INTO summer26_sold_products (sku, updated_at)
        VALUES (${normalizedSku}, NOW())
        ON CONFLICT (sku)
        DO UPDATE SET updated_at = NOW()
      `;
    } else {
      await sql`
        DELETE FROM summer26_sold_products
        WHERE sku = ${normalizedSku}
      `;
    }

    const result = await sql<{ sku: string }>`
      SELECT sku
      FROM summer26_sold_products
      ORDER BY sku ASC
    `;

    return NextResponse.json({ soldSkus: mergeSoldSkus(result.rows.map((row) => row.sku)) });
  } catch (error) {
    console.error("Failed to update sold product", error);
    return jsonError("Database is not configured for sold products");
  }
}
