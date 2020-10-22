/**
 * 生成键值对类似于
 * [
 *   {
 *      id: 'Web Seminar',
        name: 'Web Seminar'
 *   }
 * ]
 */
// 引入fs模块
const fs = require('fs')
// 引入读取xlsx文件的
const xlsx = require('node-xlsx')
// 保存xlsx文件路径
const xlsxPath = './src/assets/ss.xlsx'

let sheets = xlsx.parse(xlsxPath)

// 读文件处理数据
function handelExece() {
  const execelSheet = sheets[0].data
  let arr = []
  execelSheet.forEach(sheet => {
    // console.log(sheet.length)
    if(sheet.length === 1) {
      arr.push(sheet[0])
    } else if (sheet.length === 2 ) {
      arr.push({
        id: sheet[1],
        name: sheet[0]
      })
    }
  })
  
  arr = arr.map((item) => {
    if (item instanceof Object) {
      return item
    } else {
      return {
        id: item,
        name: item
      }
    }
  })
  const re = /"/gi
  arr = JSON.stringify(arr, null, '\t').replace(re, "'")
  writeJson('./src/lang/generated.js', arr)
}

handelExece()

// 写入文件的方法
function writeJson(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8', (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('写入成功')
    }
  })
}
