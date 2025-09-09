---

#### 7) Create a README file to answer the following question-

#### 1) What is the difference between var, let, and const?

- var is function-scoped . We can redeclare and reupdate it.
- let is block-scoped . We can reupdate it but we can not redeclare it .
- const is also block-scoped like let . We cannot reupdate or redeclare it but we can update the value inside object or array.

#### 2) What is the difference between map(), forEach(), and filter()?

- map() is used to iterate through every element of an array.It returns a new array without making any changes to the main array.
- forEach() is used to iterate through every element of an array.It does not return any array.
- filter() returns a new array with the values that matches the given condition .

#### 3) What are arrow functions in ES6?

- arrow function are more simple way to write a function.In arrow function we don't need to use the function keyword .
  example: let newFunc = () =>{}

#### 4) How does destructuring assignment work in ES6?

- destructuring is a cleaner way to get the value of an array or an object.It makes the work simple.
  example: let [first,second] = [1,2]
  let {country,division} = {country:"Bangladesh",division:"Dhaka"}

#### 5) Explain template literals in ES6. How are they different from string concatenation?

- template literals is writing string inside ``backticks.It is easier than string concatenation . We don't need to use the + sign there and we can write multiple lines of string in template literals.we can write variable inside template literals using this ${}.
example:  let name ="ratul"
        `hello my name is ${name}`
