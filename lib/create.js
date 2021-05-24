const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const Creator = require('../utils/Creator')

module.exports = async function(project_name, options) {
  // 文件夹存在时，配置 --force 则直接删除目录，否则提供用户交互，由用户决定是否删除目录
  if (fs.existsSync(path.resolve(process.cwd(), project_name))) {
    if (options.force) fs.rmSync(path.resolve(__dirname, '..', project_name), { recursive: true, force: true })

    else {
      const isOverride = await inquirer.prompt([
        {
          name: 'isOverride',
          type: 'list',
          choices: [
            { name: '是', value: true },
            { name: '否', value: false }
          ],
          default: false,
          message: '目录已存在，是否覆盖?'
        }
      ])

      if (!isOverride) return
      else fs.rmSync(path.resolve(__dirname, '..', project_name), { recursive: true, force: true })
    }

    const creator = new Creator()
    creator.create()
  }
}