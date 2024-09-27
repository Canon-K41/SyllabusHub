import { openDB, deleteDB } from 'idb';

const initDB = async () => {
  const db = await openDB('SyllabusHub', 1, {
    upgrade(db) {
      db.createObjectStore('calendarSettings', { keyPath: 'key' });
      db.createObjectStore('calendarEvents', { keyPath: 'id' });
    },
  });
  return db;
};

export const saveCalendarSetting = async (key: string, value: string) => {
  const db = await initDB();
  const transaction = db.transaction('calendarSettings', 'readwrite');
  const store = transaction.store;
  return store.put({ key, value });
};

export const getCalendarSetting = async (key: string) => {
  const db = await initDB();
  const transaction = db.transaction('calendarSettings');
  const store = transaction.store;
  const result = await store.get(key);
  return result ? result.value : null;
};

export const deleteDatabase = async () => {
  return deleteDB('SyllabusHub');
};
