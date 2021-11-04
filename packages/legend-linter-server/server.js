/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const cors = require('cors');

let actualSrc = '';
let actualIR = '{}';

// Constants
const PORT = 8091;
const HOST = '0.0.0.0';

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

app.get('/data', (req, res) => {
  res.send({
    pureCode: actualSrc,
    morphirIR: actualIR,
  });
});

app.post('/lint', (request, response) => {
  actualSrc = request.body.src;
  actualIR = request.body.ir;
  response.send({ value: 'Set morphir IR and Pure source code.' });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
