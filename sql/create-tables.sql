use bills;

-- drop tables commands
drop table if exists utility_payments;
drop table if exists utility_bills;
drop table if exists utilities;
drop table if exists deposit_payments;
drop table if exists deposit;
drop table if exists rent_payments;
drop table if exists rent_bills;
drop table if exists address;
drop table if exists tenants;
drop table if exists rent;


create table if not exists rent (
  id int auto_increment primary key,
  rent_total int,
  due_day int
);

create table if not exists rent_bills (
  rbill_id int auto_increment primary key,
  rent int,
  rbill_month int,
  rbill_year int,
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
  foreign key (rent	) references rent (id) on delete cascade
);

create table if not exists rent_payments (
  tenant int,
  rent int,
  rbill int,
  rpayment_month int,
  rpayment_day int,
  rpayment_year int,
  rpayment_payed bool,
  rpayment_total int,
  rpayment_percentage int,
  foreign key (tenant) references tenants (id) on delete cascade,
  foreign key (rent) references rent (id) on delete cascade,
  foreign key (rbill) references rent_bills (rbill_id) on delete cascade
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
  ubill_id int auto_increment primary key,
  utility int,
  ubill_amount int,
  ubill_month int,
  ubill_day int,
  ubill_year int,
  foreign key (utility) references utilities (id) on delete cascade
);

create table if not exists utility_payments (
  tenant int,
  utility int,
  upayment_bill int,
  upayment_month int,
  upayment_day int,
  upayment_year int,
  upayment_payed bool,
  upayment_total int,
  upayment_percentage int,
  foreign key (tenant) references tenants (id) on delete cascade,
  foreign key (utility) references utilities (id) on delete cascade,
  foreign key (upayment_bill) references utility_bills (ubill_id) on delete cascade
);
