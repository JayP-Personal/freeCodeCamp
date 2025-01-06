--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    name character varying(50) NOT NULL,
    star_id integer NOT NULL,
    diameter_km numeric(10,2),
    is_potentially_hazardous boolean DEFAULT false,
    is_near_earth boolean DEFAULT false,
    orbital_period_days integer,
    composition text,
    discovery_year integer NOT NULL
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_asteroid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_asteroid_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_asteroid_id_seq OWNED BY public.asteroid.asteroid_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(50) NOT NULL,
    age_in_millions_of_years integer NOT NULL,
    distance_from_earth numeric(10,2),
    description text,
    has_life boolean DEFAULT false,
    is_spherical boolean DEFAULT true,
    galaxy_type character varying(30)
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(50) NOT NULL,
    planet_id integer NOT NULL,
    orbital_period_days numeric(10,2),
    is_spherical boolean DEFAULT true,
    distance_from_planet integer,
    has_atmosphere boolean DEFAULT false,
    description text
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(50) NOT NULL,
    star_id integer NOT NULL,
    orbital_period_days numeric(10,2),
    has_life boolean DEFAULT false,
    has_atmosphere boolean DEFAULT true,
    surface_temperature integer,
    planet_type character varying(30),
    description text
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(50) NOT NULL,
    galaxy_id integer NOT NULL,
    age_in_millions_of_years integer NOT NULL,
    temperature_kelvin integer,
    is_spherical boolean DEFAULT true,
    has_planets boolean DEFAULT false,
    star_type character varying(30)
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid asteroid_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid ALTER COLUMN asteroid_id SET DEFAULT nextval('public.asteroid_asteroid_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES (1, 'Psyche', 1, 226.00, false, false, 1825, 'Metal-rich rock', 1852);
INSERT INTO public.asteroid VALUES (2, 'Ryugu', 1, 0.87, true, true, 474, 'Carbonaceous rock', 1999);
INSERT INTO public.asteroid VALUES (3, 'Didymos', 1, 0.78, true, true, 771, 'Rocky', 1996);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 13600, 0.00, 'Our home galaxy', true, true, NULL);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 14000, 2537000.00, 'Nearest major galaxy to Milky Way', false, true, NULL);
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 13000, 3200000.00, 'Third-largest galaxy in Local Group', false, true, NULL);
INSERT INTO public.galaxy VALUES (4, 'Sombrero', 13250, 29350000.00, 'Has a distinctive shape', false, true, NULL);
INSERT INTO public.galaxy VALUES (5, 'Whirlpool', 12400, 23160000.00, 'First galaxy to be classified as spiral', false, true, NULL);
INSERT INTO public.galaxy VALUES (6, 'Pinwheel', 13510, 20870000.00, 'Face-on spiral galaxy', false, true, NULL);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 3, 27.30, true, 384400, false, NULL);
INSERT INTO public.moon VALUES (2, 'Phobos', 4, 0.30, true, 9377, false, NULL);
INSERT INTO public.moon VALUES (3, 'Deimos', 4, 1.20, true, 23460, false, NULL);
INSERT INTO public.moon VALUES (4, 'Io', 5, 1.80, true, 421700, false, NULL);
INSERT INTO public.moon VALUES (5, 'Europa', 5, 3.50, true, 671100, false, NULL);
INSERT INTO public.moon VALUES (6, 'Ganymede', 5, 7.20, true, 1070400, false, NULL);
INSERT INTO public.moon VALUES (7, 'Callisto', 5, 16.70, true, 1882700, false, NULL);
INSERT INTO public.moon VALUES (8, 'Titan', 6, 15.90, true, 1221870, false, NULL);
INSERT INTO public.moon VALUES (9, 'Enceladus', 6, 1.40, true, 238020, false, NULL);
INSERT INTO public.moon VALUES (10, 'Mimas', 6, 0.90, true, 185520, false, NULL);
INSERT INTO public.moon VALUES (11, 'Miranda', 7, 1.40, true, 129390, false, NULL);
INSERT INTO public.moon VALUES (12, 'Ariel', 7, 2.50, true, 190900, false, NULL);
INSERT INTO public.moon VALUES (13, 'Umbriel', 7, 4.10, true, 266000, false, NULL);
INSERT INTO public.moon VALUES (14, 'Titania', 7, 8.70, true, 436300, false, NULL);
INSERT INTO public.moon VALUES (15, 'Oberon', 7, 13.50, true, 583520, false, NULL);
INSERT INTO public.moon VALUES (16, 'Triton', 8, 5.90, true, 354759, false, NULL);
INSERT INTO public.moon VALUES (17, 'Naiad', 8, 0.30, true, 48227, false, NULL);
INSERT INTO public.moon VALUES (18, 'Thalassa', 8, 0.30, true, 50074, false, NULL);
INSERT INTO public.moon VALUES (19, 'Despina', 8, 0.30, true, 52526, false, NULL);
INSERT INTO public.moon VALUES (20, 'Galatea', 8, 0.40, true, 61953, false, NULL);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 1, 88.00, false, false, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (2, 'Venus', 1, 224.70, false, true, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (3, 'Earth', 1, 365.20, true, true, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (4, 'Mars', 1, 687.00, false, true, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (5, 'Jupiter', 1, 4333.00, false, true, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (6, 'Saturn', 1, 10759.20, false, true, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (7, 'Uranus', 1, 30688.50, false, true, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (8, 'Neptune', 1, 60195.00, false, true, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (9, 'Proxima b', 2, 11.20, false, true, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (10, 'Proxima c', 2, 1900.00, false, false, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (11, 'Proxima d', 2, 5.10, false, false, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (12, 'Kepler-186f', 1, 129.90, false, true, NULL, NULL, NULL);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 1, 4600, 5778, true, true, NULL);
INSERT INTO public.star VALUES (2, 'Proxima Centauri', 1, 4850, 3042, true, true, NULL);
INSERT INTO public.star VALUES (3, 'Sirius', 1, 242, 9940, true, false, NULL);
INSERT INTO public.star VALUES (4, 'Alpha Andromedae', 2, 60, 13800, true, false, NULL);
INSERT INTO public.star VALUES (5, 'Trianguli', 3, 530, 9400, true, false, NULL);
INSERT INTO public.star VALUES (6, 'Betelgeuse', 1, 8, 3600, true, false, NULL);


--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_asteroid_id_seq', 3, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: asteroid asteroid_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_name_key UNIQUE (name);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: asteroid asteroid_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

