import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'orders.json');

type StoredOrder = Record<string, unknown> & { sessionId?: string };

export async function saveOrder(orderData: Record<string, unknown>) {
  let orders: StoredOrder[] = [];
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    orders = JSON.parse(data) as StoredOrder[];
  } catch {
    // File doesn't exist or is invalid
  }

  orders.push({
    ...orderData,
    createdAt: new Date().toISOString(),
  });

  await fs.writeFile(DB_FILE, JSON.stringify(orders, null, 2));
}

export async function getOrder(sessionId: string) {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    const orders = JSON.parse(data) as StoredOrder[];
    return orders.find((order) => order.sessionId === sessionId) ?? null;
  } catch {
    return null;
  }
}
