-- 1. Tabla usuarios
CREATE TABLE usuarios(
    genero_usuario_id_fk INT,
    comunas_id_fk INT,
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido1 VARCHAR(255) NOT NULL,
    apellido2 VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    edad VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL,
    foreign key(genero_usuario_id) references genero_usuario(id),
    foreign key(comunas_id_fk) references comunas(id),
)

--2. tabla genero_usuario
CREATE TABLE genero_usuario(
    id SERIAL PRIMARY KEY,
    sexo VARCHAR(255) NOT NULL,
)

--3. tabla de comunas
CREATE TABLE comunas(
    regiones_id_fk INT,
    id SERIAL PRIMARY KEY,
    comuna VARCHAR(255) NOT NULL,
    foreign key(regiones_id_fk) references regiones(id),
)

--4. tabla regiones
CREATE TABLE regiones(
    id SERIAL PRIMARY KEY,
    region VARCHAR(255),
)

--5. tabla publicacion_animal
CREATE TABLE publicacion_animal(
    usuarios_id_fk INT,
    genero_animal_fk INT,
    estado_fk INT,
    id SERIAL PRIMARY KEY,
    nombre_animal VARCHAR(255) NOT NULL,
    tamano VARCHAR(255) NOT NULL,
    edad_animal VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    foreign key(usuarios_id_fk) references usuarios(id),
    foreign key(genero_animal_fk) references genero_animal(id),
    foreign key(estado_fk) references estado(id),
)

--6. tabla genero_animal
CREATE TABLE genero_animal(
    id SERIAL PRIMARY KEY,
    sexo_animal BOOLEAN NOT NULL,
)

--7. tabla estado
CREATE TABLE estado(
    id SERIAL PRIMARY KEY,
    estado VARCHAR(255) NOT NULL,
)

--8. tabla de adopcion
CREATE TABLE adopcion(
    id SERIAL PRIMARY KEY,
    usuarios_id_fk INT,
    publicacion_animal_id_fk INT,
    nombre_animal VARCHAR(255) NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    foreign key(usuarios_id_fk) references usuarios(id),
    foreign key(publicacion_animal_id_fk) references publicacion_animal(id),
)