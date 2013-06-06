-- To create tables on Heroku
-- psql -h ec2-23-21-129-125.compute-1.amazonaws.com -p 5432 -d d99a7sr6909d48 -U isqxerhcimjeod -f schema.sql

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.2
-- Dumped by pg_dump version 9.2.2
-- Started on 2013-06-05 23:50:41 BRT

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 172 (class 3079 OID 11995)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2211 (class 0 OID 0)
-- Dependencies: 172
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 168 (class 1259 OID 410732)
-- Name: messages; Type: TABLE; Schema: public; Owner: isqxerhcimjeod; Tablespace: 
--

CREATE TABLE messages (
    id character varying(256) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    body text,
    user_id character varying(256),
    room_id character varying(256)
);


ALTER TABLE public.messages OWNER TO isqxerhcimjeod;

--
-- TOC entry 169 (class 1259 OID 410740)
-- Name: passports; Type: TABLE; Schema: public; Owner: isqxerhcimjeod; Tablespace: 
--

CREATE TABLE passports (
    id character varying(256) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    auth_type character varying(256),
    key character varying(256),
    user_id character varying(256)
);


ALTER TABLE public.passports OWNER TO isqxerhcimjeod;

--
-- TOC entry 170 (class 1259 OID 410748)
-- Name: rooms; Type: TABLE; Schema: public; Owner: isqxerhcimjeod; Tablespace: 
--

CREATE TABLE rooms (
    id character varying(256) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    title character varying(256),
    slug character varying(256),
    avatar character varying(256),
    user_id character varying(256)
);


ALTER TABLE public.rooms OWNER TO isqxerhcimjeod;

--
-- TOC entry 171 (class 1259 OID 410756)
-- Name: users; Type: TABLE; Schema: public; Owner: isqxerhcimjeod; Tablespace: 
--

CREATE TABLE users (
    id character varying(256) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    username character varying(256),
    password character varying(256),
    name character varying(256),
    email character varying(256),
    avatar character varying(256),
    room_id character varying(256)
);


ALTER TABLE public.users OWNER TO isqxerhcimjeod;

--
-- TOC entry 2197 (class 2606 OID 410739)
-- Name: messages_pkey; Type: CONSTRAINT; Schema: public; Owner: isqxerhcimjeod; Tablespace: 
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 2199 (class 2606 OID 410747)
-- Name: passports_pkey; Type: CONSTRAINT; Schema: public; Owner: isqxerhcimjeod; Tablespace: 
--

ALTER TABLE ONLY passports
    ADD CONSTRAINT passports_pkey PRIMARY KEY (id);


--
-- TOC entry 2201 (class 2606 OID 410755)
-- Name: rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: isqxerhcimjeod; Tablespace: 
--

ALTER TABLE ONLY rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- TOC entry 2203 (class 2606 OID 410763)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: isqxerhcimjeod; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2210 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: isqxerhcimjeod
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM isqxerhcimjeod;
GRANT ALL ON SCHEMA public TO isqxerhcimjeod;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2013-06-05 23:50:41 BRT

--
-- PostgreSQL database dump complete
--

