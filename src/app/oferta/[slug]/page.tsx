import OfertaDetailClient from "./OfertaDetailClient";

export const dynamic = "force-dynamic";

export default async function OfertaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <OfertaDetailClient slug={slug} />;
}
