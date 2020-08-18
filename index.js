const github = require("@actions/github");
const core = require("@actions/core");
const translate = require("moji-translate");
const Filter = require("bad-words");
const profanityFilter = new Filter({ placeHolder: "🤐" });

async function run() {
  const githubToken = core.getInput("GITHUB_TOKEN");
  const enablePolice = core.getInput("enablePolice");
  const octokit = github.getOctokit(githubToken);
  const { eventName, repo, payload } = github.context;

  console.log(enablePolice);

  switch (eventName) {
    case "issue_comment":
      const issueComment = payload.comment.body;
      let filteredComment = issueComment;
      if (enablePolice === "true")
        filteredComment = profanityFilter(issueComment);
      const body = translate.translate(filteredComment);
      octokit.issues
        .updateComment({ ...repo, comment_id: payload.comment.id, body })
        .then(() => core.info("✔ Done."))
        .catch((error) => core.error(error));
      break;

    default:
      core.warning(
        'Currently this action is configured for "Issue Comments" and "Pull Request Comments" only.'
      );
      break;
  }
}

run();
