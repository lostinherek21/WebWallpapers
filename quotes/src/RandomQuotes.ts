namespace RandomQuotes {
  
  export interface Quote {
    quote: string
    author: string
  }
  export interface Quotes {
    [index:number] : Quote
  }

  let QData : Quotes = {}

  function getRandomNum(max = 100) {
    return Math.floor(Math.random() * max)
  } 

  function getQuote(index:number) : Quote | undefined{
    if(index < 0) { return undefined}

    if(Object.keys(QData).length < index) { return undefined }

    let quote = QData[index]

    if(quote.quote.length > 150) {
      return getQuote(index + 1)
    }else {
      return QData[index]
    }
  }

  export function generate(quotes:Quotes) {
    QData = quotes
    let quote = getQuote(getRandomNum(Object.keys(QData).length) - 1)
    return quote
  }
}