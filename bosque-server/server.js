const express = require('express');
const path = require('path');

// Constants
const PORT = 8092;
const HOST = '0.0.0.0';

// App
const fs = require('fs');
const cors = require('cors');
const transp = require('morphir-bsq-transpiler');

const app = express();

app.use(
  // Solve CORS issue locally
  // See https://stackoverflow.com/a/64504149
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(express.json({ limit: '50mb' }));

// Endpoints
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/insight', (request, response) => {
  console.log('IR:');
  const ir = JSON.stringify(request.body);

  const options = {
    root: path.join(__dirname),
  };

  const irFile = 'web/morphir-ir.json';

  // eslint-disable-next-line consistent-return
  fs.writeFile(irFile, ir, (err) => {
    if (err) {
      return console.log(err);
    } else {
      console.log('Wrote:', irFile);
    }
  });

  const fileName = 'web/index.html';
  response.sendFile(fileName, options, (err) => {
    if (err) {
      console.log('err:');
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/insight', (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  const fileName = 'web/index.html';
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log('err:');
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/insight.html', (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  const fileName = 'web/insight.html';
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log('err:');
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/insight.js', (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  const fileName = 'web/insight.js';
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log('err:');
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/server/morphir-ir.json', (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  const fileName = 'web/morphir-ir.json';
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log('err:');
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/assets/2020_Morphir_Logo_Icon_WHT.svg', (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  const fileName = 'web/assets/2020_Morphir_Logo_Icon_WHT.svg';
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log('err:');
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.post('/verify', (request, response) => {
  console.log('IR:');
  const ir = request.body;

  try {
    transp.bosque_check_ir(ir, (err, data) => {
      if (err) {
        console.log('err:');
        console.log(err);
        response.send(err);
      } else if (data) {
        console.log('data:');
        console.log(data);
        response.send(data);
      } else {
        response.send('OK');
      }
    });
  } catch (ex) {
    response.send(ex);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
