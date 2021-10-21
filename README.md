
# tokenizer
A tokenizer for the course 1dv610
visit the github repo for more info if this page is not up to date

# How to use
npm i tokenizer-1dv610

initilize a new object of the class 'Tokenizer' and pass in 2 arguments, the first one is the string you want to tokenize, the second on
is an object with the key 'name' and value:String & the key 'regex' with the value an array of objects that is an array of objects with regex patterns and 
Example: 

<code>
import { Tokenizer, Grammar } from 'tokenizer-1dv610'

</code>
<br />
<code>
let wordAndDotGrammar = new Grammar()

wordAndDotGrammar.addGrammar({'regex':/^[\A-Za-z|åäöÅÄÖ]+/g,'type':'word'})
wordAndDotGrammar.addGrammar({'regex':/^\./g,'type':'dot', 'sentenceEnding':'normal sentence'})
wordAndDotGrammar.addGrammar({'regex':/^\?/g,'type':'question mark', 'sentenceEnding':'question'})
wordAndDotGrammar.addGrammar({'regex':/^\!/g,'type':'exclamation mark', 'sentenceEnding':'announcement'})


let tokenizer = new Tokenizer('Hello this is a sentence.',wordAndDotGrammar)
</code>


To get the current token use:
<code>
tokenizer.getCurrentToken()
</code>

To step to the next token use:
<code>
tokenizer.next()
</code>

To step to the previous token use:
<code>
tokenizer.previous()
</code>

To change the string use:
<code>
tokenizer.setString('new string')
</code>

