# tokenizer
A tokenizer for the course 1dv610 

# How to use
initilize a new object of the class 'Tokenizer' and pass in 2 arguments, the first one is the string you want to tokenize, the second on
is an object with the key 'name' and value:String & the key 'regex' with the value an array of objects that is an array of objects with regex patterns and 
Example: 

<code>
let tokenizer = new Tokenizer('testString.', {'wordAndDotGrammar',regex:[{'regex':/^[\A-Za-z|åäöÅÄÖ]+/g,'type':'word'},{'regex':/^\./g,'type':'dot'}]})
</code>
