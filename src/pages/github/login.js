import React, { useState } from 'react';

import GitHubLoginLink from '../../components/GitHubLoginLink';

export default function GitHubLogin() {
    const [error, setError] = useState("");

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <GitHubLoginLink />
        </div>
    );
}
