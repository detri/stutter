FROM node:alpine as buildweb
COPY ./web /webapp
WORKDIR /webapp
RUN npm install && npm run build

FROM python:slim
COPY ./api /app
COPY --from=buildweb /webapp/build /app/static/build
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["flask", "run"]