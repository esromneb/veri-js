

function doJob(x,sec) {
  return new Promise(resolve => {
  console.log('Start: ' + x);
    setTimeout(() => {
        console.log('End: ' + x);
      resolve(x);
    }, sec * 500);
  });
}






async function SerialFlow(){
	 
    let result1 = await doJob(1,1);
    let result2 = await doJob(2,2);
    let result3 = await doJob(3,3);
     
    let finalResult = result1+result2+result3;
    console.log(finalResult);
    return finalResult;
 
}
 
SerialFlow();