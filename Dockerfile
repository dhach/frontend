## Note: This is a multi-stage build to reduce final image size and provide a clean separation between building and serving the app.

## base image to build and compile the app
FROM node:12.16-slim AS builder

# build_env can be overwritten by passing a value for "--build-arg build_env=" while building the image.
# If set to anything else than "production", the development version will be build
ARG build_env=production 

WORKDIR /build/
COPY . .

# install all declared dependencies
RUN npm set progress=false && npm config set depth 0 && \
    npm  --quiet install

# build the JS app, either for prod or dev
RUN  if [ "$build_env" = "production" ]; then \
    npm set progress=false && npm config set depth 0 && npm --quiet run build; \
    else \
    npm set progress=false && npm config set depth 0 && npm --quiet  run build-testproduction; \
    fi

RUN ls -la  /build/dist/pirate/

## serve via nginx
FROM bitnami/nginx:1.17 AS server

# copy the built JS files and the nginx config
COPY --from=builder /build/dist/pirate/ /app/
COPY docker_resources/pirate.conf /opt/bitnami/nginx/conf/server_blocks/

EXPOSE 8081
