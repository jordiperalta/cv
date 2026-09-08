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
