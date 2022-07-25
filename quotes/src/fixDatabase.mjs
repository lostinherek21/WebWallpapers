import Data from "../assests/nugru-upffu.json" assert {type:"json"}
import fs from "fs-extra"

Object.defineProperty(Data,Symbol.iterator, {
  enumerable: false,
  configurable: true,
  writable: true,
  value: function () {
    let index = 0
    return {
      next: function() {
        return {
          value: Data[index],
          done: Data[index++] ? false:true
        }
      }
    }
  }
})

let pause = 5
const desFilePath = "../assests/quotes.json"
function deal() {
  fs.appendFileSync(desFilePath,'[',{"encoding":"utf-8"})
  let dataArray = [...Data]
  dataArray.forEach((obj) => {
    let formatData = {
      quote:"",
      author:"",
    }

    formatData.quote = obj['Motivational Quotes Database - https://www']['sharpquotes']['com']
    formatData.author = obj['field2']
    console.log(formatData)
    appendModifiedData(formatData)
  })
  fs.appendFileSync(desFilePath,']',{"encoding":"utf-8"})
}

function appendModifiedData(obj) {
  let thisLine = JSON.stringify(obj) + ","

  fs.appendFileSync(desFilePath,thisLine,{"encoding":'utf-8'})
}

deal()

