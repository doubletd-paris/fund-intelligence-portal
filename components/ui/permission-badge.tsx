import { Classification } from "@/types";
import { Pill } from "@/components/ui/primitives";

export function PermissionBadge({ classification }: { classification: Classification }) {
  const tone = classification === "Internal Confidential" ? "danger" : classification === "Investor Shareable" ? "accent" : "success";
  return <Pill tone={tone}>{classification}</Pill>;
}
