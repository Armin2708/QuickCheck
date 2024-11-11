FROM node:19-alpine
ARG api_base_url
ARG react_base_url
ARG google_map_api_key
WORKDIR /app
COPY package*.json .
RUN npm i --silent
COPY . .
RUN echo "VITE_API_BASE_URL=${api_base_url}" > .env
RUN echo "VITE_REACT_BASE_URL=${react_base_url}" > .env
RUN echo "VITE_GOOGLE_MAP_API_KEY=${google_map_api_key}" > .env


EXPOSE 5173
CMD ["npm", "run", "dev"]
