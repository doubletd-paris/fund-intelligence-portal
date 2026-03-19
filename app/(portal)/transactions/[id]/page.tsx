import { notFound } from "next/navigation";
import { transactions } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/primitives";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const transaction = transactions.find((item) => item.id === id);
  if (!transaction) notFound();

  return (
    <PageShell
      eyebrow="Transaction Detail"
      title={transaction.name}
      description={`${transaction.type} | ${transaction.geography} | ${transaction.sector}`}
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="p-5"><div className="text-sm text-slate-500">Stage</div><div className="mt-2 text-2xl font-semibold text-ink">{transaction.stage}</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Probability</div><div className="mt-2 text-2xl font-semibold text-ink">{transaction.probability}%</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Expected close</div><div className="mt-2 text-2xl font-semibold text-ink">{formatDate(transaction.expectedClose)}</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Price</div><div className="mt-2 text-2xl font-semibold text-ink">{formatCurrency(transaction.price)}</div></Card>
      </div>
      <Card className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Underwriting summary</div>
        <div className="mt-4 text-sm text-slate-600">{transaction.impact}</div>
      </Card>
    </PageShell>
  );
}
