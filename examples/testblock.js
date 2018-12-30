
const EventEmitter = require('events').EventEmitter;
const util = require('util');



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
g_ctx = {'foo':0, 'finished_ticks':0};

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



async function taskDoReset(top, ctx) {
  console.log('enter taskDoReset');
  top.reset = 0;

  await ctx.eq('clk', 1);

  console.log('taskDoReset made it past clock');

    // for(let i = 0; i < 10; i++) {
        // await
    // }


}

async function taskDriveData(top) {

}




function BurgerCooking(ctx) {
  EventEmitter.call(this);
  this.setMaxListeners(Infinity);
  console.log("BurgerCooking");
  // this.signal = signal;
  
  // this.tick  = () => { signal(signal() ? 0 : 1) };

  // this.run = (iter) => {
  // for(i = 0; i < iter; i++) {
  //     this.tick();
  //     this.emit('tickevent', 'clockevent');
  //     eval();
  // }
  // };

  this.check = (c) => {
    console.log("this.check was run");
  }

  this.eq = (signal,value) => {
    return new Promise((resolve, reject) => {
      this.on('tick', () => {
        console.log('eq tick ' + JSON.stringify(ctx));
        if(ctx.foo == 0) {
          console.log('resolve');
          resolve();
          console.log('resolve post');
        }
      });
      // cook.on('end', resolve); // call resolve when its done
      // cook.on('error', reject); // don't forget this
    });
  }

}

util.inherits(BurgerCooking, EventEmitter);




async function startSim() {

    console.log('before p1');

    let cook = new BurgerCooking(g_ctx);

    // Here we create an await our promise:
    // await new Promise((resolve, reject) => {
    //     // Here invoke our event emitter:
    //     let cook = new BurgerCooking(g_ctx);
    //     // cook.check();
    //     // a normal event callback:
    //     cook.on('update', percent => {
    //         console.log(`The burger is ${percent}% done`);
    //     });
    //     cook.on('end', resolve); // call resolve when its done
    //     cook.on('error', reject); // don't forget this
    // });


    console.log('about to enter tasks');



    const tasknum = task_list.length;
    for( let i = 0; i < tasknum; i++ ) {
        task_list[i].fn(model, cook);
    }


    console.log('finished enter tasks');

    cook.on('meta_tick_finish', () => {
      g_ctx.finished_ticks++;

      if(g_ctx.finished_ticks < 4) {

        setImmediate(() => {
          // console.log('immediate');
        tick();
        cook.emit('tick');
        cook.emit('meta_tick_finish');
        });


      }
    });

    tick();
    cook.emit('tick');
    cook.emit('meta_tick_finish');

}

regTask(taskDoReset);

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