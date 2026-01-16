-- Run these SQL commands in your Supabase SQL Editor to update the table structure

-- Add 'color' column if it doesn't exist
do $$ 
begin
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'color') then
        alter table orders add column color text;
    end if;
end $$;

-- Add 'quantity' column if it doesn't exist (default to 1)
do $$ 
begin
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'quantity') then
        alter table orders add column quantity integer default 1;
    end if;
end $$;

-- Ensure size columns exist (if table was created previously without them)
do $$ 
begin
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'size') then
        alter table orders add column size text;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'jacket_size') then
        alter table orders add column jacket_size text;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'orders' and column_name = 'pants_size') then
        alter table orders add column pants_size text;
    end if;
end $$;
