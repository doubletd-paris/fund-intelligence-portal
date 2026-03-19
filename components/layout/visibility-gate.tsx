"use client";

import { ReactNode } from "react";
import { useDemo } from "@/components/providers/demo-provider";
import { canAccessClassification } from "@/lib/permissions";
import { Classification } from "@/types";
import { EmptyState } from "@/components/ui/primitives";

export function VisibilityGate({
  classification,
  children
}: {
  classification: Classification;
  children: ReactNode;
}) {
  const { role } = useDemo();

  if (!canAccessClassification(role, classification)) {
    return (
      <EmptyState
        title="Restricted for current role"
        description={`This view is marked ${classification} and is not available for the ${role} demo persona.`}
      />
    );
  }

  return <>{children}</>;
}
