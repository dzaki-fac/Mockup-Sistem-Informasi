import AssistantChat from "@/components/AssistantChat";

export default async function AssistantPage({
  searchParams,
}: {
  searchParams: Promise<{ dokumen?: string }>;
}) {
  const { dokumen } = await searchParams;
  return <AssistantChat docId={dokumen} />;
}
