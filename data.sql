CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--1. Tabla usuarios
CREATE TABLE usuarios(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    edad VARCHAR(255) NOT NULL
)

--2. tabla publicacion_animal
CREATE TABLE publicacion_animal(
    usuarios_id_fk INT,
    id uuid PRIMARY KEY uuid_generate_v4(),
    nombre_animal VARCHAR(255) NOT NULL,
    genero_animal VARCHAR(10) NOT NULL,
    edad_animal VARCHAR(255) NOT NULL,
    tamano VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    foreign key(usuarios_id_fk) references usuarios(id)
)
--3. tabla de adopcion
CREATE TABLE adopcion(
    id uuid PRIMARY KEY uuid_generate_v4(),
    usuarios_id_fk INT,
    publicacion_animal_id_fk INT,
    nombre_animal VARCHAR(255) NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    foreign key(usuarios_id_fk) references usuarios(id),
    foreign key(publicacion_animal_id_fk) references publicacion_animal(id)
)