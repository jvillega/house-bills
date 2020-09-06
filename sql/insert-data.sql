use bills;

insert into rent (rent_total,month,day,year) values (2100,9,1,2020);
insert into tenants (rent,first_name,last_name) values (1,'josh','villegas');
insert into address values (1,'492 F St.','Arcata','CA','95521');
insert into rent_payments values (1,1,8,7,2020,true,525,25);

insert into deposit values (1,4200,2100);
insert into deposit_payments values (1,1,8,7,2020,true,1050,25);

insert into utilities (name,amount,month,day,year) values ('electricity',100,9,7,2020);
insert into utility_payments values (1,1,8,7,2020,true,25,25);

insert into utilities (name,amount,month,day,year) values ('water',120,9,15,2020);
insert into utility_payments values (1,2,8,15,2020,true,30,25);

insert into utilities (name,amount,month,day,year) values ('internet',70,9,10,2020);
insert into utility_payments values (1,3,8,5,2020,true,17.5,25);

insert into utilities (name,amount,month,day,year) values ('recology',90,9,25,2020);
insert into utility_payments values (1,4,8,5,2020,true,22.5,25);



insert into tenants (rent,first_name,last_name) values (1,'super','man');
insert into rent_payments (tenant,rent,payed,percentage) values (2,1,false,25);
insert into utility_payments (tenant,utility,month,payed,percentage) values (2,1,8,false,25);
insert into utility_payments (tenant,utility,month,payed,percentage) values (2,2,8,false,25);