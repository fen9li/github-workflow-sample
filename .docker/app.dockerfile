FROM node:11-slim
RUN yarn global add node-sass && cd /usr/local/share/.config/yarn/global/node_modules/node-sass && yarn link
