--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:b5BnZvcWhqQvr2b15bKNiQ==$kgdxQArHOeBxbgTRuxhfuqTjxiczxfQAr7CLNe8ArQo=:59PN04D8rFXaSDSQ+/+53j79/8inCpA3uemO9dCTGi8=';






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

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

--
-- PostgreSQL database dump complete
--

--
-- Database "ecograd" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

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

--
-- Name: ecograd; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ecograd WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE ecograd OWNER TO postgres;

\connect ecograd

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

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO postgres;

--
-- Name: business; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA business;


ALTER SCHEMA business OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.admin (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE auth.admin OWNER TO postgres;

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.admin_id_seq OWNER TO postgres;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.admin_id_seq OWNED BY auth.admin.id;


--
-- Name: client; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.client (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    phone text NOT NULL,
    "userId" integer
);


ALTER TABLE auth.client OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.client_id_seq OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.client_id_seq OWNED BY auth.client.id;


--
-- Name: expert; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.expert (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    phone text,
    "position" text NOT NULL,
    certificate text NOT NULL,
    direction text NOT NULL,
    misc text,
    "userId" integer
);


ALTER TABLE auth.expert OWNER TO postgres;

--
-- Name: expert_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.expert_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.expert_id_seq OWNER TO postgres;

--
-- Name: expert_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.expert_id_seq OWNED BY auth.expert.id;


--
-- Name: feedback; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.feedback (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    feedback text
);


ALTER TABLE auth.feedback OWNER TO postgres;

--
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.feedback_id_seq OWNER TO postgres;

--
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.feedback_id_seq OWNED BY auth.feedback.id;


--
-- Name: user; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth."user" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    profile character varying NOT NULL
);


ALTER TABLE auth."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.user_id_seq OWNED BY auth."user".id;


--
-- Name: attach; Type: TABLE; Schema: business; Owner: postgres
--

CREATE TABLE business.attach (
    id integer NOT NULL,
    title text NOT NULL,
    path text NOT NULL,
    is_new boolean NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "orderId" integer,
    "sectionId" integer,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "senderId" integer
);


ALTER TABLE business.attach OWNER TO postgres;

--
-- Name: attach_id_seq; Type: SEQUENCE; Schema: business; Owner: postgres
--

CREATE SEQUENCE business.attach_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE business.attach_id_seq OWNER TO postgres;

--
-- Name: attach_id_seq; Type: SEQUENCE OWNED BY; Schema: business; Owner: postgres
--

ALTER SEQUENCE business.attach_id_seq OWNED BY business.attach.id;


--
-- Name: inquire; Type: TABLE; Schema: business; Owner: postgres
--

CREATE TABLE business.inquire (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    path text NOT NULL,
    "orderId" integer,
    "senderId" integer,
    title text NOT NULL
);


ALTER TABLE business.inquire OWNER TO postgres;

--
-- Name: inquire_id_seq; Type: SEQUENCE; Schema: business; Owner: postgres
--

CREATE SEQUENCE business.inquire_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE business.inquire_id_seq OWNER TO postgres;

--
-- Name: inquire_id_seq; Type: SEQUENCE OWNED BY; Schema: business; Owner: postgres
--

ALTER SEQUENCE business.inquire_id_seq OWNED BY business.inquire.id;


--
-- Name: order; Type: TABLE; Schema: business; Owner: postgres
--

CREATE TABLE business."order" (
    id integer NOT NULL,
    title text NOT NULL,
    exp_type text,
    status text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "clientId" integer,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "expertId" integer,
    object_type text,
    docs_cipher text,
    rii_cipher text
);


ALTER TABLE business."order" OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: business; Owner: postgres
--

CREATE SEQUENCE business.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE business.order_id_seq OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: business; Owner: postgres
--

ALTER SEQUENCE business.order_id_seq OWNED BY business."order".id;


--
-- Name: section; Type: TABLE; Schema: business; Owner: postgres
--

CREATE TABLE business.section (
    id integer NOT NULL,
    title text NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "orderId" integer,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    arrange character varying NOT NULL,
    parent boolean DEFAULT false NOT NULL
);


ALTER TABLE business.section OWNER TO postgres;

--
-- Name: section_id_seq; Type: SEQUENCE; Schema: business; Owner: postgres
--

CREATE SEQUENCE business.section_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE business.section_id_seq OWNER TO postgres;

--
-- Name: section_id_seq; Type: SEQUENCE OWNED BY; Schema: business; Owner: postgres
--

ALTER SEQUENCE business.section_id_seq OWNED BY business.section.id;


--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO postgres;

--
-- Name: admin id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.admin ALTER COLUMN id SET DEFAULT nextval('auth.admin_id_seq'::regclass);


--
-- Name: client id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.client ALTER COLUMN id SET DEFAULT nextval('auth.client_id_seq'::regclass);


--
-- Name: expert id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.expert ALTER COLUMN id SET DEFAULT nextval('auth.expert_id_seq'::regclass);


--
-- Name: feedback id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.feedback ALTER COLUMN id SET DEFAULT nextval('auth.feedback_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth."user" ALTER COLUMN id SET DEFAULT nextval('auth.user_id_seq'::regclass);


--
-- Name: attach id; Type: DEFAULT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.attach ALTER COLUMN id SET DEFAULT nextval('business.attach_id_seq'::regclass);


--
-- Name: inquire id; Type: DEFAULT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.inquire ALTER COLUMN id SET DEFAULT nextval('business.inquire_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."order" ALTER COLUMN id SET DEFAULT nextval('business.order_id_seq'::regclass);


--
-- Name: section id; Type: DEFAULT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.section ALTER COLUMN id SET DEFAULT nextval('business.section_id_seq'::regclass);

--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.admin_id_seq', 2, true);


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.client_id_seq', 3, true);


--
-- Name: expert_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.expert_id_seq', 4, true);


--
-- Name: feedback_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.feedback_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.user_id_seq', 13, true);


--
-- Name: attach_id_seq; Type: SEQUENCE SET; Schema: business; Owner: postgres
--

SELECT pg_catalog.setval('business.attach_id_seq', 72, true);


--
-- Name: inquire_id_seq; Type: SEQUENCE SET; Schema: business; Owner: postgres
--

SELECT pg_catalog.setval('business.inquire_id_seq', 6, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: business; Owner: postgres
--

SELECT pg_catalog.setval('business.order_id_seq', 32, true);


--
-- Name: section_id_seq; Type: SEQUENCE SET; Schema: business; Owner: postgres
--

SELECT pg_catalog.setval('business.section_id_seq', 70, true);


--
-- Name: expert PK_0062630832658e718267ce2941f; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.expert
    ADD CONSTRAINT "PK_0062630832658e718267ce2941f" PRIMARY KEY (id);


--
-- Name: feedback PK_8389f9e087a57689cd5be8b2b13; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.feedback
    ADD CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY (id);


--
-- Name: client PK_96da49381769303a6515a8785c7; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.client
    ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: admin PK_e032310bcef831fb83101899b10; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.admin
    ADD CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY (id);


--
-- Name: user UQ_065d4d8f3b5adb4a08841eae3c8; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth."user"
    ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE (name);


--
-- Name: expert UQ_32957200acca782d1dc4797528a; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.expert
    ADD CONSTRAINT "UQ_32957200acca782d1dc4797528a" UNIQUE (phone);


--
-- Name: client UQ_368ca99acdbd5502fc08b3f7796; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.client
    ADD CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE (phone);


--
-- Name: expert UQ_39d99079a5227599160c408b22c; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.expert
    ADD CONSTRAINT "UQ_39d99079a5227599160c408b22c" UNIQUE ("userId");


--
-- Name: client UQ_ad3b4bf8dd18a1d467c5c0fc13a; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.client
    ADD CONSTRAINT "UQ_ad3b4bf8dd18a1d467c5c0fc13a" UNIQUE ("userId");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: admin UQ_f8a889c4362d78f056960ca6dad; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.admin
    ADD CONSTRAINT "UQ_f8a889c4362d78f056960ca6dad" UNIQUE ("userId");


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: section PK_3c41d2d699384cc5e8eac54777d; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.section
    ADD CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY (id);


--
-- Name: attach PK_96bd3799860de71f1571bd29c40; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.attach
    ADD CONSTRAINT "PK_96bd3799860de71f1571bd29c40" PRIMARY KEY (id);


--
-- Name: inquire PK_c2e5b4edef8039e7df4a4646e80; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.inquire
    ADD CONSTRAINT "PK_c2e5b4edef8039e7df4a4646e80" PRIMARY KEY (id);


--
-- Name: attach UQ_ac012a73cb39398e4ae9c4c44ca; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.attach
    ADD CONSTRAINT "UQ_ac012a73cb39398e4ae9c4c44ca" UNIQUE (path);


--
-- Name: inquire UQ_b0c18af933638273acd0c1eaf5c; Type: CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.inquire
    ADD CONSTRAINT "UQ_b0c18af933638273acd0c1eaf5c" UNIQUE (path);


--
-- Name: expert FK_39d99079a5227599160c408b22c; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.expert
    ADD CONSTRAINT "FK_39d99079a5227599160c408b22c" FOREIGN KEY ("userId") REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: client FK_ad3b4bf8dd18a1d467c5c0fc13a; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.client
    ADD CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a" FOREIGN KEY ("userId") REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: admin FK_f8a889c4362d78f056960ca6dad; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.admin
    ADD CONSTRAINT "FK_f8a889c4362d78f056960ca6dad" FOREIGN KEY ("userId") REFERENCES auth."user"(id) ON DELETE CASCADE;


--
-- Name: order FK_2447b5d378c0366b52e755645af; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."order"
    ADD CONSTRAINT "FK_2447b5d378c0366b52e755645af" FOREIGN KEY ("expertId") REFERENCES auth.expert(id);


--
-- Name: attach FK_56901cff7827151626e5cb9177c; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.attach
    ADD CONSTRAINT "FK_56901cff7827151626e5cb9177c" FOREIGN KEY ("senderId") REFERENCES auth."user"(id);


--
-- Name: inquire FK_61ab3225e10d2c7c877522791cb; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.inquire
    ADD CONSTRAINT "FK_61ab3225e10d2c7c877522791cb" FOREIGN KEY ("orderId") REFERENCES business."order"(id);


--
-- Name: section FK_732214a3da2ce4f35c3f520edb5; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.section
    ADD CONSTRAINT "FK_732214a3da2ce4f35c3f520edb5" FOREIGN KEY ("orderId") REFERENCES business."order"(id);


--
-- Name: attach FK_95067a5062913fa20a22fc9e785; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.attach
    ADD CONSTRAINT "FK_95067a5062913fa20a22fc9e785" FOREIGN KEY ("orderId") REFERENCES business."order"(id);


--
-- Name: order FK_9b27855a9c2ade186e5c55d1ec3; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business."order"
    ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES auth.client(id);


--
-- Name: inquire FK_e5d38bee3f59790dc7d4f6f08b9; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.inquire
    ADD CONSTRAINT "FK_e5d38bee3f59790dc7d4f6f08b9" FOREIGN KEY ("senderId") REFERENCES auth."user"(id);


--
-- Name: attach FK_eeb76ca50d03dd32661e89db7ee; Type: FK CONSTRAINT; Schema: business; Owner: postgres
--

ALTER TABLE ONLY business.attach
    ADD CONSTRAINT "FK_eeb76ca50d03dd32661e89db7ee" FOREIGN KEY ("sectionId") REFERENCES business.section(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

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

--
-- PostgreSQL database dump complete
--

--
-- Database "tnk_app" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

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

--
-- Name: tnk_app; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE tnk_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE tnk_app OWNER TO postgres;

\connect tnk_app

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

--
-- Name: attach; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA attach;


ALTER SCHEMA attach OWNER TO postgres;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO postgres;

--
-- Name: dict; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA dict;


ALTER SCHEMA dict OWNER TO postgres;

--
-- Name: log; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA log;


ALTER SCHEMA log OWNER TO postgres;

--
-- Name: tnk; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA tnk;


ALTER SCHEMA tnk OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: attachment; Type: TABLE; Schema: attach; Owner: postgres
--

CREATE TABLE attach.attachment (
    id bigint NOT NULL,
    file_data bytea NOT NULL,
    file_size integer NOT NULL,
    md5 text,
    file_name text NOT NULL,
    description text,
    mimetype text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE attach.attachment OWNER TO postgres;

--
-- Name: TABLE attachment; Type: COMMENT; Schema: attach; Owner: postgres
--

COMMENT ON TABLE attach.attachment IS 'Вложение';


--
-- Name: attachment_id_seq; Type: SEQUENCE; Schema: attach; Owner: postgres
--

CREATE SEQUENCE attach.attachment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attach.attachment_id_seq OWNER TO postgres;

--
-- Name: attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: attach; Owner: postgres
--

ALTER SEQUENCE attach.attachment_id_seq OWNED BY attach.attachment.id;


--
-- Name: account; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.account (
    id uuid NOT NULL,
    nickname text NOT NULL,
    username text NOT NULL,
    is_active boolean DEFAULT true,
    email text,
    phone text,
    password text NOT NULL,
    profile_id bigint,
    is_not_personal boolean,
    date_created timestamp without time zone DEFAULT now(),
    label text,
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE auth.account OWNER TO postgres;

--
-- Name: TABLE account; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.account IS 'Аккаунт';


--
-- Name: profile; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.profile (
    id bigint NOT NULL,
    title text NOT NULL,
    is_active boolean DEFAULT true,
    is_tnk_type_enabled boolean,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE auth.profile OWNER TO postgres;

--
-- Name: TABLE profile; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.profile IS 'Профиль';


--
-- Name: profile_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.profile_id_seq OWNER TO postgres;

--
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.profile_id_seq OWNED BY auth.profile.id;


--
-- Name: requestmap; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.requestmap (
    id bigint NOT NULL,
    controller text NOT NULL,
    action text,
    role_id bigint,
    model text,
    date_created timestamp without time zone DEFAULT now(),
    label text,
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE auth.requestmap OWNER TO postgres;

--
-- Name: TABLE requestmap; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.requestmap IS 'Кому куда можно';


--
-- Name: requestmap_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.requestmap_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.requestmap_id_seq OWNER TO postgres;

--
-- Name: requestmap_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.requestmap_id_seq OWNED BY auth.requestmap.id;


--
-- Name: role; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.role (
    id integer NOT NULL,
    title text NOT NULL,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE auth.role OWNER TO postgres;

--
-- Name: TABLE role; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.role IS 'Роль';


--
-- Name: role_account; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.role_account (
    role_id bigint NOT NULL,
    account_id uuid NOT NULL,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE auth.role_account OWNER TO postgres;

--
-- Name: TABLE role_account; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.role_account IS 'ДОступные Пользователю Роли';


--
-- Name: token; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.token (
    id uuid NOT NULL,
    account_id uuid,
    ip text,
    token_ext text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    date_created_ext timestamp without time zone DEFAULT now()
);


ALTER TABLE auth.token OWNER TO postgres;

--
-- Name: TABLE token; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.token IS 'Токен авторизации пользователя';


--
-- Name: dict_item; Type: TABLE; Schema: dict; Owner: postgres
--

CREATE TABLE dict.dict_item (
    id bigint NOT NULL,
    version bigint,
    code bigint,
    title text NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 1,
    dict_type_id bigint,
    parent_id bigint,
    add_info text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE dict.dict_item OWNER TO postgres;

--
-- Name: TABLE dict_item; Type: COMMENT; Schema: dict; Owner: postgres
--

COMMENT ON TABLE dict.dict_item IS 'Справочник';


--
-- Name: dict_item_id_seq; Type: SEQUENCE; Schema: dict; Owner: postgres
--

CREATE SEQUENCE dict.dict_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dict.dict_item_id_seq OWNER TO postgres;

--
-- Name: dict_item_id_seq; Type: SEQUENCE OWNED BY; Schema: dict; Owner: postgres
--

ALTER SEQUENCE dict.dict_item_id_seq OWNED BY dict.dict_item.id;


--
-- Name: dict_type; Type: TABLE; Schema: dict; Owner: postgres
--

CREATE TABLE dict.dict_type (
    id integer NOT NULL,
    version bigint,
    title text NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    is_editable boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    sort_order integer DEFAULT 1,
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE dict.dict_type OWNER TO postgres;

--
-- Name: TABLE dict_type; Type: COMMENT; Schema: dict; Owner: postgres
--

COMMENT ON TABLE dict.dict_type IS 'Тип справочника';


--
-- Name: app_log; Type: TABLE; Schema: log; Owner: postgres
--

CREATE TABLE log.app_log (
    id bigint NOT NULL,
    app_name text,
    app_version text,
    log_level integer,
    user_id text,
    description text,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE log.app_log OWNER TO postgres;

--
-- Name: TABLE app_log; Type: COMMENT; Schema: log; Owner: postgres
--

COMMENT ON TABLE log.app_log IS 'Лог приложения';


--
-- Name: app_log_id_seq; Type: SEQUENCE; Schema: log; Owner: postgres
--

CREATE SEQUENCE log.app_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE log.app_log_id_seq OWNER TO postgres;

--
-- Name: app_log_id_seq; Type: SEQUENCE OWNED BY; Schema: log; Owner: postgres
--

ALTER SEQUENCE log.app_log_id_seq OWNED BY log.app_log.id;


--
-- Name: integration_log; Type: TABLE; Schema: log; Owner: postgres
--

CREATE TABLE log.integration_log (
    id bigint NOT NULL,
    integration_response text,
    requers_from_date text,
    request_offset text,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE log.integration_log OWNER TO postgres;

--
-- Name: TABLE integration_log; Type: COMMENT; Schema: log; Owner: postgres
--

COMMENT ON TABLE log.integration_log IS 'Логи интеграции';


--
-- Name: integration_log_id_seq; Type: SEQUENCE; Schema: log; Owner: postgres
--

CREATE SEQUENCE log.integration_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE log.integration_log_id_seq OWNER TO postgres;

--
-- Name: integration_log_id_seq; Type: SEQUENCE OWNED BY; Schema: log; Owner: postgres
--

ALTER SEQUENCE log.integration_log_id_seq OWNED BY log.integration_log.id;


--
-- Name: approval_queue; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.approval_queue (
    id bigint NOT NULL,
    tnk_id bigint,
    subproc_id bigint,
    is_approved boolean,
    description text,
    group_num bigint,
    date_created timestamp without time zone DEFAULT now(),
    user_ip text,
    last_updated_by uuid
);


ALTER TABLE tnk.approval_queue OWNER TO postgres;

--
-- Name: TABLE approval_queue; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.approval_queue IS 'Согласование';


--
-- Name: approval_queue_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.approval_queue_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.approval_queue_id_seq OWNER TO postgres;

--
-- Name: approval_queue_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.approval_queue_id_seq OWNED BY tnk.approval_queue.id;


--
-- Name: approval_setup; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.approval_setup (
    id bigint NOT NULL,
    subproc_id bigint,
    sort_order integer,
    user_id uuid,
    is_active boolean,
    description text,
    group_num bigint,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.approval_setup OWNER TO postgres;

--
-- Name: TABLE approval_setup; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.approval_setup IS 'Настройка согласования';


--
-- Name: approval_setup_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.approval_setup_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.approval_setup_id_seq OWNER TO postgres;

--
-- Name: approval_setup_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.approval_setup_id_seq OWNED BY tnk.approval_setup.id;


--
-- Name: ip_to_account; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.ip_to_account (
    id bigint NOT NULL,
    ip text,
    username text,
    account_id uuid,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.ip_to_account OWNER TO postgres;

--
-- Name: TABLE ip_to_account; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.ip_to_account IS 'Пользотель ip';


--
-- Name: ip_to_account_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.ip_to_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.ip_to_account_id_seq OWNER TO postgres;

--
-- Name: ip_to_account_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.ip_to_account_id_seq OWNED BY tnk.ip_to_account.id;


--
-- Name: ip_to_load; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.ip_to_load (
    id bigint NOT NULL,
    ip text,
    description text,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE tnk.ip_to_load OWNER TO postgres;

--
-- Name: TABLE ip_to_load; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.ip_to_load IS 'Доступ к загрузке файлов';


--
-- Name: ip_to_load_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.ip_to_load_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.ip_to_load_id_seq OWNER TO postgres;

--
-- Name: ip_to_load_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.ip_to_load_id_seq OWNED BY tnk.ip_to_load.id;


--
-- Name: operation; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.operation (
    id bigint NOT NULL,
    title text NOT NULL,
    duration bigint,
    is_active boolean DEFAULT true,
    unit_id bigint,
    source_id bigint,
    doc_num bigint,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.operation OWNER TO postgres;

--
-- Name: TABLE operation; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.operation IS 'Операция';


--
-- Name: operation_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.operation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.operation_id_seq OWNER TO postgres;

--
-- Name: operation_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.operation_id_seq OWNED BY tnk.operation.id;


--
-- Name: process; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.process (
    id bigint NOT NULL,
    title text NOT NULL,
    code text,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.process OWNER TO postgres;

--
-- Name: TABLE process; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.process IS 'Процесс';


--
-- Name: process_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.process_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.process_id_seq OWNER TO postgres;

--
-- Name: process_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.process_id_seq OWNED BY tnk.process.id;


--
-- Name: profile_to_subprocess; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.profile_to_subprocess (
    id bigint NOT NULL,
    profile_id bigint,
    subprocess_id bigint,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.profile_to_subprocess OWNER TO postgres;

--
-- Name: TABLE profile_to_subprocess; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.profile_to_subprocess IS 'Субпроцессы Профиля';


--
-- Name: profile_to_subprocess_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.profile_to_subprocess_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.profile_to_subprocess_id_seq OWNER TO postgres;

--
-- Name: profile_to_subprocess_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.profile_to_subprocess_id_seq OWNED BY tnk.profile_to_subprocess.id;


--
-- Name: protocol; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.protocol (
    id bigint NOT NULL,
    object_id bigint,
    object_type integer,
    description text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid,
    user_ip text
);


ALTER TABLE tnk.protocol OWNER TO postgres;

--
-- Name: TABLE protocol; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.protocol IS 'Протокол';


--
-- Name: protocol_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.protocol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.protocol_id_seq OWNER TO postgres;

--
-- Name: protocol_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.protocol_id_seq OWNED BY tnk.protocol.id;


--
-- Name: protocol_type; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.protocol_type (
    id integer NOT NULL,
    title text NOT NULL,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE tnk.protocol_type OWNER TO postgres;

--
-- Name: TABLE protocol_type; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.protocol_type IS 'Тип протокола';


--
-- Name: subprocess; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.subprocess (
    id bigint NOT NULL,
    title text NOT NULL,
    code text,
    espp_obj text,
    is_active boolean DEFAULT true,
    process_id bigint,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.subprocess OWNER TO postgres;

--
-- Name: TABLE subprocess; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.subprocess IS 'Подпроцесс';


--
-- Name: subprocess_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.subprocess_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.subprocess_id_seq OWNER TO postgres;

--
-- Name: subprocess_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.subprocess_id_seq OWNED BY tnk.subprocess.id;


--
-- Name: tnk; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk (
    id bigint NOT NULL,
    title text NOT NULL,
    is_active boolean DEFAULT true,
    is_fixed boolean DEFAULT true,
    parent_id bigint,
    is_group boolean,
    child_sort_order bigint,
    status_id bigint NOT NULL,
    subprocess_id bigint,
    tnk_type text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid,
    user_ip text
);


ALTER TABLE tnk.tnk OWNER TO postgres;

--
-- Name: TABLE tnk; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk IS 'ТНК';


--
-- Name: tnk_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_id_seq OWNER TO postgres;

--
-- Name: tnk_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_id_seq OWNED BY tnk.tnk.id;


--
-- Name: tnk_import_progress; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_import_progress (
    id bigint NOT NULL,
    total_val bigint,
    current_val bigint,
    error_descr text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_import_progress OWNER TO postgres;

--
-- Name: TABLE tnk_import_progress; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_import_progress IS 'Прогресс загрузки ТНК';


--
-- Name: tnk_import_progress_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_import_progress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_import_progress_id_seq OWNER TO postgres;

--
-- Name: tnk_import_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_import_progress_id_seq OWNED BY tnk.tnk_import_progress.id;


--
-- Name: tnk_to_ci; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_to_ci (
    id bigint NOT NULL,
    tnk_id bigint,
    ci text,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_to_ci OWNER TO postgres;

--
-- Name: TABLE tnk_to_ci; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_to_ci IS 'Связь ТНК с ЭК';


--
-- Name: tnk_to_ci_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_to_ci_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_to_ci_id_seq OWNER TO postgres;

--
-- Name: tnk_to_ci_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_to_ci_id_seq OWNED BY tnk.tnk_to_ci.id;


--
-- Name: tnk_to_ci_type; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_to_ci_type (
    id bigint NOT NULL,
    tnk_id bigint,
    ci_type text,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_to_ci_type OWNER TO postgres;

--
-- Name: TABLE tnk_to_ci_type; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_to_ci_type IS 'Связь ТНК с Типом ЭК';


--
-- Name: tnk_to_ci_type_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_to_ci_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_to_ci_type_id_seq OWNER TO postgres;

--
-- Name: tnk_to_ci_type_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_to_ci_type_id_seq OWNED BY tnk.tnk_to_ci_type.id;


--
-- Name: tnk_to_operation; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_to_operation (
    id bigint NOT NULL,
    tnk_id bigint,
    operation_id bigint,
    amount bigint,
    title text,
    sort_order bigint,
    is_active boolean DEFAULT true,
    result_desc text,
    source_desc text,
    assignee text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_to_operation OWNER TO postgres;

--
-- Name: TABLE tnk_to_operation; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_to_operation IS 'Связь ТНК с Операцией';


--
-- Name: tnk_to_operation_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_to_operation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_to_operation_id_seq OWNER TO postgres;

--
-- Name: tnk_to_operation_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_to_operation_id_seq OWNED BY tnk.tnk_to_operation.id;


--
-- Name: tnk_to_wg; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_to_wg (
    id bigint NOT NULL,
    tnk_id bigint,
    wg text,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_to_wg OWNER TO postgres;

--
-- Name: TABLE tnk_to_wg; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_to_wg IS 'Связь ТНК с Рабочими группами';


--
-- Name: tnk_to_wg_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_to_wg_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_to_wg_id_seq OWNER TO postgres;

--
-- Name: tnk_to_wg_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_to_wg_id_seq OWNED BY tnk.tnk_to_wg.id;


--
-- Name: attachment id; Type: DEFAULT; Schema: attach; Owner: postgres
--

ALTER TABLE ONLY attach.attachment ALTER COLUMN id SET DEFAULT nextval('attach.attachment_id_seq'::regclass);


--
-- Name: profile id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.profile ALTER COLUMN id SET DEFAULT nextval('auth.profile_id_seq'::regclass);


--
-- Name: requestmap id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.requestmap ALTER COLUMN id SET DEFAULT nextval('auth.requestmap_id_seq'::regclass);


--
-- Name: dict_item id; Type: DEFAULT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_item ALTER COLUMN id SET DEFAULT nextval('dict.dict_item_id_seq'::regclass);


--
-- Name: app_log id; Type: DEFAULT; Schema: log; Owner: postgres
--

ALTER TABLE ONLY log.app_log ALTER COLUMN id SET DEFAULT nextval('log.app_log_id_seq'::regclass);


--
-- Name: integration_log id; Type: DEFAULT; Schema: log; Owner: postgres
--

ALTER TABLE ONLY log.integration_log ALTER COLUMN id SET DEFAULT nextval('log.integration_log_id_seq'::regclass);


--
-- Name: approval_queue id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_queue ALTER COLUMN id SET DEFAULT nextval('tnk.approval_queue_id_seq'::regclass);


--
-- Name: approval_setup id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_setup ALTER COLUMN id SET DEFAULT nextval('tnk.approval_setup_id_seq'::regclass);


--
-- Name: ip_to_account id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_account ALTER COLUMN id SET DEFAULT nextval('tnk.ip_to_account_id_seq'::regclass);


--
-- Name: ip_to_load id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_load ALTER COLUMN id SET DEFAULT nextval('tnk.ip_to_load_id_seq'::regclass);


--
-- Name: operation id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.operation ALTER COLUMN id SET DEFAULT nextval('tnk.operation_id_seq'::regclass);


--
-- Name: process id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.process ALTER COLUMN id SET DEFAULT nextval('tnk.process_id_seq'::regclass);


--
-- Name: profile_to_subprocess id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess ALTER COLUMN id SET DEFAULT nextval('tnk.profile_to_subprocess_id_seq'::regclass);


--
-- Name: protocol id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.protocol ALTER COLUMN id SET DEFAULT nextval('tnk.protocol_id_seq'::regclass);


--
-- Name: subprocess id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.subprocess ALTER COLUMN id SET DEFAULT nextval('tnk.subprocess_id_seq'::regclass);


--
-- Name: tnk id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_id_seq'::regclass);


--
-- Name: tnk_import_progress id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_import_progress ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_import_progress_id_seq'::regclass);


--
-- Name: tnk_to_ci id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_to_ci_id_seq'::regclass);


--
-- Name: tnk_to_ci_type id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci_type ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_to_ci_type_id_seq'::regclass);


--
-- Name: tnk_to_operation id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_operation ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_to_operation_id_seq'::regclass);


--
-- Name: tnk_to_wg id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_wg ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_to_wg_id_seq'::regclass);


--
-- Data for Name: attachment; Type: TABLE DATA; Schema: attach; Owner: postgres
--

COPY attach.attachment (id, file_data, file_size, md5, file_name, description, mimetype, date_created, last_updated_by) FROM stdin;
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.account (id, nickname, username, is_active, email, phone, password, profile_id, is_not_personal, date_created, label, last_updated, last_updated_by) FROM stdin;
14b21ff1-a65d-11ec-80da-6d362146cff3	Создатель ТНК	tnkc	t	\N	\N	$2a$06$PdIDqgcCR.6HXf24.WHoX.pWm/b2e7/OruPBgulF9DiVz7wYKlcVW	2	\N	2022-03-18 01:45:27.576985	\N	2022-03-18 01:45:27.576985	\N
14b21ff0-a65d-11ec-80da-6d362146cff3	Администратор	admin	t	\N	\N	$2a$06$IK2hD6tEQcRDJkuKMeE7KetWg/Omu5p5RkYGYpRHYrQeY9UV2kuau	1	f	2022-03-18 01:45:27.546313	\N	2022-03-18 08:46:45.239	14b21ff0-a65d-11ec-80da-6d362146cff3
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.profile (id, title, is_active, is_tnk_type_enabled, date_created, last_updated, last_updated_by) FROM stdin;
1	Администратор	t	t	2022-03-18 01:45:27.484115	2022-03-18 01:45:27.484115	\N
2	Создатель ТНК	t	t	2022-03-18 01:45:27.515423	2022-03-18 01:45:27.515423	\N
\.


--
-- Data for Name: requestmap; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.requestmap (id, controller, action, role_id, model, date_created, label, last_updated, last_updated_by) FROM stdin;
1	/dict	\N	\N	\N	2022-03-18 01:45:28.114766	\N	2022-03-18 01:45:28.114766	\N
2	/dictItem	\N	\N	\N	2022-03-18 01:45:28.13178	\N	2022-03-18 01:45:28.13178	\N
3	/attach	\N	\N	\N	2022-03-18 01:45:28.144455	\N	2022-03-18 01:45:28.144455	\N
4	/account	\N	\N	\N	2022-03-18 01:45:28.176456	\N	2022-03-18 01:45:28.176456	\N
5	/process	\N	\N	\N	2022-03-18 01:45:28.206788	\N	2022-03-18 01:45:28.206788	\N
6	/subprocess	\N	\N	\N	2022-03-18 01:45:28.237495	\N	2022-03-18 01:45:28.237495	\N
7	/operation	\N	\N	\N	2022-03-18 01:45:28.270215	\N	2022-03-18 01:45:28.270215	\N
8	/tnk	\N	\N	\N	2022-03-18 01:45:28.301528	\N	2022-03-18 01:45:28.301528	\N
9	/aih	\N	\N	\N	2022-03-18 01:45:28.33231	\N	2022-03-18 01:45:28.33231	\N
10	/tnk-to-ci	\N	\N	\N	2022-03-18 01:45:28.363303	\N	2022-03-18 01:45:28.363303	\N
11	/tnk-to-ci-type	\N	\N	\N	2022-03-18 01:45:28.395069	\N	2022-03-18 01:45:28.395069	\N
12	/tnk-to-oper	\N	\N	\N	2022-03-18 01:45:28.411658	\N	2022-03-18 01:45:28.411658	\N
13	/tnk-to-wg	\N	\N	\N	2022-03-18 01:45:28.441198	\N	2022-03-18 01:45:28.441198	\N
14	/prof-to-subp	\N	\N	\N	2022-03-18 01:45:28.472317	\N	2022-03-18 01:45:28.472317	\N
15	/profile	\N	1	\N	2022-03-18 01:45:28.504225	\N	2022-03-18 01:45:28.504225	\N
16	/tnk-upload	\N	1	\N	2022-03-18 01:45:28.521714	\N	2022-03-18 01:45:28.521714	\N
17	/tnk-export	\N	\N	\N	2022-03-18 01:45:28.55051	\N	2022-03-18 01:45:28.55051	\N
18	/protocol	\N	\N	\N	2022-03-18 01:45:28.581601	\N	2022-03-18 01:45:28.581601	\N
19	/approval-setup	\N	\N	\N	2022-03-18 01:45:28.611694	\N	2022-03-18 01:45:28.611694	\N
20	/approval-queue	\N	\N	\N	2022-03-18 01:45:28.643068	\N	2022-03-18 01:45:28.643068	\N
21	/ip-account	\N	\N	\N	2022-03-18 01:45:28.674187	\N	2022-03-18 01:45:28.674187	\N
22	/ip-load	\N	1	\N	2022-03-18 01:45:28.705424	\N	2022-03-18 01:45:28.705424	\N
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.role (id, title, is_active, date_created, last_updated, last_updated_by) FROM stdin;
1	Администратор	t	2022-03-18 01:45:27.608054	2022-03-18 01:45:27.608054	\N
2	Создатель ТНК	t	2022-03-18 01:45:27.640016	2022-03-18 01:45:27.640016	\N
4	Согласующий	t	2022-03-18 01:45:27.67065	2022-03-18 01:45:27.67065	\N
\.


--
-- Data for Name: role_account; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.role_account (role_id, account_id, date_created) FROM stdin;
1	14b21ff0-a65d-11ec-80da-6d362146cff3	2022-03-18 01:45:27.701891
2	14b21ff1-a65d-11ec-80da-6d362146cff3	2022-03-18 01:45:27.732078
2	14b21ff0-a65d-11ec-80da-6d362146cff3	2022-03-18 01:46:45.269782
\.


--
-- Data for Name: token; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.token (id, account_id, ip, token_ext, date_created, last_updated, date_created_ext) FROM stdin;
b0695d60-ab3e-11ec-bf44-b345ce3fc097	14b21ff0-a65d-11ec-80da-6d362146cff3	::1	123	2022-03-24 13:50:27.766	2022-03-24 14:10:04.19	2022-03-24 06:50:27.816093
\.


--
-- Data for Name: dict_item; Type: TABLE DATA; Schema: dict; Owner: postgres
--

COPY dict.dict_item (id, version, code, title, description, is_active, sort_order, dict_type_id, parent_id, add_info, date_created, last_updated, last_updated_by) FROM stdin;
1	0	\N	сотрудник	сотрудник	t	10	20	\N	\N	2022-03-18 01:45:27.903679	2022-03-18 01:45:27.903679	\N
2	0	\N	робот	робот	t	20	20	\N	\N	2022-03-18 01:45:27.941446	2022-03-18 01:45:27.941446	\N
3	0	\N	чат-бот	чат-бот	t	30	20	\N	\N	2022-03-18 01:45:27.957836	2022-03-18 01:45:27.957836	\N
4	0	\N	общий	общий	t	10	30	\N	\N	2022-03-18 01:45:27.991663	2022-03-18 01:45:27.991663	\N
5	0	\N	детализация до функции	детализация до функции	t	20	30	\N	\N	2022-03-18 01:45:28.020133	2022-03-18 01:45:28.020133	\N
6	0	\N	детализация до ситуации	детализация до ситуации	t	30	30	\N	\N	2022-03-18 01:45:28.051723	2022-03-18 01:45:28.051723	\N
7	0	\N	Утверждена ЦОТЭН	Утверждена ЦОТЭН	t	10	50	\N	\N	2022-03-18 01:45:28.082803	2022-03-18 01:45:28.082803	\N
\.


--
-- Data for Name: dict_type; Type: TABLE DATA; Schema: dict; Owner: postgres
--

COPY dict.dict_type (id, version, title, description, is_active, is_editable, date_created, sort_order, last_updated, last_updated_by) FROM stdin;
20	0	Исполнитель операции	Исполнитель операции	t	t	2022-03-18 01:45:27.794718	1	2022-03-18 01:45:27.794718	\N
30	0	Вид ТНК	Вид ТНК	t	t	2022-03-18 01:45:27.826054	1	2022-03-18 01:45:27.826054	\N
40	0	Единица измерения операции	Единица измерения операции	t	t	2022-03-18 01:45:27.840557	1	2022-03-18 01:45:27.840557	\N
50	0	Источник операции	Источник операции	t	t	2022-03-18 01:45:27.871756	1	2022-03-18 01:45:27.871756	\N
\.


--
-- Data for Name: app_log; Type: TABLE DATA; Schema: log; Owner: postgres
--

COPY log.app_log (id, app_name, app_version, log_level, user_id, description, date_created) FROM stdin;
\.


--
-- Data for Name: integration_log; Type: TABLE DATA; Schema: log; Owner: postgres
--

COPY log.integration_log (id, integration_response, requers_from_date, request_offset, date_created) FROM stdin;
\.


--
-- Data for Name: approval_queue; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.approval_queue (id, tnk_id, subproc_id, is_approved, description, group_num, date_created, user_ip, last_updated_by) FROM stdin;
\.


--
-- Data for Name: approval_setup; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.approval_setup (id, subproc_id, sort_order, user_id, is_active, description, group_num, date_created, last_updated, last_updated_by) FROM stdin;
\.


--
-- Data for Name: ip_to_account; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.ip_to_account (id, ip, username, account_id, date_created, last_updated, last_updated_by) FROM stdin;
\.


--
-- Data for Name: ip_to_load; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.ip_to_load (id, ip, description, date_created) FROM stdin;
\.


--
-- Data for Name: operation; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.operation (id, title, duration, is_active, unit_id, source_id, doc_num, date_created, last_updated, last_updated_by) FROM stdin;
\.


--
-- Data for Name: process; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.process (id, title, code, is_active, date_created, last_updated, last_updated_by) FROM stdin;
1	Процесс 1	1	t	2022-03-18 08:48:11.068	2022-03-18 08:48:11.068	14b21ff0-a65d-11ec-80da-6d362146cff3
\.


--
-- Data for Name: profile_to_subprocess; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.profile_to_subprocess (id, profile_id, subprocess_id, is_active, date_created, last_updated, last_updated_by) FROM stdin;
1	1	1	t	2022-03-18 01:59:51.960152	2022-03-18 01:59:51.960152	\N
\.


--
-- Data for Name: protocol; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.protocol (id, object_id, object_type, description, date_created, last_updated, last_updated_by, user_ip) FROM stdin;
\.


--
-- Data for Name: protocol_type; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.protocol_type (id, title, date_created) FROM stdin;
1	ТНК	2022-03-18 01:45:27.763263
\.


--
-- Data for Name: subprocess; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.subprocess (id, title, code, espp_obj, is_active, process_id, date_created, last_updated, last_updated_by) FROM stdin;
1	Подпроцесс 1	1	Управление запросами	t	1	2022-03-18 08:48:32.255	2022-03-18 08:48:32.255	14b21ff0-a65d-11ec-80da-6d362146cff3
\.


--
-- Data for Name: tnk; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk (id, title, is_active, is_fixed, parent_id, is_group, child_sort_order, status_id, subprocess_id, tnk_type, date_created, last_updated, last_updated_by, user_ip) FROM stdin;
1	ТНК 1	t	t	\N	\N	\N	10	1	общий	2022-03-18 08:48:51.761	2022-03-18 08:48:51.761	14b21ff0-a65d-11ec-80da-6d362146cff3	::1
2	ТНК 2	t	t	\N	\N	\N	10	1	\N	2022-03-18 08:50:21.799	2022-03-18 08:50:29.113	14b21ff0-a65d-11ec-80da-6d362146cff3	::1
3	ТНК 3	f	t	\N	\N	\N	10	1	общий	2022-03-18 08:50:40.856	2022-03-18 09:37:19.334	14b21ff0-a65d-11ec-80da-6d362146cff3	::1
4	1	t	t	\N	\N	\N	10	1	общий	2022-03-21 17:33:27.576	2022-03-21 17:33:27.576	14b21ff0-a65d-11ec-80da-6d362146cff3	::1
\.


--
-- Data for Name: tnk_import_progress; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_import_progress (id, total_val, current_val, error_descr, date_created, last_updated_by) FROM stdin;
\.


--
-- Data for Name: tnk_to_ci; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_to_ci (id, tnk_id, ci, is_active, date_created, last_updated, last_updated_by) FROM stdin;
\.


--
-- Data for Name: tnk_to_ci_type; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_to_ci_type (id, tnk_id, ci_type, is_active, date_created, last_updated, last_updated_by) FROM stdin;
\.


--
-- Data for Name: tnk_to_operation; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_to_operation (id, tnk_id, operation_id, amount, title, sort_order, is_active, result_desc, source_desc, assignee, date_created, last_updated, last_updated_by) FROM stdin;
\.


--
-- Data for Name: tnk_to_wg; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_to_wg (id, tnk_id, wg, is_active, date_created, last_updated, last_updated_by) FROM stdin;
\.


--
-- Name: attachment_id_seq; Type: SEQUENCE SET; Schema: attach; Owner: postgres
--

SELECT pg_catalog.setval('attach.attachment_id_seq', 1, false);


--
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.profile_id_seq', 1, false);


--
-- Name: requestmap_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.requestmap_id_seq', 22, true);


--
-- Name: dict_item_id_seq; Type: SEQUENCE SET; Schema: dict; Owner: postgres
--

SELECT pg_catalog.setval('dict.dict_item_id_seq', 7, true);


--
-- Name: app_log_id_seq; Type: SEQUENCE SET; Schema: log; Owner: postgres
--

SELECT pg_catalog.setval('log.app_log_id_seq', 1, false);


--
-- Name: integration_log_id_seq; Type: SEQUENCE SET; Schema: log; Owner: postgres
--

SELECT pg_catalog.setval('log.integration_log_id_seq', 1, false);


--
-- Name: approval_queue_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.approval_queue_id_seq', 1, false);


--
-- Name: approval_setup_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.approval_setup_id_seq', 1, false);


--
-- Name: ip_to_account_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.ip_to_account_id_seq', 1, false);


--
-- Name: ip_to_load_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.ip_to_load_id_seq', 1, false);


--
-- Name: operation_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.operation_id_seq', 1, false);


--
-- Name: process_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.process_id_seq', 1, true);


--
-- Name: profile_to_subprocess_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.profile_to_subprocess_id_seq', 1, true);


--
-- Name: protocol_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.protocol_id_seq', 1, false);


--
-- Name: subprocess_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.subprocess_id_seq', 1, true);


--
-- Name: tnk_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_id_seq', 4, true);


--
-- Name: tnk_import_progress_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_import_progress_id_seq', 1, false);


--
-- Name: tnk_to_ci_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_to_ci_id_seq', 1, false);


--
-- Name: tnk_to_ci_type_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_to_ci_type_id_seq', 1, false);


--
-- Name: tnk_to_operation_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_to_operation_id_seq', 1, false);


--
-- Name: tnk_to_wg_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_to_wg_id_seq', 1, false);


--
-- Name: attachment attachment_pkey; Type: CONSTRAINT; Schema: attach; Owner: postgres
--

ALTER TABLE ONLY attach.attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (id);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: requestmap requestmap_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.requestmap
    ADD CONSTRAINT requestmap_pkey PRIMARY KEY (id);


--
-- Name: role_account role_account_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role_account
    ADD CONSTRAINT role_account_pkey PRIMARY KEY (role_id, account_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: token token_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


--
-- Name: account uk_account_username; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.account
    ADD CONSTRAINT uk_account_username UNIQUE (username);


--
-- Name: profile uk_profile_title; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.profile
    ADD CONSTRAINT uk_profile_title UNIQUE (title);


--
-- Name: role uk_role_title; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role
    ADD CONSTRAINT uk_role_title UNIQUE (title);


--
-- Name: dict_item dict_item_pkey; Type: CONSTRAINT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_item
    ADD CONSTRAINT dict_item_pkey PRIMARY KEY (id);


--
-- Name: dict_type dict_type_pkey; Type: CONSTRAINT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_type
    ADD CONSTRAINT dict_type_pkey PRIMARY KEY (id);


--
-- Name: app_log app_log_pkey; Type: CONSTRAINT; Schema: log; Owner: postgres
--

ALTER TABLE ONLY log.app_log
    ADD CONSTRAINT app_log_pkey PRIMARY KEY (id);


--
-- Name: integration_log integration_log_pkey; Type: CONSTRAINT; Schema: log; Owner: postgres
--

ALTER TABLE ONLY log.integration_log
    ADD CONSTRAINT integration_log_pkey PRIMARY KEY (id);


--
-- Name: approval_queue approval_queue_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_queue
    ADD CONSTRAINT approval_queue_pkey PRIMARY KEY (id);


--
-- Name: approval_setup approval_setup_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_setup
    ADD CONSTRAINT approval_setup_pkey PRIMARY KEY (id);


--
-- Name: ip_to_account ip_to_account_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_account
    ADD CONSTRAINT ip_to_account_pkey PRIMARY KEY (id);


--
-- Name: ip_to_load ip_to_load_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_load
    ADD CONSTRAINT ip_to_load_pkey PRIMARY KEY (id);


--
-- Name: operation operation_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.operation
    ADD CONSTRAINT operation_pkey PRIMARY KEY (id);


--
-- Name: process process_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.process
    ADD CONSTRAINT process_pkey PRIMARY KEY (id);


--
-- Name: profile_to_subprocess profile_to_subprocess_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess
    ADD CONSTRAINT profile_to_subprocess_pkey PRIMARY KEY (id);


--
-- Name: protocol protocol_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.protocol
    ADD CONSTRAINT protocol_pkey PRIMARY KEY (id);


--
-- Name: protocol_type protocol_type_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.protocol_type
    ADD CONSTRAINT protocol_type_pkey PRIMARY KEY (id);


--
-- Name: subprocess subprocess_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.subprocess
    ADD CONSTRAINT subprocess_pkey PRIMARY KEY (id);


--
-- Name: tnk_import_progress tnk_import_progress_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_import_progress
    ADD CONSTRAINT tnk_import_progress_pkey PRIMARY KEY (id);


--
-- Name: tnk tnk_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk
    ADD CONSTRAINT tnk_pkey PRIMARY KEY (id);


--
-- Name: tnk_to_ci tnk_to_ci_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci
    ADD CONSTRAINT tnk_to_ci_pkey PRIMARY KEY (id);


--
-- Name: tnk_to_ci_type tnk_to_ci_type_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci_type
    ADD CONSTRAINT tnk_to_ci_type_pkey PRIMARY KEY (id);


--
-- Name: tnk_to_operation tnk_to_operation_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_operation
    ADD CONSTRAINT tnk_to_operation_pkey PRIMARY KEY (id);


--
-- Name: tnk_to_wg tnk_to_wg_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_wg
    ADD CONSTRAINT tnk_to_wg_pkey PRIMARY KEY (id);


--
-- Name: ip_to_account uk_ip_to_account_account_id; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_account
    ADD CONSTRAINT uk_ip_to_account_account_id UNIQUE (account_id, ip);


--
-- Name: operation uk_operation_title; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.operation
    ADD CONSTRAINT uk_operation_title UNIQUE (title);


--
-- Name: process uk_process_title; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.process
    ADD CONSTRAINT uk_process_title UNIQUE (title);


--
-- Name: profile_to_subprocess uk_profile_to_subprocess_profile_id; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess
    ADD CONSTRAINT uk_profile_to_subprocess_profile_id UNIQUE (profile_id, subprocess_id);


--
-- Name: subprocess uk_subprocess_title; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.subprocess
    ADD CONSTRAINT uk_subprocess_title UNIQUE (title, process_id);


--
-- Name: tnk uk_tnk_title; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk
    ADD CONSTRAINT uk_tnk_title UNIQUE (title, subprocess_id);


--
-- Name: account fk_account__profile_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.account
    ADD CONSTRAINT fk_account__profile_id FOREIGN KEY (profile_id) REFERENCES auth.profile(id);


--
-- Name: requestmap fk_requestmap__role_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.requestmap
    ADD CONSTRAINT fk_requestmap__role_id FOREIGN KEY (role_id) REFERENCES auth.role(id);


--
-- Name: role_account fk_role_account__account_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role_account
    ADD CONSTRAINT fk_role_account__account_id FOREIGN KEY (account_id) REFERENCES auth.account(id);


--
-- Name: role_account fk_role_account__role_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role_account
    ADD CONSTRAINT fk_role_account__role_id FOREIGN KEY (role_id) REFERENCES auth.role(id);


--
-- Name: token fk_token__account_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.token
    ADD CONSTRAINT fk_token__account_id FOREIGN KEY (account_id) REFERENCES auth.account(id);


--
-- Name: dict_item fk_dict_item__dict_type_id; Type: FK CONSTRAINT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_item
    ADD CONSTRAINT fk_dict_item__dict_type_id FOREIGN KEY (dict_type_id) REFERENCES dict.dict_type(id);


--
-- Name: dict_item fk_dict_item__parent_id; Type: FK CONSTRAINT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_item
    ADD CONSTRAINT fk_dict_item__parent_id FOREIGN KEY (parent_id) REFERENCES dict.dict_item(id);


--
-- Name: approval_queue fk_approval_queue__subproc_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_queue
    ADD CONSTRAINT fk_approval_queue__subproc_id FOREIGN KEY (subproc_id) REFERENCES tnk.subprocess(id);


--
-- Name: approval_queue fk_approval_queue__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_queue
    ADD CONSTRAINT fk_approval_queue__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- Name: approval_setup fk_approval_setup__subproc_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_setup
    ADD CONSTRAINT fk_approval_setup__subproc_id FOREIGN KEY (subproc_id) REFERENCES tnk.subprocess(id);


--
-- Name: ip_to_account fk_ip_to_account__account_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_account
    ADD CONSTRAINT fk_ip_to_account__account_id FOREIGN KEY (account_id) REFERENCES auth.account(id);


--
-- Name: profile_to_subprocess fk_profile_to_subprocess__profile_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess
    ADD CONSTRAINT fk_profile_to_subprocess__profile_id FOREIGN KEY (profile_id) REFERENCES auth.profile(id);


--
-- Name: profile_to_subprocess fk_profile_to_subprocess__subprocess_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess
    ADD CONSTRAINT fk_profile_to_subprocess__subprocess_id FOREIGN KEY (subprocess_id) REFERENCES tnk.subprocess(id);


--
-- Name: protocol fk_protocol__object_type; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.protocol
    ADD CONSTRAINT fk_protocol__object_type FOREIGN KEY (object_type) REFERENCES tnk.protocol_type(id);


--
-- Name: subprocess fk_subprocess__process_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.subprocess
    ADD CONSTRAINT fk_subprocess__process_id FOREIGN KEY (process_id) REFERENCES tnk.process(id);


--
-- Name: tnk fk_tnk__subprocess_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk
    ADD CONSTRAINT fk_tnk__subprocess_id FOREIGN KEY (subprocess_id) REFERENCES tnk.subprocess(id);


--
-- Name: tnk_to_ci fk_tnk_to_ci__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci
    ADD CONSTRAINT fk_tnk_to_ci__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- Name: tnk_to_ci_type fk_tnk_to_ci_type__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci_type
    ADD CONSTRAINT fk_tnk_to_ci_type__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- Name: tnk_to_operation fk_tnk_to_operation__operation_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_operation
    ADD CONSTRAINT fk_tnk_to_operation__operation_id FOREIGN KEY (operation_id) REFERENCES tnk.operation(id);


--
-- Name: tnk_to_operation fk_tnk_to_operation__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_operation
    ADD CONSTRAINT fk_tnk_to_operation__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- Name: tnk_to_wg fk_tnk_to_wg__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_wg
    ADD CONSTRAINT fk_tnk_to_wg__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "tnk_app_next" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

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

--
-- Name: tnk_app_next; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE tnk_app_next WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE tnk_app_next OWNER TO postgres;

\connect tnk_app_next

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

--
-- Name: attach; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA attach;


ALTER SCHEMA attach OWNER TO postgres;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO postgres;

--
-- Name: dict; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA dict;


ALTER SCHEMA dict OWNER TO postgres;

--
-- Name: log; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA log;


ALTER SCHEMA log OWNER TO postgres;

--
-- Name: tnk; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA tnk;


ALTER SCHEMA tnk OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: attachment; Type: TABLE; Schema: attach; Owner: postgres
--

CREATE TABLE attach.attachment (
    id bigint NOT NULL,
    file_data bytea NOT NULL,
    file_size integer NOT NULL,
    md5 text,
    file_name text NOT NULL,
    description text,
    mimetype text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE attach.attachment OWNER TO postgres;

--
-- Name: TABLE attachment; Type: COMMENT; Schema: attach; Owner: postgres
--

COMMENT ON TABLE attach.attachment IS 'Вложение';


--
-- Name: attachment_id_seq; Type: SEQUENCE; Schema: attach; Owner: postgres
--

CREATE SEQUENCE attach.attachment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attach.attachment_id_seq OWNER TO postgres;

--
-- Name: attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: attach; Owner: postgres
--

ALTER SEQUENCE attach.attachment_id_seq OWNED BY attach.attachment.id;


--
-- Name: account; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.account (
    id uuid NOT NULL,
    nickname text NOT NULL,
    username text NOT NULL,
    is_active boolean DEFAULT true,
    email text,
    phone text,
    password text NOT NULL,
    profile_id bigint,
    is_not_personal boolean,
    date_created timestamp without time zone DEFAULT now(),
    label text,
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE auth.account OWNER TO postgres;

--
-- Name: TABLE account; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.account IS 'Аккаунт';


--
-- Name: profile; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.profile (
    id bigint NOT NULL,
    title text NOT NULL,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid,
    is_tnk_type_enabled boolean
);


ALTER TABLE auth.profile OWNER TO postgres;

--
-- Name: TABLE profile; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.profile IS 'Профиль';


--
-- Name: profile_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.profile_id_seq OWNER TO postgres;

--
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.profile_id_seq OWNED BY auth.profile.id;


--
-- Name: requestmap; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.requestmap (
    id bigint NOT NULL,
    controller text NOT NULL,
    action text,
    role_id bigint,
    model text,
    date_created timestamp without time zone DEFAULT now(),
    label text,
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE auth.requestmap OWNER TO postgres;

--
-- Name: TABLE requestmap; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.requestmap IS 'Кому куда можно';


--
-- Name: requestmap_id_seq; Type: SEQUENCE; Schema: auth; Owner: postgres
--

CREATE SEQUENCE auth.requestmap_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.requestmap_id_seq OWNER TO postgres;

--
-- Name: requestmap_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: postgres
--

ALTER SEQUENCE auth.requestmap_id_seq OWNED BY auth.requestmap.id;


--
-- Name: role; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.role (
    id integer NOT NULL,
    title text NOT NULL,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE auth.role OWNER TO postgres;

--
-- Name: TABLE role; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.role IS 'Роль';


--
-- Name: role_account; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.role_account (
    role_id bigint NOT NULL,
    account_id uuid NOT NULL,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE auth.role_account OWNER TO postgres;

--
-- Name: TABLE role_account; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.role_account IS 'Доступные Пользователю Роли';


--
-- Name: token; Type: TABLE; Schema: auth; Owner: postgres
--

CREATE TABLE auth.token (
    id uuid NOT NULL,
    account_id uuid,
    ip text,
    token_ext text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    date_created_ext timestamp without time zone DEFAULT now()
);


ALTER TABLE auth.token OWNER TO postgres;

--
-- Name: TABLE token; Type: COMMENT; Schema: auth; Owner: postgres
--

COMMENT ON TABLE auth.token IS 'Токен авторизации пользователя';


--
-- Name: dict_item; Type: TABLE; Schema: dict; Owner: postgres
--

CREATE TABLE dict.dict_item (
    id bigint NOT NULL,
    version bigint,
    code bigint,
    title text NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 1,
    dict_type_id bigint,
    parent_id bigint,
    add_info boolean,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE dict.dict_item OWNER TO postgres;

--
-- Name: TABLE dict_item; Type: COMMENT; Schema: dict; Owner: postgres
--

COMMENT ON TABLE dict.dict_item IS 'Справочник';


--
-- Name: dict_item_id_seq; Type: SEQUENCE; Schema: dict; Owner: postgres
--

CREATE SEQUENCE dict.dict_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dict.dict_item_id_seq OWNER TO postgres;

--
-- Name: dict_item_id_seq; Type: SEQUENCE OWNED BY; Schema: dict; Owner: postgres
--

ALTER SEQUENCE dict.dict_item_id_seq OWNED BY dict.dict_item.id;


--
-- Name: dict_type; Type: TABLE; Schema: dict; Owner: postgres
--

CREATE TABLE dict.dict_type (
    id integer NOT NULL,
    version bigint,
    title text NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    is_editable boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    sort_order integer DEFAULT 1,
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE dict.dict_type OWNER TO postgres;

--
-- Name: TABLE dict_type; Type: COMMENT; Schema: dict; Owner: postgres
--

COMMENT ON TABLE dict.dict_type IS 'Тип справочника';


--
-- Name: app_log; Type: TABLE; Schema: log; Owner: postgres
--

CREATE TABLE log.app_log (
    id bigint NOT NULL,
    app_name text,
    app_version text,
    log_level integer,
    user_id text,
    description text,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE log.app_log OWNER TO postgres;

--
-- Name: TABLE app_log; Type: COMMENT; Schema: log; Owner: postgres
--

COMMENT ON TABLE log.app_log IS 'Лог приложения';


--
-- Name: app_log_id_seq; Type: SEQUENCE; Schema: log; Owner: postgres
--

CREATE SEQUENCE log.app_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE log.app_log_id_seq OWNER TO postgres;

--
-- Name: app_log_id_seq; Type: SEQUENCE OWNED BY; Schema: log; Owner: postgres
--

ALTER SEQUENCE log.app_log_id_seq OWNED BY log.app_log.id;


--
-- Name: integration_log; Type: TABLE; Schema: log; Owner: postgres
--

CREATE TABLE log.integration_log (
    id bigint NOT NULL,
    integration_response text,
    requers_from_date text,
    request_offset text,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE log.integration_log OWNER TO postgres;

--
-- Name: TABLE integration_log; Type: COMMENT; Schema: log; Owner: postgres
--

COMMENT ON TABLE log.integration_log IS 'Логи интеграции';


--
-- Name: integration_log_id_seq; Type: SEQUENCE; Schema: log; Owner: postgres
--

CREATE SEQUENCE log.integration_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE log.integration_log_id_seq OWNER TO postgres;

--
-- Name: integration_log_id_seq; Type: SEQUENCE OWNED BY; Schema: log; Owner: postgres
--

ALTER SEQUENCE log.integration_log_id_seq OWNED BY log.integration_log.id;


--
-- Name: approval_queue; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.approval_queue (
    id bigint NOT NULL,
    tnk_id bigint,
    subproc_id bigint,
    is_approved boolean,
    description text,
    group_num bigint,
    date_created timestamp without time zone DEFAULT now(),
    user_ip text,
    last_updated_by uuid
);


ALTER TABLE tnk.approval_queue OWNER TO postgres;

--
-- Name: TABLE approval_queue; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.approval_queue IS 'Согласование';


--
-- Name: approval_queue_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.approval_queue_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.approval_queue_id_seq OWNER TO postgres;

--
-- Name: approval_queue_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.approval_queue_id_seq OWNED BY tnk.approval_queue.id;


--
-- Name: approval_setup; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.approval_setup (
    id bigint NOT NULL,
    subproc_id bigint,
    sort_order integer,
    user_id uuid,
    is_active boolean,
    description text,
    group_num bigint,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.approval_setup OWNER TO postgres;

--
-- Name: TABLE approval_setup; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.approval_setup IS 'Настройка согласования';


--
-- Name: approval_setup_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.approval_setup_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.approval_setup_id_seq OWNER TO postgres;

--
-- Name: approval_setup_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.approval_setup_id_seq OWNED BY tnk.approval_setup.id;


--
-- Name: ip_to_account; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.ip_to_account (
    id bigint NOT NULL,
    ip text,
    username text,
    account_id uuid,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.ip_to_account OWNER TO postgres;

--
-- Name: TABLE ip_to_account; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.ip_to_account IS 'Пользотель ip';


--
-- Name: ip_to_account_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.ip_to_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.ip_to_account_id_seq OWNER TO postgres;

--
-- Name: ip_to_account_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.ip_to_account_id_seq OWNED BY tnk.ip_to_account.id;


--
-- Name: ip_to_load; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.ip_to_load (
    id bigint NOT NULL,
    ip text,
    description text,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE tnk.ip_to_load OWNER TO postgres;

--
-- Name: TABLE ip_to_load; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.ip_to_load IS 'Доступ к загрузке файлов';


--
-- Name: ip_to_load_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.ip_to_load_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.ip_to_load_id_seq OWNER TO postgres;

--
-- Name: ip_to_load_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.ip_to_load_id_seq OWNED BY tnk.ip_to_load.id;


--
-- Name: operation; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.operation (
    id bigint NOT NULL,
    title text NOT NULL,
    duration bigint,
    is_active boolean DEFAULT true,
    unit_id bigint,
    source_id bigint,
    doc_num bigint,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.operation OWNER TO postgres;

--
-- Name: TABLE operation; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.operation IS 'Операция';


--
-- Name: operation_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.operation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.operation_id_seq OWNER TO postgres;

--
-- Name: operation_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.operation_id_seq OWNED BY tnk.operation.id;


--
-- Name: process; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.process (
    id bigint NOT NULL,
    title text NOT NULL,
    code text,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.process OWNER TO postgres;

--
-- Name: TABLE process; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.process IS 'Процесс';


--
-- Name: process_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.process_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.process_id_seq OWNER TO postgres;

--
-- Name: process_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.process_id_seq OWNED BY tnk.process.id;


--
-- Name: profile_to_subprocess; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.profile_to_subprocess (
    id bigint NOT NULL,
    profile_id bigint,
    subprocess_id bigint,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.profile_to_subprocess OWNER TO postgres;

--
-- Name: TABLE profile_to_subprocess; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.profile_to_subprocess IS 'Субпроцессы Профиля';


--
-- Name: profile_to_subprocess_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.profile_to_subprocess_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.profile_to_subprocess_id_seq OWNER TO postgres;

--
-- Name: profile_to_subprocess_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.profile_to_subprocess_id_seq OWNED BY tnk.profile_to_subprocess.id;


--
-- Name: protocol; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.protocol (
    id bigint NOT NULL,
    object_id bigint,
    object_type integer,
    description text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid,
    user_ip text
);


ALTER TABLE tnk.protocol OWNER TO postgres;

--
-- Name: TABLE protocol; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.protocol IS 'Протокол';


--
-- Name: protocol_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.protocol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.protocol_id_seq OWNER TO postgres;

--
-- Name: protocol_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.protocol_id_seq OWNED BY tnk.protocol.id;


--
-- Name: protocol_type; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.protocol_type (
    id integer NOT NULL,
    title text NOT NULL,
    date_created timestamp without time zone DEFAULT now()
);


ALTER TABLE tnk.protocol_type OWNER TO postgres;

--
-- Name: TABLE protocol_type; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.protocol_type IS 'Тип протокола';


--
-- Name: subprocess; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.subprocess (
    id bigint NOT NULL,
    title text NOT NULL,
    code text,
    espp_obj text,
    is_active boolean DEFAULT true,
    process_id bigint,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.subprocess OWNER TO postgres;

--
-- Name: TABLE subprocess; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.subprocess IS 'Подпроцесс';


--
-- Name: subprocess_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.subprocess_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.subprocess_id_seq OWNER TO postgres;

--
-- Name: subprocess_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.subprocess_id_seq OWNED BY tnk.subprocess.id;


--
-- Name: tnk; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk (
    id bigint NOT NULL,
    title text NOT NULL,
    is_active boolean DEFAULT true,
    is_fixed boolean DEFAULT true,
    parent_id bigint,
    is_group boolean,
    child_sort_order bigint,
    status_id bigint NOT NULL,
    subprocess_id bigint,
    tnk_type text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid,
    user_ip text
);


ALTER TABLE tnk.tnk OWNER TO postgres;

--
-- Name: TABLE tnk; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk IS 'ТНК';


--
-- Name: tnk_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_id_seq OWNER TO postgres;

--
-- Name: tnk_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_id_seq OWNED BY tnk.tnk.id;


--
-- Name: tnk_import_progress; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_import_progress (
    id bigint NOT NULL,
    total_val bigint,
    current_val bigint,
    error_descr text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_import_progress OWNER TO postgres;

--
-- Name: TABLE tnk_import_progress; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_import_progress IS 'Прогресс загрузки ТНК';


--
-- Name: tnk_import_progress_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_import_progress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_import_progress_id_seq OWNER TO postgres;

--
-- Name: tnk_import_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_import_progress_id_seq OWNED BY tnk.tnk_import_progress.id;


--
-- Name: tnk_to_ci; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_to_ci (
    id bigint NOT NULL,
    tnk_id bigint,
    ci text,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_to_ci OWNER TO postgres;

--
-- Name: TABLE tnk_to_ci; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_to_ci IS 'Связь ТНК с ЭК';


--
-- Name: tnk_to_ci_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_to_ci_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_to_ci_id_seq OWNER TO postgres;

--
-- Name: tnk_to_ci_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_to_ci_id_seq OWNED BY tnk.tnk_to_ci.id;


--
-- Name: tnk_to_ci_type; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_to_ci_type (
    id bigint NOT NULL,
    tnk_id bigint,
    ci_type text,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_to_ci_type OWNER TO postgres;

--
-- Name: TABLE tnk_to_ci_type; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_to_ci_type IS 'Связь ТНК с Типом ЭК';


--
-- Name: tnk_to_ci_type_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_to_ci_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_to_ci_type_id_seq OWNER TO postgres;

--
-- Name: tnk_to_ci_type_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_to_ci_type_id_seq OWNED BY tnk.tnk_to_ci_type.id;


--
-- Name: tnk_to_operation; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_to_operation (
    id bigint NOT NULL,
    tnk_id bigint,
    operation_id bigint,
    amount bigint,
    title text,
    sort_order bigint,
    is_active boolean DEFAULT true,
    result_desc text,
    source_desc text,
    assignee text,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_to_operation OWNER TO postgres;

--
-- Name: TABLE tnk_to_operation; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_to_operation IS 'Связь ТНК с Операцией';


--
-- Name: tnk_to_operation_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_to_operation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_to_operation_id_seq OWNER TO postgres;

--
-- Name: tnk_to_operation_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_to_operation_id_seq OWNED BY tnk.tnk_to_operation.id;


--
-- Name: tnk_to_wg; Type: TABLE; Schema: tnk; Owner: postgres
--

CREATE TABLE tnk.tnk_to_wg (
    id bigint NOT NULL,
    tnk_id bigint,
    wg text,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    last_updated timestamp without time zone DEFAULT now(),
    last_updated_by uuid
);


ALTER TABLE tnk.tnk_to_wg OWNER TO postgres;

--
-- Name: TABLE tnk_to_wg; Type: COMMENT; Schema: tnk; Owner: postgres
--

COMMENT ON TABLE tnk.tnk_to_wg IS 'Связь ТНК с Рабочими группами';


--
-- Name: tnk_to_wg_id_seq; Type: SEQUENCE; Schema: tnk; Owner: postgres
--

CREATE SEQUENCE tnk.tnk_to_wg_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tnk.tnk_to_wg_id_seq OWNER TO postgres;

--
-- Name: tnk_to_wg_id_seq; Type: SEQUENCE OWNED BY; Schema: tnk; Owner: postgres
--

ALTER SEQUENCE tnk.tnk_to_wg_id_seq OWNED BY tnk.tnk_to_wg.id;


--
-- Name: attachment id; Type: DEFAULT; Schema: attach; Owner: postgres
--

ALTER TABLE ONLY attach.attachment ALTER COLUMN id SET DEFAULT nextval('attach.attachment_id_seq'::regclass);


--
-- Name: profile id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.profile ALTER COLUMN id SET DEFAULT nextval('auth.profile_id_seq'::regclass);


--
-- Name: requestmap id; Type: DEFAULT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.requestmap ALTER COLUMN id SET DEFAULT nextval('auth.requestmap_id_seq'::regclass);


--
-- Name: dict_item id; Type: DEFAULT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_item ALTER COLUMN id SET DEFAULT nextval('dict.dict_item_id_seq'::regclass);


--
-- Name: app_log id; Type: DEFAULT; Schema: log; Owner: postgres
--

ALTER TABLE ONLY log.app_log ALTER COLUMN id SET DEFAULT nextval('log.app_log_id_seq'::regclass);


--
-- Name: integration_log id; Type: DEFAULT; Schema: log; Owner: postgres
--

ALTER TABLE ONLY log.integration_log ALTER COLUMN id SET DEFAULT nextval('log.integration_log_id_seq'::regclass);


--
-- Name: approval_queue id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_queue ALTER COLUMN id SET DEFAULT nextval('tnk.approval_queue_id_seq'::regclass);


--
-- Name: approval_setup id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_setup ALTER COLUMN id SET DEFAULT nextval('tnk.approval_setup_id_seq'::regclass);


--
-- Name: ip_to_account id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_account ALTER COLUMN id SET DEFAULT nextval('tnk.ip_to_account_id_seq'::regclass);


--
-- Name: ip_to_load id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_load ALTER COLUMN id SET DEFAULT nextval('tnk.ip_to_load_id_seq'::regclass);


--
-- Name: operation id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.operation ALTER COLUMN id SET DEFAULT nextval('tnk.operation_id_seq'::regclass);


--
-- Name: process id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.process ALTER COLUMN id SET DEFAULT nextval('tnk.process_id_seq'::regclass);


--
-- Name: profile_to_subprocess id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess ALTER COLUMN id SET DEFAULT nextval('tnk.profile_to_subprocess_id_seq'::regclass);


--
-- Name: protocol id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.protocol ALTER COLUMN id SET DEFAULT nextval('tnk.protocol_id_seq'::regclass);


--
-- Name: subprocess id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.subprocess ALTER COLUMN id SET DEFAULT nextval('tnk.subprocess_id_seq'::regclass);


--
-- Name: tnk id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_id_seq'::regclass);


--
-- Name: tnk_import_progress id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_import_progress ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_import_progress_id_seq'::regclass);


--
-- Name: tnk_to_ci id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_to_ci_id_seq'::regclass);


--
-- Name: tnk_to_ci_type id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci_type ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_to_ci_type_id_seq'::regclass);


--
-- Name: tnk_to_operation id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_operation ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_to_operation_id_seq'::regclass);


--
-- Name: tnk_to_wg id; Type: DEFAULT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_wg ALTER COLUMN id SET DEFAULT nextval('tnk.tnk_to_wg_id_seq'::regclass);


--
-- Data for Name: attachment; Type: TABLE DATA; Schema: attach; Owner: postgres
--

COPY attach.attachment (id, file_data, file_size, md5, file_name, description, mimetype, date_created, last_updated_by) FROM stdin;
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.account (id, nickname, username, is_active, email, phone, password, profile_id, is_not_personal, date_created, label, last_updated, last_updated_by) FROM stdin;
4c0ce621-ae3b-11ec-acf4-d14cf798f2e6	Создатель ТНК	tnkc	t	\N	\N	$2a$06$3nDkpGp2NVKb6V4.dhvI1ehbPOjttg1w77SlKkhmW9BAyKx4cFqfe	2	\N	2022-03-28 02:03:47.694829	\N	2022-03-28 02:03:47.694829	\N
4c0ce622-ae3b-11ec-acf4-d14cf798f2e6	Согласовывающий ТНК	tnka	t	\N	\N	$2a$06$LqfFCWoYmrh9P2WLUJ0nTuxpLX5LP8c7YaJ0MTSyou0WiH8ZAiZUK	3	\N	2022-03-28 02:03:47.70442	\N	2022-03-28 02:03:47.70442	\N
86f3ccd0-ae64-11ec-b376-676bd2ce9d5c	123	123	t	\N	\N	$2a$06$2WDI0.mPgYcGh0GCEr7ItOiraW42.cpNI5XKxqCriWjSFxITx9GTK	3	\N	2022-03-28 06:58:52.573	\N	2022-03-28 06:58:52.573	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	Администратор	admin	t	trykhramov@gmail.com	9230360517	$2a$06$Wm2qPoEKeD71ClKQSNPDdOAnpy3H6AvbTm58MsNF10KE.WB8BuyQS	1	\N	2022-03-28 02:03:47.684157	\N	2022-03-28 15:20:38.623	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
176050a0-afcc-11ec-b296-cf67c9492c6a	Test1	login	t	\N	\N	$2a$06$qGILtrREY1hSszAEyjyUIu6m7eBaByUAzMmiEPKW1RYLOKcqcwrVu	2	t	2022-03-30 01:52:44.202	\N	2022-03-30 01:52:44.202	d7cb85d0-af40-11ec-b96f-b9a1c45dfbc9
5d4867d0-0ad9-11ec-8f4b-298094cdfc92	Борознов согласование	boroznov2	t	null	null	$2a$06$GLH5zBFGMcvg4ZkN3XDXDOmhUj.Dmac6f/rKP.7PZzbbPPldWD5Fi	20	f	2021-09-01 04:02:03.085	\N	2021-10-20 08:46:54.631	\N
f392dcf0-0810-11ec-8f4b-298094cdfc92	ЦТС ИНФР Савельев Антон Анатольевич ИЖТ-ПП-ИНФР	rvc4_savelevaa	t	rvc4_savelevaa@grw.rzd	null	$2a$06$mzQpNYNQefWAjel7X.mgaOlu4YuzusjVvq3zoxSR/XSExeejFF8kG	21	f	2021-08-28 15:02:24.063	\N	2021-08-28 15:02:24.063	\N
31c2d1f0-082b-11ec-8f4b-298094cdfc92	ЦТС ИНФР Гольцева Светлана Дмитриевна ИЖТ-ЭКС-РЕМ	ivc_goltsevasd	t	ivc_goltsevasd@grw.rzd	null	$2a$06$2jDIyM0RdiXXBiujaIaixe39gmhXce7n7ljzHoHJF3Gz3/ypu1nIi	30	f	2021-08-28 18:10:15.311	\N	2021-08-28 18:10:15.311	\N
881dc7c0-0a2a-11ec-8f4b-298094cdfc92	ЦТС ГКР Петрова Марина Николаевна ГКР-ОПД-АДМИН	ivcprg-Petrova	t	null	null	$2a$06$340NCJd/Tq3GRnkVI10JQeYPqLoXjX1907JBhyebuy061HJLS02mq	13	f	2021-08-31 07:10:33.02	\N	2021-08-31 07:10:33.02	\N
144167e0-081c-11ec-8f4b-298094cdfc92	ЦТС ИНФР Нестеркова Дарья Михайловна ИЖТ-АНАЛИТИКИ	ASUI_NesterkovaDM	t	ASUI_NesterkovaDM@msk.rzd	null	$2a$06$heFvSY/5lvJQHR9J1aT3UO3buqAduptmS6KOkJ5D47qetuCqSIKl6	39	f	2021-08-28 16:22:03.358	\N	2021-08-28 16:22:03.358	\N
04adb0b0-0815-11ec-8f4b-298094cdfc92	ЦТС ИНФР Братанова Марина Сергеевна ИЖТ-ПП-АДМИН	rivc2_bratanovams	t	rivc2_bratanovams@msk.rzd	null	$2a$06$Ryb0COgWjasHMC1RXQYvXeLsj841hyQJz/4.VB6hfTAncqgd9gFPa	6	f	2021-08-28 15:31:30.747	\N	2021-08-28 15:31:30.747	\N
501853b0-0820-11ec-8f4b-298094cdfc92	ЦТС ИНФР  Лебедева Вера Сергеевна ИЖТ-ПП-Ш	rvc8_lebedevavs	t	rvc8_lebedevavs@orw.rzd	null	$2a$06$buPaH/t5Me.d01XvvgYvVOFBrHlCdwQnilxCa2RWzqt4iCAWGV2a2	21	f	2021-08-28 16:52:21.739	\N	2021-08-28 16:52:21.739	\N
30774350-0824-11ec-8f4b-298094cdfc92	ЦТС ИНФР Тариба Людмила Николаевна ИЖТ-ЭКС-В	nivc-TaribaLN	t	nivc-TaribaLN@wsr.rzd	null	$2a$06$ph8mEJ5M7.duKJo0xWaOieUSF9X3BGwsn9ihwJuAn/V4Ekp8/SOta	30	f	2021-08-28 17:20:06.661	\N	2021-08-28 17:20:06.661	\N
c2135b50-0a2c-11ec-8f4b-298094cdfc92	ЦТС ГКР Шувалова-Козлова Татьяна Васильевна ГКР-ОПД-ПП-НАКЛАДНАЯ	ivc-ShuvalovaTV	t	null	null	$2a$06$epyC72znLIleTDKMKo6yl.n9wby1KFHWg4gTaEFI9ut0Byixu4Cam	18	f	2021-08-31 07:26:29.253	\N	2021-08-31 07:26:29.253	\N
d7cee480-0a29-11ec-8f4b-298094cdfc92	ЦТС ГКР Ярцев Вячеслав Иванович ГКР-ИНФОРМ-ЭКС	VYarcev	t	null	null	$2a$06$ZLdjog5JkLh16Y2uPtU1SOTTQWo9q5UqzMqBGZiWj69U5zsy3ab.C	27	f	2021-08-31 07:05:37.224	\N	2021-08-31 07:05:37.224	\N
ee6f8570-0a45-11ec-8f4b-298094cdfc92	ЦТС ОКС Ширяева Римма Витальевна Руководитель УРГ Финансы 	ivc_ShiryaevaRV	t	ivc_ShiryaevaRV@orw.rzd 	null	$2a$06$bz9EM0PbmTyMBnogcfmaeull.PzAVbro3Hv3P1/jbfZ.5dHOAg/cy	23	f	2021-08-31 10:26:41.095	\N	2021-08-31 11:29:34.958	\N
f131edb0-0a2d-11ec-8f4b-298094cdfc92	ЦТС ГКР Назарычева Татьяна Александровна ГКР-ОПД-ЭКС	ivc-Nazarycheva	t	null	null	$2a$06$M/UAT9Bs5MdbFDTuuF8SIO5a9D3F9HETIHJxOJoIHl3MHgm9PoTT.	27	f	2021-08-31 07:34:57.803	\N	2021-08-31 07:36:16.459	\N
369da4b0-0728-11ec-a18f-1fd6abd90502	ЦТС ОКС Гаренских Наталия Сергеевна Руководитель УРГ ЕАСД	GarenskikhNS	t	GarenskikhNS@svrw.rzd	null	$2a$06$pPl5h75qrBfguExwCx5piew7PxCzofc9aH4lRcOiux/d.KPIkD9tS	23	f	2021-08-27 11:16:23.803	\N	2021-08-31 11:15:17.879	\N
0d5bdae0-0a39-11ec-8f4b-298094cdfc92	ЦТС ОКС Авдеева Юлия Вадимовна ответственный за создание ТНК ЕРП-ФР-ЭКС-УДП	avdeeva	t	avdeeva@nrr.rzd 	null	$2a$06$2oPFUCSadwUgPtdh2Ns0JO/H2GWEpxbCAtPclZGW7reW2hSZ9/5VS	23	f	2021-08-31 08:54:29.518	\N	2021-08-31 11:10:26.776	\N
89b63250-0a3b-11ec-8f4b-298094cdfc92	ЦТС ОКС Гончарова Наталия Михайловна Руководитель первой линии ЛОГИСТИКА	vc_goncharovanm	t	ivc_goncharovanm@pvrr.rzd	null	$2a$06$RUpD9UxGxv1970JZIn2m1eHnYB9sQNY7RxoghdQySG8a3R7lWul7C	23	f	2021-08-31 09:12:17.141	\N	2021-08-31 11:15:39.662	\N
f38da510-0a3a-11ec-8f4b-298094cdfc92	ЦТС ОКС Колесникова Ирина Александровна Руководитель УРГ ЛОГИСТИКА	ivc_KolesnikovaIA	t	ivc_KolesnikovaIA@kbsh.rzd	null	$2a$06$ZaNUm.WXeJ.sp/7BfqwYbufZdzese/sJf/zHShhv9az58ebkakwqW	23	f	2021-08-31 09:08:05.217	\N	2021-08-31 11:17:13.185	\N
70bf58a0-0a5c-11ec-8f4b-298094cdfc92	ЦТС ОКС Дуюнова Наталия Ивановна ответственный за создание ТНК ПП-НОРМ	nduyunova	t	nduyunova@skzd.rzd	null	$2a$06$3PMAQUSley0nBij6kAc09Om.uaxkLi9criLIEFEdGhKTVwkJwgvf.	23	f	2021-08-31 13:07:48.65	\N	2021-08-31 13:07:54.562	\N
bdf3b130-0cae-11ec-a4a2-a96899551b41	ЦТС УПП Жукова Вера Валентиновна УПП-ГИД-ПП-ЗАПАД	rvc3-zhukovavv	t	rvc3-zhukovavv	null	$2a$06$RxWj/1KhH9j95yQL85V0hO9KMQ0B/7gatD/2Yu.FRjsD3X8UprwkW	20	f	2021-09-03 12:01:59.235	\N	2021-10-06 07:06:44.67	\N
d190fa00-0a55-11ec-8f4b-298094cdfc92	ЦТС ОКС Втюрина Галина Валентиновна Создатель ТНК региональный руководитель УРГ "Кадры"	galina	t	galina@krw.rzd	IP (0990) 79545, +7(391)248-95-45, +7(39151) 6-44-96	$2a$06$oyLWXuS3KIxeKH9DG2g4ROqG2er.5z1iZASSxz3soto7thAqWiw96	23	f	2021-08-31 12:20:24.608	\N	2021-09-01 01:29:28.997	\N
7ef8a420-0b0c-11ec-a4a2-a96899551b41	ЦТС ОКС Заусаева Ирина Сергеевна УРГ Охрана труда Создатель ТНК	ivc_zausaevais	t	ivc_zausaevais@esrr.rzd	null	$2a$06$0Zc9zwNaRVidSDAzR7m3Re3BnZwqZtMrSGeoLzWgnnMGCjczxxNnu	23	f	2021-09-01 10:08:03.938	\N	2021-09-01 10:08:06.32	\N
3f940b70-0b0d-11ec-a4a2-a96899551b41	ЦТС ОКС Кулешова Оксана Владимировна УРГ Охрана труда Создатель ТНК	nivc-KuleshovaOV	t	nivc-KuleshovaOV@wsr.rzd	null	$2a$06$nenWZTz63XW4ci/IL3Y7G.6of8IVpLhrjdLWoAXcAJBJKlVcQMQxS	23	f	2021-09-01 10:13:27.079	\N	2021-09-01 10:13:29.652	\N
682604c0-0721-11ec-a18f-1fd6abd90502	ЦТС ПАСС Еремина Ирина Леонидовна Руководитель ПАСС-НСИ	IEremina	t	null	null	$2a$06$1DqN9uRff6HpPWni3B0eluTxOmn8xv/3.SqoXdGdtgbAuA0e9FIKa	22	f	2021-08-27 10:27:40.428	\N	2021-09-01 13:09:45.352	\N
3c17bae0-0b9a-11ec-a4a2-a96899551b41	ЦТС УПП Киселева Анна Александровна  УПП-ГИД-АДМИН	hq-kiselevaaa	t	hq-kiselevaaa@surw.rzd	null	$2a$06$UOpEVG4zrtBmyEBzO.f4fehXFTtuSsM.tX7iY0gXwPgM2yjIzY8.G	3	f	2021-09-02 03:02:40.271	\N	2021-09-02 03:02:40.271	\N
3092c620-081a-11ec-8f4b-298094cdfc92	ЦТС ИНФР Третьякова Ольга Михайловна БД-ЭКС-ИНФР	triv_tretyakovaom	t	triv_tretyakovaom@orw.rzd	null	$2a$06$RikMi98b0RGZKybBArZvFun.g5LVp0E6yLnDWneb/WCnDfOvuN/RO	30	f	2021-08-28 16:08:31.874	\N	2021-08-28 16:08:31.874	\N
e97a3fc0-0aee-11ec-8f4b-298094cdfc92	ЦТС ОКС Цацулина Анастасия Сергеевна УРГ Охрана труда Согласующий, Создатель ТНК	CaculinaAS	t	CaculinaAS@msk.rzd	null	$2a$06$yvKo69VJ/kgkobKc81fAQuEbJLYrouYZ0LA/SPJE5hDl.iYBd3gcG	32	f	2021-09-01 06:36:17.724	\N	2021-09-01 06:36:21.061	\N
304a87a0-081c-11ec-8f4b-298094cdfc92	ЦТС ИНФР Россиева Елена Сергеевна ИЖТ-АНАЛИТИКИ	rossievaes	t	rossievaes@krw.rzd	null	$2a$06$WVNU1CbZsBYDSbYg7RGIhuPtKln2YxWCKuaST.mUpdtCFhYes117q	39	f	2021-08-28 16:22:50.394	\N	2021-08-28 16:22:50.394	\N
6e4516c0-0820-11ec-8f4b-298094cdfc92	ЦТС ИНФР Гусева Марина Владимировна ИЖТ-ПП-РЕМ	icc-guseva	t	icc-guseva@surw.rzd	null	$2a$06$FecZGG/J.pm8Tq.4x1eLiu1GVarw68f9fVDKOoDhH.DKdGstYvJY.	21	f	2021-08-28 16:53:12.364	\N	2021-08-28 16:53:12.364	\N
464b7d40-0824-11ec-8f4b-298094cdfc92	ЦТС ИНФР Федорова Надежда Михайловна ИЖТ-ЭКС-В	rivc2_fedorovanm	t	rivc2_fedorovanm@orw.rzd	null	$2a$06$1lid30seXH/YRGMdoYqlvuNdyeLYkXaKbE3fVKri9mukC1Ql0eV7W	30	f	2021-08-28 17:20:43.284	\N	2021-08-28 17:20:43.284	\N
4a5122d0-082b-11ec-8f4b-298094cdfc92	ЦТС ИНФР Петрунина Марина Александровна ИЖТ-ЭКС-РЕМ	ivc_petruninama	t	ivc_petruninama@grw.rzd	null	$2a$06$LRJrBtogyq/VQVmV4JzQreC8GYdfoPI2GJubydY3iFyTF/gCBZw8W	30	f	2021-08-28 18:10:56.509	\N	2021-08-28 18:10:56.509	\N
1aca5a60-0a3b-11ec-8f4b-298094cdfc92	ЦТС ГКР Шипилова Ольга Николаевна РУКОВОДИТЕЛЬ НАПРАВЛЕНИЯ ОПД	ivcvp-Shipilova	t	null	null	$2a$06$tkRZC2d6/PnO8myeKXPRauGdtnBqkJY9IgMGts.wJwLmG1xm5pK1G	50	f	2021-08-31 09:09:11.046	\N	2021-08-31 09:09:11.046	\N
390d52a0-0cae-11ec-a4a2-a96899551b41	ЦТС УПП Шляхова Наталья Анатольевна УПП-ГИД-ПП	brg-shlyahova	t	brg-shlyahova	null	$2a$06$jLOWBPzfwzDjDcPBOacC/ecdzfoSM0GKhhzJMieX27VwbOXq0TYVa	20	f	2021-09-03 11:58:16.266	\N	2021-09-03 11:58:16.266	\N
f00e58a0-0a56-11ec-8f4b-298094cdfc92	ЦТС ОКС Ершова Светлан Николаевна Зам. Руководителя УРГ Основные средства Согласование ЗАП ПП	IVCR-Ershova	t	IVCR-Ershova@kbsh.rzd	null	$2a$06$gskbElbEt8jtCoP4oseG8.jKH7ooZAwIgebwRi3Uie/sH2nDtmzES	23	f	2021-08-31 12:28:25.258	\N	2021-08-31 12:35:26.767	\N
c9d03eb0-0cb3-11ec-a4a2-a96899551b41	ЦТС УПП Журавлева Наталья Ивановна УПП-ГИД-ЭКС	nzhuravleva	f	nzhuravleva	null	$2a$06$YnR9TwPBmJN9brEhcbNbO.0ULgYIbrwyr1OaMI0bYuOG9pX8GR/x.	29	f	2021-09-03 12:38:06.619	\N	2021-09-03 14:23:34.677	\N
3fd31280-0a58-11ec-8f4b-298094cdfc92	ЦТС ОКС Титова Светлана Юрьевна Руководитель экспертной линии УРГ ОС 	STitova	t	STitova@serw.rzd	null	$2a$06$k6077CISw6XOAGdUwoUYDef/Q0GgW/R0B6SiLPTCRL2xGXrQDJHm2	23	f	2021-08-31 12:37:48.584	\N	2021-08-31 12:37:53.644	\N
aae7cd70-0b9a-11ec-a4a2-a96899551b41	ЦТС УПП Сизова Анна Евгеньевна УПП-ГИД-АДМИН	itru_anna	t	null	null	$2a$06$kMogPKnMMqkkDqSpNecVUeIak7nzPInV/tytbNIyA5QC.bevtwz5G	3	f	2021-09-02 03:05:46.183	\N	2021-09-02 03:07:56.171	\N
b3825b40-0e50-11ec-a4a2-a96899551b41	ЦТС УПП Гаранькова Наталья Викторовна УПП-СТ-ЦИТ-ЭКС-Д	IVC_GaranykovaNV	t	IVC_GaranykovaNV@dvgd.rzd	null	$2a$06$fbzOBn7MLJzzNgLImmy2gu5rqWpd99LubonjjSpn9Nli6Fk1Ayjrm	29	f	2021-09-05 13:53:51.348	\N	2021-09-05 13:53:51.348	\N
754141b0-0e56-11ec-a4a2-a96899551b41	ЦТС УПП Шахматов Алексей Владимирович УПП-ПЛАН-ЭКС	ivc_shahmatovav	t	ivc_shahmatovav@dvgd.rzd	null	$2a$06$YrmzCp/pnABwasJQGZITFe.cYPLXDHwW1tBI1mWQGCxzCuLCxpID2	29	f	2021-09-05 14:35:03.883	\N	2021-09-05 14:35:03.883	\N
2ee4dd70-0b9b-11ec-a4a2-a96899551b41	ЦТС УПП Ходкевич Юлия Геннадьевна УПП-ПЛАНИР-АДМИН	nivc-hodkevichyug	f	null	null	$2a$06$YwOUFgySvSWp3mehixPVuOqowyfy/K6XJgzBoQciIoNlLUDTjGvjS	3	f	2021-09-02 03:09:27.623	\N	2021-09-05 13:47:49.842	\N
44953400-081f-11ec-8f4b-298094cdfc92	ЦТС ИНФР Дегтярь Анастасия Васильевна ИЖТ-ПП-П	ivc_degtyara	t	ivc_degtyarav@dvgd.rzd	null	$2a$06$gJ3kE/zbEMuQy7kO.B5/f.KhJuQpKw3hcgk/oOhwvAqkhTgtl7UyC	21	f	2021-08-28 16:44:52.928	\N	2021-08-28 16:45:08.464	\N
98266360-0819-11ec-8f4b-298094cdfc92	ЦТС ИНФР Романкин Максим Викторович БД-ПП	ivc_romankinmv	t	ivc_romankinmv@esrr.rzd	null	$2a$06$ZpOli6w2vTus0w/MUd8rB.da53y1dM5vrsvPpUNipZUQdxAORygdS	21	f	2021-08-28 16:04:16.15	\N	2021-09-02 11:08:21.107	\N
b88b0a80-0818-11ec-8f4b-298094cdfc92	ЦТС ИНФР Раева Оксана Андреевна БД-ПП	raeva	t	raeva@nrr.rzd	null	$2a$06$jgB8/2hz83DdWs7b0EA3t.kLUieYknKPGNw2R.RcVHIL66QAN9yy6	21	f	2021-08-28 15:58:01	\N	2021-08-28 15:58:01	\N
8fbcf350-0a27-11ec-8f4b-298094cdfc92	ЦТС ГКР Кудрявцева Наталья Викторовна ГКР-АПР-ЭКС	rivc6_KudryavcevaNV	t	null	null	$2a$06$PDKsourQ.9bflji2bvVO8ujAuTLKDG7EVTzZB1pRrO7NXPRQiJ/6e	59	f	2021-08-31 06:49:17.317	\N	2021-08-31 09:02:46.076	\N
003734a0-0cb3-11ec-a4a2-a96899551b41	ЦТС УПП Салагаев Дмитрий Владимирович УПП-СТ-ТСТ-ЭКС-Д	ivc_salagaevdv	t	ivc_salagaevdv@pvrr.rzd	null	$2a$06$y9rFsK7iCg7QBwRl1hu.wOH0PFfKGUnDwtMKao11ZL9s.kEr75TH.	29	f	2021-09-03 12:32:28.394	\N	2021-09-03 12:32:28.394	\N
3d682140-0a3d-11ec-8f4b-298094cdfc92	ЦТС ОКС Корчуганова Наталья Викторовна Руководитель СМК ЛОГИСТИКА	IVC-KorchuganovaNV	t	IVC-KorchuganovaNV@kbsh.rzd	null	$2a$06$4bMJNcjVyzX7yJXHvnWVjurb7D9IO5EONeWzbBc63UzS6aAuPZPr2	23	f	2021-08-31 09:24:28.117	\N	2021-08-31 11:17:32.024	\N
90874740-0e50-11ec-a4a2-a96899551b41	ЦТС УПП Якименко Александр Петрович УПП-СТ-ЦИТ-ЭКС-Д	AYakimenko	t	AYakimenko@serw.rzd	null	$2a$06$8QRRH7UZykmD5f7nogSaJ.uFVncJUx29F2u5dO9tZMey0GJaCI6dq	29	f	2021-09-05 13:52:52.66	\N	2021-09-05 13:52:52.66	\N
96a35230-0a50-11ec-8f4b-298094cdfc92	ЦТС ОКС Бабина Наталья Александровна Создатель ТНК зам. руководителя УРГ "Кадры"	ivc_BabinaNA	t	ivc_BabinaNA@orw.rzd	null	$2a$06$lxjp6T8daVyjOw1tJ5jebOkPyQn56FHKJg0JVpsQ2AxSq2Gs.wO0q	23	f	2021-08-31 11:42:58.259	\N	2021-08-31 11:42:58.259	\N
9afb2b20-35b4-11ec-b323-f742fd893ea8	МОИСЕЕВА ОЛЬГА СЕРГЕЕВНА	olga1	f	null	null	$2a$06$PdIfi42qpN.ipsBbzxTN2u8rwTl5Z3GWgDeTwMvHmeZtKnuZQTdVa	23	f	2021-10-25 16:57:15.218	\N	2021-10-25 17:02:38.966	\N
0352de70-0a40-11ec-8f4b-298094cdfc92	ЦТС ГКР Серовитник Андрей Анатольевич РУКОВОДИТЕЛЬ НАПРАВЛЕНИЯ САО	Vctzs	t	null	null	$2a$06$riMMwdcMCgaWj4M8n.3zqOaOyKtVsle/iMN2iHU74V8rW1iPjJ1.W	50	f	2021-08-31 09:44:19.159	\N	2021-08-31 09:44:19.159	\N
19371ac0-0cad-11ec-a4a2-a96899551b41	ЦТС УПП Орлова Светлана Александровна	ivc_OrlovaSA	t	ivc_OrlovaSA@orw.rzd	null	$2a$06$HVsMxIL2aWo06DAXIHWqwOTs9GNriFhngpufikv2sPVA7Lhwlt3cS	20	f	2021-09-03 11:50:13.356	\N	2021-09-03 11:50:13.356	\N
8b4b4390-0e54-11ec-a4a2-a96899551b41	ЦТС УПП Гордиевская Галина Борисовна УПП-АИР-ЭКС	GBGordievskaya	t	GBGordievskaya@svrw.rzd	null	$2a$06$M0/gXcXPRoNQWsTjvWbjcuhTei.NLgTLpfYFmJ38ovGqy4JeiJfQm	29	f	2021-09-05 14:21:21.865	\N	2021-09-05 14:21:21.865	\N
7586e840-0a5b-11ec-8f4b-298094cdfc92	ЦТС ОКС Вашурина Юлия Владимировна ответственный за создание ТНК ПП-НОРМ	ivc_vashurinayuv	t	ivc_vashurinayuv@grw.rzd	null	$2a$06$s4wIIiSMcKhS8VDqP2e69uXHwZDb4V5WmwNWh7nsVaOogtboaYgBm	23	f	2021-08-31 13:00:47.172	\N	2021-08-31 13:01:28.139	\N
27cafde0-0ca3-11ec-a4a2-a96899551b41	ЦТС ГКР Аналитики - согласование внутри ЦТС	ANALIT_CTS_GKR	t	null	null	$2a$06$a.mDW2uTL62VjGRk.8zu2.eTMImQCfE.m5cY9xTpwJaWHTTS8e8km	36	f	2021-09-03 10:39:02.846	\N	2021-09-03 10:39:02.846	\N
adbf7450-0e54-11ec-a4a2-a96899551b41	ЦТС УПП Соловьева Мария Владимировна УПП-АИР-ЭКС	MSolovieva	t	MSolovieva@skzd.rzd	null	$2a$06$Ja9nDSWYdiFBzSAGKXx7g.VeLCn0T4OLrx9bpv.F5jkGy.fkgQtRm	29	f	2021-09-05 14:22:19.669	\N	2021-09-05 14:22:19.669	\N
8df4b240-0a2e-11ec-8f4b-298094cdfc92	ЦТС ГКР Гурова Екатерина Евгеньевна ГКР-ТО-АДМИН	ivcprg-Gurova	t	null	null	$2a$06$v.kFoNC54yG8EWvRGR4LOOXAGBzwrtYT5COiUk8F2sWhRNpGOEuZS	59	f	2021-08-31 07:39:20.804	\N	2021-08-31 09:03:15.131	\N
4ca8e910-0b9a-11ec-a4a2-a96899551b41	ЦТС УПП Ванина Анастасия Юрьевна УПП-ПЛАНИР-АДМИН	icc-nastyas	t	icc-nastyas@surw.rzd	null	$2a$06$Qy4kXF3A6k/prwIZiXPeVucGH23KYJSBbJcf/7LggJt0IM6wK4NpW	3	f	2021-09-02 03:03:08.065	\N	2021-09-02 03:04:27.85	\N
15564c90-0817-11ec-8f4b-298094cdfc92	ЦТС ИНФР Малова Татьяна Сергеевна ИЖТ-ПП-АДМИН	zlt-mts	t	rivc2_bratanovams@msk.rzd	null	$2a$06$iz6LfmkM9VSnvHneLcS6pOUM.WJdvwp1gTXNjO/.q8bUT3BN2hudq	6	f	2021-08-28 15:46:17.689	\N	2021-08-28 15:46:17.689	\N
6e5f3870-0c94-11ec-a4a2-a96899551b41	ЦТС ГКР Боева Мария Васильевна ГКР-РБТ-ПРОЕКТ	MVBoeva	t	null	null	$2a$06$Rk6xyWlCu5foxGO/JwcnUuQRLorrsIBTXgbTQOu1U4qE8slRyc0Yy	18	f	2021-09-03 08:53:38.807	\N	2021-09-03 08:53:38.807	\N
efc53270-0b9a-11ec-a4a2-a96899551b41	ЦТС УПП Дудникова Юлия Викторовна УПП-ПЛАНИР-АДМИН	hq-jul	t	null	null	$2a$06$ANOIV8DxiJr2Mkj0HxtLieQN44Ih0Esi0fUenj.AFwppkmBncTLkm	3	f	2021-09-02 03:07:41.719	\N	2021-09-02 03:07:41.719	\N
29d0c2e0-0817-11ec-8f4b-298094cdfc92	ЦТС ИНФР Суровушкина Евгения Анатольевна ИЖТ-ПП-АДМИН	ivc-surovushkinaea	t	ivc-surovushkinaea@kbsh.rzd	null	$2a$06$Z./Epg0maaMwYS1D0fVK9OuydXONXuYv6Jt07Lxyb2qBqm0Yl2Psy	6	f	2021-08-28 15:46:52.046	\N	2021-08-28 15:56:30.497	\N
6a009a70-0cae-11ec-a4a2-a96899551b41	ЦТС УПП Ванданова Надежда Сергеевна	ivc_vandanovans	t	ivc_vandanovans	null	$2a$06$SyD3n4MNYaow4zTEyahDrevu/FOS5tUIG3FIWR3YrdMZau55KOEGC	20	f	2021-09-03 11:59:38.391	\N	2021-09-03 11:59:49.191	\N
e37a5db0-0e51-11ec-a4a2-a96899551b41	ЦТС УПП Стиховнина Елена Сергеевна УПП-АИР-ЭКС	ivc_stihovninaes	t	ivc_stihovninaes@grw.rzd	null	$2a$06$udo6usg1uKIrzyHTy8SqYOLcKWf9kgn.AmzNVIkvguKS2AmUpmKX.	29	f	2021-09-05 14:02:21.323	\N	2021-09-05 14:02:56.453	\N
c9d22c00-359b-11ec-b323-f742fd893ea8	МОИСЕЕВА ОЛЬГА СЕРГЕЕВНА 	olga	t	null	null	$2a$06$5uIfar5ib0RBuawKSyS9euZmCgzArEfVmqaj9Uka08WmBpDrhqxJm	23	f	2021-10-25 13:59:36.384	\N	2021-10-25 17:04:31.739	\N
d4631ac0-0e50-11ec-a4a2-a96899551b41	ЦТС УПП Глушкова Анна Валерьевна УПП-ЦЖС-ЭКС	icc-glushkova	t	icc-glushkova@surw.rzd	null	$2a$06$TTZGdn9Qm46474PflWfho.4aZAeZGusneO4CqV8YZm//Xn5/JxYmW	29	f	2021-09-05 13:54:46.508	\N	2021-09-05 13:54:46.508	\N
4b89dd40-0c86-11ec-a4a2-a96899551b41	ЦТС ПАСС Гевлич Ульяна Владимировна ПП ПАСС-НСИ-ВОЛГА	IVCES-GevlichPP	t	null	null	$2a$06$KHMCXW3SStUTnleMft50qeQnX5lDKxEkqN/cYsZxJuWPOMFV.7Br6	22	f	2021-09-03 07:12:27.412	\N	2021-09-03 07:12:27.412	\N
be08c840-0bdc-11ec-a4a2-a96899551b41	ЦТС ИНФР Егорова Елена Александровна ИЖТ-ПП-РЕМ	ivc_egorovaea	t	ivc_egorovaea@pvrr.rzd	null	$2a$06$/hWbZ0PB9OeU8NgAu3g2hO1PYCSbzrNh94Z3kJzhmOvd.wgumzXDO	21	f	2021-09-02 10:58:45.06	\N	2021-09-02 11:08:59.11	\N
89452a70-0bcf-11ec-a4a2-a96899551b41	ЦТС ОКС Лапин Дмитрий Сергеевич УРГ БАЗИС	lapinds	t	lapinds@gvc.rzd	null	$2a$06$EY.051t1EsqOZbkOMIkyqex0YbXW9bnKHAHiGcoXsldUDlVGEwB7W	32	f	2021-09-02 09:24:13.079	\N	2021-09-02 09:24:18.654	\N
a50e8a90-0a39-11ec-8f4b-298094cdfc92	ЦТС ОКС  Бачаева Вера Александровна ответственный за создание ТНК ЕРП-ФР-ЭКС-УДП	ivc_bachaevava	t	ivc_bachaevava@grw.rzd	null	$2a$06$0dg9jwfZ6v1O9/hNoMTRO.K7iTdSIPE4TzMmxKge4/.o65M9XwVma	23	f	2021-08-31 08:58:44.025	\N	2021-08-31 11:14:50.689	\N
e83e30d0-0cb0-11ec-a4a2-a96899551b41	ЦТС УПП Катунина Марина Геннадьевна УПП-ПЛАНИР-ПП	ivc-KatuninaMG	t	 ivc-KatuninaMG@nrr.rzd	null	$2a$06$3m6TuCBOeWNQ73h55Lb45uQM3WX8bgGRH4hdVdIKGrKpK6dvEwY1a	20	f	2021-09-03 12:17:29.181	\N	2021-09-03 12:17:29.181	\N
488953c0-082e-11ec-8f4b-298094cdfc92	ЦТС ИНФР Пиковская Лея Олеговна ИЖТ-ЭКС-РЕМ	pikovskayalo	t	pikovskayalo@msk.rzd	null	$2a$06$hfNQX2Vab0e0heEBlxKea.l7MRyJRIMlO41amaG6SWOcB/Sn1SvR2	30	f	2021-08-28 18:32:22.012	\N	2021-08-28 18:32:22.012	\N
06f44820-0cb1-11ec-a4a2-a96899551b41	ЦТС УПП Погорелова Надежда Анатольевна УПП-СТ-ТСТ-ПП	nivc-PogorelovaNA	t	nivc-PogorelovaNA@wsr.rzd	null	$2a$06$/Mvvm3vyS78sIEvdw0AGOOBQG5BP8cGjol3JS1OzoZsyQymVW15fO	20	f	2021-09-03 12:18:20.706	\N	2021-09-03 12:18:20.706	\N
91eec1a0-081d-11ec-8f4b-298094cdfc92	ЦТС ИНФР Твердохлебова Анастасия Алексеевна ИЖТ-ПП-В	ivc_tverdokhlebovaaa	t	ivc_tverdokhlebovaaa@pvrr.rzd	null	$2a$06$lZjwX5uhv5BIim7gehkuCejHbcm1IPZDj9H9Tmbty2tpr2/aRF76m	21	f	2021-08-28 16:32:43.706	\N	2021-08-28 16:32:43.706	\N
e1148550-0af0-11ec-8f4b-298094cdfc92	ЦТС ОКС Юшко Виктория Валерьевна УРГ Охрана труда Создатель ТНК	RIVC4_YushkoVV2	t	RIVC4_YushkoVV2@msk.rzd	null	$2a$06$s.WIZdo5oQIl3PrlkM2Rz.8BOs..D3WSKDojvAVAi7sAvM3gwZN2S	23	f	2021-09-01 06:50:22.629	\N	2021-09-01 06:50:22.629	\N
0f92e360-0e50-11ec-a4a2-a96899551b41	ЦТС УПП Ворончихина Марина Викторовна УПП-СТ-ТСТ-ЭКС-Д	nivc-VoronchikhinaMV	t	nivc-VoronchikhinaMV@wsr.rzd	null	$2a$06$z/gQPcYoUy7O4nKBohA1LuZz1oFvYguZ094kw.puKXOtKoCNF2TVW	29	f	2021-09-05 13:49:16.31	\N	2021-09-05 13:49:16.31	\N
32d23c90-081f-11ec-8f4b-298094cdfc92	ЦТС ИНФР Матвеева Наталья Юрьевна ИЖТ-ПП-П	rvc2-MatveevaNY	t	rvc2-MatveevaNY@nrr.rzd	null	$2a$06$V96VKSe/c9QQtW70ALrLZ.85uXj7LGF5bMsY8150tZZPvs3L/RGeq	21	f	2021-08-28 16:44:23.129	\N	2021-08-28 16:44:23.129	\N
905d8070-0c95-11ec-a4a2-a96899551b41	ЦТС ГКР Скворцова Ольга Ивановна ГКР-РРД-ПП	rivc2_SkvorcovaOI	t	null	null	$2a$06$JEUVoOphzKmlppTKz2X.hOUCXK0bMnjP5qJeJfL2PojMBGYDlCCR.	59	f	2021-09-03 09:01:45.335	\N	2021-09-03 09:01:45.335	\N
7e965dd0-0e57-11ec-a4a2-a96899551b41	ЦТС УПП Трофимов Сергей Владимирович	itru_trofimov	t	itru_trofimov@orw.rzd	null	$2a$06$L/n6A6L/rHvaHIZL.TmzJeVFMygUEoSHmdKfO6ELPfG1O3z4rIapu	29	f	2021-09-05 14:42:29.037	\N	2021-09-05 14:42:29.037	\N
af758160-4b60-11ec-957a-ebf0e029a856	Согласующий Тестовый	testappr	t	null	null	$2a$06$vkldQnbRfxwZ4SIvqHKuze1m46BTnum1u01OhPxINdEEz/9.igfL2	2	f	2021-11-22 06:51:57.43	\N	2021-11-22 06:51:57.43	\N
d8896cd0-0c98-11ec-a4a2-a96899551b41	ЦТС ГКР ЗАП ПП - согласование внутри ЦТС	ZAP_PP_CTS_GKR	t	null	null	$2a$06$naf8/ikjj9iFDN/1zGEv.OdOS9.rwlXcCOB.UV97am31RhYTol36e	18	f	2021-09-03 09:25:14.909	\N	2021-09-03 09:25:14.909	\N
62d700f0-0c99-11ec-a4a2-a96899551b41	ЦТС ГКР ЗАП ЭКС - согласование внутри ЦТС	ZAP_EKS_CTS_GKR	t	null	null	$2a$06$91k/WJMad/KQST5hQCCB9O3HM2DJHKU9YRfLjef6ltY/ppghuhLKi	27	f	2021-09-03 09:29:06.943	\N	2021-09-03 09:29:06.943	\N
482fbf80-0a46-11ec-8f4b-298094cdfc92	ЦТС ОКС Румянцева Таисия Николаевна Руководитель экспертной линии УРГ Финансы	TRumyantseva	t	TRumyantseva@serw.rzd	null	$2a$06$scAe.df.GPKuAcykkcrsEeUNHcYKFzEGjDpDJsQqfclS.cXdenCRC	23	f	2021-08-31 10:29:11.672	\N	2021-08-31 11:25:36.666	\N
cdd1b040-0c93-11ec-a4a2-a96899551b41	ЦТС ГКР Гаранина Наталья Николаевна ГКР-ОПД-ТЕСТ	ivcprg-Garanina	t	null	null	$2a$06$jmZn0r1D0jLnkQCUzkFkTe9rRQQtYLYpgzIek17AtWm47jmxNN3uW	27	f	2021-09-03 08:49:09.444	\N	2021-09-03 08:49:09.444	\N
dff662d0-0cab-11ec-a4a2-a96899551b41	ЦТС УПП Вергулесов Владимир Николаевич руководитель направления ЦТТ	icc-vladverg	t	icc-vladverg@surw.rzd	null	$2a$06$EWlhnwbmb2j1c5Ppo3z4/.Wur6Nth0YUgBvKjp8rYugxDfmb1muwi	45	f	2021-09-03 11:41:27.805	\N	2021-09-03 11:41:27.805	\N
52a83180-0cae-11ec-a4a2-a96899551b41	ЦТС УПП Лоскутов Алексей Александрович УПП-ГИД-ПП	loskutovaa	f	loskutovaa	null	$2a$06$9ZfRzjgzMpOyCJr9tTbV2.g4xpJtxVmzcianQ/HelpBl7cr3PaGYa	20	f	2021-09-03 11:58:59.224	\N	2021-09-03 14:22:23.321	\N
01c50f50-0cad-11ec-a4a2-a96899551b41	ЦТС УПП Мещерякова Людмила Николаевна УПП-ГИД-ПП-ЗАПАД	lmescheryakova	t	lmescheryakova@surw.rzd	null	$2a$06$kC.YpFYR8CTbD3R5kOch.OMKDuK6gMI/CFlVLm2VwoBwv741MnSpG	20	f	2021-09-03 11:49:34.022	\N	2021-09-03 11:49:34.022	\N
da1bd860-0cb3-11ec-a4a2-a96899551b41	ЦТС УПП Непомнящих Дмитрий Александрович УПП-ГИД-ЭКС	nda	t	nda	null	$2a$06$sYJDbLhyjFoud6k3JWD0teDbQ30bmfQUmmLzalhLSaLarHcuQsCM6	29	f	2021-09-03 12:38:33.958	\N	2021-09-03 12:38:33.958	\N
c9da3e40-0828-11ec-8f4b-298094cdfc92	ЦТС ИНФР Разумова Елена Дмитриевна ИЖТ-ЭКС-ИНФР	ivc_razumovaed	t	ivc_razumovaed@grw.rzd	null	$2a$06$KCJyZlvelDYy/Ov9uGmA/.otXs.vj.7aGcdG6R1gvGDuS9bTebcbS	30	f	2021-08-28 17:53:01.988	\N	2021-08-28 17:53:01.988	\N
2e5a97c0-0cac-11ec-a4a2-a96899551b41	ЦТС УПП Трофимова Ирина Геннадьевна руководитель направления ГИД	hq-iren	t	hq-iren@surw.rzd	null	$2a$06$aVVQLUc5ZEqsinZJ/q8uV.7WJY5mxyF7CPdYB2zlHxfDhSFlpQ9wu	45	f	2021-09-03 11:43:39.324	\N	2021-09-03 11:43:39.324	\N
d90c5ab0-0e54-11ec-a4a2-a96899551b41	ЦТС УПП Бирюков Артемий Васильевич УПП-АИР-ЭКС	birjukovav	t	birjukovav@gvc.rzd	null	$2a$06$Nrcd9NcEKUcnZTV47pt5Gu1yXb7di45npiIOck3ckk1w5u2KbKMfy	29	f	2021-09-05 14:23:32.315	\N	2021-09-05 14:23:32.315	\N
401b9dd0-0bc4-11ec-a4a2-a96899551b41	ЦК СМК Мороз Марина Викторовна СМК-АСУЕСПП-ЭКС	mmoroz	t	mmoroz@klgd.rzd	null	$2a$06$WGUCltV/ecac0jcmpGqEzeSqI3HlIgq9ts3NOVWW1EMzWX645h/TW	26	f	2021-09-02 08:03:25.869	\N	2021-09-02 08:03:25.869	\N
f911a180-0c97-11ec-a4a2-a96899551b41	ЦТС ГКР Администраторы - согласование внутри ЦТС	ADM_CTS_GKR	t	null	null	$2a$06$Sm/K1oqbko9gyZaeZIeQi.5EaxlKTUKUoCYDFi3l3ZA.AySI3c0S6	13	f	2021-09-03 09:18:59.992	\N	2021-09-03 09:18:59.992	\N
f59e8e40-0a3b-11ec-8f4b-298094cdfc92	ЦТС ОКС Удоденко Наталья Алексеевна Руководитель экспертной линии ЛОГИСТИКА	UdodenkoNA	t	UdodenkoNA@msk.rzd	null	$2a$06$YxcXv5BUS60TzKUJCfYDxe6fcE7mMAwOlozS.j4fXKhVnJLaE9L/e	23	f	2021-08-31 09:15:18.18	\N	2021-08-31 11:28:07.377	\N
c18a3e10-0cb1-11ec-a4a2-a96899551b41	ЦТС УПП Каргина Ольга Валерьевна УПП-ГИД-ЭКС	icc-ovk	t	icc-ovk@surw.rzd	null	$2a$06$HprleKeXH4ANO8uAZMO2z.m9FP7.d9Po1Ck5YvWS8gJThwQMWjmAC	60	f	2021-09-03 12:23:33.745	\N	2021-09-03 14:26:01.449	\N
af1d4400-081c-11ec-8f4b-298094cdfc92	ЦТС ИНФР Галушка Наталья Игоревна ИЖТ-ПП-В	nivc-galushkani	t	nivc-galushkani@wsr.rzd	null	$2a$06$SDxrGForrxT.f0ONBLIt4eCsa0PSr7cA.S1PTvHgIMAesUsHDpVDS	21	f	2021-08-28 16:26:23.168	\N	2021-08-28 16:26:23.168	\N
e08cb9f0-0cac-11ec-a4a2-a96899551b41	ЦТС УПП Карнаухова Светлана Андреевна УПП-ГИД-ПП	kartaly-vc-gid	t	kartaly-vc-gid@surw.rzd	null	$2a$06$CCfwQOJ9sV7mECeLvJ1rAOeXgh9mOhGeM2GucjNtBNU495owXa8Ui	20	f	2021-09-03 11:48:38.287	\N	2021-09-03 11:48:38.287	\N
2975fb80-0cb3-11ec-a4a2-a96899551b41	ЦТС УПП Васильева Светлана Валерьевна УПП-СТ-ЦИТ-ЭКС-В	chel-asugsvsv	t	chel-asugsvsv@surw.rzd	null	$2a$06$T4x7ZDoMzB.opqFvolhbfeRHVDPwkN3K8HTCMiEqznlB9II6X.OSW	29	f	2021-09-03 12:33:37.592	\N	2021-09-03 14:23:46.546	\N
65afa350-082e-11ec-8f4b-298094cdfc92	ЦТС ИНФР Шуманов Александр Иванович ИЖТ-ЭКС-РЕМ	alexs	t	alexs@krw.rzd	null	$2a$06$Hyr2vxjHkGglPO8YcGtzEuGaAt4TrJp.V0rL6TWY3B6LhdEajILxm	30	f	2021-08-28 18:33:10.917	\N	2021-08-28 18:33:10.917	\N
8d34ce40-0b9a-11ec-a4a2-a96899551b41	ЦТС УПП Киямова Инна Сергеевна УПП-СТ-ЦИТ-АДМИН	chel-asuteh	t	null	null	$2a$06$xX7FypOY/ftdruiQ3GTcyOmcrJmjFKHlHkYs6XDBADr37KtoPp6va	3	f	2021-09-02 03:04:56.356	\N	2021-09-02 03:05:10.42	\N
5918ec10-0e54-11ec-a4a2-a96899551b41	ЦТС УПП Зимина Ольга Сергеевна УПП-АИР-ЭКС	OSZimina	t	OSZimina@svrw.rzd	null	$2a$06$kHCLVWMJ8bn8ijlhVkIdpeJ25yC0n4mVpRY.hMjnLSdlb6K6c3Zn6	29	f	2021-09-05 14:19:57.649	\N	2021-09-05 14:19:57.649	\N
26f41730-0e56-11ec-a4a2-a96899551b41	ЦТС УПП Кужакова Екатерина Константиновна УПП-ПЛАНИР-АДМИН	IVCDCUP-KuzhakovaEK	t	IVCDCUP-KuzhakovaEK@kbsh.rzd	null	$2a$06$8lLGt3/i72rjYW4M9/wgGeGbaZM/CUg2QL5sXeARtfYEK9K9ldu8q	61	f	2021-09-05 14:32:52.515	\N	2021-09-05 14:32:52.515	\N
40ad1420-0e50-11ec-a4a2-a96899551b41	ЦТС УПП Яковлева Ирина Юрьевна УПП-СТ-ЦИТ-ЭКС-В	icc-Yakovleva	t	icc-Yakovleva@surw.rzd	null	$2a$06$7f9.fLPFlcPVJl8DbusFme/HIvP4Fy4P5kqDNgkA5nO8yVYxb8fZe	29	f	2021-09-05 13:50:38.69	\N	2021-09-05 13:50:38.69	\N
5d0a0790-f807-11eb-81a2-992274308715	ЦТС УПП Нелюбина Мария Сергеевна Руководитель ЦТС 	hq-nelubinams	t	hq-nelubinams@surw.rzd	null	$2a$06$qI7DEJC2gwmXJ4wb3ZWq7Oza8jlGOt9NBboW87jYLtWpGPpsbYX06	45	f	2021-08-08 05:13:27.433	\N	2021-10-04 11:55:26.544	\N
b7d59ab0-0bdd-11ec-a4a2-a96899551b41	ЦТС ИНФР Кручинина Ольга Ивановна ИЖТ-ЭКС-В	ivct-Kruchinina	t	ivct-Kruchinina@kbsh.rzd	null	$2a$06$.YR2W8d05qg0wpL3HDI10uFttMjdd2X3O5RXYNyotZhf7jM0V6Tvq	30	f	2021-09-02 11:05:44.155	\N	2021-09-02 11:05:44.155	\N
7b42db10-0cac-11ec-a4a2-a96899551b41	ЦТС УПП Ходкевич Юлия Геннадьевна УПП-ПЛАНИР-АДМИН	nivc-HodkevichYUG	t	nivc-HodkevichYUG@wsr.rzd	null	$2a$06$oLeUAIkvh/ljWCnU8Lra/Oy/a8BDHtrpWKcPEjdB9CewkiF6AdXce	3	f	2021-09-03 11:45:48.353	\N	2021-09-03 11:45:55.955	\N
10384a60-0669-11ec-a18f-1fd6abd90502	ЦТС Т Пастухова Оксана Владимировна Руководитель ЛОК-ЭММ-ПП	rvc6-PastukhovaOV	t	rvc6-PastukhovaOV@nrr.rzd	null	$2a$06$vEoC2f82m5w2dXx7SYLKf.W9ZSs4LYewVvT9SixfA/qzUNVNSa0r6	19	f	2021-08-26 12:28:05.51	\N	2021-09-02 12:24:25.788	\N
59cd3e80-0a4f-11ec-8f4b-298094cdfc92	ЦТС ОКС Ипатов Антон Сергеевич Создатель ТНК руководитель УРГ "Кадры"	RVC4_IpatovAS	t	RVC4_IpatovAS@orw.rzd	null	$2a$06$CCY5IQiN7HpnRygzDblVTOfL1qTUsb.gwdd.S/YhbFR.IbyLKki6S	32	f	2021-08-31 11:34:06.696	\N	2021-08-31 11:34:06.696	\N
ba30eec0-0cac-11ec-a4a2-a96899551b41	ЦТС УПП Билецкая Екатерина Викторовна УПП-СТ-ЦИТ-АДМИН	ebileckaya	t	ebileckaya@skzd.rzd	null	$2a$06$oYyzB4nK42OK.t4dWMYZ7.irQGE20b9YqnuotDuKTkNaAjzrVZI1K	3	f	2021-09-03 11:47:33.932	\N	2021-09-03 11:47:33.932	\N
a01fdec0-0828-11ec-8f4b-298094cdfc92	ЦТС ИНФР Барашковский Александр Викторович ИЖТ-ЭКС-ИНФР	nivc-BarashkovskiyAV	t	nivc-BarashkovskiyAV@wsr.rzd	null	$2a$06$.KHQo4.3VJNTFjRbaGEzdeqJPTBr00I01v60sET29r/kGEHsnEWkO	30	f	2021-08-28 17:51:51.98	\N	2021-08-28 17:51:51.98	\N
711e8f20-0b9a-11ec-a4a2-a96899551b41	ЦТС УПП Волобуева Ирина Юрьевна УПП-СТ-ТСТ-АДМИН	nivc-volobuevaiy	t	null	null	$2a$06$a9NFxzb/Cbs27Pb.buvUwuvxxQFUSPLUAWT93oA2PUqMNRfXDxnXm	3	f	2021-09-02 03:04:09.234	\N	2021-09-02 03:04:09.234	\N
3a2d93f0-0e54-11ec-a4a2-a96899551b41	ЦТС УПП Свяжин Дмитрий Александрович УПП-АИР-ЭКС	ivc_svyazhinda	t	ivc_svyazhinda@esrr.rzd	null	$2a$06$a2GURvIt9hSemQCDYXwp1unqsbotyB6xbfCOCO2MxU7zttMRxL4ja	29	f	2021-09-05 14:19:05.775	\N	2021-09-05 14:19:05.775	\N
62249ee0-0a3e-11ec-8f4b-298094cdfc92	ЦТС ГКР Звонарёв Никита Иванович РУКОВОДИТЕЛЬ НАПРАВЛЕНИЯ АПР	ZvonarevNI	t	null	null	$2a$06$9n1rAQ4KAoIlNK62xvJVyOPM6JI7oPS5WJkKMn9YFyKhnXRlnbB5C	50	f	2021-08-31 09:32:39.246	\N	2021-08-31 09:32:39.246	\N
ef0a8560-0c94-11ec-a4a2-a96899551b41	ЦТС ГКР Торопчина Галина Леонидовна ГКР-РБТ-РАЗРАБОТКА	GToropchina	t	null	null	$2a$06$ys59XxKV4xzr0gWEGUHvGOaz16Nvh0tUI7Da6VpYj/v04WBQwJNLe	18	f	2021-09-03 08:57:14.678	\N	2021-09-03 08:57:14.678	\N
acef6f90-0e53-11ec-a4a2-a96899551b41	ЦТС УПП Гребенникова Екатерина Геннадьевна УПП-АИР-ЭКС	ivc_GrebennikovaEG	t	ivc_GrebennikovaEG@orw.rzd	null	$2a$06$AIAkkKKqjd4ySc4ovN/iE.U8jRCnMdZQsHjYTiayfRNMUoXLdeKHe	29	f	2021-09-05 14:15:08.809	\N	2021-09-05 14:15:08.809	\N
77ef6620-0cb3-11ec-a4a2-a96899551b41	ЦТС УПП Перевышина Ольга Викторовна УПП-АИР-ЭКС	rivc-OPerevishina	t	rivc-OPerevishina@skzd.rzd	null	$2a$06$f0VqUL76TPvo8B.aN4jzBOXTIci57nEDky636X.BimrPkqF7ODofW	29	f	2021-09-03 12:35:49.25	\N	2021-09-03 12:35:49.25	\N
ac047680-0e57-11ec-a4a2-a96899551b41	ЦТС УПП Маврина Татьяна Вениаминовна УПП-ИСУЖТ-ЭКС	ivc_mavrinatv	t	ivc_mavrinatv@esrr.rzd	null	$2a$06$qcF2LCsKLVpaFLen7.3BLuox960ObDpYPqv1RHOVME8ylwiqOVOG2	29	f	2021-09-05 14:43:45.256	\N	2021-09-05 14:44:17.204	\N
8b248e40-0bce-11ec-a4a2-a96899551b41	ЦТС ОКС Волошина Анастасия Олеговна УРГ БАЗИС	vorobevaao	t	vorobevaao@gvc.rzd	null	$2a$06$/80n6sfFNop0fNjwPKFNWeDeN4fq9HcKbkYbz1.5HPxc3PsJ49gju	32	f	2021-09-02 09:17:06.724	\N	2021-09-02 09:17:06.724	\N
ca122680-0caf-11ec-a4a2-a96899551b41	ЦТС УПП Приходченко Татьяна Александровна УПП-ИСУЖТ-ПП	rvc2_prihodchenkota	t	rvc2_prihodchenkota	null	$2a$06$lVF/w8aGnNvnUle8Y.F6d.1.OPqCHpSHwwPFHLY8.nKSMdD.7Umva	60	f	2021-09-03 12:09:29.064	\N	2021-09-03 12:14:32.404	\N
aacf3550-0cab-11ec-a4a2-a96899551b41	ЦТС УПП Шидловский Алексей Владимирович руководитель направления АиП	hq-shidl	t	hq-shidl@surw.rzd	null	$2a$06$KEX8WpQ3UlcLMTeSPxzb5OvBMh1Xx/WJVYD/2Uxe74VSDjEINkhdS	45	f	2021-09-03 11:39:58.629	\N	2021-09-03 11:39:58.629	\N
0dfb6670-0b0e-11ec-a4a2-a96899551b41	ЦТС ОСК Зяблых Ульяна Борисовна УРГ НСИ Руководитель УРГ	ivc_ZyablyhUB	t	ivc_ZyablyhUB@esrr.rzd	null	$2a$06$fhv4mlvX64/gmRAEhy7uWeX9/0DvtpSKQ7v.5.bbyq9h4BPnCtsWy	32	f	2021-09-01 10:19:13.367	\N	2021-09-01 10:19:13.367	\N
c70f91b0-0cab-11ec-a4a2-a96899551b41	ЦТС УПП Спиридонов Андрей Юрьевич руководитель направления ТСТ	nivc-SpiridonovAU	t	nivc-SpiridonovAU@wsr.rzd	null	$2a$06$3V9yp2vFh8LP5kgy7Oqx8O7ktfu9TMklSugFL/m9w0t7N7kdl1HrC	45	f	2021-09-03 11:40:46.027	\N	2021-09-03 11:40:46.027	\N
f1348f50-0a39-11ec-8f4b-298094cdfc92	ЦТС ГКР Лужина Ольга Валерьевна ГКР-ОПД-ЦА	LuzhinaOV	t	null	null	$2a$06$ln5JYHC.viEBgC7Vv.uO4O548uk3TyS3EVAvWKUszhzbpYT6wSoJ2	59	f	2021-08-31 09:00:51.781	\N	2021-08-31 09:01:32.476	\N
c5118150-0a46-11ec-8f4b-298094cdfc92	ЦТС ОКС Воронухина Ксения Сергеевна Эксперт УРГ Финансы	IVC-VoronuhinaKS	t	IVC-VoronuhinaKS@kbsh.rzd 	null	$2a$06$v45Jv0YcRR3DEGP7pNxxE.neIkwJ5JVlOnqyCV1SaNGDvM8rmrDb6	23	f	2021-08-31 10:32:41.189	\N	2021-08-31 11:15:05.299	\N
9c584910-0820-11ec-8f4b-298094cdfc92	ЦТС ИНФР Полубоярцев Константин Владимирович ИЖТ-ПП-РЕМ	rvc3_poluboyarcevkv	t	rvc3_poluboyarcevkv@grw.rzd	null	$2a$06$l9jAb5lGyMWrQsXQ2VMiguD5oZkNNscCOr8ccg4.0QglCxTGAvU/S	21	f	2021-08-28 16:54:29.665	\N	2021-08-28 16:54:29.665	\N
1e392910-0cb1-11ec-a4a2-a96899551b41	ЦТС УПП Рыбина Жанна Игоревна УПП-СТ-ТСТ-ПП	nivc-RybinaGI	t	nivc-RybinaGI@wsr.rzd	null	$2a$06$2bttzPByTFXAtbcjYxe4qePXEMnqtFcAef49W3dsnrs4mxpbiNs0O	20	f	2021-09-03 12:18:59.745	\N	2021-09-03 12:18:59.745	\N
3c0281b0-0817-11ec-8f4b-298094cdfc92	ЦТС ИНФР Филиппова Екатерина Михайловна ИЖТ-ПП-АДМИН	filippovaem	t	filippovaem@msk.rzd	null	$2a$06$2by5d6DvBZKQqpuYk.bSOujIoj3G.rRxPLq7KWeSAhbVqMkSO9qpa	6	f	2021-08-28 15:47:22.571	\N	2021-08-28 15:47:22.571	\N
833b57f0-0cae-11ec-a4a2-a96899551b41	ЦТС УПП Ильин Александр Николаевич УПП-ГИД-ПП-ЗАПАД	itru_ilin	t	null	null	$2a$06$O8VOA.fjV5bDSNBkfDYNsetMDdbccwcIi3Zqf5rLv/lJ8WTS2OZ1q	20	f	2021-09-03 12:00:20.719	\N	2021-09-03 12:00:20.719	\N
d4e64d20-0e53-11ec-a4a2-a96899551b41	ЦТС УПП Литвинов Андрей Владимирович УПП-АИР-ЭКС	ASUSS-Litvinov	t	ASUSS-Litvinov@kbsh.rzd	null	$2a$06$U9Cs6VE1OMjKTT3Qe27mjOPJZStjpjPT8KrvMp/cG6TXU7Z7LZRbG	29	f	2021-09-05 14:16:15.859	\N	2021-09-05 14:16:15.859	\N
86ddc300-0bb1-11ec-a4a2-a96899551b41	ЦТС ИНФР Зулькарнеева Рушания Назибовна БД-ЭКС-ИНФР	ZulkarneevaRN	t	ZulkarneevaRN@msk.rzd	null	$2a$06$oYaiSOGrmwX7xUEfp0a82umvhWv07iAKxc3M4QjGb/yZgy.rsDY0y	30	f	2021-09-02 05:49:24.144	\N	2021-09-02 05:50:16.532	\N
03513e50-0c91-11ec-a4a2-a96899551b41	ЦТС ГКР Тимошина Татьяна Александровна ГКР-АПР-ТЕСТ	TimoshinaTA	t	null	null	$2a$06$aql4d9J1EoJR2ql1lFseSeX5epBpHexi2rXmWCHm3sUQ.cuY/Nd7i	27	f	2021-09-03 08:29:10.709	\N	2021-09-03 08:29:10.709	\N
dc112aa0-0cb1-11ec-a4a2-a96899551b41	ЦТС УПП Матийчук Андрей Николаевич УПП-ИСУЖТ-ЭКС	icc-matey	t	icc-matey@surw.rzd	null	$2a$06$o65S8tASFCAqjj6kLLFVAuWrhHVZTDK4qJFqyNk0DLp9LlS9mJzDi	29	f	2021-09-03 12:24:18.25	\N	2021-09-03 12:24:18.25	\N
45392180-0a56-11ec-8f4b-298094cdfc92	ЦТС ОКС Корниенко Нина Вячеславовна Руководитель УРГ Основные средства  Согласование ЗАП ЭКС	ivc_KornienkoNV	t	ivc_KornienkoNV@orw.rzd	null	$2a$06$0Iu1S0azDW2d2BkkeS4t..HAYXRGhJdY43SD6WNTwCOXeUt4JU2Fq	32	f	2021-08-31 12:23:38.648	\N	2021-08-31 12:24:20.541	\N
24a39670-0cb4-11ec-a4a2-a96899551b41	ЦТС УПП Заутдинова Ольга Владимировна УПП-ПЛАН-ЭКС	ozautdinova	t	OZautdinova@serw.rzd	null	$2a$06$eMe4yQJQ4dv79yE/jpZ6hObmVV4xTibNOOMqJPAQ/pfcUw0bS68y.	29	f	2021-09-03 12:40:38.999	\N	2021-09-03 12:40:38.999	\N
8672aa00-0820-11ec-8f4b-298094cdfc92	ЦТС ИНФР Замотина Лариса Анатольевна ИЖТ-ПП-РЕМ	ivc_zamotinala	t	ivc_zamotinala@grw.rzd	null	$2a$06$NE60noMSA9Q3GBbadQAGWOKIf69EBgQmfLNn.sTsWkxVrkj6jJO1u	21	f	2021-08-28 16:53:52.928	\N	2021-08-28 16:53:52.928	\N
7f5db840-0af0-11ec-8f4b-298094cdfc92	ЦТС ОКС Орлова Наталья Викторовна УРГ Охрана труда Согласующий, Создатель ТНК	orlovanv	t	orlovanv@krw.rzd	null	$2a$06$mbGbwaHUJXGdMnyhcRF9C.tvpY2VyLOe74aWDwAhE6.PaPKTw5UJK	23	f	2021-09-01 06:47:38.692	\N	2021-09-01 06:47:38.692	\N
6c660d50-0e51-11ec-a4a2-a96899551b41	ЦТС УПП Рыбина Жанна Игоревна УПП-АНАЛИТИКИ	nivc-rybinagi	t	nivc-rybinagi	null	$2a$06$3UX29gHUiVz8.AxtDf/PWefLLxMkTpFq7sr5OteSm/uUq5FOSwIBq	38	f	2021-09-05 13:59:01.541	\N	2021-09-05 13:59:01.541	\N
28db89e0-0a3a-11ec-8f4b-298094cdfc92	ЦТС ОКС Пуненкова Нина Олеговна ответственный за создание ТНК ЕРП-ФР-ЭКС-УДП	IVC_PunenkovaNO	t	IVC_PunenkovaNO@dvgd.rzd	null	$2a$06$S1rNN6093hTVy2s4jYhMlen7UU9TxxdmAVg8qEhy1s6dhxgM5.6Wm	23	f	2021-08-31 09:02:25.151	\N	2021-08-31 11:25:17.964	\N
4ce8fea0-0cb3-11ec-a4a2-a96899551b41	ЦТС УПП Коршунова Лидия Николаевна УПП-СТ-ЦИТ-ЭКС-Д	AC_KorshunovaLN	t	AC_KorshunovaLN@orw.rzd	null	$2a$06$3NUe2rZvMvKxmze7hknn3OHOX9u1I6fgMPZ.InaD/fy5xqT8/KSI.	29	f	2021-09-03 12:34:37.066	\N	2021-09-03 12:34:37.066	\N
2ca51c70-0e55-11ec-a4a2-a96899551b41	ЦТС УПП Денисова Светлана Сергеевна УПП-АИР-ЭКС	nivc-DenisovaSS	t	nivc-DenisovaSS@wsr.rzd	null	$2a$06$BMJkWgJKdYwSr4oDZTs1xOnFyKdoqzXK0xrE1.2NL5NL7cRUfCO3u	29	f	2021-09-05 14:25:52.567	\N	2021-09-05 14:25:52.567	\N
4ceabe40-0cb1-11ec-a4a2-a96899551b41	ЦТС УПП Васильева Олеся Викторовна УПП-СТ-ЦИТ-ПП	kurgan-vov	t	kurgan-vov@surw.rzd	null	$2a$06$x4nY2fl8iNaYUEj0LWBcAerlUtvNXdNHY0Me3K/x5uH6On/1Xa476	20	f	2021-09-03 12:20:18.084	\N	2021-09-03 12:20:18.084	\N
022590d0-0e58-11ec-a4a2-a96899551b41	ЦТС УПП Бурдинская Тамара Васильевна ЗАП ПП ЦТС УПП	burdinskayatv	t	burdinskayatv@zrw.rzd	null	$2a$06$Cn.e2at2wsDO6OyNrDIq3.tUpDvfpkxOsMVY0glp1iyKRnCcquAy.	20	f	2021-09-05 14:46:09.757	\N	2021-09-05 14:46:09.757	\N
74627500-0c96-11ec-a4a2-a96899551b41	ЦТС ГКР Чиркова Наталья Николаевна ГКР-ОПД-ПП-НАКЛАДНАЯ	Chirkova	t	null	null	$2a$06$OAW.I6HFAVq.XcEqPrrKBOFjFYQ9hC8pO.B4PGpI8yjbBcVysnIc2	18	f	2021-09-03 09:08:07.888	\N	2021-09-03 09:08:07.888	\N
e4edbc90-0a5b-11ec-8f4b-298094cdfc92	ЦТС ОКС Самойлова Ольга Павловна ответственный за создание ТНК ПП-НОРМ	ivc_samoilovaop	t	ivc_samoilovaop@pvrr.rzd	null	$2a$06$8ITlWAeEchRGAmcwSmOhDeBf2yGS74/fv/9dJs8IQyIiN3jV9H.Tm	23	f	2021-08-31 13:03:54.073	\N	2021-08-31 13:03:55.995	\N
d7a2e080-0aef-11ec-8f4b-298094cdfc92	ЦТС ОКС Динсман Наталья Викторовна  УРГ Охрана труда Согласующий, Создатель ТНК	rvc3_dinsmannv	t	rvc3_dinsmannv@grw.rzd	null	$2a$06$.AZuJaX4dmFIK3K.UuBx8.a8XDP/UQflwCBX8P.UUDB/aKbfFyDYS	32	f	2021-09-01 06:42:57.288	\N	2021-09-01 06:42:57.288	\N
a8c53ae0-0cb3-11ec-a4a2-a96899551b41	ЦТС УПП Гусаров Анатолий Павлович УПП-ГИД-ЭКС	tolli	t	tolli	null	$2a$06$ElJJuyIlMRFbH6Epb8BMQeI3/Hnn6/Fbwh..9FnMg.5gC6bo8ASCq	29	f	2021-09-03 12:37:11.182	\N	2021-09-03 12:37:11.182	\N
4af12fa0-0a29-11ec-8f4b-298094cdfc92	ЦТС ГКР Чагина Любава Юрьевна ГКР-ИНФОРМ-ПП	LYChagina	t	null	null	$2a$06$OFdbU9SW4lZMrCnu2Gyyg.8FztOt5tzuCvVx.PGhxWGzVrxj1/eSC	18	f	2021-08-31 07:01:40.89	\N	2021-08-31 07:01:40.89	\N
487e0df0-0cb4-11ec-a4a2-a96899551b41	ЦТС УПП Куликова Елена Алексеевна УПП-СТ-ТСТ-ЭКС-В	nivc-KulikovaEA	t	null	null	$2a$06$mFI6HovOlio115wiBrwonuWu3g5M3K/mnKw7IAdEKZBawuYfzhQyG	29	f	2021-09-03 12:41:39.151	\N	2021-09-03 12:41:39.151	\N
b4e763a0-0828-11ec-8f4b-298094cdfc92	ЦТС ИНФР Попова Галина Александровна ИЖТ-ЭКС-ИНФР	rvc5-popovaga	t	rvc5-popovaga@nrr.rzd	null	$2a$06$Rv2E.CaUIRBwyHBLpKybwehbNl3OCgr76fhyYV5aPiP.0Op90gory	30	f	2021-08-28 17:52:26.842	\N	2021-08-28 17:52:26.842	\N
f5fde1c0-0cab-11ec-a4a2-a96899551b41	ЦТС УПП Трифонова Валентина Владиславовна первый зам 	icc_TrifonovaVV	t	icc_TrifonovaVV@surw.rzd	null	$2a$06$M2kISnDyenkHhuJ/r3LujOMHuZ2lrF2rwsxO11W9w9HW7T0e3fcM2	45	f	2021-09-03 11:42:04.764	\N	2021-09-03 11:42:35.763	\N
c4d07e30-0b9a-11ec-a4a2-a96899551b41	ЦТС УПП Соколов Сергей Александрович УПП-ГИД-АДМИН	hq-sokolovsa	f	null	null	$2a$06$QnsjrxR7YW.311t61km.Se8HcRt2DHBsGNy9nD8db97.kzzoWiMx.	3	f	2021-09-02 03:06:29.651	\N	2021-09-03 14:22:00.721	\N
16b93cf0-0a51-11ec-8f4b-298094cdfc92	Борознов Владимир	boroznov	t	rvc1_boroznovvo@pvrr.rzd	null	$2a$06$8Zy.Gyoly2vZSicJfzyF5e6DaenJk7GM0OBPm209knZUUHJQVanxC	20	f	2021-08-31 11:46:33.151	\N	2021-09-01 04:03:22.046	\N
f002fe10-0cb3-11ec-a4a2-a96899551b41	ЦТС УПП Шмелев Дмитрий Валерьевич УПП-ГИД-ЭКС	itru_shmelev	t	itru_shmelev	null	$2a$06$/zVU2zV6fD5sa/UxkHD9AewsC8uMutvVaaVIra2cGqPpJoms7Ge4a	29	f	2021-09-03 12:39:10.705	\N	2021-09-03 12:39:10.705	\N
a0497a10-0818-11ec-8f4b-298094cdfc92	ЦТС ИНФР Насонов Владимир Николаевич БД-ПП	ivc_nasonovvn	t	ivc_nasonovvn@esrr.rzd	null	$2a$06$wHBIfyhb5g8r2BA.95q8oeDnhLdioBPORR74E5NyFQOlisiLxaG8K	21	f	2021-08-28 15:57:20.305	\N	2021-08-28 15:58:35.619	\N
65e265b0-0ba8-11ec-a4a2-a96899551b41	 ЦТС ОКС Подымская Надежда Александровна ЕРП-ЦКРМ заместитель руководителя группы Согласование АДМ	ivc_podymskayana	t	ivc_podymskayana@esrr.rzd	null	$2a$06$1pquxrER5k6HNi6ijKRN..XQIxm7EsEzXkPKsArsIy6fDagR2dwpO	9	f	2021-09-02 04:44:03.339	\N	2021-09-02 08:47:46.899	\N
a6834180-0cb0-11ec-a4a2-a96899551b41	ЦТС УПП Жеданов Александр Романович УПП-ИСУЖТ-ПП	icc-zhedanov	t	icc-zhedanov@surw.rzd	null	$2a$06$7DDN/AE0Je7oum9QWgkKxu6eVuCKpCrtlW7dvCIlWUQfWvObt0c4u	60	f	2021-09-03 12:15:38.904	\N	2021-09-03 12:15:38.904	\N
0f7e0b80-0c92-11ec-a4a2-a96899551b41	ЦТС ГКР Медников Александр Владимирович ГКР-АСУ-РС	AMednikov	t	null	null	$2a$06$c1dCNY1WTgMGfB0II.aPkOZ/uhf6xsdAgc47Uo43jyKkzvTh2UD8u	59	f	2021-09-03 08:36:40.632	\N	2021-09-03 08:36:40.632	\N
a623b390-b0cb-11ec-b37d-1d1a5fc558a5	321	321	t	\N	\N	paVMcl3g.dCHo	3	\N	2022-03-31 08:22:05.385	\N	2022-03-31 08:22:05.385	e022ab20-b00b-11ec-aa1a-43c3f61aac31
1100a6b0-081a-11ec-8f4b-298094cdfc92	ЦТС ИНФР Мошкова Светлана Александровна БД-ЭКС-ИНФР	ivc_moshkovasa	t	ivc_moshkovasa@grw.rzd	null	$2a$06$1B3GMRzkfFTH0nYK1X2u6eB1aA09noErvIVYqtRUTf817ZquG534G	30	f	2021-08-28 16:07:38.907	\N	2021-08-28 16:07:38.907	\N
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.profile (id, title, is_active, date_created, last_updated, last_updated_by, is_tnk_type_enabled) FROM stdin;
2	Создатель ТНК	t	2022-03-28 02:03:47.665471	2022-03-28 02:03:47.665471	\N	\N
3	Согласующий	t	2022-03-28 02:03:47.671824	2022-03-28 02:03:47.671824	\N	\N
4	Профиль1	t	2022-03-28 02:13:24.124	2022-03-28 02:13:24.124	\N	\N
5	АДМ ЦТС СП	t	2022-03-28 02:13:24.129	2022-03-28 02:13:24.129	\N	\N
6	АДМ ЦТС Т	t	2022-03-28 02:13:24.129	2022-03-28 02:13:24.129	\N	\N
7	Согласование АДМ	t	2022-03-28 02:13:24.127	2022-03-28 02:13:24.127	\N	\N
8	Согласование ИНЦ	t	2022-03-28 02:13:24.126	2022-03-28 02:13:24.126	\N	\N
9	АДМ ЦК СМК	t	2022-03-28 02:13:24.127	2022-03-28 02:13:24.127	\N	\N
10	ЦТС Т	f	2022-03-28 02:13:24.127	2022-03-28 02:13:24.127	\N	\N
11	АДМ ЦТС ИНФР	t	2022-03-28 02:13:24.128	2022-03-28 02:13:24.128	\N	\N
12	АДМ ЦТС УПП	t	2022-03-28 02:13:24.129	2022-03-28 02:13:24.129	\N	\N
13	ЗАП ПП ЦТС ГКР	t	2022-03-28 02:13:24.129	2022-03-28 02:13:24.129	\N	\N
14	АДМ ЦТС ГКР	t	2022-03-28 02:13:24.128	2022-03-28 02:13:24.128	\N	\N
15	АДМ ЦТС КСУП	t	2022-03-28 02:13:24.128	2022-03-28 02:13:24.128	\N	\N
17	ЗАП ПП ЦК СМК	t	2022-03-28 02:13:24.13	2022-03-28 02:13:24.13	\N	\N
16	АДМ ЦТС ОКС	t	2022-03-28 02:13:24.128	2022-03-28 02:13:24.128	\N	\N
18	ЗАП ПП ЦТС Т	t	2022-03-28 02:13:24.13	2022-03-28 02:13:24.13	\N	\N
19	ЗАП ПП ЦТС УПП	t	2022-03-28 02:13:24.13	2022-03-28 02:13:24.13	\N	\N
20	ЗАП ПП ЦТС ИНФР	t	2022-03-28 02:13:24.13	2022-03-28 02:13:24.13	\N	\N
21	АДМ ЦТС ПАСС	t	2022-03-28 02:13:24.129	2022-03-28 02:13:24.129	\N	\N
22	ЗАП ПП ЦТС ПАСС	t	2022-03-28 02:13:24.131	2022-03-28 02:13:24.131	\N	\N
23	ЗАП ПП ЦТС ОКС	t	2022-03-28 02:13:24.131	2022-03-28 02:13:24.131	\N	\N
24	ЗАП ПП ЦТС КСУП	t	2022-03-28 02:13:24.131	2022-03-28 02:13:24.131	\N	\N
25	ЗАП ПП ЦТС СП	t	2022-03-28 02:13:24.131	2022-03-28 02:13:24.131	\N	\N
26	ЗАП ЭКС ЦК СМК	t	2022-03-28 02:13:24.131	2022-03-28 02:13:24.131	\N	\N
27	ЗАП ЭКС ЦТС ГКР	t	2022-03-28 02:13:24.132	2022-03-28 02:13:24.132	\N	\N
28	ЗАП ЭКС ЦТС Т	t	2022-03-28 02:13:24.132	2022-03-28 02:13:24.132	\N	\N
29	ЗАП ЭКС ЦТС УПП	t	2022-03-28 02:13:24.132	2022-03-28 02:13:24.132	\N	\N
30	ЗАП ЭКС ЦТС ИНФР	t	2022-03-28 02:13:24.132	2022-03-28 02:13:24.132	\N	\N
31	ЗАП ЭКС ЦТС ПАСС	t	2022-03-28 02:13:24.132	2022-03-28 02:13:24.132	\N	\N
32	ЗАП ЭКС ЦТС ОКС	t	2022-03-28 02:13:24.132	2022-03-28 02:13:24.132	\N	\N
33	ЗАП ЭКС ЦТС СП	t	2022-03-28 02:13:24.133	2022-03-28 02:13:24.133	\N	\N
34	ЗАП ЭКС ЦТС КСУП	t	2022-03-28 02:13:24.133	2022-03-28 02:13:24.133	\N	\N
36	ИНЦ ЦТС ГКР	t	2022-03-28 02:13:24.133	2022-03-28 02:13:24.133	\N	\N
35	ИНЦ ЦК СМК	t	2022-03-28 02:13:24.133	2022-03-28 02:13:24.133	\N	\N
37	ИНЦ ЦТС УПП	t	2022-03-28 02:13:24.133	2022-03-28 02:13:24.133	\N	\N
38	ИНЦ ЦТС Т	t	2022-03-28 02:13:24.133	2022-03-28 02:13:24.133	\N	\N
39	ИНЦ ЦТС ИНФР	t	2022-03-28 02:13:24.134	2022-03-28 02:13:24.134	\N	\N
40	ИНЦ ЦТС ПАСС	t	2022-03-28 02:13:24.134	2022-03-28 02:13:24.134	\N	\N
41	ИНЦ ЦТС ОКС	t	2022-03-28 02:13:24.134	2022-03-28 02:13:24.134	\N	\N
42	ИНЦ ЦТС КСУП	t	2022-03-28 02:13:24.134	2022-03-28 02:13:24.134	\N	\N
43	ИНЦ ЦТС СП	t	2022-03-28 02:13:24.134	2022-03-28 02:13:24.134	\N	\N
44	ТЕСТ-ПРОФИЛЬ-1	f	2022-03-28 02:13:24.134	2022-03-28 02:13:24.134	\N	\N
45	Руководитель ЦТС УПП	t	2022-03-28 02:13:24.135	2022-03-28 02:13:24.135	\N	\N
46	Руководитель ЦК СМК	t	2022-03-28 02:13:24.135	2022-03-28 02:13:24.135	\N	\N
47	Руководитель ЦТС ОКС	t	2022-03-28 02:13:24.135	2022-03-28 02:13:24.135	\N	\N
48	Руководитель ЦТС ИНФР	t	2022-03-28 02:13:24.135	2022-03-28 02:13:24.135	\N	\N
49	Руководитель ЦТС Т	t	2022-03-28 02:13:24.135	2022-03-28 02:13:24.135	\N	\N
50	Руководитель ЦТС ГКР	t	2022-03-28 02:13:24.135	2022-03-28 02:13:24.135	\N	\N
51	Руководитель ЦТС КСУП	t	2022-03-28 02:13:24.136	2022-03-28 02:13:24.136	\N	\N
52	Руководитель ЦТС ПАСС	t	2022-03-28 02:13:24.136	2022-03-28 02:13:24.136	\N	\N
55	Согласование ЗАП ПП	t	2022-03-28 02:13:24.136	2022-03-28 02:13:24.136	\N	\N
53	Руководитель ЦТС СП	t	2022-03-28 02:13:24.136	2022-03-28 02:13:24.136	\N	\N
54	Согласование ЗАП ЭКС	t	2022-03-28 02:13:24.136	2022-03-28 02:13:24.136	\N	\N
56	Общий профиль	t	2022-03-28 02:13:24.136	2022-03-28 02:13:24.136	\N	\N
58	ЗАП ПП АДМ ЭКС ЦТС ГКР	t	2022-03-28 02:13:24.137	2022-03-28 02:13:24.137	\N	\N
59	ЗАП ПП ЭКС ЦТС Т	t	2022-03-28 02:13:24.137	2022-03-28 02:13:24.137	\N	\N
57	ЗАП ПП ЭКС ЦТС УПП	t	2022-03-28 02:13:24.137	2022-03-28 02:13:24.137	\N	\N
60	ЗАП АДМ ЭКС ЦТС УПП	t	2022-03-28 02:13:24.137	2022-03-28 02:13:24.137	\N	\N
61	ЗАП ПП ЭКС АДМ ЦТС УПП	t	2022-03-28 02:13:24.137	2022-03-28 02:13:24.137	\N	\N
238	Профиль 1	t	2022-03-30 03:18:28.626	2022-03-30 03:18:28.626	966d19b0-afd5-11ec-9c44-775969154fe4	\N
1	Администратор	t	2022-03-28 02:03:47.658224	2022-03-28 02:03:47.658224	\N	t
\.


--
-- Data for Name: requestmap; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.requestmap (id, controller, action, role_id, model, date_created, label, last_updated, last_updated_by) FROM stdin;
1	/dict	\N	\N	\N	2022-03-28 02:03:47.830571	\N	2022-03-28 02:03:47.830571	\N
2	/dictItem	\N	\N	\N	2022-03-28 02:03:47.838262	\N	2022-03-28 02:03:47.838262	\N
3	/attach	\N	\N	\N	2022-03-28 02:03:47.856277	\N	2022-03-28 02:03:47.856277	\N
4	/account	\N	\N	\N	2022-03-28 02:03:47.862421	\N	2022-03-28 02:03:47.862421	\N
5	/process	\N	\N	\N	2022-03-28 02:03:47.868898	\N	2022-03-28 02:03:47.868898	\N
6	/subprocess	\N	\N	\N	2022-03-28 02:03:47.875613	\N	2022-03-28 02:03:47.875613	\N
7	/operation	\N	\N	\N	2022-03-28 02:03:47.8823	\N	2022-03-28 02:03:47.8823	\N
8	/tnk	\N	\N	\N	2022-03-28 02:03:47.888018	\N	2022-03-28 02:03:47.888018	\N
9	/aih	\N	\N	\N	2022-03-28 02:03:47.894739	\N	2022-03-28 02:03:47.894739	\N
10	/tnk-to-ci	\N	\N	\N	2022-03-28 02:03:47.900834	\N	2022-03-28 02:03:47.900834	\N
11	/tnk-to-ci-type	\N	\N	\N	2022-03-28 02:03:47.906739	\N	2022-03-28 02:03:47.906739	\N
12	/tnk-to-oper	\N	\N	\N	2022-03-28 02:03:47.913093	\N	2022-03-28 02:03:47.913093	\N
13	/tnk-to-wg	\N	\N	\N	2022-03-28 02:03:47.919771	\N	2022-03-28 02:03:47.919771	\N
14	/prof-to-subp	\N	\N	\N	2022-03-28 02:03:47.925561	\N	2022-03-28 02:03:47.925561	\N
15	/profile	\N	1	\N	2022-03-28 02:03:47.931654	\N	2022-03-28 02:03:47.931654	\N
16	/tnk-upload	\N	1	\N	2022-03-28 02:03:47.938458	\N	2022-03-28 02:03:47.938458	\N
17	/tnk-export	\N	\N	\N	2022-03-28 02:03:47.944262	\N	2022-03-28 02:03:47.944262	\N
18	/protocol	\N	\N	\N	2022-03-28 02:03:47.950421	\N	2022-03-28 02:03:47.950421	\N
19	/approval-setup	\N	\N	\N	2022-03-28 02:03:47.956932	\N	2022-03-28 02:03:47.956932	\N
20	/approval-queue	\N	\N	\N	2022-03-28 02:03:47.963236	\N	2022-03-28 02:03:47.963236	\N
21	/ip-account	\N	\N	\N	2022-03-28 02:03:47.969701	\N	2022-03-28 02:03:47.969701	\N
22	/ip-load	\N	1	\N	2022-03-28 02:18:38.558614	\N	2022-03-28 02:18:38.558614	\N
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.role (id, title, is_active, date_created, last_updated, last_updated_by) FROM stdin;
1	Администратор	t	2022-03-28 02:03:47.715285	2022-03-28 02:03:47.715285	\N
2	Создатель ТНК	t	2022-03-28 02:03:47.722168	2022-03-28 02:03:47.722168	\N
4	Согласующий	t	2022-03-28 02:03:47.728984	2022-03-28 02:03:47.728984	\N
\.


--
-- Data for Name: role_account; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.role_account (role_id, account_id, date_created) FROM stdin;
2	30774350-0824-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.360263
2	f392dcf0-0810-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.360599
1	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	2022-03-30 08:04:58.350987
2	d7cee480-0a29-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.361488
2	1100a6b0-081a-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.362037
2	501853b0-0820-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.362359
2	144167e0-081c-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.362841
2	31c2d1f0-082b-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.362925
2	04adb0b0-0815-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.36315
2	881dc7c0-0a2a-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.363484
2	f131edb0-0a2d-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.365576
2	ee6f8570-0a45-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.366075
2	369da4b0-0728-11ec-a18f-1fd6abd90502	2022-03-30 04:26:05.369488
2	c2135b50-0a2c-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.369561
2	89b63250-0a3b-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.369773
2	0d5bdae0-0a39-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.36959
2	f38da510-0a3a-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.36989
2	70bf58a0-0a5c-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.370083
2	bdf3b130-0cae-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.372335
2	7ef8a420-0b0c-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.372361
2	d190fa00-0a55-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.372361
2	682604c0-0721-11ec-a18f-1fd6abd90502	2022-03-30 04:26:05.372566
2	3c17bae0-0b9a-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.375341
2	3f940b70-0b0d-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.375341
2	3092c620-081a-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.375429
2	e97a3fc0-0aee-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.375435
2	304a87a0-081c-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.375878
2	6e4516c0-0820-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.375944
2	464b7d40-0824-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.378263
2	4a5122d0-082b-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.378305
2	8fbcf350-0a27-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.378288
2	8df4b240-0a2e-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.378356
2	f59e8e40-0a3b-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.381218
2	482fbf80-0a46-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.381248
2	a50e8a90-0a39-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.381248
2	1aca5a60-0a3b-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.381344
2	4c0ce621-ae3b-11ec-acf4-d14cf798f2e6	2022-03-30 04:14:28.926728
2	59cd3e80-0a4f-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.381416
2	0dfb6670-0b0e-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.381586
2	d7a2e080-0aef-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.383754
2	45392180-0a56-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.383752
2	5d4867d0-0ad9-11ec-8f4b-298094cdfc92	2022-03-30 04:14:28.935448
2	4ca8e910-0b9a-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.383921
2	c18a3e10-0cb1-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.384241
2	cdd1b040-0c93-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.386539
2	ba30eec0-0cac-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.386539
2	c70f91b0-0cab-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.386629
2	5d0a0790-f807-11eb-81a2-992274308715	2022-03-30 04:14:28.935448
2	e83e30d0-0cb0-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.386843
2	390d52a0-0cae-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.386843
2	003734a0-0cb3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.387191
2	24a39670-0cb4-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.389429
2	15564c90-0817-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.389462
2	a8c53ae0-0cb3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.389452
2	af1d4400-081c-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.389662
2	8672aa00-0820-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.39215
2	488953c0-082e-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.39215
2	a01fdec0-0828-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.392279
2	4af12fa0-0a29-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.392414
2	f1348f50-0a39-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.392483
2	6e5f3870-0c94-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.393022
2	e08cb9f0-0cac-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.395141
2	3d682140-0a3d-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.395135
2	dff662d0-0cab-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.395167
2	f00e58a0-0a56-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.395167
2	efc53270-0b9a-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.397969
2	711e8f20-0b9a-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.398028
2	c5118150-0a46-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.398101
2	7f5db840-0af0-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.397996
2	06f44820-0cb1-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.398437
2	487e0df0-0cb4-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.398561
2	52a83180-0cae-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.400521
2	c9d03eb0-0cb3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.400525
2	90874740-0e50-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.400698
2	2975fb80-0cb3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.400701
2	6c660d50-0e51-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.403225
2	3a2d93f0-0e54-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.403225
2	29d0c2e0-0817-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.40328
2	91eec1a0-081d-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.403306
2	9c584910-0820-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.403527
2	b4e763a0-0828-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.403871
2	01c50f50-0cad-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.40613
2	62249ee0-0a3e-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.40613
2	65afa350-082e-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.40612
2	28db89e0-0a3a-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.406352
2	3fd31280-0a58-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.409017
2	96a35230-0a50-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.409104
2	e1148550-0af0-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.409301
2	8d34ce40-0b9a-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.409537
2	6a009a70-0cae-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.409543
2	aae7cd70-0b9a-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.409752
2	f5fde1c0-0cab-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.411588
2	ef0a8560-0c94-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.411586
2	1e392910-0cb1-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.411729
2	da1bd860-0cb3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.411782
2	4ce8fea0-0cb3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.414454
2	9afb2b20-35b4-11ec-b323-f742fd893ea8	2022-03-30 04:26:05.414495
2	b3825b40-0e50-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.414559
2	0f92e360-0e50-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.414465
2	c4d07e30-0b9a-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.414824
2	e37a5db0-0e51-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.415132
2	5918ec10-0e54-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.417086
2	acef6f90-0e53-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.417132
2	32d23c90-081f-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.417292
2	3c0281b0-0817-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.417331
2	c9da3e40-0828-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.419949
2	0352de70-0a40-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.419929
2	2ca51c70-0e55-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.42011
2	c9d22c00-359b-11ec-b323-f742fd893ea8	2022-03-30 04:26:05.42017
2	754141b0-0e56-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.42022
2	26f41730-0e56-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.420481
2	16b93cf0-0a51-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.422627
2	905d8070-0c95-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.42264
2	2e5a97c0-0cac-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.422791
2	19371ac0-0cad-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.42286
2	4ceabe40-0cb1-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.425429
2	833b57f0-0cae-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.425429
2	77ef6620-0cb3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.425543
2	f002fe10-0cb3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.42596
2	2ee4dd70-0b9b-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.426201
2	40ad1420-0e50-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.426203
2	d4631ac0-0e50-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.428075
2	d4e64d20-0e53-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.428053
2	8b4b4390-0e54-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.428253
2	d90c5ab0-0e54-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.428246
2	ac047680-0e57-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.430936
2	022590d0-0e58-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.431015
2	7e965dd0-0e57-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.430947
2	44953400-081f-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.431273
2	a0497a10-0818-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.431299
2	7586e840-0a5b-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.431901
2	4b89dd40-0c86-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.433718
2	86ddc300-0bb1-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.433655
4	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	2022-03-30 08:04:58.356453
2	af758160-4b60-11ec-957a-ebf0e029a856	2022-03-30 04:26:05.434041
2	401b9dd0-0bc4-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.435357
2	ca122680-0caf-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.442331
2	f911a180-0c97-11ec-a4a2-a96899551b41	2022-03-30 09:06:58.069674
2	a623b390-b0cb-11ec-b37d-1d1a5fc558a5	2022-04-01 03:51:16.311864
4	a623b390-b0cb-11ec-b37d-1d1a5fc558a5	2022-04-01 03:51:16.318706
2	98266360-0819-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.436476
2	27cafde0-0ca3-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.442519
2	b7d59ab0-0bdd-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.436976
2	8b248e40-0bce-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.436525
2	a6834180-0cb0-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.442573
2	dc112aa0-0cb1-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.44266
2	aacf3550-0cab-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.44793
2	62d700f0-0c99-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.44794
2	03513e50-0c91-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.436952
2	be08c840-0bdc-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.437474
2	b88b0a80-0818-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.4429
2	e4edbc90-0a5b-11ec-8f4b-298094cdfc92	2022-03-30 04:26:05.443269
2	74627500-0c96-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.439383
2	10384a60-0669-11ec-a18f-1fd6abd90502	2022-03-30 04:26:05.444994
2	adbf7450-0e54-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.44526
2	d8896cd0-0c98-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.439608
2	89452a70-0bcf-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.445013
2	65e265b0-0ba8-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.436524
2	7b42db10-0cac-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.442376
2	0f7e0b80-0c92-11ec-a4a2-a96899551b41	2022-03-30 04:26:05.44793
\.


--
-- Data for Name: token; Type: TABLE DATA; Schema: auth; Owner: postgres
--

COPY auth.token (id, account_id, ip, token_ext, date_created, last_updated, date_created_ext) FROM stdin;
66a503f0-b642-11ec-a7fd-fd2e511e9bba	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null	\N	2022-04-07 07:14:44.790575	2022-04-11 08:47:25.316914	2022-04-07 07:14:44.790575
\.


--
-- Data for Name: dict_item; Type: TABLE DATA; Schema: dict; Owner: postgres
--

COPY dict.dict_item (id, version, code, title, description, is_active, sort_order, dict_type_id, parent_id, add_info, date_created, last_updated, last_updated_by) FROM stdin;
1	0	\N	сотрудник	сотрудник	t	10	20	\N	\N	2022-03-28 02:03:47.783687	2022-03-28 02:03:47.783687	\N
2	0	\N	робот	робот	t	20	20	\N	\N	2022-03-28 02:03:47.790554	2022-03-28 02:03:47.790554	\N
3	0	\N	чат-бот	чат-бот	t	30	20	\N	\N	2022-03-28 02:03:47.797685	2022-03-28 02:03:47.797685	\N
4	0	\N	общий	общий	t	10	30	\N	\N	2022-03-28 02:03:47.803529	2022-03-28 02:03:47.803529	\N
5	0	\N	детализация до функции	детализация до функции	t	20	30	\N	\N	2022-03-28 02:03:47.809708	2022-03-28 02:03:47.809708	\N
6	0	\N	детализация до ситуации	детализация до ситуации	t	30	30	\N	\N	2022-03-28 02:03:47.817081	2022-03-28 02:03:47.817081	\N
7	0	\N	Утверждена ЦОТЭН	Утверждена ЦОТЭН	t	10	50	\N	\N	2022-03-28 02:03:47.823473	2022-03-28 02:03:47.823473	\N
9	\N	\N	искусственный интеллект	\N	t	100	20	\N	\N	2022-03-31 03:45:09.696	2022-03-31 03:45:09.696	e022ab20-b00b-11ec-aa1a-43c3f61aac31
\.


--
-- Data for Name: dict_type; Type: TABLE DATA; Schema: dict; Owner: postgres
--

COPY dict.dict_type (id, version, title, description, is_active, is_editable, date_created, sort_order, last_updated, last_updated_by) FROM stdin;
20	0	Исполнитель операции	Исполнитель операции	t	t	2022-03-28 02:03:47.758009	1	2022-03-28 02:03:47.758009	\N
30	0	Вид ТНК	Вид ТНК	t	t	2022-03-28 02:03:47.764278	1	2022-03-28 02:03:47.764278	\N
40	0	Единица измерения операции	Единица измерения операции	t	t	2022-03-28 02:03:47.770633	1	2022-03-28 02:03:47.770633	\N
50	0	Источник операции	Источник операции	t	t	2022-03-28 02:03:47.776546	1	2022-03-28 02:03:47.776546	\N
\.


--
-- Data for Name: app_log; Type: TABLE DATA; Schema: log; Owner: postgres
--

COPY log.app_log (id, app_name, app_version, log_level, user_id, description, date_created) FROM stdin;
1	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 02:03:47.99564
2	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 02:03:48.034591
3	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 02:05:06.345594
4	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 02:05:06.382388
5	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 02:05:31.63717
6	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 02:05:31.675323
7	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 02:18:01.778956
8	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 02:18:01.815794
9	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 04:07:04.277061
10	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 04:07:04.315346
11	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 04:08:06.220974
12	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 04:08:06.257721
13	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:02:55.664758
14	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:03:23.602429
15	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:03:23.639213
16	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:06:19.817461
17	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:06:19.857512
18	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:10:34.0202
19	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:10:34.056162
20	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:10:47.824469
21	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:10:47.861063
22	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:11:24.018029
23	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:11:24.055166
24	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:11:52.298284
25	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:11:52.354794
26	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:29:55.643647
27	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:29:55.689648
28	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:31:32.383591
29	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:31:32.428607
30	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:33:32.233213
31	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:33:32.280638
32	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:34:26.883906
33	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:34:26.934241
34	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:36:26.185815
35	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:36:26.222831
36	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:38:12.043349
37	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:38:12.079995
38	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:38:57.618985
39	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:38:57.657244
40	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:40:40.367492
41	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:40:40.403963
42	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:42:23.06282
43	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:42:23.101062
44	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:43:01.687163
45	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:43:01.723514
46	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:47:18.302219
47	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:47:18.338948
48	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:49:51.957412
49	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:49:52.004669
50	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:51:01.10311
51	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:51:01.140164
52	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:53:40.358823
53	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:53:40.396607
54	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:54:15.636523
55	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:54:15.674539
56	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:55:20.161637
57	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:55:20.199604
58	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:56:58.136483
59	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:56:58.173334
60	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 06:58:47.606816
61	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 06:58:47.64712
62	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:02:49.907654
63	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:02:49.944247
64	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:03:56.989363
65	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:03:57.026899
66	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:07:40.251279
67	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:07:40.287462
68	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:09:13.368516
69	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:09:13.407084
70	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:10:17.24753
71	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:10:17.288639
72	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:11:24.550251
73	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:11:24.592466
74	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:11:56.365608
75	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:11:56.402499
76	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:13:24.287898
77	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:13:24.325097
78	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:13:52.024831
79	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:13:52.061727
80	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:14:38.231747
81	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:14:38.268538
82	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:15:12.427631
83	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:15:12.464883
84	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:16:06.939978
85	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:16:06.979598
86	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:16:41.853658
87	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:16:41.890335
88	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:18:52.981142
89	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:18:53.017438
90	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:19:26.20247
91	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:19:26.239915
92	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:21:47.044729
93	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:21:47.087548
94	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:22:13.512733
95	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:22:13.55067
96	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:23:28.882919
97	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:23:28.919536
98	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:23:42.329825
99	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:23:42.368316
100	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:24:13.703806
101	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:24:13.740436
102	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:24:55.098881
103	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:24:55.135815
104	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:26:11.320655
105	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:26:11.35769
106	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 07:31:05.236227
107	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 07:31:05.275081
108	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 08:13:48.41546
109	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 08:13:48.452757
110	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-28 09:08:18.025904
111	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-28 09:08:18.06323
112	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 08:49:39.193797
113	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 08:49:39.233508
114	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 08:51:03.801165
115	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 08:51:03.850157
116	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 08:53:28.5834
117	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 08:53:28.620542
118	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 08:54:17.150349
119	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 08:54:17.226665
120	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 08:55:27.237916
121	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 08:55:27.29806
122	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 08:57:23.882651
123	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 08:57:23.921382
124	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 08:58:59.424226
125	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 08:58:59.466737
126	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:02:31.439068
127	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:02:31.47855
128	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:04:10.166927
129	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:04:10.203928
130	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:04:41.360109
131	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:04:41.397296
132	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:09:52.358572
133	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:09:52.395442
134	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:10:21.349956
135	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:10:21.387507
136	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:11:04.907602
137	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:11:04.94464
138	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:12:05.627427
139	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:12:05.673432
140	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:13:22.618979
141	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:13:22.655819
142	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-29 09:14:18.678949
143	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-29 09:14:18.718724
144	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 01:45:04.088842
145	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 01:45:04.128174
146	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:05:09.366436
147	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:05:09.423459
148	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:15:59.264631
149	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:15:59.306035
150	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:17:17.840463
151	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:17:17.878505
152	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:21:22.611235
153	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:21:22.648179
154	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:23:17.394772
155	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:23:17.431616
156	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:24:11.177729
157	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:24:11.215563
158	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:24:53.481101
159	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:24:53.516829
160	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:25:29.287883
161	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:25:29.326579
162	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:26:06.906886
163	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:26:06.943077
164	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:28:41.589934
165	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:28:41.628125
166	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:29:10.415974
167	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:29:10.455087
168	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:31:10.131112
169	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:31:10.167659
170	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:32:30.984108
171	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:32:31.021331
172	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:33:17.089231
173	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:33:17.125607
174	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:34:45.243303
175	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:34:45.280872
176	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:38:29.11576
177	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:38:29.15304
178	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:40:12.672282
179	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:40:12.708956
180	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:41:16.119541
181	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:41:16.156448
182	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:41:52.651825
183	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:41:52.691375
184	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:43:12.926878
185	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:43:12.966776
186	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:47:33.670562
187	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:47:33.740007
188	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:48:41.208539
189	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:48:41.245594
190	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:50:20.433054
191	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:50:20.471137
192	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:51:49.803892
193	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:51:49.841888
194	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:53:42.471453
195	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:53:42.507481
196	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:55:06.180274
197	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:55:06.2172
198	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:56:05.64113
199	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:56:05.682028
200	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 02:56:57.440213
201	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 02:56:57.477074
202	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 03:03:02.304607
203	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 03:03:02.350648
204	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 03:14:59.531244
205	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 03:14:59.567905
206	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 03:31:18.006025
207	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 03:31:18.045309
208	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 04:20:33.096554
209	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 04:20:33.144569
211	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 04:23:09.072003
210	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 04:23:09.071956
212	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 04:23:37.95135
213	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 04:23:37.951345
214	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 04:24:07.749694
215	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 04:24:07.749718
216	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 04:25:40.267498
217	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 04:25:40.267489
218	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 04:26:05.479489
219	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 04:26:05.479444
220	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 05:47:02.009198
221	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 05:47:02.009376
223	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 05:47:26.391973
222	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 05:47:26.391961
225	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 05:49:16.293125
224	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 05:49:16.29312
226	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:18:11.673061
227	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:18:11.673068
228	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:19:15.737749
229	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:19:15.737718
230	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:20:05.568052
231	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:20:05.568072
232	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:22:49.017556
233	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:22:49.017604
234	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:29:44.182083
235	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:29:44.182042
236	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:33:09.328819
237	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:33:09.328779
238	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:33:56.787211
239	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:33:56.787211
240	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:35:28.964688
241	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:35:28.964764
243	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 06:36:08.104712
242	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 06:36:08.104703
244	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:01:11.665596
246	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:20:49.549447
267	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 00:57:15.635093
290	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:06:57.198515
311	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:45:17.669807
335	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 08:22:04.06343
337	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-01 03:49:47.221039
340	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 00:49:30.724958
360	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:09:02.630754
381	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 05:47:58.820839
401	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:23:41.339318
421	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:44:39.51537
433	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 01:08:17.875764
456	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 03:26:36.046025
477	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:38:08.467806
497	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:44:10.29101
517	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:59:52.99626
521	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 01:16:50.950693
541	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 04:36:34.441282
551	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 01:15:22.046813
571	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:24:22.445653
591	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:45:59.040466
611	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:49:28.869944
629	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-08 00:58:41.212762
649	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:24:31.609069
669	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:15:42.990604
689	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 06:43:36.913958
693	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-11 01:29:42.242444
247	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:20:49.549519
268	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 00:57:15.635037
291	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:15:03.421213
312	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:45:17.669861
336	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 08:22:04.063447
338	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-01 03:49:47.221123
339	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 00:49:30.724965
361	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:09:27.154309
382	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 05:48:58.606172
402	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:24:10.131617
422	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:44:39.55871
434	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 01:08:17.875918
457	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 03:27:53.398481
478	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:38:08.508856
498	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:44:10.328815
518	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:59:53.03575
522	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 01:16:50.992309
542	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 04:36:34.480898
552	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 01:15:22.087568
572	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:24:22.482739
592	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:45:59.076609
612	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:49:28.917352
630	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 00:58:41.256385
650	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:24:31.64717
670	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:15:43.039569
690	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 06:43:36.959426
694	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-11 01:29:42.280596
248	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:21:14.094484
269	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 01:34:45.08172
270	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 01:34:45.081773
292	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:15:03.421213
313	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:48:03.788692
341	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 01:24:50.720261
362	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:09:39.631274
383	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 05:48:58.606173
403	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:24:34.255106
423	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:44:52.396572
435	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 01:20:51.411708
458	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 03:27:53.398541
479	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:38:41.179745
499	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:45:01.524185
519	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 05:01:37.39991
523	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 01:24:55.362837
543	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 06:37:26.667663
553	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 01:36:29.291106
573	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:30:56.357471
593	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:46:43.149498
613	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:52:13.779168
631	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-08 01:40:21.704976
651	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:25:28.284601
671	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:17:59.009749
691	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 06:47:47.967845
249	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:21:14.09459
271	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 01:58:06.526596
293	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:15:38.709206
314	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:48:03.788896
342	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 01:24:50.720355
363	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 04:10:35.285906
384	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 05:50:36.766835
404	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:27:05.557528
424	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:44:52.396598
436	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 01:20:51.41174
459	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:11:53.126389
480	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:38:41.22008
500	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:45:01.564934
520	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 05:01:37.44504
524	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 01:24:55.402456
544	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 06:37:26.705143
554	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 01:36:29.330118
574	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:30:56.394896
594	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:46:43.18543
614	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:52:13.819046
632	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 01:40:21.750422
652	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:25:28.329223
672	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:17:59.050637
692	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 06:47:48.00921
250	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:22:43.935377
272	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 01:58:06.526644
294	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:15:38.709089
315	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:48:53.009381
316	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:48:53.009376
344	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 03:11:47.480915
364	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:10:35.338435
385	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 05:50:36.76684
405	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:28:55.155186
425	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:45:30.705321
438	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 01:28:46.15722
437	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 01:28:46.15722
460	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:11:53.126415
481	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:39:10.137725
501	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:48:51.857141
525	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 01:25:41.412668
545	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 08:36:25.465185
555	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:10:21.016545
575	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:32:23.457245
595	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 03:03:27.648184
615	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:54:30.745019
633	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-08 01:42:40.038954
653	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:34:30.768649
673	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:18:08.605132
251	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:22:43.935391
274	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 02:05:39.096694
273	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 02:05:39.096694
295	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:17:24.649963
317	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:50:01.177104
318	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:50:01.177104
343	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 03:11:47.480789
365	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 04:11:36.781936
386	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 05:51:42.794753
406	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:29:05.334272
426	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:45:30.748026
439	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 01:30:40.163479
462	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:12:34.29851
482	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:39:10.178781
502	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:48:51.894768
526	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 01:25:41.450923
546	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 08:36:25.501079
556	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:10:21.053577
576	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:32:23.496341
596	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 03:03:27.684298
616	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:54:30.783653
634	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 01:42:40.090748
654	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:34:30.806218
674	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:18:08.643865
252	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:23:02.226322
276	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 02:07:34.168273
275	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 02:07:34.168314
296	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:17:24.649909
319	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:51:14.612619
320	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:51:14.612615
345	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 03:17:22.769299
366	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:11:36.835474
387	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 05:51:42.794771
407	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:29:46.526569
427	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:46:30.284363
440	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 01:30:40.163589
461	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:12:34.298493
483	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:40:02.751133
503	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:49:57.267896
527	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 01:26:07.678016
547	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 08:52:42.900257
557	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:16:55.975604
577	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:32:52.357531
597	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 03:06:09.064636
617	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:54:43.882193
635	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 01:43:50.944222
655	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:34:51.111416
675	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:20:11.384136
253	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:23:19.132745
277	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 02:14:20.297223
297	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:20:57.492063
322	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:53:10.522709
346	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 03:17:22.769362
367	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:12:08.607742
388	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 05:52:02.769977
408	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:31:26.607831
428	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:46:30.325005
441	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 01:35:12.607109
464	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:14:25.722494
463	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:14:25.722494
484	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:40:02.795083
504	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:49:57.317152
528	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 01:26:07.717883
548	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 08:52:42.943677
558	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:16:56.011481
578	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:32:52.394506
598	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 03:06:09.107453
618	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:54:43.926834
636	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 01:43:50.991044
656	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:34:51.14855
676	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:20:11.429268
254	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:23:19.132905
278	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 02:14:20.29719
298	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:20:57.492063
321	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:53:10.522762
347	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 03:18:03.229765
348	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 03:18:03.229735
368	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 04:12:32.635292
389	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 05:52:02.770099
409	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:32:00.792464
429	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:47:01.458542
442	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 01:35:12.607208
465	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:22:57.633713
485	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:40:46.739176
505	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:50:54.210227
529	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 01:26:39.477993
549	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 08:55:23.42497
559	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:18:07.34759
579	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:33:36.636708
599	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 04:38:33.190051
619	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:55:43.976741
637	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:14:30.399683
657	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:34:59.008152
677	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:25:20.902771
255	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:42:10.395901
279	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 02:15:06.988887
299	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:41:45.492651
323	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:54:03.607111
349	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 03:21:05.17553
369	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:12:32.635292
391	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 06:45:38.68947
410	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:35:16.450793
430	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:47:01.458599
443	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 02:06:22.120223
466	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:22:57.633792
486	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:40:46.780695
506	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:50:54.253386
530	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 01:26:39.51749
550	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 08:55:23.462854
560	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:18:07.384338
580	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:33:36.672937
600	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 04:38:33.230909
620	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:55:44.01678
638	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:14:30.438104
658	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:34:59.057592
678	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:25:20.957352
256	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:42:10.39592
280	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 02:15:06.98901
300	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:41:45.492757
324	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:54:03.607134
350	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 03:21:05.17555
370	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:12:48.849906
390	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 06:45:38.689427
411	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:35:58.33803
431	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 08:17:15.771132
432	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 08:17:15.771132
444	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 02:06:22.120257
467	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:27:06.58067
487	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:41:20.317156
507	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:51:50.704206
531	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 01:30:53.186213
561	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:18:23.965254
581	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:34:11.650836
601	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:20:36.077792
621	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:56:33.781258
639	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:20:56.217099
659	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:35:46.908579
679	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:51:40.924784
257	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:46:04.719189
281	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 02:16:52.489105
301	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:54:23.263401
325	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:55:13.453688
351	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 03:24:47.318393
371	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:13:04.513768
392	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 06:50:03.113662
412	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:36:40.57244
446	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 02:07:53.639947
445	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 02:07:53.639888
468	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:27:06.580674
488	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:41:20.359154
508	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:51:50.744532
532	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 01:30:53.228997
562	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:18:24.00271
582	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:34:11.689513
602	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:20:36.116527
622	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:56:33.818421
640	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:20:56.256408
660	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:35:46.960317
680	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:51:40.963651
258	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:46:04.719299
282	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 02:16:52.489144
302	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:54:23.263441
326	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:55:13.453688
352	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 03:24:47.318445
372	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 04:13:20.680608
393	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 06:50:03.113662
413	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:38:16.182531
447	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 02:59:00.889741
469	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:27:32.037203
489	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:41:53.590856
509	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:53:17.086977
533	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 01:31:55.529892
563	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:19:26.23206
583	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:34:54.123674
603	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:22:00.745914
623	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 07:27:23.104977
641	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:21:46.193802
661	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:36:53.254291
681	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:51:56.749286
259	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:48:10.144091
284	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 02:43:34.405354
303	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:56:05.203056
327	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:56:20.314558
328	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:56:20.314558
353	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 03:58:53.39714
373	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:13:20.724471
394	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:01:43.857835
414	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:38:16.182629
448	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 02:59:00.889899
470	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:27:32.037183
490	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:41:53.630361
510	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:53:17.125169
534	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 01:31:55.571796
564	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:19:26.268708
584	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:34:54.158887
604	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:22:00.784889
624	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 07:27:23.146781
642	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:21:46.229674
662	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:36:53.291952
682	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:51:56.787331
260	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:48:10.14418
283	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 02:43:34.405372
304	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:56:05.203056
329	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 08:01:17.435094
354	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 03:59:13.073778
374	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 04:16:58.461158
395	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:01:43.857844
415	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:39:47.76115
449	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 02:59:39.72385
471	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:28:06.575461
491	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:42:12.572171
511	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:54:12.938442
535	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 01:43:35.939209
565	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:20:17.778407
585	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:36:16.712381
605	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:22:15.779767
625	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 08:33:44.375428
643	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:22:12.239475
663	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:03:15.514087
683	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:54:46.566475
261	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:49:33.609661
285	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:05:24.908399
305	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:57:36.236924
330	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 08:01:17.435149
355	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:02:19.216176
375	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:16:58.46111
396	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:03:26.293594
416	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:39:47.761159
450	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 02:59:39.723881
472	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:28:06.61434
492	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:42:12.610384
512	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:54:12.976909
536	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 01:43:35.983763
566	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:20:17.817842
586	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:36:16.771392
606	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:22:15.817762
626	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 08:33:44.417592
644	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:22:12.276744
664	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:03:15.55266
684	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:54:46.606167
262	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:49:33.609666
286	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:05:24.908305
306	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:57:36.236887
332	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 08:20:10.462698
356	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:05:57.033887
376	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 04:19:03.764479
397	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:03:26.293549
417	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:40:06.472862
451	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 03:17:44.916395
473	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:28:18.443713
493	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:42:53.644859
513	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:58:06.042674
537	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 04:33:04.661429
567	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:22:26.556946
587	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:37:20.662867
607	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:22:46.983525
627	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 09:13:11.561778
645	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:22:46.913998
665	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:08:19.677267
685	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:57:28.556946
264	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:50:42.732782
263	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 08:50:42.73276
287	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:05:59.691534
307	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:30:14.719427
308	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:30:14.719433
331	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 08:20:10.462609
357	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:07:55.887276
377	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:19:03.806336
398	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:08:07.739496
418	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:40:06.509328
452	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 03:17:44.916427
474	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:28:18.492566
494	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:42:53.68477
514	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:58:06.079843
538	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 04:33:04.7028
568	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:22:26.597043
588	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:37:20.706199
608	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:22:47.020181
628	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 09:13:11.60238
646	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:22:46.9522
666	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:08:19.71627
686	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:57:28.593884
266	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 09:34:06.809223
288	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 03:05:59.691514
309	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 07:43:55.139381
334	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 08:21:29.970604
358	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:08:14.617629
379	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:29:20.898693
378	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 04:29:20.898848
399	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:08:07.739493
419	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:43:41.758712
454	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 03:25:50.391237
453	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 03:25:50.391207
475	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:37:50.982517
495	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:43:26.227599
515	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-05 04:58:42.265964
539	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-06 04:36:06.110678
569	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:23:09.599249
589	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 02:45:24.776226
609	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-07 06:24:15.096226
647	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 02:24:09.477317
667	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 03:13:45.318187
687	TNK-SRV	1.1.1	5	\N	Starting application	2022-04-08 04:43:25.502877
265	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-30 09:34:06.809226
289	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 03:06:57.198515
310	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-31 07:43:55.139381
333	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-03-31 08:21:29.970455
359	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 04:08:42.631831
380	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 05:47:58.820882
400	TNK-SRV	0.0.1	5	\N	Starting application	2022-04-04 07:23:41.285646
420	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-04 07:43:41.799538
455	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 03:26:36.045967
476	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:37:51.025038
496	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:43:26.267831
516	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-05 04:58:42.304831
540	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-06 04:36:06.149019
570	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:23:09.644427
590	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 02:45:24.811817
610	TNK-SRV	0.0.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-07 06:24:15.135247
648	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 02:24:09.514982
668	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 03:13:45.354856
688	TNK-SRV	1.1.1	5	\N	app listening on port 4555, node: v16.14.0	2022-04-08 04:43:25.543397
245	TNK-SRV	0.0.1	5	\N	Starting application	2022-03-30 08:01:11.665617
\.


--
-- Data for Name: integration_log; Type: TABLE DATA; Schema: log; Owner: postgres
--

COPY log.integration_log (id, integration_response, requers_from_date, request_offset, date_created) FROM stdin;
\.


--
-- Data for Name: approval_queue; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.approval_queue (id, tnk_id, subproc_id, is_approved, description, group_num, date_created, user_ip, last_updated_by) FROM stdin;
5	2	1	t	\N	1	2022-04-06 01:59:03.471	null	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
6	6	1	t	\N	1	2022-04-06 02:00:22.041	null	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
7	4	1	t	\N	1	2022-04-06 02:19:20.407	null	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
9	1	1	t	\N	1	2022-04-06 02:20:38.298	null	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
\.


--
-- Data for Name: approval_setup; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.approval_setup (id, subproc_id, sort_order, user_id, is_active, description, group_num, date_created, last_updated, last_updated_by) FROM stdin;
1	1	1	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	t		1	2022-03-28 06:12:22.743	2022-03-28 06:12:22.743	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
2	1	1	86f3ccd0-ae64-11ec-b376-676bd2ce9d5c	f		1	2022-03-28 07:05:10.379	2022-04-01 10:51:39.357	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
8	1	1	4c0ce622-ae3b-11ec-acf4-d14cf798f2e6	t	\N	1	2022-04-07 01:36:49.226	2022-04-07 01:36:49.226	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
\.


--
-- Data for Name: ip_to_account; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.ip_to_account (id, ip, username, account_id, date_created, last_updated, last_updated_by) FROM stdin;
1	127.0.0.1	Admin1	176050a0-afcc-11ec-b296-cf67c9492c6a	2022-03-30 01:55:27.9	2022-03-30 01:55:27.9	d7cb85d0-af40-11ec-b96f-b9a1c45dfbc9
\.


--
-- Data for Name: ip_to_load; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.ip_to_load (id, ip, description, date_created) FROM stdin;
\.


--
-- Data for Name: operation; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.operation (id, title, duration, is_active, unit_id, source_id, doc_num, date_created, last_updated, last_updated_by) FROM stdin;
1	123	5	t	\N	7	1	2022-03-28 06:13:17.896	2022-03-31 14:36:28.919	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
2	Операция 1	5	t	\N	7	2	2022-04-05 01:54:07.016	2022-04-07 03:01:24.018	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
\.


--
-- Data for Name: process; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.process (id, title, code, is_active, date_created, last_updated, last_updated_by) FROM stdin;
1	Процесс 2	1	t	2022-03-28 06:08:45.063	2022-04-07 03:00:08.129	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
\.


--
-- Data for Name: profile_to_subprocess; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.profile_to_subprocess (id, profile_id, subprocess_id, is_active, date_created, last_updated, last_updated_by) FROM stdin;
5	1	1	t	2022-03-31 02:09:38.71	2022-03-31 02:09:38.71	e022ab20-b00b-11ec-aa1a-43c3f61aac31
\.


--
-- Data for Name: protocol; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.protocol (id, object_id, object_type, description, date_created, last_updated, last_updated_by, user_ip) FROM stdin;
1	2	1	Время	2022-03-31 14:35:43.388	2022-03-31 14:35:43.388	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	::1
2	2	1	Доработка	2022-03-31 15:52:30.182	2022-03-31 15:52:30.182	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	::1
3	2	1	Проверка	2022-04-05 10:07:49.631	2022-04-05 10:07:49.631	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	::1
4	2	1	123123123	2022-04-06 01:43:48.159	2022-04-06 01:43:48.159	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
5	2	1	12312312313	2022-04-06 01:43:56.27	2022-04-06 01:43:56.27	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
6	2	1	123123	2022-04-06 01:45:23.481	2022-04-06 01:45:23.481	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
7	2	1	11111111	2022-04-06 01:46:24.021	2022-04-06 01:46:24.021	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
8	2	1	gdfgfdgdgfdgdg	2022-04-06 01:46:55.127	2022-04-06 01:46:55.127	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
9	2	1	123131231232131	2022-04-06 01:47:27.246	2022-04-06 01:47:27.246	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
10	2	1	fdgdfgdgdgd	2022-04-06 01:47:53.912	2022-04-06 01:47:53.912	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
11	2	1	sdfsdfsdfsf	2022-04-06 01:48:27.841	2022-04-06 01:48:27.841	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
12	2	1	12312321313	2022-04-06 01:48:58.559	2022-04-06 01:48:58.559	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
13	2	1	1231231231	2022-04-06 01:52:49.298	2022-04-06 01:52:49.298	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
14	6	1	рассмотреть	2022-04-06 01:59:18.933	2022-04-06 01:59:18.933	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
15	1	1	231231231	2022-04-06 02:20:21.242	2022-04-06 02:20:21.242	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
\.


--
-- Data for Name: protocol_type; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.protocol_type (id, title, date_created) FROM stdin;
1	ТНК	2022-03-28 02:03:47.750147
\.


--
-- Data for Name: subprocess; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.subprocess (id, title, code, espp_obj, is_active, process_id, date_created, last_updated, last_updated_by) FROM stdin;
1	Подпроцесс 1	1	Управление запросами	t	1	2022-03-28 06:12:12.909	2022-04-07 03:00:16.803	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
\.


--
-- Data for Name: tnk; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk (id, title, is_active, is_fixed, parent_id, is_group, child_sort_order, status_id, subprocess_id, tnk_type, date_created, last_updated, last_updated_by, user_ip) FROM stdin;
2	123	f	t	\N	\N	\N	30	1	общий	2022-03-29 09:00:34.614	2022-04-07 02:11:28.696395	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	::1
6	ТНК 4 (выведена 06.04.2022 09:18)	f	t	\N	\N	\N	50	1	общий	2022-04-05 03:20:06.976	2022-04-07 02:11:28.696395	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
4	321	f	t	\N	\N	\N	30	1	общий	2022-04-04 13:54:13.231	2022-04-07 02:11:28.696395	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	::1
1	ТНК 1	f	t	\N	\N	\N	30	1	общий	2022-03-28 06:12:44.613	2022-04-07 02:11:28.696395	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	\N
5	ТНК 3	t	t	\N	\N	\N	10	1	общий	2022-04-05 03:18:09.83	2022-04-07 03:04:22.212	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
3	ТНК 2	t	t	\N	\N	\N	20	1	общий	2022-04-01 10:53:31.773	2022-04-08 03:05:08.55	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
7	ТНК 2 - копия	t	t	\N	\N	\N	10	1	общий	2022-04-06 08:58:47.226622	2022-04-08 05:35:39.511005	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6	null
\.


--
-- Data for Name: tnk_import_progress; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_import_progress (id, total_val, current_val, error_descr, date_created, last_updated_by) FROM stdin;
\.


--
-- Data for Name: tnk_to_ci; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_to_ci (id, tnk_id, ci, is_active, date_created, last_updated, last_updated_by) FROM stdin;
1	1	КОДЕКС	t	2022-03-28 06:12:52.289	2022-03-28 06:12:52.289	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
2	2	КОДЕКС	t	2022-03-29 09:00:55.248	2022-03-29 09:00:55.248	dfc37fc0-af3d-11ec-8251-edbd39bcba5d
5	6	КОДЕКС	t	2022-04-05 03:20:32.446	2022-04-05 03:20:32.446	05051c70-b16f-11ec-8396-fbe92e5c617a
\.


--
-- Data for Name: tnk_to_ci_type; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_to_ci_type (id, tnk_id, ci_type, is_active, date_created, last_updated, last_updated_by) FROM stdin;
\.


--
-- Data for Name: tnk_to_operation; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_to_operation (id, tnk_id, operation_id, amount, title, sort_order, is_active, result_desc, source_desc, assignee, date_created, last_updated, last_updated_by) FROM stdin;
1	1	1	1	123	1	t	\N	\N	сотрудник	2022-03-28 06:13:30.513	2022-03-28 06:13:30.513	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
3	2	1	5	123	2	t	\N	\N	сотрудник	2022-03-31 14:36:16.067	2022-03-31 14:36:16.067	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
4	4	1	1	1234	1	t	\N	\N	сотрудник	2022-04-05 09:02:23.922	2022-04-05 09:02:23.922	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
5	4	2	1	Операция 2	2	t	\N	\N	робот	2022-04-05 02:08:41.051	2022-04-05 02:08:41.051	05051c70-b16f-11ec-8396-fbe92e5c617a
7	\N	\N	\N	\N	3	\N	\N	\N	\N	2022-04-05 02:20:18.513	2022-04-05 02:20:18.513	05051c70-b16f-11ec-8396-fbe92e5c617a
8	6	1	1	123	1	t	\N	\N	сотрудник	2022-04-05 03:20:44.13	2022-04-05 03:20:44.13	05051c70-b16f-11ec-8396-fbe92e5c617a
9	3	2	1	Операция	1	t	\N	\N	сотрудник	2022-04-07 08:00:06.118	2022-04-07 08:00:06.118	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
11	7	1	1	операция	1	t	\N	\N	сотрудник	2022-04-08 02:40:38.281	2022-04-08 05:35:25.562	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
12	7	2	1	операция1	2	t	\N	\N	сотрудник	2022-04-08 05:35:39.49	2022-04-08 05:35:39.49	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
\.


--
-- Data for Name: tnk_to_wg; Type: TABLE DATA; Schema: tnk; Owner: postgres
--

COPY tnk.tnk_to_wg (id, tnk_id, wg, is_active, date_created, last_updated, last_updated_by) FROM stdin;
1	1	КОДЕКС	t	2022-03-28 06:12:57.032	2022-03-28 06:12:57.032	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
2	2	КОДЕКС	t	2022-03-29 09:00:59.481	2022-03-29 09:00:59.481	dfc37fc0-af3d-11ec-8251-edbd39bcba5d
9	6	КОДЕКС	t	2022-04-05 03:20:37.098	2022-04-05 03:20:37.098	05051c70-b16f-11ec-8396-fbe92e5c617a
17	3	КОДЕКС	t	2022-04-08 03:04:13.938	2022-04-08 03:04:13.938	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
18	7	КОДЕКС-ДВС	t	2022-04-08 03:04:22.442	2022-04-08 03:04:22.442	4c0ce620-ae3b-11ec-acf4-d14cf798f2e6
\.


--
-- Name: attachment_id_seq; Type: SEQUENCE SET; Schema: attach; Owner: postgres
--

SELECT pg_catalog.setval('attach.attachment_id_seq', 1, false);


--
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.profile_id_seq', 8300, true);


--
-- Name: requestmap_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: postgres
--

SELECT pg_catalog.setval('auth.requestmap_id_seq', 22, true);


--
-- Name: dict_item_id_seq; Type: SEQUENCE SET; Schema: dict; Owner: postgres
--

SELECT pg_catalog.setval('dict.dict_item_id_seq', 9, true);


--
-- Name: app_log_id_seq; Type: SEQUENCE SET; Schema: log; Owner: postgres
--

SELECT pg_catalog.setval('log.app_log_id_seq', 694, true);


--
-- Name: integration_log_id_seq; Type: SEQUENCE SET; Schema: log; Owner: postgres
--

SELECT pg_catalog.setval('log.integration_log_id_seq', 1, false);


--
-- Name: approval_queue_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.approval_queue_id_seq', 9, true);


--
-- Name: approval_setup_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.approval_setup_id_seq', 8, true);


--
-- Name: ip_to_account_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.ip_to_account_id_seq', 1, true);


--
-- Name: ip_to_load_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.ip_to_load_id_seq', 1, false);


--
-- Name: operation_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.operation_id_seq', 2, true);


--
-- Name: process_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.process_id_seq', 1, true);


--
-- Name: profile_to_subprocess_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.profile_to_subprocess_id_seq', 5, true);


--
-- Name: protocol_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.protocol_id_seq', 15, true);


--
-- Name: subprocess_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.subprocess_id_seq', 3, true);


--
-- Name: tnk_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_id_seq', 7, true);


--
-- Name: tnk_import_progress_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_import_progress_id_seq', 1, false);


--
-- Name: tnk_to_ci_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_to_ci_id_seq', 12, true);


--
-- Name: tnk_to_ci_type_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_to_ci_type_id_seq', 1, false);


--
-- Name: tnk_to_operation_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_to_operation_id_seq', 12, true);


--
-- Name: tnk_to_wg_id_seq; Type: SEQUENCE SET; Schema: tnk; Owner: postgres
--

SELECT pg_catalog.setval('tnk.tnk_to_wg_id_seq', 18, true);


--
-- Name: attachment attachment_pkey; Type: CONSTRAINT; Schema: attach; Owner: postgres
--

ALTER TABLE ONLY attach.attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (id);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: requestmap requestmap_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.requestmap
    ADD CONSTRAINT requestmap_pkey PRIMARY KEY (id);


--
-- Name: role_account role_account_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role_account
    ADD CONSTRAINT role_account_pkey PRIMARY KEY (role_id, account_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: token token_pkey; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


--
-- Name: account uk_account_username; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.account
    ADD CONSTRAINT uk_account_username UNIQUE (username);


--
-- Name: profile uk_profile_title; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.profile
    ADD CONSTRAINT uk_profile_title UNIQUE (title);


--
-- Name: role uk_role_title; Type: CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role
    ADD CONSTRAINT uk_role_title UNIQUE (title);


--
-- Name: dict_item dict_item_pkey; Type: CONSTRAINT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_item
    ADD CONSTRAINT dict_item_pkey PRIMARY KEY (id);


--
-- Name: dict_type dict_type_pkey; Type: CONSTRAINT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_type
    ADD CONSTRAINT dict_type_pkey PRIMARY KEY (id);


--
-- Name: app_log app_log_pkey; Type: CONSTRAINT; Schema: log; Owner: postgres
--

ALTER TABLE ONLY log.app_log
    ADD CONSTRAINT app_log_pkey PRIMARY KEY (id);


--
-- Name: integration_log integration_log_pkey; Type: CONSTRAINT; Schema: log; Owner: postgres
--

ALTER TABLE ONLY log.integration_log
    ADD CONSTRAINT integration_log_pkey PRIMARY KEY (id);


--
-- Name: approval_queue approval_queue_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_queue
    ADD CONSTRAINT approval_queue_pkey PRIMARY KEY (id);


--
-- Name: approval_setup approval_setup_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_setup
    ADD CONSTRAINT approval_setup_pkey PRIMARY KEY (id);


--
-- Name: ip_to_account ip_to_account_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_account
    ADD CONSTRAINT ip_to_account_pkey PRIMARY KEY (id);


--
-- Name: ip_to_load ip_to_load_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_load
    ADD CONSTRAINT ip_to_load_pkey PRIMARY KEY (id);


--
-- Name: operation operation_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.operation
    ADD CONSTRAINT operation_pkey PRIMARY KEY (id);


--
-- Name: process process_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.process
    ADD CONSTRAINT process_pkey PRIMARY KEY (id);


--
-- Name: profile_to_subprocess profile_to_subprocess_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess
    ADD CONSTRAINT profile_to_subprocess_pkey PRIMARY KEY (id);


--
-- Name: protocol protocol_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.protocol
    ADD CONSTRAINT protocol_pkey PRIMARY KEY (id);


--
-- Name: protocol_type protocol_type_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.protocol_type
    ADD CONSTRAINT protocol_type_pkey PRIMARY KEY (id);


--
-- Name: subprocess subprocess_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.subprocess
    ADD CONSTRAINT subprocess_pkey PRIMARY KEY (id);


--
-- Name: tnk_import_progress tnk_import_progress_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_import_progress
    ADD CONSTRAINT tnk_import_progress_pkey PRIMARY KEY (id);


--
-- Name: tnk tnk_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk
    ADD CONSTRAINT tnk_pkey PRIMARY KEY (id);


--
-- Name: tnk_to_ci tnk_to_ci_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci
    ADD CONSTRAINT tnk_to_ci_pkey PRIMARY KEY (id);


--
-- Name: tnk_to_ci_type tnk_to_ci_type_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci_type
    ADD CONSTRAINT tnk_to_ci_type_pkey PRIMARY KEY (id);


--
-- Name: tnk_to_operation tnk_to_operation_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_operation
    ADD CONSTRAINT tnk_to_operation_pkey PRIMARY KEY (id);


--
-- Name: tnk_to_wg tnk_to_wg_pkey; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_wg
    ADD CONSTRAINT tnk_to_wg_pkey PRIMARY KEY (id);


--
-- Name: ip_to_account uk_ip_to_account_account_id; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_account
    ADD CONSTRAINT uk_ip_to_account_account_id UNIQUE (account_id, ip);


--
-- Name: operation uk_operation_title; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.operation
    ADD CONSTRAINT uk_operation_title UNIQUE (title);


--
-- Name: process uk_process_title; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.process
    ADD CONSTRAINT uk_process_title UNIQUE (title);


--
-- Name: profile_to_subprocess uk_profile_to_subprocess_profile_id; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess
    ADD CONSTRAINT uk_profile_to_subprocess_profile_id UNIQUE (profile_id, subprocess_id);


--
-- Name: subprocess uk_subprocess_title; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.subprocess
    ADD CONSTRAINT uk_subprocess_title UNIQUE (title, process_id);


--
-- Name: tnk uk_tnk_title; Type: CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk
    ADD CONSTRAINT uk_tnk_title UNIQUE (title, subprocess_id);


--
-- Name: account fk_account__profile_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.account
    ADD CONSTRAINT fk_account__profile_id FOREIGN KEY (profile_id) REFERENCES auth.profile(id);


--
-- Name: requestmap fk_requestmap__role_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.requestmap
    ADD CONSTRAINT fk_requestmap__role_id FOREIGN KEY (role_id) REFERENCES auth.role(id);


--
-- Name: role_account fk_role_account__account_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role_account
    ADD CONSTRAINT fk_role_account__account_id FOREIGN KEY (account_id) REFERENCES auth.account(id);


--
-- Name: role_account fk_role_account__role_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.role_account
    ADD CONSTRAINT fk_role_account__role_id FOREIGN KEY (role_id) REFERENCES auth.role(id);


--
-- Name: token fk_token__account_id; Type: FK CONSTRAINT; Schema: auth; Owner: postgres
--

ALTER TABLE ONLY auth.token
    ADD CONSTRAINT fk_token__account_id FOREIGN KEY (account_id) REFERENCES auth.account(id);


--
-- Name: dict_item fk_dict_item__dict_type_id; Type: FK CONSTRAINT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_item
    ADD CONSTRAINT fk_dict_item__dict_type_id FOREIGN KEY (dict_type_id) REFERENCES dict.dict_type(id);


--
-- Name: dict_item fk_dict_item__parent_id; Type: FK CONSTRAINT; Schema: dict; Owner: postgres
--

ALTER TABLE ONLY dict.dict_item
    ADD CONSTRAINT fk_dict_item__parent_id FOREIGN KEY (parent_id) REFERENCES dict.dict_item(id);


--
-- Name: approval_queue fk_approval_queue__subproc_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_queue
    ADD CONSTRAINT fk_approval_queue__subproc_id FOREIGN KEY (subproc_id) REFERENCES tnk.subprocess(id);


--
-- Name: approval_queue fk_approval_queue__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_queue
    ADD CONSTRAINT fk_approval_queue__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- Name: approval_setup fk_approval_setup__subproc_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.approval_setup
    ADD CONSTRAINT fk_approval_setup__subproc_id FOREIGN KEY (subproc_id) REFERENCES tnk.subprocess(id);


--
-- Name: ip_to_account fk_ip_to_account__account_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.ip_to_account
    ADD CONSTRAINT fk_ip_to_account__account_id FOREIGN KEY (account_id) REFERENCES auth.account(id);


--
-- Name: profile_to_subprocess fk_profile_to_subprocess__profile_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess
    ADD CONSTRAINT fk_profile_to_subprocess__profile_id FOREIGN KEY (profile_id) REFERENCES auth.profile(id);


--
-- Name: profile_to_subprocess fk_profile_to_subprocess__subprocess_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.profile_to_subprocess
    ADD CONSTRAINT fk_profile_to_subprocess__subprocess_id FOREIGN KEY (subprocess_id) REFERENCES tnk.subprocess(id);


--
-- Name: protocol fk_protocol__object_type; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.protocol
    ADD CONSTRAINT fk_protocol__object_type FOREIGN KEY (object_type) REFERENCES tnk.protocol_type(id);


--
-- Name: subprocess fk_subprocess__process_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.subprocess
    ADD CONSTRAINT fk_subprocess__process_id FOREIGN KEY (process_id) REFERENCES tnk.process(id);


--
-- Name: tnk fk_tnk__subprocess_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk
    ADD CONSTRAINT fk_tnk__subprocess_id FOREIGN KEY (subprocess_id) REFERENCES tnk.subprocess(id);


--
-- Name: tnk_to_ci fk_tnk_to_ci__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci
    ADD CONSTRAINT fk_tnk_to_ci__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- Name: tnk_to_ci_type fk_tnk_to_ci_type__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_ci_type
    ADD CONSTRAINT fk_tnk_to_ci_type__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- Name: tnk_to_operation fk_tnk_to_operation__operation_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_operation
    ADD CONSTRAINT fk_tnk_to_operation__operation_id FOREIGN KEY (operation_id) REFERENCES tnk.operation(id);


--
-- Name: tnk_to_operation fk_tnk_to_operation__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_operation
    ADD CONSTRAINT fk_tnk_to_operation__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- Name: tnk_to_wg fk_tnk_to_wg__tnk_id; Type: FK CONSTRAINT; Schema: tnk; Owner: postgres
--

ALTER TABLE ONLY tnk.tnk_to_wg
    ADD CONSTRAINT fk_tnk_to_wg__tnk_id FOREIGN KEY (tnk_id) REFERENCES tnk.tnk(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "vkparser" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

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

--
-- Name: vkparser; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE vkparser WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE vkparser OWNER TO postgres;

\connect vkparser

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

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

