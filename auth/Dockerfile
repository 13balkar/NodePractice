FROM alpine:latest

RUN apk add --update nodejs npm

# ENV JWT_SECRET_KEY=code_jwt_secret_key

# ENV TOKEN_HEADER_KEY=code_token_header_key

#copy  dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

#install dependencies
RUN cd /app; npm install

#copy app
COPY . /app

#run app
# CMD [ "node", "/app/index.js" ]
ENTRYPOINT [ "node", "/app/index.js" ]

#build image
# docker build -t docker-demo  .
# docker run docker-demo
# docker run -p 3000:3000 docker-demo