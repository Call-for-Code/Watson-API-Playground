# Deploy to your Local Workstation

Here we will outline the process to deploy this solution on your local workstation.

## Prerequisites

Install the following packages:

1.  [Docker](https://docs.docker.com/engine/install/)
    - Windows, use **Docker Desktop**
    - Mac, use **Docker Desktop**
    - Linux, use **Docker Engine**
      > If on RHEL, Fedora, CentOS or Rocky Linux you may use Podman which is already installed. Though you will need to also install [podman-compose](https://github.com/containers/podman-compose).
2.  [Git](https://github.com/git-guides/install-git)
    > Only required on Linux and Mac. For Windows see _step 4_ below.
3.  Create the desired corresponding Watson API service, then collect the service credentials.

## Run

1.  Clone the Git repository.
    ```
    git clone https://github.com/Call-for-Code/Watson-API-Playground.git
    ```
2.  Change to the `ui` folder under **Watson-API-Playground** repository.
    ```
    cd Watson-API-Playground
    ```
3.  Edit the file `deployment/docker/docker-compose.yaml` adding the _Watson API service credentials_ for the following **environment** variables.
    - SERVICE_BASE_URL
    - API_KEY
4.  Start the application
    > Add `--build` if a rebuild the base image is necessary. The first run will build the image.<br />A restart of the container is necessary to pick up changes outside the `src` directory.
    - Docker
      ```
      docker compose -f deployment/docker/docker-compose.yaml up
      ```
    - Podman
      ```
      podman-compose -f deployment/docker/docker-compose.yaml up
      ```

## View the application

In your browser, navigate to the following URL:

```
http://localhost:8080
```
