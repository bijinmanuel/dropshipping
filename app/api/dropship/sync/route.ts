import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';
import { DROPSHIP_SUPPLIERS } from '@/data/suppliers';

export async function GET() {
  const summary = {
    activeSuppliersCount: DROPSHIP_SUPPLIERS.length,
    activeSkusCount: PRODUCTS.length,
    portfolioRetailValue: PRODUCTS.reduce((sum, p) => sum + p.price, 0),
    portfolioSupplierCost: PRODUCTS.reduce((sum, p) => sum + p.dropship.supplierCost, 0),
    averageGrossMargin: `${Math.round(
      ((PRODUCTS.reduce((sum, p) => sum + p.price, 0) -
        PRODUCTS.reduce((sum, p) => sum + p.dropship.supplierCost, 0)) /
        PRODUCTS.reduce((sum, p) => sum + p.price, 0)) *
        100
    )}%`,
    suppliers: DROPSHIP_SUPPLIERS,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    data: summary,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { supplierId } = body;

    const supplier = DROPSHIP_SUPPLIERS.find((s) => s.id === supplierId);
    if (!supplier) {
      return NextResponse.json({ success: false, message: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `EDI Inventory sync completed with ${supplier.name}`,
      syncedSkus: supplier.activeSkusCount,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
  }
}

