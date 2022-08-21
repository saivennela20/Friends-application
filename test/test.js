import http from 'http';
import assert from 'assert';
import {app,mongoose} from '../server/api/app.js';



describe('Web Server test', async function() {
  const port = 8080;
  let server
	before(async function() {
    console.log("before")
		server = app.listen(port);
	});

	after(function() {
    console.log("after")
		mongoose.connection.close();
    server.close(function () { console.log('Server closed!'); });
    setImmediate(function(){console.log('Server closed callback');server.emit('close')});
    mongoose.connection.close();
	});

	describe('/', function() {
		it('should be Status running', function(done) {
			http.get('http://127.0.0.1:'+port+'/healthz', function(response) {
				assert.equal(response.statusCode, 200);
				done();
			});
		});
	});
});
