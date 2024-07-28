import fs from 'fs'
import { openapi } from '.'

export const generate = () => {
    const _path = `${process.cwd()}/src/docs/openapi.json`

    fs.writeFileSync(_path, JSON.stringify(openapi, null, 2))

    process.exit(1)
}

generate()
