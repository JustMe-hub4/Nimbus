-- Initialize TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Create database if it doesn't exist (handled by POSTGRES_DB env var)
-- This script runs after the database is created
