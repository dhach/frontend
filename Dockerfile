## Note: This is a multi-stage build to reduce final image size and provide a clean separation between building and serving the app.

## base image to build and compile the app
FROM node:12.16-slim AS builder

WORKDIR /build/
COPY . .

# install all declared dependencies
RUN npm set progress=false && npm config set depth 0 && \
    npm  --quiet install
# build the JS app
RUN npm set progress=false && npm config set depth 0 && \
    npm --quiet run build


## serve via nginx
FROM bitnami/nginx:1.17 AS server

# copy the built JS files and the nginx config
COPY --from=builder /build/dist/ /app/
COPY docker_resources/pirat.conf /opt/bitnami/nginx/conf/server_blocks/

EXPOSE 8081
