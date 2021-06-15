
module.exports.date = getDate;

function getDate(){
 let today = new Date();
 let dateOptions = {
   weekday:  "long"  ,
   day:  "numeric" ,
   month:  "long"
 };
 let getday  = today.toLocaleDateString("en-US",dateOptions);
 return getday;
}
