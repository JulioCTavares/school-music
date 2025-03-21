CREATE TABLE "instrumento" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"n_serie" varchar(255) NOT NULL,
	"tipo" text NOT NULL,
	CONSTRAINT "instrumento_n_serie_unique" UNIQUE("n_serie")
);
