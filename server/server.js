import {app}  from './api/app.js';
import * as CONST from './api/constants.js';
//starting the server on port
app.listen(CONST.SERVER_PORT,()=>{
  console.log(`server running at ${CONST.SERVER_PORT}`);
})
