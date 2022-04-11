import fs from 'fs'

export const writeJson = (fileName, content) => {
  let urlPath = `resources/messages/${fileName}.json`;
  fs.writeFileSync(urlPath, JSON.stringify(content), 'utf8');
}
