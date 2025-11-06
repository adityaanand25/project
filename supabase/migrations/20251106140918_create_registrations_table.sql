/*
  # Create registrations table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key) - Unique identifier for each registration
      - `email` (text, unique) - User's email address
      - `full_name` (text) - User's full name
      - `created_at` (timestamptz) - Registration timestamp
  
  2. Security
    - Enable RLS on `registrations` table
    - Add policy for authenticated users to read their own registration
    - Add policy for anyone to create a registration (public registration)
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a registration"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view own registration"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);