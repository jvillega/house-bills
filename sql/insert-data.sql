use bills;

insert into rent (rent_total,day) values (2100,1);
insert into tenants (rent,first_name,last_name) values (1,'josh','villegas');
insert into address values (1,'492 F St.','Arcata','CA','95521');
insert into rent_payments values (1,1,8,7,2020,true,525,25);

insert into deposit values (1,4200,2100);
insert into deposit_payments values (1,1,8,7,2020,true,1050,25);

insert into utilities (rent,name,amount,month,day,year) values (1,'electricity',100,9,7,2020);
insert into utility_payments values (1,1,8,7,2020,true,25,25);

insert into utilities (rent,name,amount,month,day,year) values (1,'water',120,9,15,2020);
insert into utility_payments values (1,2,8,15,2020,true,30,25);

insert into utilities (rent,name,amount,month,day,year) values (1,'internet',70,9,10,2020);
insert into utility_payments values (1,3,8,5,2020,true,17.5,25);

insert into utilities (rent,name,amount,month,day,year) values (1,'recology',90,9,25,2020);
insert into utility_payments values (1,4,8,5,2020,true,22.5,25);

-- utilities insert
insert into utilities (rent,name) values (1,'electricity');
insert into utilities (rent,name) values (1,'water');
insert into utilities (rent,name) values (1,'internet');
insert into utilities (rent,name) values (1,'recology');

-- utility_bills insert
insert into utility_bills (utility,amount,month,day,year) values (1,100,9,7,2020);
insert into utility_bills (utility,amount,month,day,year) values (1,100,10,5,2020);
insert into utility_bills (utility,amount,month,day,year) values (2,120,9,15,2020);
insert into utility_bills (utility,amount,month,day,year) values (3,70,9,10,2020);
insert into utility_bills (utility,amount,month,day,year) values (4,90,9,25,2020);

insert into tenants (rent,first_name,last_name) values (1,'super','man');
insert into rent_payments (tenant,rent,payed,percentage) values (2,1,false,25);
insert into utility_payments (tenant,utility,month,payed,percentage) values (2,1,8,false,25);
insert into utility_payments (tenant,utility,month,payed,percentage) values (2,2,8,false,25);