FROM node:13.12.0-alpine AS web
WORKDIR /web
COPY web .
RUN npm install
RUN npm run build

FROM golang:1.17 AS server

WORKDIR /server
COPY server .

RUN go get -d -v
RUN go install -v 
RUN CGO_ENABLED=0 go build
RUN rm -r documents

FROM scratch
COPY --from=server /server/tagger /server/
COPY --from=web /web/build /web/build

WORKDIR /server

CMD ["./tagger"]
