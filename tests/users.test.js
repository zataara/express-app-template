process.env.NODE_ENV = "test";
const request = require("supertest");
const app = requrie('../app');
const db = require("../db")