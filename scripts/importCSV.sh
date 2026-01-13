
psql -U postgres -d stockDB -c "CREATE TABLE stock_staging(date DATE, open FLOAT, high FLOAT, low FLOAT, close FLOAT, volume BIGINT, openint FLOAT);"
for file in "$DIRECTORY"/*.txt
do
    filename="$(basename "$file")"
    echo "importing $filename"

    #truncate, load file, move data 
    psql "" <<SQL BEGIN;
    TRUNCATE stock_staging;
    \copy stock_staging(date, open, high, low, close, volume, openint) FROM '$file' WITH (FORMAT csv, HEADER true);
    INSERT INTO stocks (source_file, date, open, high, low, close, volume, openint) 
    SELECT ('$filename', date, open, high, low, close, volume, openint) FROM stock_staging;
    COMMIT;
    SQL
done