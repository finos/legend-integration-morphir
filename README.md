# Legend Linter

This is a demo project to display how we can use `Morphir` and `Bosque` to get theorem proving feedback for `Legend Pure Code`. 

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
