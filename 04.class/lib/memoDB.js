import sqlite3 from "sqlite3";

export class MemoDB {
  static #db = new sqlite3.Database("memos.sqlite3");

  static saveMemo(id, content, createdAt, updatedAt) {
    const db = MemoDB.#db;
    db.serialize(() => {
      db.run(
        "CREATE TABLE IF NOT EXISTS memos(id TEXT UNIQUE, content TEXT, createdAt TEXT, updatedAt TEXT)"
      );
      const stmt = db.prepare("INSERT INTO memos VALUES(?, ?, ?, ?)");
      stmt.run([id, content, createdAt, updatedAt]);
      stmt.finalize();
    });
  }

  static retrieveAllMemos() {
    const db = MemoDB.#db;
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all("SELECT * FROM memos", (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });
  }
}
