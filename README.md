# tokenizer
A tokenizer for the course 1dv610
visit the github repo for more info if this page is not up to date

# How to use
npm i tokenizer-1dv610

initilize a new object of the class 'Tokenizer' and pass in 2 arguments, the first one is the string you want to tokenize, the second on
is an object with the key 'name' and value:String & the key 'regex' with the value an array of objects that is an array of objects with regex patterns and 
Example: 

<code>
import Tokenizer from 'tokenizer-1dv610'
let tokenizer = new Tokenizer('testString.', {'wordAndDotGrammar',regex:[{'regex':/^[\A-Za-z|åäöÅÄÖ]+/g,'type':'word'},{'regex':/^\./g,'type':'dot'}]})
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

