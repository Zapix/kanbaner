var
  React = require( "react" ),

  IssueCard = require( "./IssueCard.react" ),

  Logger = require( "../utils/logger" ),

  logger = new Logger( "IssueDesk" ),

  IssueDesk = React.createClass({

    getInitialState: function() {
      return {
        'issueList': [
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/30",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/30/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/30/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/30/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/30",
            "id": 65138525,
            "number": 30,
            "title": "Use github css framework",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [

            ],
            "state": "open",
            "locked": false,
            "assignee": null,
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-30T05:28:04Z",
            "updated_at": "2015-03-30T05:28:04Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/29",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/29/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/29/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/29/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/29",
            "id": 65138487,
            "number": 29,
            "title": "Switch to ES6 with babel",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [

            ],
            "state": "open",
            "locked": false,
            "assignee": null,
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-30T05:27:33Z",
            "updated_at": "2015-03-30T05:27:33Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/28",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/28/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/28/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/28/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/28",
            "id": 60072845,
            "number": 28,
            "title": "Move all requests to GithubResoruce",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/JavaScript",
                "name": "JavaScript",
                "color": "fef2c0"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-06T08:25:56Z",
            "updated_at": "2015-03-06T08:25:56Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/27",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/27/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/27/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/27/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/27",
            "id": 60072454,
            "number": 27,
            "title": "RepositoryActions, RepositoryStores",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/JavaScript",
                "name": "JavaScript",
                "color": "fef2c0"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-06T08:21:05Z",
            "updated_at": "2015-03-06T08:21:05Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/26",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/26/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/26/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/26/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/26",
            "id": 60060338,
            "number": 26,
            "title": "Auto deploy to gh-pages",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/Common",
                "name": "Common",
                "color": "eb6420"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-06T05:12:43Z",
            "updated_at": "2015-03-06T05:12:43Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/25",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/25/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/25/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/25/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/25",
            "id": 60060107,
            "number": 25,
            "title": "Prepare CI jenkins or travis for auto tests",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/Common",
                "name": "Common",
                "color": "eb6420"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-06T05:10:03Z",
            "updated_at": "2015-03-06T05:10:16Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/24",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/24/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/24/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/24/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/24",
            "id": 60060045,
            "number": 24,
            "title": "Fix loader(doesn't works on FF) ",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/bug",
                "name": "bug",
                "color": "fc2929"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-06T05:08:57Z",
            "updated_at": "2015-03-06T05:08:57Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/20",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/20/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/20/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/20/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/20",
            "id": 59603595,
            "number": 20,
            "title": "Use Docker for development",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/Common",
                "name": "Common",
                "color": "eb6420"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-03T07:05:57Z",
            "updated_at": "2015-03-03T07:06:08Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/19",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/19/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/19/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/19/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/19",
            "id": 59450933,
            "number": 19,
            "title": "Test existing js and react components",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/JavaScript",
                "name": "JavaScript",
                "color": "fef2c0"
              },
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/React",
                "name": "React",
                "color": "207de5"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-02T08:21:04Z",
            "updated_at": "2015-03-02T08:21:06Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/16",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/16/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/16/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/16/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/16",
            "id": 59434201,
            "number": 16,
            "title": "About Page Component",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/React",
                "name": "React",
                "color": "207de5"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-03-02T03:18:13Z",
            "updated_at": "2015-03-02T08:11:33Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/12",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/12/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/12/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/12/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/12",
            "id": 59344147,
            "number": 12,
            "title": "About Page",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/Mockup",
                "name": "Mockup",
                "color": "006b75"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-02-28T14:49:35Z",
            "updated_at": "2015-02-28T14:49:55Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/11",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/11/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/11/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/11/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/11",
            "id": 59344138,
            "number": 11,
            "title": "Discus issue",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/Mockup",
                "name": "Mockup",
                "color": "006b75"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-02-28T14:49:13Z",
            "updated_at": "2015-02-28T14:50:03Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/10",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/10/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/10/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/10/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/10",
            "id": 59344117,
            "number": 10,
            "title": "Assign ticker to user",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/Mockup",
                "name": "Mockup",
                "color": "006b75"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-02-28T14:48:41Z",
            "updated_at": "2015-02-28T14:50:10Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/9",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/9/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/9/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/9/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/9",
            "id": 59344057,
            "number": 9,
            "title": "Remove Issue",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/Mockup",
                "name": "Mockup",
                "color": "006b75"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-02-28T14:46:50Z",
            "updated_at": "2015-02-28T14:46:50Z",
            "closed_at": null,
            "body": ""
          },
          {
            "url": "https://api.github.com/repos/Zapix/kanbaner/issues/8",
            "labels_url": "https://api.github.com/repos/Zapix/kanbaner/issues/8/labels{/name}",
            "comments_url": "https://api.github.com/repos/Zapix/kanbaner/issues/8/comments",
            "events_url": "https://api.github.com/repos/Zapix/kanbaner/issues/8/events",
            "html_url": "https://github.com/Zapix/kanbaner/issues/8",
            "id": 59344036,
            "number": 8,
            "title": "Add New Issue",
            "user": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "labels": [
              {
                "url": "https://api.github.com/repos/Zapix/kanbaner/labels/Mockup",
                "name": "Mockup",
                "color": "006b75"
              }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
              "login": "Zapix",
              "id": 346813,
              "avatar_url": "https://avatars.githubusercontent.com/u/346813?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/Zapix",
              "html_url": "https://github.com/Zapix",
              "followers_url": "https://api.github.com/users/Zapix/followers",
              "following_url": "https://api.github.com/users/Zapix/following{/other_user}",
              "gists_url": "https://api.github.com/users/Zapix/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/Zapix/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/Zapix/subscriptions",
              "organizations_url": "https://api.github.com/users/Zapix/orgs",
              "repos_url": "https://api.github.com/users/Zapix/repos",
              "events_url": "https://api.github.com/users/Zapix/events{/privacy}",
              "received_events_url": "https://api.github.com/users/Zapix/received_events",
              "type": "User",
              "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-02-28T14:45:57Z",
            "updated_at": "2015-02-28T14:45:57Z",
            "closed_at": null,
            "body": ""
          }
        ]
      };
    },

    render: function() {
      var
        openedIssues = this.state.issueList.filter(function( item ) {
          return item.state == 'open' && !item.assignee;
        }).map(function( item ) {
          return (
            <IssueCard issue={item}/>
          );
        }),
        assignedIssues = this.state.issueList.filter(function( item ) {
          return item.state == 'open' &&  item.assignee;
        }).map(function( item ) {
          return (
            <IssueCard issue={item}/>
          );
        }),
        closedIssues = this.state.issueList.filter(function( item ) {
          return item.state == 'closed';
        }).map(function( item ) {
          return (
            <IssueCard issue={item}/>
          )
        });

      return (
        <div
          className="kanban-desk">
          <div
            className="row">
            <div
              className="large-4 medium-4 small-4 columns">
                <strong>Opened:</strong>
            </div>
            <div
              className="large-4 medium-4 small-4 columns">
              <strong>Assigned:</strong>
            </div>
            <div
              className="large-4 medium-4 small-4 columns">
              <strong>Closed:</strong>
            </div>
          </div>
          <div
            className="row">
            <div
              className="large-4 medium-4 small-4 opened-issues columns">
            {openedIssues}
            </div>
            <div
              className="large-4 medium-4 small-4 assigned-issues columns">
            {assignedIssues}
            </div>
            <div
              className="large-4 medium-4 small-4 closed-issues columns">
            {closedIssues}
            </div>
          </div>
        </div>
      )
    }
  });

module.exports = IssueDesk;
