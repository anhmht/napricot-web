import { writeFile } from 'fs/promises'

async function revertRoutes() {
  await writeFile('./dynamic-routes.json', JSON.stringify([]))
}

revertRoutes()
