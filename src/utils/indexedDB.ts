import { openDB, deleteDB } from 'idb';
import { EventInput } from '@fullcalendar/core';

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

export const saveCalendarEvent = async (event: EventInput) => {
  console.log(event);
  const db = await initDB();
  const transaction = db.transaction('calendarEvents', 'readwrite');
  const store = transaction.store;
  return store.put(event);
}

export const getCalendarEvents = async () => {
  const db = await initDB();
  const transaction = db.transaction('calendarEvents');
  const store = transaction.store;
  const result = await store.getAll();
  return result ? result : [];
};

export const deleteDatabase = async () => {
  return deleteDB('SyllabusHub');
};
