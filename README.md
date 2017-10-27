# generator-meteor-rest-structure

To use, `git clone` this project, cd into the directory:

```
npm install -g yo
npm link
```

Then, go to the Meteor project that you want to use this generator in. Then, do:

```
meteor create $MY_APP //create your app first if it is first time
cd $MY_APP
yo meteor-rest-structure
```

## Styling
To add Materialize to your project, do:
```
yo meteor-rest-structure:styles materialize
```

## Resource
To add a new CRUD resource to your project, do:
replace the `$resource-name` with your resource name
```
yo meteor-rest-structure:route $resource-name
```
## Accounts feature
To add accounts feature to your project, do:
```
yo meteor-rest-structure:accounts
```

Please, read up the documentation for `yeoman`
