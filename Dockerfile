FROM node:13.12.0-alpine AS web
WORKDIR /web
COPY web .
RUN npm install
RUN npm run build

FROM golang:1.17

WORKDIR /server
COPY server .
COPY --from=web /web/build /web/build

RUN go get -d -v
RUN go install -v 
RUN go build
RUN rm -r documents

CMD ["./tagger"]
