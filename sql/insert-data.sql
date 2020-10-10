use bills;

 -- rent insert
 -- rent_total, due_day
insert into rent (rent_total,due_day) values (2100,1);
insert into rent (rent_total,due_day) values (4200,5);

-- tenants insert
-- rent, first_name, last_name
insert into tenants (rent,first_name,last_name) values (1,'first','last');
insert into tenants (rent,first_name,last_name) values (1,'super','man');
insert into tenants (rent,first_name,last_name) values (1,'bat','man');
insert into tenants (rent,first_name,last_name) values (1,'eddie','dean');

-- address insert
-- street_address, city, state, zip_code
insert into address values (1,'street address','citt','ST','00000');

-- deposit insert
-- rent, deposit_total, remainder
insert into deposit values (1,4200,2100);

-- utilities insert
-- rent, name
insert into utilities (rent,name) values (1,'electricity');
insert into utilities (rent,name) values (1,'water');
insert into utilities (rent,name) values (1,'internet');
insert into utilities (rent,name) values (1,'recology');

-- rent_bills insert
-- rbill_d, rent, rbill_month, rbill_year
insert into rent_bills (rent,rbill_month,rbill_year) values (1,10,2020);
insert into rent_bills (rent,rbill_month,rbill_year) values (1,11,2020);

-- rent_payments insert
-- tenant, rent, rbill, rpayment_month, rpayment_day, rpayment_year, rpayment_payed, rpayment_amount, rpayment_percentage
insert into rent_payments values (1,1,2,10,2,2020,true,525,25);
insert into rent_payments values (2,1,2,10,3,2020,true,525,25);

-- deposit_payments insert
-- tenant, deposit, month, day, year, payed, amount, percentage
insert into deposit_payments values (1,1,8,7,2020,true,1050,25);

-- utility_bills insert
-- id, utility, ubill_amount, ubill_month, ubill_day, ubill_year
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (1,100,9,7,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (1,100,10,5,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (1,105,11,5,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (2,120,9,15,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (2,110,10,15,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (2,112,11,15,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (3,70,9,10,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (3,90,10,10,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (3,93,11,10,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (4,90,9,25,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (4,97,10,25,2020);
insert into utility_bills (utility,ubill_amount,ubill_month,ubill_day,ubill_year) values (4,99,11,25,2020);

-- utility_payments insert
-- tenant, utility, upayment_bill, upayment_month, upayment_day, upayment_year, upayment_payed, upayment_amount, upayment_percentage
insert into utility_payments values (1,1,3,11,1,2020,true,25.25,25);
insert into utility_payments values (1,3,9,11,1,2020,true,23.25,25);

