const github = require("@actions/github");
const core = require("@actions/core");
const translate = require("moji-translate");

async function run() {
  const githubToken = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(githubToken);
  const { eventName, repo, payload } = github.context;
  let body;

  switch (eventName) {
    case "issue_comment":
      const issueComment = payload.comment.body;
      body = translate.translate(issueComment);
      console.log(body);
      octokit.issues
        .updateComment({ ...repo, comment_id: payload.comment.id, body })
        .then(() => core.info("Done !"))
        .catch((error) => core.error(error));
      break;

    case "pull_request_review_comment":
      const { data: prComment } = await octokit.pulls.getReviewComment({
        ...repo,
        comment_id: payload.pull_request.number,
      });
      console.log(payload.review.body);
      body = translate.translate(prComment);
      core.debug(body);
      octokit.pulls
        .updateReviewComment({
          ...repo,
          comment_id: payload.pull_request.number,
          body,
        })
        .then(() => core.info("Done !"))
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
