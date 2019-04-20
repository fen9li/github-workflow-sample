FROM node:11-slim
RUN yarn global add node-sass

ENTRYPOINT ln -sf /usr/local/share/.config/yarn/global/node_modules/node-sass/* /home/node/app/node_modules/node-sass && yarn dev ${YARN_DEV_NAME}

ENV VUE_APP_DEV_PUBLIC=localhost:8080
WORKDIR /home/node/app
EXPOSE 8080
