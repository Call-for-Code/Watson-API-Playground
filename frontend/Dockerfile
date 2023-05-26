FROM node:16.20.0-buster-slim AS build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

# FROM nginx:1.25.0

# COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /app/build/ /usr/share/nginx/html

# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]


FROM nginx:1.25.0

COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY --from=build-stage /app/build/ .

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]