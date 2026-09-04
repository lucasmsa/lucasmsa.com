# 4. Public repo, Vercel, lucasmsa.com

Date: 2026-09-04

## Status

Accepted

## Decision

- The repository is public on GitHub.
- Deployment is Vercel through the Git integration. Pushes to `main` go to
  production.
- The apex is `lucasmsa.com`, registered 2026-09-04 through Name.com with
  `NS1`/`NS2.VERCEL-DNS.COM` nameservers already resolving.
- `lucasmsa.dev` is not registered and is not the target. Any earlier note naming
  it, including the `hiit.lucasmsa.dev` subdomain planned for HIIT Maker, moves to
  `.com`.

## Context

The domain was bought on the personal Vercel account. Nothing Koltin-related is
used for personal purchases.

DNS was already pointing at Vercel before any project existed, so the apex resolved
to Vercel IPs while serving nothing. The project link is the missing half.

A public repo was chosen over private because the site is itself portfolio
material, and the Claude Code tooling in it is worth reading.

## Consequences

Everything committed is world-readable, including the resume content file with a
phone number and email in it. That is the same information the rendered resume
already publishes, so the repo adds no exposure the site does not.

Subdomains for other projects hang off `lucasmsa.com` from here.
