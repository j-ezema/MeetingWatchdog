import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';
import { MeetingItem } from '../models';
import moment from 'moment';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'meeting-watchdog.db', location: 'default'});
};

const tableNames = {
  MeetingItems:'meetings',
  MailClientConfiguration:'MailClientConfiguration',
  settings:'settings'
};

const settings:any[] = new Array(
  {name:'default_participants', value:5},
  {name:'default_hourly', value:100},
);

export const createTable = async (db: SQLiteDatabase) => {
// create tables if not exists
    const Queries = [
        //`DROP TABLE ${tableNames.MeetingItems};`,
        //`DROP TABLE ${tableNames.MailClientConfiguration};`,
        //`DROP TABLE ${tableNames.settings};`,
        `CREATE TABLE IF NOT EXISTS ${tableNames.MeetingItems}(
            meeting_title TEXT NOT NULL,
            number_of_participants INT NOT NULL,
            average_hourly_cost REAL NOT NULL,
            total_wait_time INT ,
            total_meeting_time INT ,
            total_wait_cost REAL ,
            total_meeting_cost REAL ,
            meeting_datetime REAL NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS ${tableNames.MailClientConfiguration}(
            value TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS ${tableNames.settings}(
            setting_name TEXT NOT NULL UNIQUE,
            setting_value INT NOT NULL
        );`,
        ];

    Queries.forEach(async query => {
        await db.executeSql(query);
    });
    initializeSettings(db);
};

const initializeSettings = async (db: SQLiteDatabase) => {
  const results = await db.executeSql(`SELECT rowid as id,setting_name,setting_value FROM ${tableNames.settings}`);
  settings.forEach(async setting => {
    let contains:Boolean = false;
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        if(result.rows.item(index)['setting_name'] == setting.name){
            contains = true 
        }
      }
    });
    if(!contains){
      try {
        const query = `INSERT INTO ${tableNames.settings} (setting_name, setting_value) VALUES ('${setting.name}', ${setting.value}); `;
        await db.executeSql(query);
      } catch (error) {
        
      }
      
    }
    //console.log(setting.name+": "+contains);

  });

  
}

export const retrieveSettings = async (db: SQLiteDatabase): Promise<object> => {
  const results = await db.executeSql(`SELECT rowid as id,setting_name,setting_value FROM ${tableNames.settings}`);
  let savedSettings:{[k: string]: any} = {};
  settings.forEach(async setting => {
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        if(result.rows.item(index)['setting_name'] == setting.name){
          savedSettings[setting.name] = result.rows.item(index)['setting_value']} ;
        }
      }
    );
  });
  return savedSettings;
}

export const getMeetingItems = async (db: SQLiteDatabase): Promise<MeetingItem[]> => {
  try {
    const MeetingItems: MeetingItem[] = [];
    const results = await db.executeSql(`SELECT rowid as id,meeting_title as meeting_title, date(meeting_datetime) as meeting_date, time(meeting_datetime) as meeting_time FROM ${tableNames.MeetingItems}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        var temp = result.rows.item(index);
        //console.log(result.rows.item(index)['id']+" "+result.rows.item(index)['meeting_title']+" "+result.rows.item(index)['meeting_date']+" "+result.rows.item(index)['meeting_time']);
        temp['meeting_datetime'] = new Date(result.rows.item(index)['meeting_date']+" "+result.rows.item(index)['meeting_time']);
        MeetingItems.push(temp);
        
      }
    });
    return MeetingItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get MeetingItems !!!');
  }
};

export const saveMeetingItems = async (db: SQLiteDatabase, MeetingItems: MeetingItem[]) => {
  /*
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableNames.MeetingItems}(rowid, meeting_title, number_of_participants, average_hourly_cost, meeting_date, meeting_time) values` +
    MeetingItems.map(i => `(${i.id}, '${i.meeting_title}', 2, 2, date(\'now\'),time(\'now\'))`).join(',');
    console.log(insertQuery);
  */
  const insertQuery =
    `INSERT INTO ${tableNames.MeetingItems}(meeting_title, number_of_participants, average_hourly_cost, meeting_datetime) values` +
    MeetingItems.map(i => `('${i.meeting_title}', 2, 2, julianday('${moment(i.meeting_datetime).format('YYYY-MM-DD HH:mm:ss')}'))`).join(',');
    console.log(insertQuery);
  return db.executeSql(insertQuery);
};

export const deleteMeetingItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableNames.MeetingItems} where rowid = ${id}`;
  console.log(deleteQuery);
  console.log(await db.executeSql(deleteQuery));
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableNames.MeetingItems}`;

  await db.executeSql(query);
  
};
  