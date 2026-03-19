import { ReactNode } from "react";
import { VisibilityGate } from "@/components/layout/visibility-gate";
import { PermissionBadge } from "@/components/ui/permission-badge";
import { SectionHeader } from "@/components/ui/primitives";
import { Classification } from "@/types";

export function PageShell({
  title,
  description,
  classification,
  children,
  eyebrow,
  actions
}: {
  title: string;
  description?: string;
  classification: Classification;
  children: ReactNode;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8 lg:py-8">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <div className="flex items-center gap-3">
            <PermissionBadge classification={classification} />
            {actions}
          </div>
        }
      />
      <VisibilityGate classification={classification}>{children}</VisibilityGate>
    </div>
  );
}
