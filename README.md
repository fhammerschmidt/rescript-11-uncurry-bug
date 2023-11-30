# ReScript @uncurry bug

```sh
npm i
npm run res:build
npm test
```

This happens when uncurried is set to false.
Both tests should pass, but only the manually uncurried one does.
