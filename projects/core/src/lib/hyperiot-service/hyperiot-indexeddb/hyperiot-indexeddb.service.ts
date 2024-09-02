import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { HPacket } from '../../hyperiot-client/models/models';

interface CoveredData {
  offlineDataId: number;
  covered: [number, number];
}

interface HYTDatabase extends DBSchema {
  offlineData: {
    key: number;
    value: HPacket[];
  };
  coveredData: {
    key: number;
    value: CoveredData[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class HyperiotIndexeddbService {

  idb: IDBPDatabase<HYTDatabase>;

  openDataBase(): Promise<IDBPDatabase<HYTDatabase>> {
    return openDB<HYTDatabase>('HyperIoTdatabase', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('offlineData')) {
          db.createObjectStore('offlineData');
        }
        if (!db.objectStoreNames.contains('coveredData')) {
          db.createObjectStore('coveredData');
        }
      }
    }).then(db => {
      this.idb = db;
      return this.idb;
    });
  }

  async openDataBase2(): Promise<IDBPDatabase<HYTDatabase>> {
    return this.idb = await openDB<HYTDatabase>('HyperIoTdatabase', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('offlineData')) {
          db.createObjectStore('offlineData');
        }
        if (!db.objectStoreNames.contains('coveredData')) {
          db.createObjectStore('coveredData');
        }
      }
    });
  }

  getCoveredDataByPacketId(packetId: number): Promise<CoveredData[]> {
    return this.idb.get('coveredData', packetId);
  }

  getOfflineDataByOfflineDataId(packetId: number): Promise<HPacket[]> {
    return this.idb.get('offlineData', packetId);
  }

}
