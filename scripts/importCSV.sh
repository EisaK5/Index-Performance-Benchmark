DIRECTORY=
DB_URL=""
PGPASSWORD=
CREATE TABLE IF NOT EXISTS stock_staging(
  date DATE,
  open DOUBLE PRECISION,
  high DOUBLE PRECISION,
  low DOUBLE PRECISION,
  close DOUBLE PRECISION,
  volume BIGINT,
  openint DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS stocks(
  id SERIAL PRIMARY KEY,
  source_file VARCHAR(255),
  date DATE,
  open DOUBLE PRECISION,
  high DOUBLE PRECISION,
  low DOUBLE PRECISION,
  close DOUBLE PRECISION,
  volume BIGINT,
  openint DOUBLE PRECISION
);"

for file in "$DIRECTORY"/*.txt
do
    filename="$(basename "$file")"
    echo "importing $filename"

    PG
BEGIN;
TRUNCATE stock_staging;
\copy stock_staging(date, open, high, low, close, volume, openint) FROM '$file' WITH (FORMAT csv, HEADER true, DELIMITER ',')
INSERT INTO stocks (source_file, date, open, high, low, close, volume, openint) 
SELECT '$filename', date, open, high, low, close, volume, openint 
FROM stock_staging;
COMMIT;
SQL
done