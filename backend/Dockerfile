FROM node:lts-slim

RUN apt update && apt upgrade -y

RUN useradd --create-home --uid 1001 --gid 0 appuser
WORKDIR /home/appuser

COPY --chown=1001:0 package.json .

RUN npm install \
    && mkdir -p /.npm \
    && chown -R 1000700000:0 /.npm

COPY --chown=1001:0 . .

EXPOSE 5000

CMD ["npm", "start"]