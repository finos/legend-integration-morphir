# Legend Linter

Demo project to display theorem proving feedback for `Legend Pure Code` powered by `Morphir` and `Bosque`. 

## Development setup

```sh
# Start the web app in a separate terminal tab
yarn install
yarn setup
yarn start

# Start the Bosque server in a separate terminal tab
yarn server:bosque

# Start the linter server in a separate terminal tab
yarn server:linter
```

> You need to manually shut down the Bosque server's container using the command
> `docker rm -f $(docker ps -a -q)`

## Usage Guide

The app consists of a Linter server and a Bosque server.
The Linter server sits at port 9900 and the Bosque server sits at port 9901 (localhost).\
\
The Linter server exposes two endpoints: \
POST to `<linter>:<port>/linter` (ex. `0.0.0.0:9900/linter`) with keys `src` with Pure source code and `ir` with corresponding generated Morphir IR, to post data to the server. \
GET to `<linter>:<port>/data` (ex. `0.0.0.0:9900/data`) to retrieve previously posted Pure source and Morphir IR data.\
\
The Bosque server exposes three endpoints: \
POST to `<bosque>:<port>/insight` (ex. `0.0.0.0:9901/insight`) with a Morphir IR, to post data to the visualizer. \
GET to `<bosque>:<port>/insight` (ex. `0.0.0.0:9901/insight`), or go to the url in a web browser to visualize previously posted Morphir IR data.\
POST to `<bosque>:<port>/verify` (ex. `0.0.0.0:9901/verify`) with a Morphir IR, to retrieve Bosque feedback for the corresponding Pure source code from which the Morphir IR is generated.

**From Legend Studio**

Clone Studio's Morphir dev fork branch.\
Start Studio and Start Linter (see Development Setup).\
Define a Pure function in Studio.\
Select the function and from right upper corner file generation dropdown, select `Morphir`. This generates the IR and is viewable in file generation viewer.\
Click on button `Visualize Generated IR` to go to the visualizer for the generated IR.\
Click on button `View Bosque Feedback` to go to the feedback viewer with Pure source code highlighted at tokens with feedback.

## Roadmap

Roadmap is on its way.

## Contributing

Contribution guide is on its way.

## License

Copyright 2021 Goldman Sachs

Distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

SPDX-License-Identifier: [Apache-2.0](https://spdx.org/licenses/Apache-2.0)
