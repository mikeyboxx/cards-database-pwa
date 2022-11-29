// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () =>
  openDB('cardsDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('cardsDS')) {
        console.log('cards database already exists');
        return;
      }
      db.createObjectStore('cardsDS', { keyPath: 'id', autoIncrement: true });
      console.log('cards database created');
    },
  });


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
  try {
    const cardsDb = await openDB('cardsDB', 1);
    const tx = cardsDb.transaction('cardsDS', 'readwrite');
    const store = tx.objectStore('cardsDS');

    const inputObj =  { 
      name, 
      home_phone: home,
      cell_phone: cell,
      email
    };
    const result = await store.add(inputObj);

    console.log('🚀 - data saved to the database with id: ', result);
  } catch (err) {
    console.log(err);
  }
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  try {
    const cardsDb = await openDB('cardsDB', 1);
    const tx = cardsDb.transaction('cardsDS', 'readonly');
    const store = tx.objectStore('cardsDS');

    const result = await store.getAll();

    console.log(`🚀 - ${result.length} records have been retrieved from the database`);

    return result || [];
  } catch (err) {
    console.log(err);
  }
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  try {
    const cardsDb = await openDB('cardsDB', 1);
    const tx = cardsDb.transaction('cardsDS', 'readwrite');
    const store = tx.objectStore('cardsDS');

    await store.delete(id);

    console.log('🚀 - data has been deleted from the database with id: ', id);
  } catch (err) {
    console.log(err);
  }
};

initdb();
