## SSE Git FAQ

Feel free to add common problems with their solutions here, or just anything that wasn't clear at first.

```
[url "git@github.com:"]
        insteadOf = https://github.com/
```

But if you do this, code can call `NodeGit.Clone.clone(url: 'https://foo')` and have the `authentication` callback be asked for **SSH** credentials instead of HTTPS ones, which might not be what your application expected.
