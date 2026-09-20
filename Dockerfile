FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/fuse-criativos/server/package.json apps/fuse-criativos/server/package.json
COPY apps/fuse-criativos/web/package.json apps/fuse-criativos/web/package.json
RUN pnpm install --frozen-lockfile
COPY apps/fuse-criativos/server apps/fuse-criativos/server
COPY apps/fuse-criativos/web apps/fuse-criativos/web
RUN pnpm build
RUN pnpm --filter @fuse/criativos-server deploy --prod --legacy /runtime/server

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV FUSE_WEB_DIST=/app/web/dist
COPY --from=build --chown=node:node /runtime/server /app/server
COPY --from=build --chown=node:node /app/apps/fuse-criativos/web/dist /app/web/dist
USER node
EXPOSE 3100
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD node -e "fetch('http://127.0.0.1:3100/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server/dist/index.js"]
