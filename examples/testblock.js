
const EventEmitter = require('events').EventEmitter;


function doJob(x,sec) {
  return new Promise(resolve => {
  console.log('Start: ' + x);
    setTimeout(() => {
        console.log('End: ' + x);
      resolve(x);
    }, sec * 500);
  });
}

// signals
// reset
// clk
// data


task_list = [];
model = {'reset':0, 'clk':0, 'data':0};
promise_list = [];

const print_tick = true;

function tick() {
    if( model.clk == 0 ) {
        if( print_tick ) {
            console.log('tick high');
        }
        // tick high
        model.clk = 1;
    } else { 
        if( print_tick ) {
            console.log('tick low');
        }
        // tick low
        model.clk = 0;
    }
}

function regTask(fn) {
    task_list.push({'fn':fn, 'status':{'started':0}});
}



async function taskDoReset(top) {
    top.reset = 0;
    // for(let i = 0; i < 10; i++) {
        // await
    // }


}

async function taskDriveData(top) {

}


async function startSim() {
    const tasknum = task_list.length;
    for( let i = 0; i < tasknum; i++ ) {
        task_list[i].fn(model);
    }

    tick();
    tick();
    tick();
    tick();
}

startSim();

// async function SerialFlow(){
//     let result1 = await doJob(1,1);
//     let result2 = await doJob(2,2);
//     let result3 = await doJob(3,3);
     
//     let finalResult = result1+result2+result3;
//     console.log(finalResult);
//     return finalResult;
 
// }
 
// SerialFlow();