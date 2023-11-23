A continuación se muestra un conjunto de comandos Docker en formato Markdown para crear redes y contenedores:

1. Crear una red en Docker llamada `red-balanceador`:
    ```bash
    docker network create red-balanceador
    ```

2. Crear un volumen en Docker llamado `mysql_data`:
    ```bash
    docker volume create mysql_data
    ```

3. Ejecutar un contenedor de MySQL en modo daemon, enlazado a la red `red-balanceador`, con un volumen para los datos y un archivo SQL de inicialización:
    ```bash
    docker run -d --name mysql-container -e MYSQL_ROOT_PASSWORD=2021 -v mysql_data:/var/lib/mysql -v $(pwd)/datos.sql:/docker-entrypoint-initdb.d/datos.sql --network red-balanceador mysql:debian
    ```

4. Ejecutar un contenedor Node.js llamado `mi-contenedor-node`, enlazado a la red `nueva-red`, exponiendo el puerto 3000, con una variable de entorno personalizada y montando un volumen para el código fuente:
    ```bash
    docker run --network nueva-red --name mi-contenedor-node -p 3000:3000 -e CUSTOM_TEXT="Contenedor 1" -v ${PWD}:/usr/src/app -w /usr/src/app node:14 node index.js
    ```

5. Ejecutar otro contenedor Node.js llamado `mi-contenedor-node2`, enlazado a la red `nueva-red`, exponiendo el puerto 3001, con una variable de entorno personalizada y montando un volumen para el código fuente:
    ```bash
    docker run --network nueva-red --name mi-contenedor-node2 -p 3001:3000 -e CUSTOM_TEXT="Contenedor 2" -v ${PWD}:/usr/src/app -w /usr/src/app node:14 node index.js
    ```

6. Ejecutar un contenedor HAProxy en modo daemon, enlazado a la red `nueva-red`, exponiendo el puerto 3002 y montando un archivo de configuración para HAProxy:
    ```bash
    docker run -d --name haproxy-container --network nueva-red -p 3002:3000 -v ${PWD}/config/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg haproxy:latest
    ```
