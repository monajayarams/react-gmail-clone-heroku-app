import fs from 'fs'

export const readJson = (folderName, fileName) => {
  let urlPath = folderName === '' ? `${fileName}` : `${folderName}/${fileName}`;
  let rawdata = fs.readFileSync(`resources/${urlPath}.json`);
  let resultJSON = JSON.parse(rawdata);
  return resultJSON;
}
