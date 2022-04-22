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
--2. tabla genero_animal
CREATE TABLE genero_animal(
    id uuid PRIMARY KEY uuid_generate_v4(),
    sexo_animal BOOLEAN NOT NULL
)

--3. tabla estado
CREATE TABLE estado(
    id uuid PRIMARY KEY uuid_generate_v4(),
    estado VARCHAR(255) NOT NULL
)

--4. tabla publicacion_animal
CREATE TABLE publicacion_animal(
    usuarios_id_fk INT,
    genero_animal_fk INT,
    estado_fk INT,
    id uuid PRIMARY KEY uuid_generate_v4(),
    nombre_animal VARCHAR(255) NOT NULL,
    tamano VARCHAR(255) NOT NULL,
    edad_animal VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    foreign key(usuarios_id_fk) references usuarios(id),
    foreign key(genero_animal_fk) references genero_animal(id),
    foreign key(estado_fk) references estado(id)
)
--5. tabla de adopcio
CREATE TABLE adopcion(
    id uuid PRIMARY KEY uuid_generate_v4(),
    usuarios_id_fk INT,
    publicacion_animal_id_fk INT,
    nombre_animal VARCHAR(255) NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    foreign key(usuarios_id_fk) references usuarios(id),
    foreign key(publicacion_animal_id_fk) references publicacion_animal(id)
)