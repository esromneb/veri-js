const tm = require('./verilogtaskmanager.js');



async function taskDoReset(top, ev) {
  console.log('enter taskDoReset');
  top.reset = 1;


  await ev( () => top.clk == 1 );

  console.log('taskDoReset made it past clock high');


  await ev( () => top.clk == 0 );

  console.log('taskDoReset made it past clock low');

  top.reset = 0;

}

async function taskDriveData(top, ev) {
  console.log('enter taskDriveData');

  await ev( () => top.reset == 0 && top.clk == 1 );
  console.log('taskDriveData past reset');

  while(1) {
    top.data++;

    console.log(top.data);

    await ev( () => top.clk == 0 );
    await ev( () => top.clk == 1 );
  }
}


tm.regTask(taskDoReset);
tm.regTask(taskDriveData);

tm.startSim();