# tokenizer
A tokenizer for the course 1dv610 

# How to use
initilize a new object of the class 'Tokenizer' and pass in 2 arguments, the first one is the string you want to tokenize, the second on
is an object with the key 'name' & the key 'regex' that is an array of objects with regex patterns and 
Example: 

<code>
let tokenizer = new Tokenizer('the string you want to tokenize', {'grammarname',regex:[{}]})
</code>
