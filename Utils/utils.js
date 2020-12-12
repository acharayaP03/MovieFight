/**
 * @debouncing
 * @ratelimiting
 * Apply rate limiting function or debouncing.
 * Only fire this fucntion when user stops typing.
 */

 export const debounce = (func, delay = 1000) =>{
     let timerOutId;

     return (...args) =>{
        if(timerOutId){
            clearTimeout(timerOutId);
        }
        timerOutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
     }
 }