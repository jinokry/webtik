/*
  # Create downloads history table

  1. New Tables
    - `downloads`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `url` (text)
      - `title` (text)
      - `author` (text)
      - `format` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `downloads` table
    - Add policy for authenticated users to read their own downloads
    - Add policy for authenticated users to insert their own downloads
*/

CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  url text NOT NULL,
  title text NOT NULL,
  author text NOT NULL,
  format text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own downloads"
  ON downloads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own downloads"
  ON downloads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);