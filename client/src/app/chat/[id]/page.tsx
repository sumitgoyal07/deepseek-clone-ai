import Conversations from '../Conversations';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Conversations id={id} />;
}
