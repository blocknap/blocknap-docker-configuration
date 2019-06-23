CREATE TABLE public.listen_address (
	address varchar NULL,
	listen varchar NULL,
	abi varchar NULL
);

CREATE TABLE public.oracle_address (
	address varchar NULL,
	oracle varchar NULL,
	abi varchar NULL
);


CREATE TABLE manager_address (
	"name" STRING NULL,
	address STRING NULL,
	abi STRING NULL,
	FAMILY "primary" ("name", address, abi, rowid)
);
