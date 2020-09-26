use bills;

create table if not exists rent (
  id int auto_increment primary key,
  rent_total int,
  day int
);

create table if not exists tenants (
  id int auto_increment primary key,
  rent int,
  first_name text,
  last_name text,
  foreign key (rent) references rent (id) on delete cascade
);

create table if not exists address (
  rent int,
  street_address text,
  city text,
  state text,
  zip_code text,
  foreign key (rent) references rent (id) on delete cascade
);

create table if not exists rent_payments (
  tenant int,
  rent int,
  month int,
  day int,
  year int,
  payed bool,
  total int,
  percentage int,
  foreign key (tenant) references tenants (id) on delete cascade,
  foreign key (rent) references rent (id) on delete cascade
);

create table deposit (
  rent int,
  deposit_total int,
  remainder int,
  foreign key (rent) references rent (id) on delete cascade
)

create table if not exists deposit_payments (
    tenant int,
    deposit int,
    month int,
    day int,
    year int,
    payed bool,
    total int,
    percentage int,
    foreign key (tenant) references tenants (id) on delete cascade
)

create table if not exists utilities (
  id int auto_increment primary key,
  rent int,
  name text,
  foreign key (rent) references rent (id) on delete cascade
);

create table if not exists utility_bills (
  id int auto_increment primary key,
  utility int,
  amount int,
  month int,
  day int,
  year int,
  foreign key (utility) references utilities (id) on delete cascade
);

create table if not exists utility_payments (
  tenant int,
  utility int,
  month int,
  day int,
  year int,
  payed bool,
  total int,
  percentage int,
  foreign key (tenant) references tenants (id) on delete cascade,
  foreign key (utility) references utilities (id) on delete cascade
);
