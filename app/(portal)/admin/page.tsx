import { users } from "@/data/mock-data";
import { PageShell } from "@/components/layout/page-shell";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/primitives";

const adminRows = users.map((user) => ({
  id: user.id,
  name: user.name,
  role: user.role,
  portalMode: user.portalMode,
  organization: user.organization
}));

export default function AdminPage() {
  return (
    <PageShell
      eyebrow="Admin"
      title="Visibility and demo controls"
      description="Role visibility matrix, permission summaries, user list, and feature toggles for demo orchestration."
      classification="Internal Confidential"
    >
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">View classifications</div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>Internal Confidential: debt, data quality, detailed valuation, investor registry.</div>
            <div>Investor Shareable: fund overview, selected performance, explorer, selected assets.</div>
            <div>Prospect Safe: factsheets, curated summary, selected documents.</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Feature flags</div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>Conversational query engine: enabled</div>
            <div>Upload center warnings: enabled</div>
            <div>Prospect document wall: enabled</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Demo toggles</div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>Seed role switcher</div>
            <div>Global reporting period selector</div>
            <div>Query history and prompt suggestions</div>
          </div>
        </Card>
      </div>
      <DataTable
        title="Demo users"
        rows={adminRows}
        columns={[
          { key: "name", label: "User" },
          { key: "role", label: "Role" },
          { key: "portalMode", label: "Portal mode" },
          { key: "organization", label: "Organization" }
        ]}
      />
    </PageShell>
  );
}

