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

## Roadmap

Roadmap is on its way.

## Contributing

Contributing guide is on its way.

## License

Copyright 2021 Goldman Sachs

Distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

SPDX-License-Identifier: [Apache-2.0](https://spdx.org/licenses/Apache-2.0)
