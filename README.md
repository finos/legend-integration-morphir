[![FINOS - Incubating](https://cdn.jsdelivr.net/gh/finos/contrib-toolbox@master/images/badge-incubating.svg)](https://finosfoundation.atlassian.net/wiki/display/FINOS/Incubating)
![website build](https://github.com/finos/legend-integration-morphir/workflows/Docusaurus-website-build/badge.svg)

# Legend Linter

Demo project to display theorem proving feedback for `Legend Pure Code` powered by `Morphir` and `Bosque`. 

## Development setup

```sh
# Go to docker-compose directory
cd /docker-compose

# Start all containers
docker-compose up

# To shutdown all containers once done
docker-compose stop
```

> Note: linter-app (the Bosque feedback viewer) webpack can take appx. 2 min to finish compilation.

## Usage Guide

#### From Legend Studio

- Clone Studio's [Morphir dev fork branch](https://github.com/CptTeddy/legend-studio/tree/morphir).
- [Start Studio](https://legend.finos.org/docs/installation/maven-install-guide) and Linter (see Development Setup).
- In Studio, create a new project and workspace. Under a package, define a Pure function in Studio.
- Select the function and from right upper corner file generation dropdown, select `Morphir`. This generates the IR and is viewable in file generation viewer.
- Click on button `Visualize Generated IR` to go to the visualizer for the generated IR.
- Click on button `View Bosque Feedback` to go to the feedback viewer with Pure source code highlighted at tokens with feedback.

#### Example Interesting Function

Rental Example with Potential Zero Division (Bosque highlights error):

    function demo::rentals(requests: Number[1], available: Number[1], allowPartials: Boolean[1]):Number[1]
    {
       let maximumAllowed = if (0.5 < ($requests / $available), | $available / 2.0, | $requests);
       if($requests <= $maximumAllowed, 
          |$requests, 
          |if($allowPartials, 
              |$maximumAllowed, 
              |0.0));
    }

Rental Example Fixed (Bosque reveals no issue):

    function demo::rentals(requests: Number[1], available: Number[1], allowPartials: Boolean[1]):Number[1]
    {
       let maximumAllowed = if ($available > 0.0, | if (0.5 < ($requests / $available), | $available / 2.0, | $requests), | 0.0);
       if($requests <= $maximumAllowed, 
          |$requests, 
          |if($allowPartials, 
              |$maximumAllowed, 
              |0.0));
    }

#### Server details inside the box:

> The app consists of a Linter server and a Bosque server. \
> The Linter server sits at port 9900 and the Bosque server sits at port 9901 (localhost).

#### The Linter server exposes two endpoints:

- POST to `<linter>:<port>/lint` (ex. `0.0.0.0:9900/lint`) with keys `src` with Pure source code and `ir` with corresponding generated Morphir IR, to post data to the server.
- GET to `<linter>:<port>/data` (ex. `0.0.0.0:9900/data`) to retrieve previously posted Pure source and Morphir IR data.

#### The Bosque server exposes three endpoints:

- POST to `<bosque>:<port>/insight` (ex. `0.0.0.0:9901/insight`) with a Morphir IR, to post data to the visualizer. 
- GET to `<bosque>:<port>/insight` (ex. `0.0.0.0:9901/insight`), or go to the url in a web browser to visualize previously posted Morphir IR data.
- POST to `<bosque>:<port>/verify` (ex. `0.0.0.0:9901/verify`) with a Morphir IR, to retrieve Bosque feedback for the corresponding Pure source code from which the Morphir IR is generated.

## Roadmap

Roadmap is on its way.

## Contributing

To learn about contributing to Legend, see the [CONTRIBUTING.md](CONTRIBUTING.md) file or the ["contribute to Legend"](https://legend.finos.org/docs/getting-started/contribute-to-legend) section of the Legend documentation site.

## License

Copyright 2021 Goldman Sachs

Distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

SPDX-License-Identifier: [Apache-2.0](https://spdx.org/licenses/Apache-2.0)
