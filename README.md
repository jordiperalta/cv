# cv

CV / Portfolio

## Development

Install dependencies, then start the Vite development server:

```sh
npm install
npm run dev
```

Vite prints the local URL in the terminal.

## Production build

Create an optimized bundle in `dist/`:

```sh
npm run build
```

## Preview the production build

Serve the generated `dist/` bundle locally:

```sh
npm run build
npm run preview
```

Vite prints the preview URL in the terminal.

## Publish the image version

From the directory containing the existing Dockerfile:

```sh
docker build -t jordiperalta/cv:1.0.0 .
docker build -t quay.io/jordiperalta/cv:1.0.0 .
```

or

```sh
docker compose --profile build up --build bundle
```

Log in to the container registry:

```sh
docker login
docker login quay.io
```

Upload (push) the image:

```sh
docker push jordiperalta/cv:1.0.0
docker push quay.io/jordiperalta/cv:1.0.0
```

## Run the containerized bundle

Run the published image and map its HTTP port to port 8173 on your machine:

```sh
docker run --rm -p 8173:80 quay.io/jordiperalta/cv:latest
```

Open [http://localhost:8173](http://localhost:8173) in a browser. Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the container.
