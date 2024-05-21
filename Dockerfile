FROM registry.yc.prod.infra.sravni.market/repub/frontend-node-v16.20.2-slim:latest as base

FROM base as build
WORKDIR /build
ENV PORT=80

ARG SENTRY_AUTH_TOKEN
ARG GITHUB_NPM_TOKEN
RUN npm set progress=false \
    && echo "@sravni:registry=https://npm.pkg.github.com/" > ~/.npmrc \
    && echo "//npm.pkg.github.com/:_authToken=${GITHUB_NPM_TOKEN}" >> ~/.npmrc

COPY package.json yarn.lock ./
RUN yarn install --ignore-engines --production=false
COPY . .
RUN apt-get update
RUN apt-get install -y ca-certificates
RUN yarn build && \
    rm -rf .next/cache && \
    yarn --ignore-engines --production --prefer-offline && \
    yarn cache clean

FROM base
WORKDIR /app
EXPOSE 80
COPY --from=build /build/package.json /build/publishStatic.js /build/next.config.js ./
COPY --from=build /build/build ./
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/public ./public

COPY --from=build /build/.next ./.next

CMD ["yarn", "start"]
