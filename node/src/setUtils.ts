import { resolve, writeFile, readFile } from '../utils/fs'
import { exec } from 'child_process'
import fs from 'fs'
const tool = require('html-mzc-tool')

const data = fs.readFileSync(resolve('./node/utils/fs.ts'), 'utf-8')
// readFile(resolve('./node/utils/fs.ts')).then((res) => {
// 	console.log('res', res)
// })
// fs.writeFile(resolve('./src/utils/index.ts'), '126161', (err) => {
// 	console.log(err)
// })
//

let toolData = 'export {'
for (const toolKey of Object.keys(tool)) {
	toolData += toolKey + ','
}

toolData += "} from 'html-mzc-tool'"

const utilsTool = `//node自动生成代码 开始
${toolData}
//node自动生成代码 结束
`

writeFile(resolve('./src/utils/index.ts'), utilsTool).then((res) => {
	exec('eslint src/utils/index.ts --fix', (e) => {
		if (e) {
			console.log(e)
			return
		}
		console.log('操作成功')
	})
})
