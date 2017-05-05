#!/usr/bin/env node

const trae = require('trae');
const moment = require('moment');

const repo = process.argv[2];

if (!repo) {
  console.log('github-repo-age <user>/<repo>');
  process.exit(1);
}

trae
  .get(`https://api.github.com/repos/${repo}`)
  .then(result => result.data)
  .then(data => {
    const createdAt = moment(data.created_at);

    const now = moment();
    const elapsedTime = moment.duration(now.diff(createdAt));

    const createdAtFormatted = createdAt.format('YYYY-MM-DD');
    const elapsedTimeFormatted = elapsedTime.humanize();

    console.log(`${createdAtFormatted}, ${elapsedTimeFormatted} ago`);
  })
  .catch(cause => {
    if (cause.status === 404) {
      console.error(`The URL https://github.com/${repo} is not a valid GitHub repository`);
    } else {
      console.error(cause);
    }
    process.exit(1);
  });
