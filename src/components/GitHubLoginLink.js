import React from 'react';

export default function GitHubLoginLink() {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const url = "#";
    return <a href={url}>Login with GitHub</a>
}
