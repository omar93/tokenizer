export class Tokenizer {

  constructor(userInput, grammar) {
    this.position = 0
    this.grammar = grammar
    this.grammarArray = grammar.getGrammar()
    this.userInput = userInput.trim()
    this.restOfString = ''
    this.maximalMunch = 0
    this.match
    this.matches = []
    this.foundMatch
    this.error = 'END'
    this.resetValues()
    // this.grammar.runRegexsAgainstToken(this.userInput)
    this.runRegexsAgainstToken(this.userInput,this.grammarArray)
  }

  resetValues() {
    this.restOfString = ''
    this.position = 0
    this.matches = []
  }

  setString(newUserInput) {
    this.resetValues()
    this.userInput = newUserInput.trim()
    this.runRegexsAgainstToken(this.userInput,this.regexArr)
  }

  runRegexsAgainstToken (word, grammarArray) {
    if(this.userInput === '') {
      this.match = {'value':'END','tokenType':'END','regex':'No regex'}
    } else {
    this.maximalMunch = 0
    this.foundMatch = false
    grammarArray.forEach(reg => {
      let match = word.match(reg.regex)
      this.checkCorrectMatch(match,reg)
    })
    this.checkMatchError(this.foundMatch)
    this.setMatch(word)
    }
  }

  checkCorrectMatch(match,reg) {
    if(this.isMatchAndNotNull(match) && this.checkMaximalMunch(match[0].length,reg)) {
      this.setMatchStatusAndValue(match,reg)
    }
  }

  checkMatchError(match) {
    if(!match) {
      throw new TypeError('Lexical error')
    }
  }

  setMatch(word) {
    this.restOfString = word.replace(this.match.getTokenValue(),'').trim()
    this.matches.push(this.match)
  }

  setMatchStatusAndValue = (match,reg) => {
    this.foundMatch = true
    this.match = new Tokentype(match[0], reg)
  }


  isMatchAndNotNull = match => {
    if(match || match != null) {
      return true
    }
  }

  
  checkMaximalMunch = (match,reg) => {
    if(match > this.maximalMunch) {
      this.maximalMunch = match
      return true
    }
  }
    
  next = _ => {
    this.position++
    if(this.position > this.matches.length) {
      this.position = this.matches.length
    }
    if(this.restOfString.length > 0) {
      if(this.position <= this.matches.length || !this.matches[this.position]) {
        try {
          this.runRegexsAgainstToken(this.restOfString,this.grammarArray)
        } catch (e) {
          throw new TypeError('Lexical error')
        }
      }
    }
  }
  
  previous = _ => {
    this.position--
    this.position = this.position < -1 ? -1 : this.position
  }
  getCurrentToken = _ => this.position < 0 || this.position >= this.matches.length ?  {'value':this.error,'tokenType':this.error} : this.matches[this.position]
  getAllMatchedTokens = _ => this.matches
  getGrammar = _ => this.grammar
  getUserInput = _ => this.userInput
}

export class Grammar {

    constructor(regex) {
        this.grammarList = regex ?? new Array
    }

    setGrammar = regexArray => {
        this.grammarList = regexArray
    }

    addGrammar = grammar => {
        this.grammarList.push(grammar)
    }

    getGrammar = _ => this.grammarList
    
}

export class Tokentype {

    constructor(word,regex) {
        this.token = {
            'value':word,
            'tokenType': regex.type,
            'sentenceEnding': regex.sentenceEnding,
            'regex': regex.regex
        }
    }

    getTokenValue() {
        return this.token.value
    }

    getTokenType() {
        return this.token.tokenType
    }

    getTokenEnding() {
        return this.token.sentenceEnding
    }
}
