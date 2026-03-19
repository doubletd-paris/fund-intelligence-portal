import { transactions } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/primitives";
import { formatCurrency, formatDate } from "@/lib/utils";

const transactionRows = transactions.map((transaction) => ({
  transaction: transaction.name,
  transactionHref: `/transactions/${transaction.id}`,
  type: transaction.type,
  stage: transaction.stage,
  probability: `${transaction.probability}%`,
  expectedClose: formatDate(transaction.expectedClose),
  price: formatCurrency(transaction.price)
}));

export default function TransactionsPage() {
  return (
    <PageShell
      eyebrow="Transactions"
      title="Transaction pipeline"
      description="Acquisitions and disposals with stage, probability, expected close, and expected portfolio impact."
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="p-5"><div className="text-sm text-slate-500">Live deals</div><div className="mt-2 text-3xl font-semibold text-ink">{transactions.length}</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Weighted pipeline</div><div className="mt-2 text-3xl font-semibold text-ink">EUR 266m</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Disposals</div><div className="mt-2 text-3xl font-semibold text-ink">2</div></Card>
        <Card className="p-5"><div className="text-sm text-slate-500">Acquisitions</div><div className="mt-2 text-3xl font-semibold text-ink">3</div></Card>
      </div>
      <DataTable
        title="Pipeline"
        rows={transactionRows}
        columns={[
          { key: "transaction", label: "Transaction", kind: "link", hrefKey: "transactionHref" },
          { key: "type", label: "Type" },
          { key: "stage", label: "Stage" },
          { key: "probability", label: "Probability" },
          { key: "expectedClose", label: "Expected close" },
          { key: "price", label: "Price" }
        ]}
      />
    </PageShell>
  );
}
