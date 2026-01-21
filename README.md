This is a Task Management web application. Its build using vite with React and node with express js.


## Useful azure commands

1. Show current Azure account:
```bash
az account show
```

2. List all Azure accounts:
```bash
az account list -o table
```

3. Create service principal for GitHub deployment:
```bash
az ad sp create-for-rbac \
  --name github-deployer \
  --role contributor \
  --scopes /subscriptions/<Subscription ID>
```