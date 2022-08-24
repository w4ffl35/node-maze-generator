# Contributing
---

***Use a separate branch for development with the following naming convention***

```
- bugfix-some-unique-branch-name
- hotfix-some-unique-branch-name
- feature-some-unique-branch-name
```

1. clone this repo
2. install dependencies `npm install`
3. create a new branch named `[type]-[name]` (see example below)
4. commit your changes
5. run tests `npm run test`
6. push your branch to the remote repository
7. create a pull request if tests are passing

**Please keep the following in mind when developing:**

- Add tests for modified or additional code
- Keep code bloat to a minimum, the final minified code should remain very small
- Maintain a consistent style
- Use no dependencies
- Comment everything (see example)

---

## Run tests

`npm run test`

---

## Minify

This is only relevant to the repository maintainer.

Until the CI/CD pipeline is finalized, builds are performed manually against the master branch.

1. increment the version number in package.json
2. run `npm run build`
3. create a new release

`npm run build`