// 引入fs模块
const fs = require('fs')
// 引入读取xlsx文件的
const xlsx = require('node-xlsx')
// 保存xlsx文件路径
const xlsxPath = './src/assets/ww.xlsx'

let sheets = xlsx.parse(xlsxPath)

// 读文件处理数据
function handelExece () {
  const execelSheet = sheets[0].data
  let zhObj = {}
  let enObj = {}
  // console.log(zhObj)
  // console.log({...zhObj})
  execelSheet.forEach(sheet => {
    // console.log(sheet)
    let keyName = null
    let oneKey = ''
    if (sheet[1]) {
      keyName = sheet[1].split(' ')
      // console.log(keyName[0].substr(0,1).toLocaleLowerCase() + keyName[0].substr(1))
      oneKey = keyName[0].substr(0, 1).toLocaleLowerCase() + keyName[0].substr(1)
      const re = /(,|\.|\(|\))/gi
      keyName = oneKey + keyName.slice(1)
      keyName = keyName.replace(re, '')
      // keyName.map(item => {
      //   // console.log(item)
      //   // const oneStr = item[0].substr(0,1).toLocaleLowerCase() + item[0].substr(1)
      //   // console.log(oneStr)
      //   return 
      // })
    }
    // console.log(keyName)
    // 中文
    zhObj[keyName] = sheet[0]
    // // 英文
    enObj[keyName] = sheet[1]
    // console.log(zhObj)
  })
  // console.log(zhObj)
  const re = /"/gi
  zhObj = JSON.stringify(zhObj, null, '\t').replace(re, "'")
  enObj = JSON.stringify(enObj, null, '\t').replace(re, "'")
  // console.log(zhObj)
  writeJson('./src/lang/zh.js', zhObj)
  writeJson('./src/lang/en.js', enObj)
}

handelExece()

// 写入文件的方法
function writeJson (fileName, data) {
  fs.writeFile(fileName, data, 'utf-8', (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('写入成功')
    }
  })
}
