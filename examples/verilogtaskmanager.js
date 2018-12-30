
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
g_dut = {'reset':0, 'clk':0, 'data':0};
promise_list = [];
g_ctx = {'foo':0, 'finished_ticks':0};

const print_tick = true;

function tick() {
    if( g_dut.clk == 0 ) {
        if( print_tick ) {
            console.log('tick high');
        }
        // tick high
        g_dut.clk = 1;
    } else { 
        if( print_tick ) {
            console.log('tick low');
        }
        // tick low
        g_dut.clk = 0;
    }
}

function regTask(fn) {
    task_list.push({'fn':fn, 'status':{'started':0}});
}







function SignalFlip(ctx, dut) {
  EventEmitter.call(this);
  this.setMaxListeners(Infinity);

  this.check = (c) => {
    console.log("this.check was run");
  }

  this.ev = (predicate) => {

    return new Promise((resolve, reject) => {

      const on_tick = () => {
        // console.log('eq tick ' + JSON.stringify(ctx));
        if(predicate()) {
          // console.log('resolve');
          resolve();
          // console.log('resolve post');
          this.off('tick', on_tick);
        }
      };


      this.on('tick', on_tick);
      // flip.on('end', resolve); // call resolve when its done
      // flip.on('error', reject); // don't forget this
    });
  }

}

util.inherits(SignalFlip, EventEmitter);




async function startSim() {

    // console.log('before p1');

    let flip = new SignalFlip(g_ctx, g_dut);

    // Here we create an await our promise:
    // await new Promise((resolve, reject) => {
    //     // Here invoke our event emitter:
    //     let flip = new SignalFlip(g_ctx);
    //     // flip.check();
    //     // a normal event callback:
    //     flip.on('update', percent => {
    //         console.log(`The burger is ${percent}% done`);
    //     });
    //     flip.on('end', resolve); // call resolve when its done
    //     flip.on('error', reject); // don't forget this
    // });


    // console.log('about to enter tasks');



    const tasknum = task_list.length;
    for( let i = 0; i < tasknum; i++ ) {
        task_list[i].fn(g_dut, flip.ev);
    }


    // console.log('finished enter tasks');

    flip.on('meta_tick_finish', () => {
      g_ctx.finished_ticks++;

      if(g_ctx.finished_ticks < 10) {

        // https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
        setImmediate(() => {
            // console.log('immediate');
          tick();
          flip.emit('tick');
          flip.emit('meta_tick_finish');
        });


      }
    });

    tick();
    flip.emit('tick');
    flip.emit('meta_tick_finish');

}

// regTask(taskDoReset);
// regTask(taskDriveData);

// startSim();

module.exports = {
  regTask : regTask,
  startSim : startSim
};

// async function SerialFlow(){
//     let result1 = await doJob(1,1);
//     let result2 = await doJob(2,2);
//     let result3 = await doJob(3,3);
     
//     let finalResult = result1+result2+result3;
//     console.log(finalResult);
//     return finalResult;
 
// }
 
// SerialFlow();