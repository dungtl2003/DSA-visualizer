# DSA-visualizer

visualizer app for data structure and algorithm

---

## Setup project

- `npm` is required for this project. Run this command from root project:

```
bash ./setup.sh
```
---

## Testing

### Test docker compose:

First, build latest dist:

```
npm run build:prod
```

Spin up containers:

```
docker compose -f compose.test.yaml up -d
```

When done, stop and remove:

```
docker compose down --rmi all -v --remove-orphans
```
