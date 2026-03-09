// question 1



function greet(name , callback) {
    console.log(`hello ${name}`)
    callback()
}

function message () {
    console.log(`Goodbye!`)
}

greet('chandan', message)


// question 2
console.log(`======================================================`)

function calculate(a, b , cb){
   const result =  cb(a, b)
   console.log(`result :- ${result}`)
}

function sum (a, b){
   return a+b
}

calculate(1, 2, sum)

// question 3
console.log(`======================================================`)

function first(cb) {
    console.log(`first`)
    cb()
}

function second(){
    console.log(`second`)
}
first(second)
console.log(`third`)

// question 4
console.log(`======================================================`)

function timer () {

    console.log(`Start`)

    setTimeout(()=>{
        console.log(`Inside Timer`)
    }, 2000)

}

timer()
console.log(`End`)

//question 5
console.log(`======================================================`)

let arr = [1, 2, 3, 4, 5]

function processNumbers(arr, cb){

    for (let index = 0; index < arr.length; index++) {
       cb(arr[index])
    }
}

function multiplied(nums){
    console.log(nums * 2)
}

processNumbers(arr, multiplied)


//question 6
console.log(`======================================================`)

function divide (a, b, cb) {

    const findingAZero = a == 0
    const findingBZero = b == 0 
    

    if(findingAZero){
        cb(`can not divide with zero :- ${findingAZero}`, a, b)
    }
     if(findingBZero){
        cb(`can not divide with zero :- ${findingBZero}`, a, b)
    }
    else{
        cb(null, a, b)
    }
}

function callback2(error, a, b){
    if(error){
        console.log(`error :- ${error}`)
    }
    else{
         console.log(a%b)
    }
}

divide(2, 10,  callback2)

//question 7
console.log(`======================================================`)

function divide2 (a, b, cb) {

    const findingAZero = a == 0
    const findingBZero = b == 0 
    

    if(findingAZero){
        cb(`can not divide with zero :- a = ${a}`, a, b)
    }
     if(findingBZero){
        cb(`can not divide with zero :-b =  ${b}`, a, b)
    }
    else{
        cb(null, a, b)
    }
}

function callback3(error, a, b){
    if(error){
        console.log(`error :- ${error}`)
    }
    else{
         console.log(a%b)
    }
}

divide2(10, 0,  callback3)

//question 8
console.log(`======================================================`)



function fetchUsers( id, cb){

    setTimeout(()=> {

        const users = {
            id:'', 
            name : '', 
        }

        if(!id){
            cb(`both is and firstname is required`, users, 'sam')
        }

        
        users.id = id
           cb(false, users, 'sam' )
       
    },  1000)
}
function call_users (err, users, firstName) {
   
    if (err) {
        console.log(`error occured : - ${err}`)
    }
    users.name= firstName
    console.log(users) 
}

fetchUsers(1, call_users)


//question 9
console.log(`======================================================`)

function getusers(cb) {
    setTimeout(()=>{
        const user = {
            User:'Sam'
        }
        cb(user)
    }, 1000)
}

function getRole(user){
     setTimeout(()=>{
        
        user.Role ='Developer'
        console.log(user)
    }, 1000)
}

getusers(getRole)


//question 10
console.log(`======================================================`)

console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");

//question 11
console.log(`======================================================`)

function sayHello () {
    console.log(`hello !!`)
}

setTimeout(sayHello, 1000)

//question 12
console.log(`======================================================`)

function doTask ( onSuccess,  onError) {

    Math.random() > 0.5 ? onSuccess() : onError()

}

function onSuccess(){
    console.log(`task done`)
}

function onError(){
    console.log(`task failed`)
}

doTask(onSuccess, onError)

//question 13
console.log(`======================================================`)

let count = 3;

function print_Count(count , cb) {
     
    if ( count< 3) {
        cb(`can not run the value of count is less than 3 ${count}`, count)
    }
    cb(null, count)

}

function run_Three_Time (error,  count){

    if (error) {
        return error
    }

    for (let i = 1; i<=count; i++){
       console.log(`called :- ${i}`)
    }
}

print_Count(count, run_Three_Time)

//question 14
console.log(`======================================================`)

function User (name ,cb){
   cb(name, cb())
}

function Order (name, cb) {
   cb (name , cb())
}

function status (name  , status_d){
    return {
        user:name,
        Order: Order_item,
        status: status_d
    }
}

User('sam', Order('sam', status('sam', 'pizza', 'Delivered')))