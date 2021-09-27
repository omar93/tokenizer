export default class Tokenizer {

  constructor(userInput, grammar) {
    this.position = 0
    this.regexArr = grammar.regex
    this.userInput = userInput.trim()
    this.restOfString = ''
    this.maximalMunch = 0
    this.match
    this.matches = []
    this.foundMatch
    this.error = 'END'
    this.resetValues()
    this.runRegexsAgainstToken(this.userInput,this.regexArr)
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

  runRegexsAgainstToken (word, regexArr) {
    if(this.userInput === '') {
      this.match = {'value':'END','tokenType':'END','regex':'No regex'}
    } else {
    this.maximalMunch = 0
    this.foundMatch = false
    regexArr.forEach(reg => {
      let match = word.match(reg.regex)
      if(this.isMatchAndNotNull(match) && this.checkMaximalMunch(match[0].length,reg)) {
        this.setMatchStatusAndValue(match,reg)
      }
    })

    if(!this.foundMatch) {
      throw new TypeError('Lexical error')
    }
    
    this.restOfString = word.replace(this.match.value,'').trim()
    this.matches.push(this.match)
    }
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

  setMatchStatusAndValue = (match,reg) => {
    this.foundMatch = true
    this.match = {'value':match[0],'tokenType':reg.type,'regex':reg.regex}
  }
    
  next = _ => {
    this.position++
    if(this.position > this.matches.length) {
      this.position = this.matches.length
    }
    if(this.restOfString.length > 0) {
      if(this.position <= this.matches.length || !this.matches[this.position]) {
        try {
          this.runRegexsAgainstToken(this.restOfString,this.regexArr)
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
}
