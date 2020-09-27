use bills;

create table if not exists rent (
  id int auto_increment primary key,
  rent_total int,
  due_day int
);

create table if not exists rent_bills (
  rent int,
  month int,
  year int,
  foreign key (rent) references rent (id) on delete cascade
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
  rpayment_month int,
  rpayment_day int,
  rpayment_year int,
  rpayment_payed bool,
  rpayment_total int,
  rpayment_percentage int,
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
  upayment_month int,
  upayment_day int,
  upayment_year int,
  upayment_payed bool,
  upayment_total int,
  upayment_percentage int,
  foreign key (tenant) references tenants (id) on delete cascade,
  foreign key (utility) references utilities (id) on delete cascade
);
