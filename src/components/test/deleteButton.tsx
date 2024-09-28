import { deleteDatabase } from '@/utils/indexedDB';

export default function DeleteButton() {
  const handleClick = async () => {
    await deleteDatabase();
  };

  return (
    <button onClick={handleClick} className='bg-red-600'>Delete Database</button>
  );
}
