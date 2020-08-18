# comments-emoji

A Github Action to convert your comment from issues and PRs to emojis and replace bad words with 🤐.

## Sample Workflow

```yml
name: Emoji Comments

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  comment-emoji:
    runs-on: ubuntu-latest
    name: Emoji Comments
    steps:
      - uses: actions/checkout@v2
      - name: Comment Emoji - action exe
        uses: dreamer01/comments-emoji@master
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          enablePolice: true
```

## Inputs

- GITHUB_TOKEN (required)

  The workflow YML will need to set GITHUB_TOKEN with the GitHub Secret Token.

  `GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`

- `enablePolice` (optional)

  The workflow YML will need to set `enablePolice` flag with value `true` to enable bad words check in comments. When the `enablePolice` input is set to `true` it will replace bad words with emoji : 🤐

## Credits

I am using [moji-translate](https://www.npmjs.com/package/moji-translate) library for text to emoji translation by [Monica](https://twitter.com/notwaldorf).

I am using [bad-words](https://www.npmjs.com/package/bad-words) library for bad words detection.
