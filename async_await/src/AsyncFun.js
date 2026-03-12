export function async_function() {

//////////////////////////////////////////////////////////////////////
   async function getNumber() {
    return 24
   } 

   const value = getNumber()
   console.log(value)

// So when you call getNumber(), you don't get 42 — you get Promise { 42 }





//normal function
function normalFunction() {
    return { name:'sam' }
}
console.log(`i am normal function`, normalFunction())

// async function
async function asyncFunction(){
    return { name:'sam' }
}
console.log(`i am async function`, asyncFunction())

//Implicit Promise Wrapping 
function  Implicit_Promise(){
    return Promise.resolve({name:'sam'})
}

console.log(`i am Implicit Promise function`,Implicit_Promise())

/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//Since the function returns a Promise, you can't just do const x = myAsyncFn() and expect x to hold the value — it holds a Promise. You have two options:

async function get_id_number() {
    return 24
}
const result = get_id_number()
console.log(`the value we get now ${result}`)


//Option 1 — .then() chaining:

get_id_number()
.then((data)=>{
    console.log(`after useing .then() :- ${data}`)
})

//Option 2 — await (cleaner, preferred):
async function get_value_of_get_id_number() {
    const data = await get_id_number()
    console.log(`after useing await keyword : - ${data}`)
}
console.log(get_value_of_get_id_number())

////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

function Fake_data(){
   return new Promise((resolve)=>{
     setTimeout(()=>{
        resolve ({userNumber: 20})
    }, 1000)
   })
}


async function get_Data() {
    const data = await Fake_data()
    console.log(data)
    console.log(`i come after the data indise the function`)
}
console.log(`i come outside the async function`)
console.log(get_Data())

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

async function sayHi() {
  return "Hi there";
}

console.log(sayHi());


//Promise {hi there}

///////////////////////////////////////////
//////////////////////////////////////////

async function getNum () {
    return 100
}

getNum()
.then(val => console.log(val*2))


///////////////////////////////////////////
//////////////////////////////////////////

async function test(){
    return Promise.resolve(`hello there`)
}

test().then(val => console.log(`here is the value :- ${val}`))


///////////////////////////////////////////////
///////////////////////////////////////////////////

function fetchData() {
  return "data loaded";
}

async function run() {
  const result = await fetchData();
  console.log(result);
}

run();

///////////////////////////////////////////////
///////////////////////////////////////////////////

async function getUsers() {
    return {name: `chandan`}
}

//  const user = await getUsers()
//  console.log(user)

 async function heres() {
    const data = await getUsers()
    console.log(data)
 }

 heres()


 /////////////////////////////////////
 ///////////////////////////////////////

 async function finish() {
    return 'done'
 }

 async function get_Result(){
    const data = await finish()
    console.log(data)
 }

 get_Result()

finish()
.then(val => console.log(val))



































































































































































































}