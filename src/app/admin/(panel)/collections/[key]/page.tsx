import CollectionManager from "../../../_components/CollectionManager";
import { COLLECTION_NAV } from "../../../_lib/types";

export function generateStaticParams() {
  return COLLECTION_NAV.map((c) => ({ key: c.key }));
}

export default async function CollectionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  return <CollectionManager key={key} collectionKey={key} />;
}
