import fs from 'fs'

export const updateJson = (fileName, content) => {
  const urlPath = `resources/folders/${fileName}.json`
  let rawdata = fs.readFileSync(urlPath);
  let resultJSON = JSON.parse(rawdata)
  resultJSON.push(content)
  fs.writeFileSync(urlPath, JSON.stringify(resultJSON), 'utf8');
}
