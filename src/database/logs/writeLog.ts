import { writeFileSync } from 'fs';

export default (location: string, message: string): void => {
  writeFileSync(`src/database/logs/${location}.txt`, message, { flag: 'as' });
};
