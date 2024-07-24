# Nest Graphql Apollo Blog Playground


### Install Postgres 

Using ```blog.sql``` in ```packages/blog-database``` to create the database and tables use the README for further information.

### Install

Navigate to ```packages/blog-nest-graphql-api``` the next commands are running in this location as well.

```console
foo@bar:~$ npm install
```

### Database Connection

Go to ```db``` folder an create and ```.env``` file; ensure that the credentials are matching with your postgres configuration. Following this sample:

```
    HOST=127.0.0.1
    NAME=blog
    PORT=5432
    USER=postgres
    PASS=yourPassword
```

### Running Local Server

Run the follow command:

```console
foo@bar:~$ npm run start
```


### Graphql Playground

When the application is running, you can go to [http://localhost:3000/graphql](http://localhost:3000/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.


